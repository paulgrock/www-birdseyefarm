class_name Hud
extends CanvasLayer

## In-stage HUD: player health bar, lives, current weapon, and a boss health bar
## (hidden until a fight starts). Bars are ColorRects so they tint by element
## without StyleBox wrangling.

const HEALTH_W := 260.0
const BOSS_W := 520.0

var _health_fill: ColorRect
var _lives: Label
var _weapon: Label
var _boss_root: Control
var _boss_fill: ColorRect
var _boss_label: Label

var _last_lives := -1
var _last_weapon := -1

func _ready() -> void:
    var root := Control.new()
    root.set_anchors_preset(Control.PRESET_FULL_RECT)
    root.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(root)

    _health_fill = _make_bar(root, Vector2(20, 20), Vector2(HEALTH_W, 24),
        Color(0.30, 0.90, 0.30))

    _lives = _make_label(root, Vector2(20, 52), 22, Color.WHITE)
    _weapon = _make_label(root, Vector2(20, 82), 22, Color.WHITE)

    # Boss bar, centered near the top.
    _boss_root = Control.new()
    _boss_root.set_anchors_preset(Control.PRESET_FULL_RECT)
    _boss_root.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(_boss_root)
    var bx := (1152.0 - BOSS_W) * 0.5
    _boss_fill = _make_bar(_boss_root, Vector2(bx, 36), Vector2(BOSS_W, 22),
        Color.WHITE)
    _boss_label = _make_label(_boss_root, Vector2(bx, 60), 20, Color.WHITE)
    _boss_root.visible = false

func _process(_delta: float) -> void:
    var players := get_tree().get_nodes_in_group("player")
    if players.size() > 0:
        var p = players[0]
        if p.max_health > 0.0:
            _health_fill.size.x = HEALTH_W * (p.health / p.max_health)

    # Only touch the labels when a value changes (avoids per-frame string
    # allocation and theme-override churn).
    if GameManager.lives != _last_lives:
        _last_lives = GameManager.lives
        _lives.text = "Lives  x%d" % _last_lives
    if GameManager.selected_weapon != _last_weapon:
        _last_weapon = GameManager.selected_weapon
        _weapon.text = "Weapon:  " + Elements.display_name(_last_weapon)
        _weapon.add_theme_color_override("font_color", Elements.color_of(_last_weapon))

# --- Boss bar (called by DragonBoss) -----------------------------------------

func show_bar(current: float, maximum: float, element: int) -> void:
    _boss_root.visible = true
    _boss_fill.color = Elements.color_of(element)
    _boss_label.text = Elements.display_name(element) + " Dragon"
    update_bar(current, maximum)

func update_bar(current: float, maximum: float) -> void:
    if maximum > 0.0:
        _boss_fill.size.x = BOSS_W * (current / maximum)

func hide_bar() -> void:
    _boss_root.visible = false

# --- Builders ----------------------------------------------------------------

func _make_bar(parent: Node, pos: Vector2, size: Vector2, color: Color) -> ColorRect:
    var bg := ColorRect.new()
    bg.position = pos
    bg.size = size
    bg.color = Color(0, 0, 0, 0.6)
    bg.mouse_filter = Control.MOUSE_FILTER_IGNORE
    parent.add_child(bg)

    var fill := ColorRect.new()
    fill.position = pos
    fill.size = size
    fill.color = color
    fill.mouse_filter = Control.MOUSE_FILTER_IGNORE
    parent.add_child(fill)
    return fill

func _make_label(parent: Node, pos: Vector2, font_size: int, color: Color) -> Label:
    var l := Label.new()
    l.position = pos
    l.add_theme_font_size_override("font_size", font_size)
    l.add_theme_color_override("font_color", color)
    parent.add_child(l)
    return l
