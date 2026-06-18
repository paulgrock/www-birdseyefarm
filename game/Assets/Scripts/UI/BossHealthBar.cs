using UnityEngine;
using UnityEngine.UI;

namespace DragonHunter
{
    /// <summary>
    /// The boss's health bar, shown along the side/top during a fight. Hidden until
    /// the dragon is activated; tinted to the dragon's element.
    /// </summary>
    public class BossHealthBar : MonoBehaviour
    {
        public Image fill;
        public Text label;

        public void Set(float current, float max, Element element)
        {
            if (fill != null)
            {
                fill.fillAmount = max > 0f ? current / max : 0f;
                fill.color = ElementUtil.ColorOf(element);
            }
            if (label != null)
                label.text = ElementUtil.DisplayName(element) + " Dragon";
        }
    }
}
