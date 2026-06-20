class_name Elements
extends RefCounted

## Elemental types and the rock-paper-scissors weakness cycle. Global helper
## (referenced as Elements.*) — not an autoload. Mirrors the Unity ElementUtil.
##   Fire  beats Ice
##   Ice   beats Water
##   Water beats Earth
##   Earth beats Fire

enum E { NEUTRAL, FIRE, ICE, WATER, EARTH }

const WEAKNESS_MULTIPLIER := 3.0

## The element a given boss element is weak to.
static func weakness_of(boss_element: int) -> int:
    match boss_element:
        E.ICE: return E.FIRE    # fire melts ice
        E.WATER: return E.ICE   # ice freezes water
        E.EARTH: return E.WATER # water erodes earth
        E.FIRE: return E.EARTH  # earth smothers fire
        _: return E.NEUTRAL

static func is_weakness_hit(attack: int, target: int) -> bool:
    return attack != E.NEUTRAL and weakness_of(target) == attack

static func damage_multiplier(attack: int, target: int) -> float:
    return WEAKNESS_MULTIPLIER if is_weakness_hit(attack, target) else 1.0

static func color_of(element: int) -> Color:
    match element:
        E.FIRE: return Color(0.90, 0.25, 0.15)
        E.ICE: return Color(0.55, 0.85, 1.00)
        E.WATER: return Color(0.15, 0.40, 0.90)
        E.EARTH: return Color(0.45, 0.65, 0.25)
        _: return Color(0.95, 0.95, 0.70)

static func display_name(element: int) -> String:
    match element:
        E.FIRE: return "Fire"
        E.ICE: return "Ice"
        E.WATER: return "Water"
        E.EARTH: return "Earth"
        _: return "Neutral"
