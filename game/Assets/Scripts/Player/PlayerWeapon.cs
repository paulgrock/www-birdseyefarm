using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// The slayer's ranged magic. Tap to fire a quick bolt; hold to charge a
    /// larger, harder-hitting shot. Q/E or number keys switch between unlocked
    /// elemental weapons (tracked on the GameManager). The shot's element decides
    /// whether a boss takes weakness bonus damage.
    /// </summary>
    public class PlayerWeapon : MonoBehaviour
    {
        public GameObject projectilePrefab;
        public Transform muzzle;

        [Header("Tuning")]
        public float baseDamage = 1f;
        public float chargedDamage = 4f;
        public float fireRate = 0.25f;     // min seconds between taps
        public float maxChargeTime = 0.9f; // hold time to reach full charge
        public float projectileSpeed = 16f;

        private PlayerController _controller;
        private float _cooldown;
        private float _chargeTimer;
        private bool _charging;

        private static bool FirePressed => Input.GetKey(KeyCode.J) || Input.GetKey(KeyCode.LeftControl) || Input.GetKey(KeyCode.RightControl);
        private static bool FireDown => Input.GetKeyDown(KeyCode.J) || Input.GetKeyDown(KeyCode.LeftControl) || Input.GetKeyDown(KeyCode.RightControl);
        private static bool FireUp => Input.GetKeyUp(KeyCode.J) || Input.GetKeyUp(KeyCode.LeftControl) || Input.GetKeyUp(KeyCode.RightControl);

        private void Awake()
        {
            _controller = GetComponent<PlayerController>();
        }

        private void Update()
        {
            if (_cooldown > 0f) _cooldown -= Time.deltaTime;

            HandleWeaponSwitch();
            HandleFiring();
        }

        private void HandleWeaponSwitch()
        {
            var gm = GameManager.EnsureExists();
            if (Input.GetKeyDown(KeyCode.E)) gm.CycleWeapon(1);
            if (Input.GetKeyDown(KeyCode.Q)) gm.CycleWeapon(-1);

            if (Input.GetKeyDown(KeyCode.Alpha1)) gm.SelectWeapon(Element.Neutral);
            if (Input.GetKeyDown(KeyCode.Alpha2)) gm.SelectWeapon(Element.Fire);
            if (Input.GetKeyDown(KeyCode.Alpha3)) gm.SelectWeapon(Element.Ice);
            if (Input.GetKeyDown(KeyCode.Alpha4)) gm.SelectWeapon(Element.Water);
            if (Input.GetKeyDown(KeyCode.Alpha5)) gm.SelectWeapon(Element.Earth);
        }

        private void HandleFiring()
        {
            if (FireDown && _cooldown <= 0f)
            {
                _charging = true;
                _chargeTimer = 0f;
            }

            if (_charging && FirePressed)
                _chargeTimer += Time.deltaTime;

            if (_charging && FireUp)
            {
                float t = Mathf.Clamp01(_chargeTimer / maxChargeTime);
                bool charged = t >= 1f;
                Fire(charged);
                _charging = false;
                _cooldown = fireRate;
            }
        }

        private void Fire(bool charged)
        {
            if (projectilePrefab == null) return;

            Element element = GameManager.EnsureExists().SelectedWeapon;
            float facing = _controller != null ? _controller.Facing : 1;

            // Mirror the muzzle to the side the player faces (the muzzle child sits on
            // the right by default), so leftward shots don't spawn behind the player.
            Vector3 local = muzzle != null ? muzzle.localPosition : new Vector3(0.6f, 0.2f, 0f);
            Vector3 spawnPos = transform.position + new Vector3(facing * Mathf.Abs(local.x), local.y, 0f);

            GameObject go = Instantiate(projectilePrefab, spawnPos, Quaternion.identity);
            var proj = go.GetComponent<Projectile>();
            if (proj != null)
            {
                float dmg = charged ? chargedDamage : baseDamage;
                proj.Launch(new Vector2(facing, 0f), Faction.Player, element, dmg, projectileSpeed);
            }

            // Tint and scale by element / charge so placeholder art reads clearly.
            var sr = go.GetComponentInChildren<SpriteRenderer>();
            if (sr != null) sr.color = ElementUtil.ColorOf(element);
            if (charged) go.transform.localScale *= 1.9f;
        }
    }
}
