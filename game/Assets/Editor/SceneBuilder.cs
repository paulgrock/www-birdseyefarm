#if UNITY_EDITOR
using System.Collections.Generic;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

namespace DragonHunter.EditorTools
{
    /// <summary>
    /// One-click generator for the whole playable game. Run
    /// "Dragon Hunter ▸ Build All Scenes" to create the Title, StageSelect, four
    /// dragon stages, Victory and GameOver scenes (with placeholder art, the player,
    /// platforming, bosses and UI) and register them in Build Settings.
    /// Re-running it overwrites the generated scenes.
    /// </summary>
    public static class SceneBuilder
    {
        // World layout constants shared across stages.
        private const float GroundTop = -2f;
        private const string ScenesFolder = "Assets/Scenes";

        private static int _groundLayer;
        private static Sprite _white;
        private static GameObject _projectile;
        private static Font _font;

        [MenuItem("Dragon Hunter/Build All Scenes")]
        public static void BuildAll()
        {
            if (EditorApplication.isPlaying)
            {
                EditorUtility.DisplayDialog("Dragon Hunter", "Exit Play mode before building scenes.", "OK");
                return;
            }

            _groundLayer = BuildSupport.EnsureLayer(BuildSupport.GroundLayer);
            _white = BuildSupport.GetWhiteSprite();
            _projectile = PrefabFactory.GetProjectilePrefab();
            _font = GetFont();

            if (!AssetDatabase.IsValidFolder(ScenesFolder))
                AssetDatabase.CreateFolder("Assets", "Scenes");

            var paths = new List<string>
            {
                BuildMenuScene(SceneNames.Title, MenuController.Kind.Title,
                    "DRAGON HUNTER", "Slay the four elemental dragons", "Press any key to begin",
                    new Color(0.08f, 0.05f, 0.12f)),
                BuildHubScene(),
                BuildStageScene(Element.Fire),
                BuildStageScene(Element.Ice),
                BuildStageScene(Element.Water),
                BuildStageScene(Element.Earth),
                BuildMenuScene(SceneNames.Victory, MenuController.Kind.Victory,
                    "VICTORY!", "All four dragons have fallen", "Press any key to return to the title",
                    new Color(0.10f, 0.10f, 0.05f)),
                BuildMenuScene(SceneNames.GameOver, MenuController.Kind.GameOver,
                    "GAME OVER", "The dragons prevail...", "Press any key to try again",
                    new Color(0.12f, 0.04f, 0.04f)),
            };

            RegisterBuildSettings(paths);
            AssetDatabase.SaveAssets();

            // Leave the title scene open so the user can just hit Play.
            EditorSceneManager.OpenScene(ScenePath(SceneNames.Title), OpenSceneMode.Single);
            EditorUtility.DisplayDialog("Dragon Hunter",
                "Built 8 scenes and registered them in Build Settings.\n\nOpen the 'Title' scene and press Play.", "OK");
        }

        // --- Menu scenes -----------------------------------------------------

        private static string BuildMenuScene(string sceneName, MenuController.Kind kind,
            string title, string subtitle, string prompt, Color bg)
        {
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
            CreatePlainCamera(bg);

            var canvas = CreateCanvas();
            MakeText(canvas.transform, "Title", new Vector2(0, 120), new Vector2(1100, 160),
                title, 90, Color.white, TextAnchor.MiddleCenter, new Vector2(0.5f, 0.5f));
            MakeText(canvas.transform, "Subtitle", new Vector2(0, 0), new Vector2(1000, 80),
                subtitle, 36, new Color(0.85f, 0.85f, 0.9f), TextAnchor.MiddleCenter, new Vector2(0.5f, 0.5f));
            MakeText(canvas.transform, "Prompt", new Vector2(0, -160), new Vector2(1000, 60),
                prompt, 30, new Color(0.7f, 0.7f, 0.75f), TextAnchor.MiddleCenter, new Vector2(0.5f, 0.5f));

            var controller = new GameObject("MenuController").AddComponent<MenuController>();
            controller.kind = kind;

            return SaveScene(scene, sceneName);
        }

        // --- Hub -------------------------------------------------------------

