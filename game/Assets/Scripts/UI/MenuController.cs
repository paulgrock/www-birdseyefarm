using UnityEngine;
using UnityEngine.SceneManagement;

namespace DragonHunter
{
    /// <summary>
    /// Drives the simple full-screen menus: Title, Victory, and Game Over. Any key
    /// advances. The target scene and whether to reset the run are set by the
    /// scene builder per screen.
    /// </summary>
    public class MenuController : MonoBehaviour
    {
        public enum Kind { Title, Victory, GameOver }

        public Kind kind = Kind.Title;

        private void Update()
        {
            if (Input.anyKeyDown)
                Advance();
        }

        private void Advance()
        {
            var gm = GameManager.EnsureExists();
            switch (kind)
            {
                case Kind.Title:
                    gm.ResetRun();
                    SceneManager.LoadScene(SceneNames.StageSelect);
                    break;
                case Kind.Victory:
                case Kind.GameOver:
                    gm.ResetRun();
                    SceneManager.LoadScene(SceneNames.Title);
                    break;
            }
        }
    }
}
