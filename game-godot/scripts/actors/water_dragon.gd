extends DragonBoss

## Water dragon (weak to Ice): arcing bubble lobs, then a hop and a downward spray fan.

const BUBBLE_SPEED := 360.0
const BUBBLE_GRAVITY := 500.0
const HOP_SPEED := 560.0

var _idx := 0

func _init() -> void:
    element = Elements.E.WATER
    max_health = 40.0

func execute_attack() -> void:
    _idx = (_idx + 1) % 2
    if _idx == 0:
        await _bubble_lob()
    else:
        await _hop_and_spray()

func _bubble_lob() -> void:
    await timer(0.35)
    var d := dir_to_player()
    for i in 3:
        # Up-and-forward (negative Y is up); gravity arcs it back down.
        shoot(Vector2(d * 0.7, -0.8), 3.0, BUBBLE_SPEED, BUBBLE_GRAVITY)
        await timer(0.3)

func _hop_and_spray() -> void:
    await timer(0.3)
    velocity.y = -HOP_SPEED  # little jump (up)
    await timer(0.35)
    for ang in [-50.0, -25.0, 0.0, 25.0, 50.0]:
        shoot(Vector2.DOWN.rotated(deg_to_rad(ang)), 2.0, BUBBLE_SPEED)
    await timer(0.4)
