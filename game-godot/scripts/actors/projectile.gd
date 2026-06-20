class_name Projectile
extends Area2D

## A travelling shot for both player and enemies. Faction is encoded purely in the
## collision mask, so friendly fire is impossible by construction: a player shot
## only watches the enemy + world layers, an enemy shot only the player + world.
## Straight shots use gravity 0; arcing shots (gravity > 0) lob for boulders,
## bubbles, and falling icicles.

const FACTION_PLAYER := 0
const FACTION_ENEMY := 1

var faction := FACTION_PLAYER
var element: int = Elements.E.NEUTRAL
var damage := 1.0
var gravity := 0.0
var lifetime := 4.0
var destroy_on_terrain := true

var vel := Vector2.ZERO
var _age := 0.0
var _vis: Polygon2D
var _col: CollisionShape2D
var base_size := Vector2(16, 16)

static func spawn(parent: Node, pos: Vector2, direction: Vector2, faction_: int,
        element_: int, damage_: float, speed: float, gravity_ := 0.0) -> Projectile:
    var p := Projectile.new()
    p.position = pos
    p.faction = faction_
    p.element = element_
    p.damage = damage_
    p.gravity = gravity_
    p.vel = direction.normalized() * speed
    parent.add_child(p)
    return p

func _ready() -> void:
    _col = CollisionShape2D.new()
    var shape := RectangleShape2D.new()
    shape.size = base_size
    _col.shape = shape
    add_child(_col)

    _vis = Build.rect(base_size, Elements.color_of(element), 5)
    add_child(_vis)

    if faction == FACTION_PLAYER:
        collision_layer = Build.L_PLAYER_SHOT
        collision_mask = Build.L_ENEMY | Build.L_WORLD
    else:
        collision_layer = Build.L_ENEMY_SHOT
        collision_mask = Build.L_PLAYER | Build.L_WORLD

    body_entered.connect(_on_body_entered)

func set_scale_mult(mult: float) -> void:
    if _vis:
        _vis.scale *= mult
    if _col:
        _col.scale *= mult

func _physics_process(delta: float) -> void:
    if gravity > 0.0:
        vel.y += gravity * delta
    position += vel * delta
    _age += delta
    if _age >= lifetime:
        queue_free()

func _on_body_entered(body: Node) -> void:
    if body.is_in_group("world"):
        if destroy_on_terrain:
            queue_free()
        return
    # The mask guarantees the body is a valid (opposing) target.
    if body.has_method("take_damage"):
        body.take_damage(damage, element, global_position)
        queue_free()
