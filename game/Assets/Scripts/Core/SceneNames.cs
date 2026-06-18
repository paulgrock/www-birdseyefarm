namespace DragonHunter
{
    /// <summary>String constants for every scene. Kept in one place so the
    /// auto-builder and the runtime flow can never drift apart.</summary>
    public static class SceneNames
    {
        public const string Title = "Title";
        public const string StageSelect = "StageSelect";
        public const string Victory = "Victory";
        public const string GameOver = "GameOver";

        public const string StageFire = "Stage_Fire";
        public const string StageIce = "Stage_Ice";
        public const string StageWater = "Stage_Water";
        public const string StageEarth = "Stage_Earth";

        /// <summary>Maps a dragon element to its stage scene name.</summary>
        public static string StageFor(Element element)
        {
            switch (element)
            {
                case Element.Fire: return StageFire;
                case Element.Ice: return StageIce;
                case Element.Water: return StageWater;
                case Element.Earth: return StageEarth;
                default: return StageSelect;
            }
        }
    }
}
