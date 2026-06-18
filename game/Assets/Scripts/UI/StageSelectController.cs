using System;
using UnityEngine;
using UnityEngine.UI;

namespace DragonHunter
{
    /// <summary>
    /// The Mega Man X-style boss-select hub. Shows the four dragons; the player
    /// navigates with left/right (or A/D) and confirms with Jump/J/Enter to enter a
    /// stage. Already-defeated dragons are dimmed and marked, and can't be replayed.
    /// </summary>
    public class StageSelectController : MonoBehaviour
    {
        [Serializable]
        public class Portrait
        {
            public Element element;
            public Image image;       // colored placeholder portrait
            public Text label;        // dragon name
            public GameObject defeatedMark; // shown when cleared
            public Outline highlight; // selection outline
        }

        public Portrait[] portraits;
        public Text instructions;

        private int _index;

        private void Start()
        {
            GameManager.EnsureExists();
            RefreshDefeatedState();
            ClampToAvailable();
            UpdateHighlight();
            if (instructions != null)
                instructions.text = "A/D or </> to choose   -   SPACE / J to enter";
        }

        private void Update()
        {
            if (Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow)) Move(-1);
            if (Input.GetKeyDown(KeyCode.D) || Input.GetKeyDown(KeyCode.RightArrow)) Move(1);

            if (Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.J)
                || Input.GetKeyDown(KeyCode.Return) || Input.GetKeyDown(KeyCode.KeypadEnter))
                Confirm();
        }

        private void Move(int dir)
        {
            if (portraits == null || portraits.Length == 0) return;
            for (int i = 0; i < portraits.Length; i++)
            {
                _index = (_index + dir + portraits.Length) % portraits.Length;
                if (!GameManager.Instance.IsDefeated(portraits[_index].element))
                    break;
            }
            UpdateHighlight();
        }

        private void Confirm()
        {
            if (portraits == null || portraits.Length == 0) return;
            var p = portraits[_index];
            if (GameManager.Instance.IsDefeated(p.element)) return;
            GameManager.Instance.EnterStage(p.element);
        }

        private void ClampToAvailable()
        {
            for (int i = 0; i < portraits.Length; i++)
            {
                if (!GameManager.Instance.IsDefeated(portraits[i].element))
                {
                    _index = i;
                    return;
                }
            }
        }

        private void RefreshDefeatedState()
        {
            foreach (var p in portraits)
            {
                bool defeated = GameManager.Instance.IsDefeated(p.element);
                if (p.image != null)
                {
                    Color c = ElementUtil.ColorOf(p.element);
                    if (defeated) c *= 0.4f;
                    c.a = 1f;
                    p.image.color = c;
                }
                if (p.label != null) p.label.text = ElementUtil.DisplayName(p.element);
                if (p.defeatedMark != null) p.defeatedMark.SetActive(defeated);
            }
        }

        private void UpdateHighlight()
        {
            for (int i = 0; i < portraits.Length; i++)
            {
                if (portraits[i].highlight != null)
                    portraits[i].highlight.enabled = (i == _index);
                if (portraits[i].image != null)
                {
                    var t = portraits[i].image.rectTransform;
                    t.localScale = (i == _index) ? Vector3.one * 1.15f : Vector3.one;
                }
            }
        }
    }
}
