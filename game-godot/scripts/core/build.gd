class_name Build
extends RefCounted

## Shared constants and small factory helpers for building the game's nodes in
## code (placeholder art = flat colored rectangles via Polygon2D). Because the
## scenes self-build at runtime, this is the Godot equivalent of the Unity
## SceneBuilder/BuildSupport helpers.

# Physics layer bitmasks (must match the [layer_names] in project.godot).
const L_WORLD := 1 << 0
const L_PLAYER := 1 << 1
const L_ENEMY := 1 << 2
const L_PLAYER_SHOT := 1 << 3
const L_ENEMY_SHOT := 1 << 4
const L_HAZARD := 1 << 5

## A centered, flat-colored rectangle (the universal placeholder sprite).
static func rect(size: Vector2, color: Color, z := 0) -> Polygon2D:
    var p := Polygon2D.new()
    var hw := size.x * 0.5
    var hh := size.y * 0.5
    p.polygon = PackedVector2Array([
        Vector2(-hw, -hh), Vector2(hw, -hh), Vector2(hw, hh), Vector2(-hw, hh)
    ])
    p.color = color
    p.z_index = z
    return p

## A solid, collidable platform/wall. `top_y` is the world Y of its top surface.
static func make_ground(parent: Node, center_x: float, top_y: float,
        w: float, h: float, color: Color) -> StaticBody2D:
    var body := StaticBody2D.new()
    body.position = Vector2(center_x, top_y + h * 0.5)
    body.collision_layer = L_WORLD
    body.collision_mask = 0
    body.add_to_group("world")

    var col := CollisionShape2D.new()
    var shape := RectangleShape2D.new()
    shape.size = Vector2(w, h)
    col.shape = shape
    body.add_child(col)
    body.add_child(rect(Vector2(w, h), color))

    parent.add_child(body)
    return body
