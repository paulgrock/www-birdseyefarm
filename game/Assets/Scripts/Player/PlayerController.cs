using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Mega Man X-style movement for the dragon-slayer: run, jump (with variable
    /// height), ground dash, and wall-slide + wall-jump. Uses a Rigidbody2D with
    /// manually managed velocity and box-cast probes for ground/wall contact.
    /// Reads Unity's default legacy input axes plus a few KeyCodes so no custom
    /// Input asset is required.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    [RequireComponent(typeof(Collider2D))]
    public class PlayerController : MonoBehaviour
    {
        [Header("Run")]
        public float moveSpeed = 7f;
        public float acceleration = 80f;
        public float airAcceleration = 40f;

        [Header("Jump")]
        public float jumpSpeed = 14f;
        public float gravity = 50f;
        public float fallGravityMultiplier = 1.7f;
        public float lowJumpMultiplier = 2.2f;
        public float coyoteTime = 0.1f;
        public float jumpBufferTime = 0.1f;

        [Header("Dash")]
        public float dashSpeed = 16f;
        public float dashDuration = 0.22f;
        public float dashCooldown = 0.35f;

        [Header("Wall")]
        public float wallSlideSpeed = 3f;
        public Vector2 wallJumpForce = new Vector2(9f, 14f);
        public float wallJumpLockTime = 0.18f;

        [Header("Collision")]
        public LayerMask groundLayer;

        public int Facing { get; private set; } = 1; // 1 = right, -1 = left
        public bool IsDashing => _dashTimer > 0f;

        private Rigidbody2D _rb;
        private Collider2D _col;
        private Vector2 _velocity;

        private bool _grounded;
        private int _wallDir; // -1 left wall, 1 right wall, 0 none
        private float _coyoteCounter;
        private float _jumpBufferCounter;
        private float _dashTimer;
        private float _dashCooldownTimer;
        private float _wallJumpLockCounter;

        private void Awake()
        {
            _rb = GetComponent<Rigidbody2D>();
            _col = GetComponent<Collider2D>();
            _rb.gravityScale = 0f;
            _rb.freezeRotation = true;
            _rb.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
            _rb.interpolation = RigidbodyInterpolation2D.Interpolate;
        }

        private void Update()
        {
            // Buffer jump presses so a slightly-early press still fires on landing.
            if (Input.GetButtonDown("Jump") || Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow))
                _jumpBufferCounter = jumpBufferTime;
            else
                _jumpBufferCounter -= Time.deltaTime;

            if (Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.RightShift))
                TryStartDash();
        }

        private void FixedUpdate()
        {
            float dt = Time.fixedDeltaTime;
            UpdateContacts();

            float inputX = Input.GetAxisRaw("Horizontal");
            if (Mathf.Abs(inputX) > 0.01f && _wallJumpLockCounter <= 0f)
                Facing = inputX > 0 ? 1 : -1;

            if (_dashTimer > 0f)
                TickDash(dt);
            else
                NormalMovement(inputX, dt);

            _rb.velocity = _velocity;

            if (_dashCooldownTimer > 0f) _dashCooldownTimer -= dt;
            if (_wallJumpLockCounter > 0f) _wallJumpLockCounter -= dt;
        }

        private void NormalMovement(float inputX, float dt)
        {
            // Horizontal accel (reduced control just after a wall jump).
            float accel = _grounded ? acceleration : airAcceleration;
            if (_wallJumpLockCounter <= 0f)
            {
                float target = inputX * moveSpeed;
                _velocity.x = Mathf.MoveTowards(_velocity.x, target, accel * dt);
            }

            bool sliding = !_grounded && _wallDir != 0 && Mathf.Sign(inputX) == _wallDir && _velocity.y <= 0f;

            // Gravity.
            float g = gravity;
            if (_velocity.y < 0f) g *= fallGravityMultiplier;
            else if (_velocity.y > 0f && !Input.GetButton("Jump")) g *= lowJumpMultiplier;
            _velocity.y -= g * dt;

            // Stick to the ground: don't let gravity accumulate while standing, or
            // walking off a ledge would launch the player downward.
            if (_grounded && _velocity.y < 0f)
                _velocity.y = -2f;

            if (sliding)
                _velocity.y = Mathf.Max(_velocity.y, -wallSlideSpeed);

            // Coyote time.
            if (_grounded) _coyoteCounter = coyoteTime;
            else _coyoteCounter -= dt;

            // Jump resolution.
            if (_jumpBufferCounter > 0f)
            {
                if (_coyoteCounter > 0f)
                {
                    _velocity.y = jumpSpeed;
                    _jumpBufferCounter = 0f;
                    _coyoteCounter = 0f;
                }
                else if (_wallDir != 0 && !_grounded)
                {
                    // Wall jump: push away from the wall and up.
                    _velocity.x = -_wallDir * wallJumpForce.x;
                    _velocity.y = wallJumpForce.y;
                    Facing = -_wallDir;
                    _wallJumpLockCounter = wallJumpLockTime;
                    _jumpBufferCounter = 0f;
                }
            }

            // Terminal fall speed.
            _velocity.y = Mathf.Max(_velocity.y, -25f);
        }

        /// <summary>Override the controller's velocity (e.g. when hit) and briefly
        /// reduce input authority so the knockback actually reads.</summary>
        public void ApplyKnockback(Vector2 velocity)
        {
            _velocity = velocity;
            _dashTimer = 0f;
            _wallJumpLockCounter = wallJumpLockTime;
        }

        private void TryStartDash()
        {
            if (_dashCooldownTimer > 0f || _dashTimer > 0f) return;
            _dashTimer = dashDuration;
            _dashCooldownTimer = dashCooldown;
        }

        private void TickDash(float dt)
        {
            _dashTimer -= dt;
            _velocity.x = Facing * dashSpeed;
            _velocity.y = 0f; // flat, ground-dash feel
            if (_dashTimer <= 0f)
                _velocity.x = Facing * moveSpeed; // ease out into a run
        }

        private void UpdateContacts()
        {
            Bounds b = _col.bounds;
            const float skin = 0.05f;
            Vector2 size = b.size;

            // Ground probe just beneath the feet.
            RaycastHit2D groundHit = Physics2D.BoxCast(
                b.center, new Vector2(size.x * 0.9f, 0.05f), 0f, Vector2.down,
                size.y * 0.5f + skin, groundLayer);
            _grounded = groundHit.collider != null && _velocity.y <= 0.01f;

            // Wall probes on both sides.
            float dist = size.x * 0.5f + skin;
            bool rightWall = Physics2D.BoxCast(b.center, new Vector2(0.05f, size.y * 0.8f), 0f, Vector2.right, dist, groundLayer);
            bool leftWall = Physics2D.BoxCast(b.center, new Vector2(0.05f, size.y * 0.8f), 0f, Vector2.left, dist, groundLayer);
            _wallDir = rightWall ? 1 : leftWall ? -1 : 0;
        }
    }
}
