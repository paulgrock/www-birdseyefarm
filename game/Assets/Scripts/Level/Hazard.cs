using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Environmental damage: spikes, lava, or a bottomless-pit kill zone. When
    /// <see cref="instantKill"/> is set it deals enough to drop the player at once
    /// (used for the pit floor beneath each stage).
    /// </summary>
    [RequireComponent(typeof(Collider2D))]
    public class Hazard : MonoBehaviour
    {
        public float damage = 3f;
        public bool instantKill = false;

        private void Awake()
        {
            GetComponent<Collider2D>().isTrigger = true;
        }

        private void OnTriggerEnter2D(Collider2D other) => Hit(other);
        private void OnTriggerStay2D(Collider2D other) => Hit(other);

        private void Hit(Collider2D other)
        {
            var player = other.GetComponentInParent<PlayerHealth>();
            if (player == null) return;
            if (instantKill) player.Kill();                     // bypasses i-frames
            else player.TakeDamage(damage, Element.Neutral, transform.position);
        }
    }
}
