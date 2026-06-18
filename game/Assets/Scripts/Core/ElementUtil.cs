using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Central helper for the elemental rock-paper-scissors cycle and the colors
    /// used by the placeholder art. The weakness cycle is:
    ///   Fire  beats Ice
    ///   Ice   beats Water
    ///   Water beats Earth
    ///   Earth beats Fire
    /// </summary>
    public static class ElementUtil
    {
        /// <summary>Extra damage multiplier applied when a boss is hit by the element it is weak to.</summary>
        public const float WeaknessMultiplier = 3f;

        /// <summary>Returns the element that the given boss element is weak to.</summary>
        public static Element WeaknessOf(Element bossElement)
        {
            switch (bossElement)
            {
                case Element.Ice: return Element.Fire;   // fire melts ice
                case Element.Water: return Element.Ice;   // ice freezes water
                case Element.Earth: return Element.Water; // water erodes earth
                case Element.Fire: return Element.Earth;  // earth smothers fire
                default: return Element.Neutral;
            }
        }

        /// <summary>True when an attack of <paramref name="attack"/> exploits the weakness of <paramref name="target"/>.</summary>
        public static bool IsWeaknessHit(Element attack, Element target)
        {
            return attack != Element.Neutral && WeaknessOf(target) == attack;
        }

        /// <summary>Damage multiplier for an attack element against a target element.</summary>
        public static float DamageMultiplier(Element attack, Element target)
        {
            return IsWeaknessHit(attack, target) ? WeaknessMultiplier : 1f;
        }

        /// <summary>Display color used for placeholder art and projectiles per element.</summary>
        public static Color ColorOf(Element element)
        {
            switch (element)
            {
                case Element.Fire: return new Color(0.90f, 0.25f, 0.15f);
                case Element.Ice: return new Color(0.55f, 0.85f, 1.00f);
                case Element.Water: return new Color(0.15f, 0.40f, 0.90f);
                case Element.Earth: return new Color(0.45f, 0.65f, 0.25f);
                default: return new Color(0.95f, 0.95f, 0.70f); // neutral / pale gold bolt
            }
        }

        public static string DisplayName(Element element)
        {
            return element.ToString();
        }
    }
}
