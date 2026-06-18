using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// A travelling shot. Used by both the player and enemies; the <see cref="owner"/>
    /// faction decides who it can hurt. Carries an element so bosses can apply
    /// weakness multipliers. Straight shots use zero gravity; arcing shots
    /// (gravity &gt; 0) lob for boulders, bubbles, and falling icicles.
    ///
    /// The body is Dynamic (with gravity scaled per shot) rather than Kinematic so
    /// trigger callbacks fire reliably against terrain and other actors — Unity 2D
    /// does not guarantee trigger messages between two non-dynamic bodies.
    /// Despawns on hit, on terrain, or after its lifetime.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    [RequireComponent(typeof(Collider2D))]
    public class Projectile : MonoBehaviour
    {
        public float damage = 1f;
        public Element element = Element.Neutral;
        public Faction owner = Faction.Player;
        public float speed = 14f;
        public float lifetime = 4f;
        public bool destroyOnTerrain = true;

        private Rigidbody2D _rb;
        private float _age;

        public void Launch(Vector2 direction, Faction ownerFaction, Element shotElement,
                           float shotDamage, float shotSpeed, float gravity = 0f)
        {
            Vector2 dir = direction.normalized;
            owner = ownerFaction;
            element = shotElement;
            damage = shotDamage;
            speed = shotSpeed;

            _rb = GetComponent<Rigidbody2D>();
            _rb.gravityScale = gravity;          // 0 = straight, >0 = arcing
            _rb.velocity = dir * shotSpeed;

            // Face the travel direction (placeholder rectangles look fine flipped).
            if (dir.x < 0f)
            {
                var s = transform.localScale;
                s.x = -Mathf.Abs(s.x);
                transform.localScale = s;
            }
        }

        private void Awake()
        {
            _rb = GetComponent<Rigidbody2D>();
            _rb.bodyType = RigidbodyType2D.Dynamic;
            _rb.gravityScale = 0f;
            _rb.freezeRotation = true;
            var col = GetComponent<Collider2D>();
            col.isTrigger = true;
        }

        private void Update()
        {
            _age += Time.deltaTime;
            if (_age >= lifetime)
                Destroy(gameObject);
        }

        private void OnTriggerEnter2D(Collider2D other)
        {
            // Ignore other projectiles entirely.
            if (other.GetComponent<Projectile>() != null) return;

            var target = other.GetComponentInParent<IDamageable>();
            if (target != null)
            {
                if (target.Faction == owner) return; // no friendly fire
                target.TakeDamage(damage, element, transform.position);
                Destroy(gameObject);
                return;
            }

            // Hit terrain (anything solid on the Ground layer).
            if (destroyOnTerrain && other.gameObject.layer == LayerMask.NameToLayer("Ground"))
            {
                Destroy(gameObject);
            }
        }
    }
}
