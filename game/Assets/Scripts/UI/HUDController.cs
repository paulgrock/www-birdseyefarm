using UnityEngine;
using UnityEngine.UI;

namespace DragonHunter
{
    /// <summary>
    /// In-stage HUD: player health bar, remaining lives, and the currently selected
    /// weapon. Auto-finds the player's <see cref="PlayerHealth"/> and listens for
    /// health changes; polls the GameManager for weapon/lives each frame.
    /// </summary>
    public class HUDController : MonoBehaviour
    {
        public Image healthFill;
        public Text livesText;
        public Text weaponText;

        private PlayerHealth _player;
        private int _lastLives = -1;
        private Element _lastWeapon = (Element)(-1);

        private void Start()
        {
            Bind();
        }

        private void Bind()
        {
            _player = FindObjectOfType<PlayerHealth>();
            if (_player != null)
            {
                _player.HealthChanged += OnHealthChanged;
                OnHealthChanged(_player.Current, _player.maxHealth);
            }
        }

        private void OnDestroy()
        {
            if (_player != null) _player.HealthChanged -= OnHealthChanged;
        }

        private void OnHealthChanged(float current, float max)
        {
            if (healthFill != null) healthFill.fillAmount = max > 0f ? current / max : 0f;
        }

        private void Update()
        {
            if (_player == null) Bind();

            // Only touch the UI when a value actually changes — avoids per-frame
            // string allocation and needless canvas rebuilds.
            var gm = GameManager.EnsureExists();
            if (livesText != null && gm.Lives != _lastLives)
            {
                _lastLives = gm.Lives;
                livesText.text = "x" + _lastLives;
            }
            if (weaponText != null && gm.SelectedWeapon != _lastWeapon)
            {
                _lastWeapon = gm.SelectedWeapon;
                weaponText.text = ElementUtil.DisplayName(_lastWeapon);
                weaponText.color = ElementUtil.ColorOf(_lastWeapon);
            }
        }
    }
}
