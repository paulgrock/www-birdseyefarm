using System.Collections;
using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Earth dragon (weak to Water). Hurls arcing boulders, then leaps and ground-
    /// pounds, sending shockwave shards skimming along the floor in both directions.
    /// </summary>
    public class EarthDragon : DragonBoss
    {
        public float boulderSpeed = 9f;
        public float slamJumpSpeed = 13f;
        public float shockwaveSpeed = 10f;

        private int _attackIndex;

        protected override void Awake()
        {
            element = Element.Earth;
            base.Awake();
        }

        protected override IEnumerator ExecuteAttack()
        {
            _attackIndex = (_attackIndex + 1) % 2;
            if (_attackIndex == 0)
                yield return StartCoroutine(BoulderToss());
            else
                yield return StartCoroutine(GroundPound());
        }

        private IEnumerator BoulderToss()
        {
            yield return new WaitForSeconds(0.4f);
            int dir = DirToPlayer();
            for (int i = 0; i < 2; i++)
            {
                ShootProjectile(new Vector2(dir * 0.85f, 0.55f), 4f, boulderSpeed, gravity: 2f);
                yield return new WaitForSeconds(0.45f);
            }
        }

        private IEnumerator GroundPound()
        {
            yield return new WaitForSeconds(0.4f);
            Body.velocity = new Vector2(0f, slamJumpSpeed); // leap up
            yield return new WaitForSeconds(0.5f);
            Body.velocity = new Vector2(0f, -slamJumpSpeed * 1.4f); // slam down

            yield return new WaitForSeconds(0.35f);
            // Shockwaves skim the floor both ways.
            var left = ShootProjectile(Vector2.left, 3f, shockwaveSpeed);
            var right = ShootProjectile(Vector2.right, 3f, shockwaveSpeed);
            if (left != null) left.destroyOnTerrain = false;
            if (right != null) right.destroyOnTerrain = false;
            yield return new WaitForSeconds(0.3f);
        }
    }
}
