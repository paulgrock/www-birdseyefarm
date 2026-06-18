using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace DragonHunter
{
    /// <summary>
    /// Persistent game state: which dragons are defeated, which elemental weapons
    /// the player has unlocked, the currently selected weapon, and remaining lives.
    /// Also owns high-level scene flow (enter a stage, return to the hub, win/lose).
    /// Survives scene loads via DontDestroyOnLoad and is created on demand.
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public const int StartingLives = 3;

        public static GameManager Instance { get; private set; }

        public int Lives { get; private set; } = StartingLives;

        // The four dragons the player must defeat.
        public static readonly Element[] DragonElements =
        {
            Element.Fire, Element.Ice, Element.Water, Element.Earth
        };

        private readonly HashSet<Element> _defeated = new HashSet<Element>();
        private readonly List<Element> _weapons = new List<Element> { Element.Neutral };

        public Element SelectedWeapon { get; private set; } = Element.Neutral;

        /// <summary>The dragon stage the player is currently entering, if any.</summary>
        public Element CurrentStage { get; private set; } = Element.Neutral;

        /// <summary>Ensures a GameManager exists; safe to call from any scene.</summary>
        public static GameManager EnsureExists()
        {
            if (Instance == null)
            {
                var go = new GameObject("GameManager");
                go.AddComponent<GameManager>();
            }
            return Instance;
        }

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        // --- Progression -----------------------------------------------------

        public bool IsDefeated(Element dragon) => _defeated.Contains(dragon);

        public bool AllDragonsDefeated()
        {
            foreach (var e in DragonElements)
                if (!_defeated.Contains(e)) return false;
            return true;
        }

        public IReadOnlyList<Element> UnlockedWeapons => _weapons;

        public bool HasWeapon(Element element) => _weapons.Contains(element);

        /// <summary>Called by a boss on death: records the kill and grants its weapon.</summary>
        public void OnDragonDefeated(Element dragon)
        {
            _defeated.Add(dragon);
            if (!_weapons.Contains(dragon))
                _weapons.Add(dragon);
        }

        public void SelectWeapon(Element element)
        {
            if (_weapons.Contains(element))
                SelectedWeapon = element;
        }

        /// <summary>Advance the selected weapon to the next unlocked one (weapon-switch input).</summary>
        public void CycleWeapon(int direction)
        {
            if (_weapons.Count == 0) return;
            int index = _weapons.IndexOf(SelectedWeapon);
            if (index < 0) index = 0;
            index = (index + direction + _weapons.Count) % _weapons.Count;
            SelectedWeapon = _weapons[index];
        }

        // --- Lives -----------------------------------------------------------

        /// <summary>Spend a life. Returns true if the player still has lives left.</summary>
        public bool LoseLife()
        {
            Lives = Mathf.Max(0, Lives - 1);
            return Lives > 0;
        }

        /// <summary>Full reset for a new playthrough (used by the title/game-over screens).</summary>
        public void ResetRun()
        {
            Lives = StartingLives;
            _defeated.Clear();
            _weapons.Clear();
            _weapons.Add(Element.Neutral);
            SelectedWeapon = Element.Neutral;
            CurrentStage = Element.Neutral;
        }

        // --- Scene flow ------------------------------------------------------

        public void EnterStage(Element dragon)
        {
            CurrentStage = dragon;
            // Always start a stage with the neutral weapon equipped for fairness.
            SelectedWeapon = Element.Neutral;
            SceneManager.LoadScene(SceneNames.StageFor(dragon));
        }

        public void ReturnToHub()
        {
            CurrentStage = Element.Neutral;
            if (AllDragonsDefeated())
                SceneManager.LoadScene(SceneNames.Victory);
            else
                SceneManager.LoadScene(SceneNames.StageSelect);
        }

        /// <summary>Player ran out of health in a stage. Spend a life and route accordingly.</summary>
        public void OnPlayerDied()
        {
            if (LoseLife())
                SceneManager.LoadScene(SceneNames.StageFor(CurrentStage));
            else
                SceneManager.LoadScene(SceneNames.GameOver);
        }
    }
}