        private static string BuildHubScene()
        {
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
            CreatePlainCamera(new Color(0.06f, 0.07f, 0.12f));

            var canvas = CreateCanvas();
            MakeText(canvas.transform, "Header", new Vector2(0, 260), new Vector2(1000, 90),
                "CHOOSE YOUR DRAGON", 56, Color.white, TextAnchor.MiddleCenter, new Vector2(0.5f, 0.5f));

            var hub = new GameObject("StageSelect").AddComponent<StageSelectController>();
            var portraits = new List<StageSelectController.Portrait>();

            Element[] order = { Element.Fire, Element.Ice, Element.Water, Element.Earth };
            float spacing = 280f;
            float startX = -(order.Length - 1) * spacing * 0.5f;

            for (int i = 0; i < order.Length; i++)
            {
                Element e = order[i];
                var pos = new Vector2(startX + i * spacing, 0);

                var img = MakeImage(canvas.transform, e + "Portrait", pos, new Vector2(180, 180),
                    ElementUtil.ColorOf(e), new Vector2(0.5f, 0.5f), filled: false);

                var outline = img.gameObject.AddComponent<Outline>();
                outline.effectColor = Color.white;
                outline.effectDistance = new Vector2(6, 6);
                outline.enabled = false;

                var label = MakeText(canvas.transform, e + "Label", pos + new Vector2(0, -130),
                    new Vector2(220, 50), e.ToString(), 30, Color.white, TextAnchor.MiddleCenter,
                    new Vector2(0.5f, 0.5f));

                var mark = MakeText(canvas.transform, e + "Defeated", pos, new Vector2(180, 180),
                    "DEFEATED", 26, new Color(1f, 1f, 1f, 0.9f), TextAnchor.MiddleCenter,
                    new Vector2(0.5f, 0.5f)).gameObject;
                mark.SetActive(false);

                portraits.Add(new StageSelectController.Portrait
                {
                    element = e, image = img, label = label, defeatedMark = mark, highlight = outline
                });
            }

            hub.portraits = portraits.ToArray();
            hub.instructions = MakeText(canvas.transform, "Instructions", new Vector2(0, -260),
                new Vector2(1000, 50), "", 26, new Color(0.7f, 0.7f, 0.75f),
                TextAnchor.MiddleCenter, new Vector2(0.5f, 0.5f));

            return SaveScene(scene, SceneNames.StageSelect);
        }

        // --- Gameplay stages -------------------------------------------------

        private static string BuildStageScene(Element element)
        {
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            Color bg = ElementUtil.ColorOf(element) * 0.22f; bg.a = 1f;
            Color groundColor = ElementUtil.ColorOf(element) * 0.45f; groundColor.a = 1f;

            var camGo = CreatePlainCamera(bg);
            var follow = camGo.AddComponent<CameraFollow>();
            follow.minX = -24; follow.maxX = 29; follow.minY = -8; follow.maxY = 10;
            camGo.GetComponent<Camera>().orthographicSize = 6f;

            // Terrain: three ground runs with two jumpable pits, ending at the arena.
            AddGround(-14f, GroundTop, 18f, 4f, groundColor);   // start run:  -23..-5
            AddGround(2f, GroundTop, 10f, 4f, groundColor);     // middle run: -3..7  (pit -5..-3)
            AddGround(18f, GroundTop, 20f, 4f, groundColor);    // arena floor: 8..28 (pit 7..8)

            // A floating platform to dash-jump onto along the way.
            AddGround(-8f, GroundTop + 2.5f, 3f, 0.6f, groundColor);

            // Optional wall-jump shaft on the start run: two facing walls and a top
            // ledge to climb. Off the critical path so traversal never requires it.
            AddGround(-21f, GroundTop + 5f, 0.6f, 8f, groundColor); // left wall
            AddGround(-17f, GroundTop + 5f, 0.6f, 8f, groundColor); // right wall (shaft -21..-17)
            AddGround(-19f, GroundTop + 7.2f, 4f, 0.6f, groundColor); // reward perch on top

            // Bottomless-pit kill zone beneath everything.
            var kill = new GameObject("KillZone");
            kill.transform.position = new Vector2(2f, -9f);
            var killCol = kill.AddComponent<BoxCollider2D>();
            killCol.size = new Vector2(90f, 2f);
            killCol.isTrigger = true;
            var hazard = kill.AddComponent<Hazard>();
            hazard.instantKill = true;

            // Player (spawns on the start run, clear of the wall-jump shaft).
            var player = CreatePlayer(new Vector2(-12f, GroundTop + 2f));
            follow.target = player.transform;

            // A couple of patrol enemies.
            CreatePatrol(new Vector2(1f, GroundTop + 1f));
            CreatePatrol(new Vector2(15f, GroundTop + 1f));

            // UI canvas with HUD + boss bar.
            var canvas = CreateCanvas();
            var bossBar = CreateHud(canvas.transform, element);

            // Boss + arena trigger.
            var boss = CreateBoss(element, new Vector2(21f, GroundTop + 2.2f), bossBar);

            var sealWall = AddGround(10f, GroundTop + 5f, 0.8f, 12f, new Color(0.2f, 0.2f, 0.2f, 1f));
            sealWall.name = "SealWall";
            sealWall.SetActive(false);

            var arenaGo = new GameObject("BossArena");
            arenaGo.transform.position = new Vector2(11.5f, 0f);
            var arenaCol = arenaGo.AddComponent<BoxCollider2D>();
            arenaCol.size = new Vector2(1.5f, 16f);
            arenaCol.isTrigger = true;
            var arena = arenaGo.AddComponent<BossArena>();
            arena.boss = boss;
            arena.sealWall = sealWall;

            return SaveScene(scene, SceneNames.StageFor(element));
        }

