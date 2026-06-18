using System.Collections;
using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Fire dragon (weak to Earth). Alternates a three-way fireball spread with a
    /// fast horizontal charge across the arena.
    /// </summary>
    public class FireDragon : DragonBoss
    {
        public float chargeSpeed = 12f;
        public float fireballSpeed = 9f;

        private int _attackIndex;

        protected override void Awake()
        {
            element = Element.Fire;
            base.Awake();
        }

        protected override IEnumerator ExecuteAttack()
        {
            _attackIndex = (_attackIndex + 1) % 2;
            if (_attackIndex == 0)
                yield return StartCoroutine(FireballSpread());
            else
                yield return StartCoroutine(ChargeDash());
        }

        private IEnumerator FireballSpread()
        {
            // Telegraph.
            yield return new WaitForSeconds(0.4f);
            int dir = DirToPlayer();
            foreach (float angle in new[] { -25f, 0f, 25f })
            {
                Vector2 v = Quaternion.Euler(0, 0, angle) * new Vector2(dir, 0f);
                ShootProjectile(v, 3f, fireballSpeed);
            }
            yield return new WaitForSeconds(0.3f);
        }

        private IEnumerator ChargeDash()
        {
            yield return new WaitForSeconds(0.5f); // wind-up
            int dir = DirToPlayer();
            float t = 0f;
            while (t < 0.7f)
            {
                t += Time.fixedDeltaTime;
                Body.velocity = new Vector2(dir * chargeSpeed, 0f);
                yield return new WaitForFixedUpdate();
            }
            Body.velocity = Vector2.zero;
            yield return new WaitForSeconds(0.2f);
        }
    }
}
