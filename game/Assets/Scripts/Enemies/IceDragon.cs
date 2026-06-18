using System.Collections;
using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Ice dragon (weak to Fire). Rains falling icicles across the arena, then
    /// sweeps a low freeze-breath volley along the ground.
    /// </summary>
    public class IceDragon : DragonBoss
    {
        public float icicleSpeed = 2f;
        public float breathSpeed = 8f;
        public float arenaHalfWidth = 7f;

        private int _attackIndex;

        protected override void Awake()
        {
            element = Element.Ice;
            base.Awake();
        }

        protected override IEnumerator ExecuteAttack()
        {
            _attackIndex = (_attackIndex + 1) % 2;
            if (_attackIndex == 0)
                yield return StartCoroutine(IcicleRain());
            else
                yield return StartCoroutine(FreezeBreath());
        }

        private IEnumerator IcicleRain()
        {
            yield return new WaitForSeconds(0.3f);
            for (int i = 0; i < 5; i++)
            {
                float x = transform.position.x + Random.Range(-arenaHalfWidth, arenaHalfWidth);
                Vector3 spawn = new Vector3(x, transform.position.y + 4f, 0f);
                var proj = ShootProjectile(Vector2.down, 3f, 0.1f, gravity: 3f);
                if (proj != null) proj.transform.position = spawn;
                yield return new WaitForSeconds(0.25f);
            }
        }

        private IEnumerator FreezeBreath()
        {
            yield return new WaitForSeconds(0.4f);
            int dir = DirToPlayer();
            for (int i = 0; i < 4; i++)
            {
                ShootProjectile(new Vector2(dir, -0.15f), 2f, breathSpeed);
                yield return new WaitForSeconds(0.15f);
            }
        }
    }
}
