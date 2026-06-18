using UnityEngine;

namespace DragonHunter
{
    /// <summary>
    /// Anything that can take damage (player, bosses, patrol enemies). Implemented
    /// instead of relying on tags so projectiles stay decoupled from concrete types.
    /// </summary>
    public interface IDamageable
    {
        /// <summary>Apply damage from a source element at an optional world hit point.</summary>
        void TakeDamage(float amount, Element sourceElement, Vector2 hitPoint);

        /// <summary>Which "team" this belongs to, so friendly fire is ignored.</summary>
        Faction Faction { get; }
    }

    public enum Faction
    {
        Player,
        Enemy
    }
}
