class_name PatrolEnemy
extends CharacterBody2D

## Simple ground enemy: paces back and forth, turning at walls, ledges, or its
## patrol bound, and hurts the player on contact. Dies to any player shot.

const SIZE := Vector2(44, 44)
const SPEED := 90.0
const GRAVITY := 2000.0
const PATROL_DIST := 220.0
const MAX_HEALTH := 3.0
const CONTACT_DAMAGE := 2.0

var health := MAX_HEALTH
var _dir := 1
var _origin_x := 0.0
var _ledge: RayCast2D
var _contact: Area2D

func _ready() -> void:
    add_to_group("enemy")
    collision_layer = Build.L_ENEMY
    collision_mask = Build.L_WORLD
    _origin_x = global_position.x

    var col := CollisionShape2D.new()
    var shape := RectangleShape2D.new()
    shape.size = SIZE
    col.shape = shape
    add_child(col)
    add_child(Build.rect(SIZE, Color(0.80, 0.30, 0.60), 2))

    # Ledge probe: a downward ray placed ahead of the facing direction.
    _ledge = RayCast2D.new()
    _ledge.enabled = true
    _ledge.target_position = Vector2(0, 36)
    _ledge.collision_mask = Build.L_WORLD
    add_child(_ledge)

    # Contact hitbox that hurts the player.
    _contact = Area2D.new()
    _contact.collision_layer = 0
    _contact.collision_mask = Build.L_PLAYER
    var ac := CollisionShape2D.new()
    var ashape := RectangleShape2D.new()
    ashape.size = SIZE + Vector2(4, 4)
    ac.shape = ashape
    _contact.add_child(ac)
    add_child(_contact)

func _physics_process(delta: float) -> void:
    velocity.y += GRAVITY * delta

    _ledge.position = Vector2(_dir * (SIZE.x * 0.5 + 4.0), 0.0)
    _ledge.force_raycast_update()

    if absf(global_position.x - _origin_x) > PATROL_DIST:
        _flip()
    elif is_on_wall():
        _flip()
    elif is_on_floor() and not _ledge.is_colliding():
        _flip()

    velocity.x = _dir * SPEED
    move_and_slide()

    for body in _contact.get_overlapping_bodies():
        if body.is_in_group("player") and body.has_method("take_damage"):
            body.take_damage(CONTACT_DAMAGE, Elements.E.NEUTRAL, global_position)

func _flip() -> void:
    _dir = -_dir
    _origin_x = global_position.x  # recentre so we don't jitter at the bound

func take_damage(amount: float, _source_element: int, _source_pos: Vector2) -> void:
    health -= amount
    if health <= 0.0:
        queue_free()
