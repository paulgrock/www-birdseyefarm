#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;

namespace DragonHunter.EditorTools
{
    /// <summary>
    /// Builds the one prefab that must exist as an asset because it is spawned at
    /// runtime: the projectile. Everything else is constructed directly in scenes.
    /// </summary>
    public static class PrefabFactory
    {
        public const string PrefabFolder = "Assets/Prefabs";
        public const string ProjectilePath = "Assets/Prefabs/Projectile.prefab";

        public static GameObject GetProjectilePrefab()
        {
            if (!AssetDatabase.IsValidFolder(PrefabFolder))
                AssetDatabase.CreateFolder("Assets", "Prefabs");

            var existing = AssetDatabase.LoadAssetAtPath<GameObject>(ProjectilePath);
            if (existing != null) return existing;

            var go = new GameObject("Projectile");
            go.transform.localScale = new Vector3(0.35f, 0.35f, 1f);

            var sr = go.AddComponent<SpriteRenderer>();
            sr.sprite = BuildSupport.GetWhiteSprite();
            sr.color = Color.white;
            sr.sortingOrder = 5;

            var rb = go.AddComponent<Rigidbody2D>();
            rb.gravityScale = 0f;
            rb.bodyType = RigidbodyType2D.Dynamic;
            rb.freezeRotation = true;
            rb.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
            rb.interpolation = RigidbodyInterpolation2D.Interpolate;

            var col = go.AddComponent<BoxCollider2D>();
            col.isTrigger = true;

            go.AddComponent<Projectile>();

            var prefab = PrefabUtility.SaveAsPrefabAsset(go, ProjectilePath);
            Object.DestroyImmediate(go);
            return prefab;
        }
    }
}
#endif
