extends DragonBoss

## Ice dragon (weak to Fire): falling icicle rain, then a low freeze-breath volley.

const ICICLE_SPEED := 60.0
const ICICLE_GRAVITY := 700.0
const BREATH_SPEED := 430.0
const SPREAD := 360.0

var _idx := 0

func _init() -> void:
    element = Elements.E.ICE
    max_health = 40.0

func execute_attack() -> void:
    _idx = (_idx + 1) % 2
    if _idx == 0:
        await _icicle_rain()
    else:
        await _freeze_breath()

func _icicle_rain() -> void:
    await timer(0.3)
    for i in 5:
        var x := global_position.x + randf_range(-SPREAD, SPREAD)
        var p := shoot(Vector2.DOWN, 3.0, ICICLE_SPEED, ICICLE_GRAVITY)
        if p:
            p.global_position = Vector2(x, global_position.y - 260.0)  # spawn high
        await timer(0.25)

func _freeze_breath() -> void:
    await timer(0.4)
    var d := dir_to_player()
    for i in 4:
        shoot(Vector2(d, 0.15), 2.0, BREATH_SPEED)  # slightly downward (Y-down)
        await timer(0.15)
