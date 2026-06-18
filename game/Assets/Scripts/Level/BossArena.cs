using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// A trigger at the end of a stage's platforming run. When the player enters,
    /// it wakes the assigned dragon (the "goal" of the stage). Optionally drops an
    /// invisible wall behind the player to seal the arena.
    /// </summary>
    [RequireComponent(typeof(Collider2D))]
    public class BossArena : MonoBehaviour
    {
        public DragonBoss boss;
        public GameObject sealWall; // optional collider that closes the entrance

        private bool _triggered;

        private void Awake()
        {
            GetComponent<Collider2D>().isTrigger = true;
            if (sealWall != null) sealWall.SetActive(false);
        }

        private void OnTriggerEnter2D(Collider2D other)
        {
            if (_triggered) return;
            var player = other.GetComponentInParent<PlayerController>();
            if (player == null) return;

            _triggered = true;
            if (sealWall != null) sealWall.SetActive(true);
            if (boss != null) boss.Activate(player.transform);
        }
    }
}