        // --- Builders for individual actors ----------------------------------

        private static GameObject CreatePlayer(Vector2 pos)
        {
            var player = new GameObject("Player");
            player.transform.position = pos;

            BuildSupport.MakeBox("Sprite", pos, new Vector2(0.9f, 1.8f),
                new Color(0.30f, 0.55f, 0.95f), sortingOrder: 3, parent: player.transform);

            var rb = player.AddComponent<Rigidbody2D>();
            rb.freezeRotation = true;
            rb.gravityScale = 0f;

            var col = player.AddComponent<CapsuleCollider2D>();
            col.size = new Vector2(0.9f, 1.8f);
            col.direction = CapsuleDirection2D.Vertical;

            var muzzle = new GameObject("Muzzle");
            muzzle.transform.SetParent(player.transform);
            muzzle.transform.localPosition = new Vector3(0.6f, 0.2f, 0f);

            var pc = player.AddComponent<PlayerController>();
            pc.groundLayer = 1 << _groundLayer;

            player.AddComponent<PlayerHealth>();

            var pw = player.AddComponent<PlayerWeapon>();
            pw.projectilePrefab = _projectile;
            pw.muzzle = muzzle.transform;

            return player;
        }

        private static DragonBoss CreateBoss(Element element, Vector2 pos, BossHealthBar bar)
        {
            var go = BuildSupport.MakeBox(element + "Dragon", pos, new Vector2(2.4f, 2.4f),
                ElementUtil.ColorOf(element), sortingOrder: 4);

            go.AddComponent<Rigidbody2D>();
            go.AddComponent<BoxCollider2D>();

            DragonBoss boss = AddDragonComponent(go, element);
            boss.projectilePrefab = _projectile;
            boss.healthBar = bar;
            boss.floorY = GroundTop + 1.2f;
            return boss;
        }

        private static DragonBoss AddDragonComponent(GameObject go, Element element)
        {
            switch (element)
            {
                case Element.Fire: return go.AddComponent<FireDragon>();
                case Element.Ice: return go.AddComponent<IceDragon>();
                case Element.Water: return go.AddComponent<WaterDragon>();
                case Element.Earth: return go.AddComponent<EarthDragon>();
                default: return go.AddComponent<FireDragon>();
            }
        }

        private static void CreatePatrol(Vector2 pos)
        {
            var go = BuildSupport.MakeBox("PatrolEnemy", pos, new Vector2(0.9f, 0.9f),
                new Color(0.8f, 0.3f, 0.6f), sortingOrder: 2);
            var rb = go.AddComponent<Rigidbody2D>();
            rb.freezeRotation = true;
            rb.gravityScale = 3f;
            go.AddComponent<BoxCollider2D>();
            var patrol = go.AddComponent<PatrolEnemy>();
            patrol.groundLayer = 1 << _groundLayer;
        }

        private static GameObject AddGround(float centerX, float topY, float width, float height, Color color)
        {
            var pos = new Vector2(centerX, topY - height * 0.5f);
            var go = BuildSupport.MakeBox("Ground", pos, new Vector2(width, height), color, sortingOrder: 0);
            go.layer = _groundLayer;
            go.AddComponent<BoxCollider2D>();
            return go;
        }

        // --- UI helpers ------------------------------------------------------

