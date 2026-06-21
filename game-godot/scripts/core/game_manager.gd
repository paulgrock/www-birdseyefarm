extends Node

## Persistent game state + high-level scene flow. Registered as an autoload
## singleton named "GameManager" (see project.godot), so it survives scene
## changes — the Godot equivalent of Unity's DontDestroyOnLoad GameManager.
## Also wires up the input map in code so no editor setup is required.

const SCENE_TITLE := "res://scenes/title.tscn"
const SCENE_STAGE_SELECT := "res://scenes/stage_select.tscn"
const SCENE_STAGE := "res://scenes/stage.tscn"
const SCENE_VICTORY := "res://scenes/victory.tscn"
const SCENE_GAME_OVER := "res://scenes/game_over.tscn"

const STARTING_LIVES := 3

var dragons := [Elements.E.FIRE, Elements.E.ICE, Elements.E.WATER, Elements.E.EARTH]

var lives := STARTING_LIVES
var selected_weapon: int = Elements.E.NEUTRAL
var current_stage: int = Elements.E.NEUTRAL

var _defeated: Array[int] = []
var _weapons: Array[int] = [Elements.E.NEUTRAL]

func _ready() -> void:
    _setup_input()

# --- Input -------------------------------------------------------------------

func _setup_input() -> void:
    _add_action("move_left", [KEY_A, KEY_LEFT])
    _add_action("move_right", [KEY_D, KEY_RIGHT])
    _add_action("jump", [KEY_SPACE, KEY_W, KEY_UP])
    _add_action("dash", [KEY_SHIFT])
    _add_action("fire", [KEY_J, KEY_CTRL])
    _add_action("weapon_next", [KEY_E])
    _add_action("weapon_prev", [KEY_Q])

func _add_action(action: String, keys: Array) -> void:
    if InputMap.has_action(action):
        return
    InputMap.add_action(action)
    for k in keys:
        var ev := InputEventKey.new()
        ev.physical_keycode = k
        InputMap.action_add_event(action, ev)

# --- Progression -------------------------------------------------------------

func is_defeated(dragon: int) -> bool:
    return _defeated.has(dragon)

func all_dragons_defeated() -> bool:
    for d in dragons:
        if not _defeated.has(d):
            return false
    return true

func has_weapon(element: int) -> bool:
    return _weapons.has(element)

func unlocked_weapons() -> Array[int]:
    return _weapons

func on_dragon_defeated(dragon: int) -> void:
    if not _defeated.has(dragon):
        _defeated.append(dragon)
    if not _weapons.has(dragon):
        _weapons.append(dragon)

func select_weapon(element: int) -> void:
    if _weapons.has(element):
        selected_weapon = element

func cycle_weapon(direction: int) -> void:
    if _weapons.is_empty():
        return
    var index := _weapons.find(selected_weapon)
    if index < 0:
        index = 0
    index = (index + direction + _weapons.size()) % _weapons.size()
    selected_weapon = _weapons[index]

# --- Lives -------------------------------------------------------------------

func lose_life() -> bool:
    lives = max(0, lives - 1)
    return lives > 0

func reset_run() -> void:
    lives = STARTING_LIVES
    _defeated.clear()
    _weapons.clear()
    _weapons.append(Elements.E.NEUTRAL)
    selected_weapon = Elements.E.NEUTRAL
    current_stage = Elements.E.NEUTRAL

# --- Scene flow --------------------------------------------------------------

func goto(scene_path: String) -> void:
    get_tree().change_scene_to_file(scene_path)

func enter_stage(dragon: int) -> void:
    current_stage = dragon
    selected_weapon = Elements.E.NEUTRAL  # start each stage with the basic bolt
    goto(SCENE_STAGE)

func return_to_hub() -> void:
    current_stage = Elements.E.NEUTRAL
    if all_dragons_defeated():
        goto(SCENE_VICTORY)
    else:
        goto(SCENE_STAGE_SELECT)

func on_player_died() -> void:
    if lose_life():
        goto(SCENE_STAGE)  # reload the current stage
    else:
        goto(SCENE_GAME_OVER)
