extends DragonBoss

## Earth dragon (weak to Water): arcing boulders, then a leap + ground-pound that
## sends shockwaves skimming both ways.

const BOULDER_SPEED := 440.0
const BOULDER_GRAVITY := 700.0
const LEAP_SPEED := 680.0
const SLAM_SPEED := 1000.0
const SHOCKWAVE_SPEED := 520.0

var _idx := 0

func _init() -> void:
    element = Elements.E.EARTH
    max_health = 40.0

func execute_attack() -> void:
    _idx = (_idx + 1) % 2
    if _idx == 0:
        await _boulder_toss()
    else:
        await _ground_pound()

func _boulder_toss() -> void:
    await timer(0.4)
    var d := dir_to_player()
    for i in 2:
        shoot(Vector2(d * 0.85, -0.55), 4.0, BOULDER_SPEED, BOULDER_GRAVITY)
        await timer(0.45)

func _ground_pound() -> void:
    await timer(0.4)
    velocity.y = -LEAP_SPEED  # leap up
    await timer(0.5)
    velocity.y = SLAM_SPEED   # slam down (Y-down: positive)
    await timer(0.35)
    var l := shoot(Vector2.LEFT, 3.0, SHOCKWAVE_SPEED)
    var r := shoot(Vector2.RIGHT, 3.0, SHOCKWAVE_SPEED)
    if l:
        l.destroy_on_terrain = false
    if r:
        r.destroy_on_terrain = false
    await timer(0.3)
