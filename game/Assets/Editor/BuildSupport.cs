#if UNITY_EDITOR
using System.IO;
using UnityEditor;
using UnityEngine;

namespace DragonHunter.EditorTools
{
    /// <summary>
    /// Shared helpers for the scene builder: generating the placeholder sprite,
    /// ensuring the "Ground" physics layer exists, and a couple of GameObject
    /// construction shortcuts. Editor-only.
    /// </summary>
    public static class BuildSupport
    {
        public const string ArtFolder = "Assets/Art";
        public const string SpritePath = "Assets/Art/white.png";
        public const string GroundLayer = "Ground";

        /// <summary>Loads (creating if needed) a 1-unit white square sprite that
        /// everything tints via SpriteRenderer.color.</summary>
        public static Sprite GetWhiteSprite()
        {
            if (!AssetDatabase.IsValidFolder(ArtFolder))
                AssetDatabase.CreateFolder("Assets", "Art");

            var existing = AssetDatabase.LoadAssetAtPath<Sprite>(SpritePath);
            if (existing != null) return existing;

            // Generate a small solid-white texture and save as PNG.
            var tex = new Texture2D(8, 8, TextureFormat.RGBA32, false);
            var pixels = new Color32[8 * 8];
            for (int i = 0; i < pixels.Length; i++) pixels[i] = new Color32(255, 255, 255, 255);
            tex.SetPixels32(pixels);
            tex.Apply();
            File.WriteAllBytes(SpritePath, tex.EncodeToPNG());
            Object.DestroyImmediate(tex);

            AssetDatabase.ImportAsset(SpritePath, ImportAssetOptions.ForceSynchronousImport);
            var importer = (TextureImporter)AssetImporter.GetAtPath(SpritePath);
            importer.textureType = TextureImporterType.Sprite;
            importer.spritePixelsPerUnit = 8;        // 8px texture == 1 world unit
            importer.filterMode = FilterMode.Point;
            importer.textureCompression = TextureImporterCompression.Uncompressed;
            importer.SaveAndReimport();

            return AssetDatabase.LoadAssetAtPath<Sprite>(SpritePath);
        }

        /// <summary>Ensures a named user layer exists; returns its index (or 0 if full).</summary>
        public static int EnsureLayer(string layerName)
        {
            var tagManager = new SerializedObject(
                AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/TagManager.asset")[0]);
            SerializedProperty layers = tagManager.FindProperty("layers");

            for (int i = 8; i < layers.arraySize; i++)
            {
                var sp = layers.GetArrayElementAtIndex(i);
                if (sp.stringValue == layerName) return i;
            }
            for (int i = 8; i < layers.arraySize; i++)
            {
                var sp = layers.GetArrayElementAtIndex(i);
                if (string.IsNullOrEmpty(sp.stringValue))
                {
                    sp.stringValue = layerName;
                    tagManager.ApplyModifiedProperties();
                    return i;
                }
            }
            return 0;
        }

        /// <summary>Creates a colored, scaled rectangle GameObject from the white sprite.</summary>
        public static GameObject MakeBox(string name, Vector2 pos, Vector2 size, Color color,
                                         int sortingOrder = 0, Transform parent = null)
        {
            var go = new GameObject(name);
            if (parent != null) go.transform.SetParent(parent);
            go.transform.position = pos;
            go.transform.localScale = new Vector3(size.x, size.y, 1f);

            var sr = go.AddComponent<SpriteRenderer>();
            sr.sprite = GetWhiteSprite();
            sr.color = color;
            sr.sortingOrder = sortingOrder;
            return go;
        }
    }
}
#endif
