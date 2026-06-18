using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Simple ground enemy that paces back and forth between two points (or until
    /// it hits a wall / ledge) and damages the player on contact. Takes damage from
    /// any player shot and dies when depleted.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    [RequireComponent(typeof(Collider2D))]
    public class PatrolEnemy : MonoBehaviour, IDamageable
    {
        public float speed = 2.5f;
        public float patrolDistance = 3f;
        public float maxHealth = 3f;
        public float contactDamage = 2f;
        public LayerMask groundLayer;

        public Faction Faction => Faction.Enemy;

        private Rigidbody2D _rb;
        private Collider2D _col;
        private SpriteRenderer _sprite;
        private float _health;
        private int _dir = 1;
        private float _originX;

        private void Awake()
        {
            _rb = GetComponent<Rigidbody2D>();
            _col = GetComponent<Collider2D>();
            _sprite = GetComponentInChildren<SpriteRenderer>();
            _rb.freezeRotation = true;
            _health = maxHealth;
            _originX = transform.position.x;
        }

        private void FixedUpdate()
        {
            // Turn around at patrol bounds, at a wall, or at a ledge.
            if (Mathf.Abs(transform.position.x - _originX) > patrolDistance) Flip();
            else if (AtWall() || AtLedge()) Flip();

            _rb.velocity = new Vector2(_dir * speed, _rb.velocity.y);
        }

        private bool AtWall()
        {
            Bounds b = _col.bounds;
            return Physics2D.Raycast(b.center, new Vector2(_dir, 0f), b.extents.x + 0.1f, groundLayer);
        }

        private bool AtLedge()
        {
            Bounds b = _col.bounds;
            Vector2 ahead = new Vector2(b.center.x + _dir * (b.extents.x + 0.1f), b.min.y);
            return !Physics2D.Raycast(ahead, Vector2.down, 0.4f, groundLayer);
        }

        private void Flip()
        {
            _dir = -_dir;
            _originX = transform.position.x; // recentre so we don't jitter at the bound
            if (_sprite != null)
            {
                var s = transform.localScale;
                s.x = Mathf.Abs(s.x) * _dir;
                transform.localScale = s;
            }
        }

        public void TakeDamage(float amount, Element sourceElement, Vector2 hitPoint)
        {
            _health -= amount;
            if (_health <= 0f) Destroy(gameObject);
        }

        private void OnCollisionEnter2D(Collision2D collision) => TryHit(collision.collider);
        private void OnCollisionStay2D(Collision2D collision) => TryHit(collision.collider);
        private void OnTriggerEnter2D(Collider2D other) => TryHit(other);

        private void TryHit(Collider2D other)
        {
            var player = other.GetComponentInParent<PlayerHealth>();
            if (player != null)
                player.TakeDamage(contactDamage, Element.Neutral, transform.position);
        }
    }
}
