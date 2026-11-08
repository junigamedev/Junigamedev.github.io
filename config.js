/* =====================================================================
   EDIT HERE – everything on the site comes from this config.
   ===================================================================== */
const SITE = {
  name: "JunigameDev",
  url: "https://YOUR-SITE.netlify.app",       // <- your real web address (no slash at the end)
  ogImage: "og-image.png",                    // 1200x630 picture shown when the link is shared
  tagline: "I make games I'd love to play with my friends.",
  email: "JunigameDev@gmail.com",            // <- change me
  socials: [                                  // paste your links between the quotes
    {label: "YouTube",   url: ""},
    {label: "Steam",     url: ""},
    {label: "Instagram", url: ""}
  ],
  about: "I'm a solo developer who loves making games. Crypt Crew is my first commercial project, made with love for co-op nights, dark dungeons and that 'just one more run' feeling.",
  aboutImg: null                              // e.g. "images/me.jpg"
};

/* ---------- ADD A NEW GAME: copy one block below, change the values ---------- */
const GAMES = [
  {
    id: "cryptcrew",
    slug: "crypt-crew",                       // used in the page address
    title: "Crypt Crew",
    tagline: "Team up, dive into the dungeon, die, and come back stronger.",
    status: "",                               // optional small label on the card, e.g. "Coming Soon". Empty = none
    store: "steam",                           // "steam" or "play" (Google Play)
    genre: ["Roguelike","Action","Co-op"],
    platforms: "PC",
    players: "Solo or up to 4 players",
    cover: null,                              // e.g. "images/cryptcrew/cover.jpg"
    trailer: "",                              // YouTube video ID, e.g. "dQw4w9WgXcQ"
    storeUrl: "",                             // paste your Steam page link here
    description: "Grab your friends and head into a dungeon that changes every time you enter. Fight monsters, collect loot and see how deep you can get. When you fall, you don't lose everything: the Soul Shards you earn are yours to keep, so every death makes your hero a little stronger.",
    features: [
      ["🗡️ Lots of weapons", "Swords, axes, scythes and hammers that all feel different, plus rare finds to hunt for."],
      ["🔮 Spells, potions & food", "Mix magic, potions and a good meal to build a style that's yours."],
      ["💠 Every death counts", "Earn Soul Shards each run and spend them on permanent upgrades."],
      ["👥 Play with friends", "Up to 4 players. Revive each other, share the loot and plan your way down."],
      ["🎙️ Proximity voice chat", "You only hear your friends when they're close. Scary in all the right ways."],
      ["🎲 Never the same twice", "Rooms, enemies, loot and bosses change every run."]
    ],
    screenshots: [null,null,null,null,null,null],   // replace null with "images/cryptcrew/shot1.jpg" etc.
    videos: [                                        // {title, youtube:"ID"} or {title, file:"videos/clip.mp4"}
      {title: "Gameplay Teaser", youtube: ""},
      {title: "Dev Log #1", youtube: ""},
      {title: "Combat Showcase", youtube: ""}
    ]
  },
  {
    id: "dungeonlegacy",
    slug: "dungeon-legacy",
    title: "Dungeon Legacy",
    tagline: "Gather your heroes and take on the dungeon.",
    status: "",
    store: "play",
    genre: ["Action","RPG"],
    platforms: "Android",
    players: "",
    cover: null,
    trailer: "",
    storeUrl: "",                             // paste your Google Play link here
    description: "Dungeon Legacy is an Android game from JunigameDev. Your heroes and progress are saved on your device, and no account is needed to play.",
    features: [
      ["🦸 Your heroes", "Your heroes, progress and settings are saved on your device."],
      ["📴 No account needed", "Just install and play. No sign-up required."],
      ["🏆 Achievements", "Unlock achievements as you go."]
    ],
    screenshots: [null,null,null,null],
    videos: []
  },
  {
    id: "feudal",
    slug: "feudal",
    title: "Feudal",
    tagline: "Medieval Real-Time Strategy",
    status: "",
    store: "play",
    genre: ["Strategy"],
    platforms: "Android",
    players: "",
    cover: null,
    trailer: "",
    storeUrl: "",                             // paste your Google Play link here
    description: "Rise from a humble settlement to a mighty kingdom. Feudal is a fast-paced real-time strategy game where you gather resources, construct buildings, train armies, and advance through the ages to crush your enemies. Can you build the mightiest kingdom?",
    features: [
      ["🏰 Build your empire", "Construct farms, barracks, blacksmiths and more. Every building unlocks new units and upgrades to grow your power."],
      ["⚔️ Command your armies", "Select and command groups of soldiers with simple tap controls. Send scouts, form attack waves, and defend your borders against relentless AI enemies."],
      ["🕰️ Advance through the ages", "Research new technologies and advance from the Dark Age to the Feudal Age and beyond. Each age unlocks stronger units, better buildings, and new strategic options."],
      ["🔥 Epic combat", "Watch battles unfold with dynamic music that shifts into battle mode when combat begins. Coordinate flanking attacks, siege enemy towns, and claim victory."],
      ["🎮 Designed for mobile", "Clean, responsive controls built for touchscreens. No pay-to-win, just pure strategy."]
    ],
    screenshots: [null,null,null,null],
    videos: []
  },
  {
    id: "eonfall",
    slug: "eonfall",
    title: "Eonfall",
    tagline: "A new Android game from JunigameDev.",
    status: "",
    store: "play",
    genre: [],
    platforms: "Android",
    players: "",
    cover: null,
    trailer: "",
    storeUrl: "",                             // paste your Google Play link here
    description: "Eonfall is an Android game by JunigameDev. More details coming soon.",
    features: [],
    screenshots: [null,null,null,null],
    videos: []
  },
  {
    id: "marblemaw",
    slug: "marble-maw",
    title: "Marble Maw",
    tagline: "A new Android game from JunigameDev.",
    status: "",
    store: "play",
    genre: [],
    platforms: "Android",
    players: "",
    cover: null,
    trailer: "",
    storeUrl: "",                             // paste your Google Play link here
    description: "Marble Maw is an Android game by JunigameDev. More details coming soon.",
    features: [],
    screenshots: [null,null,null,null],
    videos: []
  },
  {
    id: "crownsiege",
    slug: "crown-siege",
    title: "Crown Siege",
    tagline: "A new Android game from JunigameDev.",
    status: "",
    store: "play",
    genre: [],
    platforms: "Android",
    players: "",
    cover: null,
    trailer: "",
    storeUrl: "",                             // paste your Google Play link here
    description: "Crown Siege is an Android game by JunigameDev. More details coming soon.",
    features: [],
    screenshots: [null,null,null,null],
    videos: []
  },
  {
    id: "emberandanvil",
    slug: "ember-and-anvil",
    title: "Ember & Anvil",
    tagline: "A new Android game from JunigameDev.",
    status: "",
    store: "play",
    genre: [],
    platforms: "Android",
    players: "",
    cover: null,
    trailer: "",
    storeUrl: "",                             // paste your Google Play link here
    description: "Ember & Anvil is an Android game by JunigameDev. More details coming soon.",
    features: [],
    screenshots: [null,null,null,null],
    videos: []
  }
  // , { id:"nextgame", title:"My Next Game", tagline:"...", status:"Coming Soon", ... }
];

/* ---------- DEV LOG: add a new {…} at the TOP for each news post. Empty list hides the section ---------- */
const NEWS = [
  {date: "2026-10-12", title: "The website is live!", text: "Welcome! This is where I'll share news and progress on Crypt Crew."}
];
