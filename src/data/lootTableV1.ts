import { Rarity } from "../types";

export interface LootItem {
  id: string;
  name: string;
  emoji: string;
  rarity: Rarity;
}

export interface LootEntry {
  item: LootItem;
  chance: number;
}

// Dictionnaires de noms par groupe d'emojis

const fruits: Record<string, string> = {
  "🍎": "Michel la Pomme",
  "🍌": "Josiane la Banane",
  "🍇": "Kevin le Raisin",
  "🍓": "Suzon la Fraise",
  "🍍": "Bernard l'Ananas",
  "🥝": "Chantal le Kiwi",
  "🥥": "Dédé la Noix de Coco",
  "🥭": "Ginette la Mangue",
  "🍒": "Jean-Claude la Cerise",
  "🍑": "Raymonde la Pêche",
};

const animaux: Record<string, string> = {
  "🐶": "Bob le Chien",
  "🐱": "Lucette le Chat",
  "🐭": "Roger la Souris",
  "🐹": "Paulette le Hamster",
  "🐰": "Gégé le Lapin",
  "🦊": "Brigitte le Renard",
  "🐻": "Maurice l'Ours",
  "🐼": "Coco le Panda",
  "🐨": "Lulu le Koala",
  "🐯": "Mimi le Tigre",
};

const magie: Record<string, string> = {
  "⚔️": "Georges l'Épée",
  "🛡️": "Sébastien le Bouclier",
  "🏹": "Alain l'Arc",
  "🪄": "Marcel la Baguette Magique",
  "🧪": "Léon le Flacon",
  "📜": "Alice le Parchemin",
  "🔮": "Victor la Boule de Cristal",
  "🗝️": "Fabrice la Clé",
  "💎": "Eugène le Diamant",
  "🧿": "Simone le Talisman",
};

const accessoires: Record<string, string> = {
  "👑": "Éric la Couronne",
  "👒": "Monique le Chapeau",
  "🎩": "Bernadette le Haut-de-forme",
  "🥽": "Yves les Lunettes",
  "🧤": "Carole les Gants",
  "🥿": "Philomène la Chaussure",
  "🥾": "Roland la Bottine",
  "🧣": "Odette l'Écharpe",
  "🧥": "Gertrude la Veste",
  "🎽": "Damien le Maillot",
};

const vehicules: Record<string, string> = {
  "🚗": "Francis la Voiture",
  "🚕": "René la Taxi",
  "🚙": "Yves la Berline",
  "🚌": "Albert le Bus",
  "🚓": "Victor le Véhicule de Police",
  "🚑": "Isabelle l'Ambulance",
  "🚒": "Roger le Camion de Pompiers",
  "🚜": "Lucien le Tracteur",
  "🏍️": "Didier la Moto",
  "🛵": "Martine le Scooter",
};

const sports: Record<string, string> = {
  "🏆": "Patrice la Coupe",
  "🎖️": "José le Médaillon",
  "🥇": "Pascal le Premier",
  "🥈": "Dominique le Second",
  "🥉": "Florence le Bronze",
  "🎗️": "Simone le Ruban",
  "🏅": "Renée la Médaille",
  "🎯": "Antoine la Fléchette",
  "🎮": "Régis la Manette",
  "🕹️": "Véronique le Joystick",
};

const stockage: Record<string, string> = {
  "📦": "Henry la Boîte",
  "📫": "Odile la Boîte aux Lettres",
  "📬": "Bernadette le Courrier",
  "📭": "Marcel le Facteur",
  "📮": "Camille le Pigeonnier",
  "📁": "Patricia le Dossier",
  "📂": "Jacques le Dossier",
  "🗂️": "Fanny les Fichiers",
  "🗃️": "Maurice l'Archive",
  "🗄️": "Thérèse la Mémoire",
};

const celebrations: Record<string, string> = {
  "🧸": "Didier l'Ours en Peluche",
  "🎁": "Bruno le Cadeau",
  "🎊": "Lucien la Fête",
  "🎉": "Claudine la Célébration",
  "🎈": "Germaine le Ballon",
  "🎂": "Armand le Gâteau",
  "🧁": "Josette le Cupcake",
  "🍰": "Georgette le Dessert",
  "🍩": "Antoinette le Beignet",
  "🍪": "Léonard le Biscuit",
};

