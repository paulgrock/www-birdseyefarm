using System.Collections;
using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Base class for the four elemental dragons. Handles health, the weakness
    /// damage multiplier, facing the player, contact damage, the boss health bar,
    /// and a simple "telegraph → attack → recover" loop. Each concrete dragon
    /// supplies its own attacks by implementing <see cref="ExecuteAttack"/>.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    [RequireComponent(typeof(Collider2D))]
    public abstract class DragonBoss : MonoBehaviour, IDamageable
    {
        [Header("Identity")]
        public Element element = Element.Fire;

        [Header("Stats")]
        public float maxHealth = 40f;
        public float contactDamage = 3f;
        public float timeBetweenAttacks = 1.6f;

        [Header("Arena")]
        [Tooltip("World Y the dragon rests at; it never sinks below this.")]
        public float floorY = -2.5f;
        [Tooltip("Self-applied gravity, since the kinematic body ignores Unity's. Lets hops/leaps arc back down.")]
        public float gravity = 30f;

        [Header("References (assigned by the scene builder)")]
        public GameObject projectilePrefab;
        public BossHealthBar healthBar;

        public Faction Faction => Faction.Enemy;
        public float Current { get; protected set; }
        public bool IsActive { get; private set; }
        protected Transform Player { get; private set; }
        protected Rigidbody2D Body { get; private set; }
        protected SpriteRenderer Sprite { get; private set; }

        private bool _dead;
        private float _flashTimer;

        protected virtual void Awake()
        {
            Body = GetComponent<Rigidbody2D>();
            Body.gravityScale = 0f;
            Body.freezeRotation = true;
            // Kinematic + trigger: the dragon hovers, ignores terrain pushes, and we
            // drive it entirely via velocity while still getting contact callbacks.
            Body.bodyType = RigidbodyType2D.Kinematic;
            var col = GetComponent<Collider2D>();
            if (col != null) col.isTrigger = true;
            Sprite = GetComponentInChildren<SpriteRenderer>();
            Current = maxHealth;
        }

        /// <summary>Wakes the boss when the player reaches the arena. Called by BossArena.</summary>
        public void Activate(Transform player)
        {
            if (IsActive) return;
            Player = player;
            IsActive = true;
            if (healthBar != null)
            {
                healthBar.gameObject.SetActive(true);
                healthBar.Set(Current, maxHealth, element);
            }
            StartCoroutine(AttackLoop());
        }

        private IEnumerator AttackLoop()
        {
            // Brief intro pause before fighting starts.
            yield return new WaitForSeconds(1f);
            while (!_dead && IsActive)
            {
                FacePlayer();
                yield return StartCoroutine(ExecuteAttack());
                yield return new WaitForSeconds(timeBetweenAttacks);
            }
        }

        /// <summary>Run one attack pattern. Implemented per dragon. Yielded by the loop.</summary>
        protected abstract IEnumerator ExecuteAttack();

        protected virtual void Update()
        {
            if (_flashTimer > 0f)
            {
                _flashTimer -= Time.deltaTime;
                if (Sprite != null)
                    Sprite.color = Color.Lerp(ElementUtil.ColorOf(element), Color.white, _flashTimer * 5f);
            }
        }

        protected virtual void FixedUpdate()
        {
            // The kinematic body ignores Unity gravity, so apply our own. This lets
            // attacks set an upward velocity (hop/leap) and have the dragon arc back
            // down to its resting line instead of drifting away forever.
            Vector2 v = Body.velocity;
            v.y -= gravity * Time.fixedDeltaTime;
            Body.velocity = v;

            if (transform.position.y <= floorY && v.y < 0f)
            {
                var p = transform.position;
                p.y = floorY;
                transform.position = p;
                v.y = 0f;
                Body.velocity = v;
            }
        }

        protected void FacePlayer()
        {
            if (Player == null || Sprite == null) return;
            float dir = Mathf.Sign(Player.position.x - transform.position.x);
            var s = transform.localScale;
            s.x = Mathf.Abs(s.x) * (dir >= 0 ? 1f : -1f);
            transform.localScale = s;
        }

        protected int DirToPlayer()
        {
            if (Player == null) return 1;
            return Player.position.x >= transform.position.x ? 1 : -1;
        }

        /// <summary>Helper for derived dragons: fire an enemy projectile in a direction.</summary>
        protected Projectile ShootProjectile(Vector2 direction, float damage, float speed, float gravity = 0f)
        {
            if (projectilePrefab == null) return null;
            GameObject go = Instantiate(projectilePrefab, transform.position, Quaternion.identity);
            var proj = go.GetComponent<Projectile>();
            if (proj != null)
                proj.Launch(direction, Faction.Enemy, element, damage, speed, gravity);
            var sr = go.GetComponentInChildren<SpriteRenderer>();
            if (sr != null) sr.color = ElementUtil.ColorOf(element);
            return proj;
        }

        public void TakeDamage(float amount, Element sourceElement, Vector2 hitPoint)
        {
            if (_dead || !IsActive) return;

            float multiplier = ElementUtil.DamageMultiplier(sourceElement, element);
            Current = Mathf.Max(0f, Current - amount * multiplier);
            _flashTimer = 0.18f;

            if (healthBar != null) healthBar.Set(Current, maxHealth, element);

            if (Current <= 0f)
                Die();
        }

        // Stay handlers too, so a player standing inside the dragon keeps taking
        // damage (gated by the player's own invincibility frames) rather than being
        // hit only on the frame they first overlap.
        private void OnCollisionEnter2D(Collision2D collision) => TryContactDamage(collision.collider);
        private void OnTriggerEnter2D(Collider2D other) => TryContactDamage(other);
        private void OnTriggerStay2D(Collider2D other) => TryContactDamage(other);

        private void TryContactDamage(Collider2D other)
        {
            if (!IsActive || _dead) return;
            var player = other.GetComponentInParent<PlayerHealth>();
            if (player != null)
                player.TakeDamage(contactDamage, element, transform.position);
        }

        protected virtual void Die()
        {
            _dead = true;
            IsActive = false;
            StopAllCoroutines();
            if (healthBar != null) healthBar.gameObject.SetActive(false);
            StartCoroutine(DeathThenReturn());
        }

        private IEnumerator DeathThenReturn()
        {
            // Simple shrink-out "death" using the placeholder sprite.
            float t = 0f;
            Vector3 start = transform.localScale;
            while (t < 1.2f)
            {
                t += Time.deltaTime;
                transform.localScale = Vector3.Lerp(start, Vector3.zero, t / 1.2f);
                yield return null;
            }

            // Record the kill only once the death sequence completes. If the player
            // had died simultaneously and reloaded the stage, this coroutine is gone
            // and the dragon is correctly NOT marked defeated.
            GameManager.EnsureExists().OnDragonDefeated(element);
            GameManager.EnsureExists().ReturnToHub();
        }
    }
}