        private static BossHealthBar CreateHud(Transform canvas, Element bossElement)
        {
            // Player health bar (top-left).
            MakeImage(canvas, "HealthBG", new Vector2(30, -30), new Vector2(360, 34),
                new Color(0, 0, 0, 0.6f), new Vector2(0, 1), filled: false);
            var healthFill = MakeImage(canvas, "HealthFill", new Vector2(34, -32), new Vector2(352, 26),
                new Color(0.3f, 0.9f, 0.3f), new Vector2(0, 1), filled: true);
            healthFill.rectTransform.pivot = new Vector2(0, 1);

            var lives = MakeText(canvas, "Lives", new Vector2(30, -74), new Vector2(200, 40),
                "x3", 30, Color.white, TextAnchor.UpperLeft, new Vector2(0, 1));
            var weapon = MakeText(canvas, "Weapon", new Vector2(30, -114), new Vector2(300, 40),
                "Neutral", 28, Color.white, TextAnchor.UpperLeft, new Vector2(0, 1));

            var hud = new GameObject("HUDController").AddComponent<HUDController>();
            hud.healthFill = healthFill;
            hud.livesText = lives;
            hud.weaponText = weapon;

            // Boss health bar (top, hidden until the fight starts).
            var barRoot = new GameObject("BossHealthBar");
            barRoot.transform.SetParent(canvas, false);
            var bar = barRoot.AddComponent<BossHealthBar>();

            MakeImage(barRoot.transform, "BossBG", new Vector2(0, -40), new Vector2(620, 28),
                new Color(0, 0, 0, 0.6f), new Vector2(0.5f, 1), filled: false);
            var bossFill = MakeImage(barRoot.transform, "BossFill", new Vector2(-306, -42), new Vector2(612, 22),
                ElementUtil.ColorOf(bossElement), new Vector2(0.5f, 1), filled: true);
            bossFill.rectTransform.pivot = new Vector2(0, 1);
            var bossLabel = MakeText(barRoot.transform, "BossLabel", new Vector2(0, -76), new Vector2(620, 40),
                bossElement + " Dragon", 26, Color.white, TextAnchor.MiddleCenter, new Vector2(0.5f, 1));

            bar.fill = bossFill;
            bar.label = bossLabel;
            barRoot.SetActive(false);

            return bar;
        }

        private static Canvas CreateCanvas()
        {
            var go = new GameObject("Canvas", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            var canvas = go.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = go.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1280, 720);
            scaler.matchWidthOrHeight = 0.5f;
            return canvas;
        }

        private static Image MakeImage(Transform parent, string name, Vector2 anchoredPos, Vector2 size,
            Color color, Vector2 anchor, bool filled)
        {
            var go = new GameObject(name, typeof(RectTransform), typeof(CanvasRenderer), typeof(Image));
            go.transform.SetParent(parent, false);
            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = anchor; rt.anchorMax = anchor; rt.pivot = anchor;
            rt.anchoredPosition = anchoredPos; rt.sizeDelta = size;

            var img = go.GetComponent<Image>();
            img.sprite = _white;
            img.color = color;
            if (filled)
            {
                img.type = Image.Type.Filled;
                img.fillMethod = Image.FillMethod.Horizontal;
                img.fillOrigin = (int)Image.OriginHorizontal.Left;
                img.fillAmount = 1f;
            }
            return img;
        }

        private static Text MakeText(Transform parent, string name, Vector2 anchoredPos, Vector2 size,
            string text, int fontSize, Color color, TextAnchor align, Vector2 anchor)
        {
            var go = new GameObject(name, typeof(RectTransform), typeof(CanvasRenderer), typeof(Text));
            go.transform.SetParent(parent, false);
            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = anchor; rt.anchorMax = anchor; rt.pivot = anchor;
            rt.anchoredPosition = anchoredPos; rt.sizeDelta = size;

            var t = go.GetComponent<Text>();
            t.font = _font;
            t.text = text;
            t.fontSize = fontSize;
            t.color = color;
            t.alignment = align;
            t.horizontalOverflow = HorizontalWrapMode.Overflow;
            t.verticalOverflow = VerticalWrapMode.Overflow;
            return t;
        }

        // --- Scene infra -----------------------------------------------------

        private static GameObject CreatePlainCamera(Color bg)
        {
            var go = new GameObject("Main Camera");
            go.tag = "MainCamera";
            var cam = go.AddComponent<Camera>();
            cam.orthographic = true;
            cam.orthographicSize = 6f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = bg;
            go.AddComponent<AudioListener>();
            go.transform.position = new Vector3(0, 0, -10);
            return go;
        }

        private static Font GetFont()
        {
            Font f = null;
            try { f = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf"); } catch { }
            if (f == null) { try { f = Resources.GetBuiltinResource<Font>("Arial.ttf"); } catch { } }
            return f;
        }

        private static string ScenePath(string sceneName) => $"{ScenesFolder}/{sceneName}.unity";

        private static string SaveScene(Scene scene, string sceneName)
        {
            string path = ScenePath(sceneName);
            EditorSceneManager.SaveScene(scene, path);
            return path;
        }

        private static void RegisterBuildSettings(List<string> paths)
        {
            var list = new List<EditorBuildSettingsScene>();
            foreach (var p in paths)
                list.Add(new EditorBuildSettingsScene(p, true));
            EditorBuildSettings.scenes = list.ToArray();
        }
    }
}
#endif
