using System;
using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Player hit points with brief invincibility frames and knockback. On death,
    /// routes through the GameManager to spend a life and reload/branch.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    public class PlayerHealth : MonoBehaviour, IDamageable
    {
        public float maxHealth = 16f;
        public float invincibilityTime = 1f;
        public float knockbackSpeed = 8f;

        public float Current { get; private set; }
        public Faction Faction => Faction.Player;

        /// <summary>Fired with (current, max) whenever health changes, for the HUD.</summary>
        public event Action<float, float> HealthChanged;

        private Rigidbody2D _rb;
        private PlayerController _controller;
        private SpriteRenderer _sprite;
        private float _invincibleTimer;
        private bool _dead;

        private void Awake()
        {
            _rb = GetComponent<Rigidbody2D>();
            _controller = GetComponent<PlayerController>();
            _sprite = GetComponentInChildren<SpriteRenderer>();
            Current = maxHealth;
        }

        private void Start()
        {
            HealthChanged?.Invoke(Current, maxHealth);
        }

        private void Update()
        {
            if (_invincibleTimer > 0f)
            {
                _invincibleTimer -= Time.deltaTime;
                if (_sprite != null)
                {
                    // Blink while invincible.
                    var c = _sprite.color;
                    c.a = Mathf.PingPong(Time.time * 12f, 1f) < 0.5f ? 0.35f : 1f;
                    _sprite.color = c;
                }
            }
            else if (_sprite != null && _sprite.color.a != 1f)
            {
                var c = _sprite.color;
                c.a = 1f;
                _sprite.color = c;
            }
        }

        public void TakeDamage(float amount, Element sourceElement, Vector2 hitPoint)
        {
            if (_dead || _invincibleTimer > 0f) return;

            Current = Mathf.Max(0f, Current - amount);
            HealthChanged?.Invoke(Current, maxHealth);
            _invincibleTimer = invincibilityTime;

            // Knock back away from the hit.
            float dir = Mathf.Sign(transform.position.x - hitPoint.x);
            if (dir == 0f) dir = 1f;
            Vector2 knock = new Vector2(dir * knockbackSpeed, knockbackSpeed * 0.6f);
            if (_controller != null) _controller.ApplyKnockback(knock);
            else _rb.velocity = knock;

            if (Current <= 0f)
                Die();
        }

        public void Heal(float amount)
        {
            if (_dead) return;
            Current = Mathf.Min(maxHealth, Current + amount);
            HealthChanged?.Invoke(Current, maxHealth);
        }

        private void Die()
        {
            _dead = true;
            GameManager.EnsureExists().OnPlayerDied();
        }
    }
}
