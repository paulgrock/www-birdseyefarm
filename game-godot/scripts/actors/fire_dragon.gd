extends DragonBoss

## Fire dragon (weak to Earth): three-way fireball spread, then a horizontal charge.

const CHARGE_SPEED := 520.0
const FIREBALL_SPEED := 470.0

var _idx := 0

func _init() -> void:
    element = Elements.E.FIRE
    max_health = 40.0

func execute_attack() -> void:
    _idx = (_idx + 1) % 2
    if _idx == 0:
        await _fireball_spread()
    else:
        await _charge_dash()

func _fireball_spread() -> void:
    await timer(0.4)
    var d := dir_to_player()
    for ang in [-25.0, 0.0, 25.0]:
        shoot(Vector2(d, 0.0).rotated(deg_to_rad(ang)), 3.0, FIREBALL_SPEED)
    await timer(0.3)

func _charge_dash() -> void:
    await timer(0.5)
    velocity.x = dir_to_player() * CHARGE_SPEED
    await timer(0.6)
    velocity.x = 0.0
    await timer(0.2)
