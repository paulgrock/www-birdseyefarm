using System.Collections;
using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Water dragon (weak to Ice). Lobs arcing bubble shots that drift down, then
    /// hops upward and releases a fan of spreading droplets.
    /// </summary>
    public class WaterDragon : DragonBoss
    {
        public float bubbleSpeed = 7f;
        public float hopSpeed = 11f;

        private int _attackIndex;

        protected override void Awake()
        {
            element = Element.Water;
            base.Awake();
        }

        protected override IEnumerator ExecuteAttack()
        {
            _attackIndex = (_attackIndex + 1) % 2;
            if (_attackIndex == 0)
                yield return StartCoroutine(BubbleLob());
            else
                yield return StartCoroutine(HopAndSpray());
        }

        private IEnumerator BubbleLob()
        {
            yield return new WaitForSeconds(0.35f);
            int dir = DirToPlayer();
            for (int i = 0; i < 3; i++)
            {
                ShootProjectile(new Vector2(dir * 0.7f, 0.8f), 3f, bubbleSpeed, gravity: 1.5f);
                yield return new WaitForSeconds(0.3f);
            }
        }

        private IEnumerator HopAndSpray()
        {
            yield return new WaitForSeconds(0.3f);
            Body.velocity = new Vector2(0f, hopSpeed); // little jump
            yield return new WaitForSeconds(0.35f);

            foreach (float angle in new[] { -50f, -25f, 0f, 25f, 50f })
            {
                Vector2 v = Quaternion.Euler(0, 0, angle) * Vector2.down;
                ShootProjectile(v, 2f, bubbleSpeed);
            }
            yield return new WaitForSeconds(0.4f);
        }
    }
}
