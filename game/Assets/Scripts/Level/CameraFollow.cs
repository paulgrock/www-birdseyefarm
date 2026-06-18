using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Smoothly follows the player, clamped to the level's horizontal/vertical
    /// bounds so the camera never reveals the edge of the world.
    /// </summary>
    public class CameraFollow : MonoBehaviour
    {
        public Transform target;
        public float smoothTime = 0.12f;
        public Vector2 offset = new Vector2(0f, 1.5f);

        [Header("World bounds")]
        public float minX = -100f;
        public float maxX = 100f;
        public float minY = -100f;
        public float maxY = 100f;

        private Vector3 _velocity;
        private Camera _cam;

        private void Awake()
        {
            _cam = GetComponent<Camera>();
        }

        private void LateUpdate()
        {
            if (target == null)
            {
                // Auto-acquire the player if the builder hasn't wired it (e.g. after respawn).
                var pc = FindObjectOfType<PlayerController>();
                if (pc != null) target = pc.transform;
                else return;
            }

            float halfH = _cam != null ? _cam.orthographicSize : 5f;
            float halfW = halfH * (_cam != null ? _cam.aspect : 1.6f);

            Vector3 desired = new Vector3(
                target.position.x + offset.x,
                target.position.y + offset.y,
                transform.position.z);

            desired.x = Mathf.Clamp(desired.x, minX + halfW, maxX - halfW);
            desired.y = Mathf.Clamp(desired.y, minY + halfH, maxY - halfH);

            // Don't fight the clamp when the level is narrower than the view.
            if (maxX - minX < halfW * 2f) desired.x = (minX + maxX) * 0.5f;
            if (maxY - minY < halfH * 2f) desired.y = (minY + maxY) * 0.5f;

            transform.position = Vector3.SmoothDamp(transform.position, desired, ref _velocity, smoothTime);
        }
    }
}