const outils: Record<string, string> = {
  "🔧": "Maurice la Clé à Molette",
  "🔨": "Roger le Marteau",
  "🪓": "Dominique la Hache",
  "🪚": "Patricia la Scie",
  "🔩": "Albert la Vis",
  "⚙️": "Marcel l'Engrenage",
  "🧱": "Denis la Brique",
  "🪛": "Simone le Tournevis",
  "🧰": "Bruno la Boîte à Outils",
  "🛠️": "Georges les Outils",
};

const tech: Record<string, string> = {
  "📱": "Camille le Smartphone",
  "💻": "Antoine le Portable",
  "🖥️": "Vincent l'Écran",
  "🖨️": "Chantal l'Imprimante",
  "📷": "Didier l'Obturateur",
  "📸": "Dominique l'Instantané",
  "📹": "Sébastien la Caméra",
  "🎥": "Maxime le Vidéo",
  "🎬": "Élodie le Cinéma",
  "📺": "Bernard la Télé",
};

// Liste ordonnée de 100 emojis par catégorie
const emojiList: string[] = [
  // Ligne 1 : Fruits (10)
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍍",
  "🥝",
  "🥥",
  "🥭",
  "🍒",
  "🍑",
  // Ligne 2 : Animaux (10)
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  // Ligne 3 : Magie/Armes (10)
  "⚔️",
  "🛡️",
  "🏹",
  "🪄",
  "🧪",
  "📜",
  "🔮",
  "🗝️",
  "💎",
  "🧿",
  // Ligne 4 : Accessoires (10)
  "👑",
  "👒",
  "🎩",
  "🥽",
  "🧤",
  "🥿",
  "🥾",
  "🧣",
  "🧥",
  "🎽",
  // Ligne 5 : Véhicules (10)
  "🚗",
  "🚕",
  "🚙",
  "🚌",
  "🚓",
  "🚑",
  "🚒",
  "🚜",
  "🏍️",
  "🛵",
  // Ligne 6 : Sports/Trophées (10)
  "🏆",
  "🎖️",
  "🥇",
  "🥈",
  "🥉",
  "🎗️",
  "🏅",
  "🎯",
  "🎮",
  "🕹️",
  // Ligne 7 : Stockage/Mail (10)
  "📦",
  "📫",
  "📬",
  "📭",
  "📮",
  "📁",
  "📂",
  "🗂️",
  "🗃️",
  "🗄️",
  // Ligne 8 : Célébrations (10)
  "🧸",
  "🎁",
  "🎊",
  "🎉",
  "🎈",
  "🎂",
  "🧁",
  "🍰",
  "🍩",
  "🍪",
  // Ligne 9 : Outils (10)
  "🔧",
  "🔨",
  "🪓",
  "🪚",
  "🔩",
  "⚙️",
  "🧱",
  "🪛",
  "🧰",
  "🛠️",
  // Ligne 10 : Tech (10)
  "📱",
  "💻",
  "🖥️",
  "🖨️",
  "📷",
  "📸",
  "📹",
  "🎥",
  "🎬",
  "📺",
];

// Distribution de raretés et poids associés
const rarityDistribution: Rarity[] = [
  ...Array(75).fill("commun" as Rarity),
  ...Array(20).fill("rare" as Rarity),
  ...Array(4).fill("épique" as Rarity),
  ...Array(1).fill("légendaire" as Rarity),
];

const rarityChance: Record<Rarity, number> = {
  commun: 75,
  inhabituel: 20,
  rare: 4,
  mythique: 1,
  légendaire: 1,
  épique: 1,
  relique: 1,
};

function getNameForEmoji(emoji: string): string {
  if (fruits[emoji]) return fruits[emoji];
  if (animaux[emoji]) return animaux[emoji];
  if (magie[emoji]) return magie[emoji];
  if (accessoires[emoji]) return accessoires[emoji];
  if (vehicules[emoji]) return vehicules[emoji];
  if (sports[emoji]) return sports[emoji];
  if (stockage[emoji]) return stockage[emoji];
  if (celebrations[emoji]) return celebrations[emoji];
  if (outils[emoji]) return outils[emoji];
  if (tech[emoji]) return tech[emoji];
  return "Objet Inconnu";
}

export const lootTable: LootEntry[] = emojiList.map((emoji, index) => {
  // Choix aléatoire de rareté dans la distribution prédéfinie
  const rarity =
    rarityDistribution[Math.floor(Math.random() * rarityDistribution.length)];
  return {
    item: {
      id: `item_${index + 1}`,
      name: getNameForEmoji(emoji),
      emoji,
      rarity,
    },
    chance: rarityChance[rarity],
  };
});
