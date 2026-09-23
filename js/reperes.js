/*
 * Repères de développement, recoupés avec des sources publiques (voir window.SOURCES_REPERES).
 * Chaque repère indique ses sources : lettres de SOURCES_REPERES.
 * Ce ne sont PAS des normes : chaque enfant avance à son rythme.
 * Les repères du CDC décrivent ce que font environ 3 enfants sur 4 à l'âge indiqué.
 */
window.SOURCES_REPERES = {
  C: { nom: "CDC – « Learn the Signs. Act Early. » (repères révisés en 2022)", note: "ce que font environ 3 enfants sur 4 à cet âge", url: "https://www.cdc.gov/act-early/milestones/index.html" },
  S: { nom: "Santé.fr – service public d'information en santé", note: "fiches « développement psychomoteur »", url: "https://www.sante.fr/le-developpement-psychomoteur-des-enfants-de-6-9-mois" },
  M: { nom: "mpedia.fr – Association française de pédiatrie ambulatoire (AFPA)", note: "fiches « développement » par âge", url: "https://www.mpedia.fr/art-developpement-de-lenfant-3-a-4-ans/" },
  O: { nom: "OMS – WHO Motor Development Study (2006)", note: "fenêtres d'acquisition de la motricité (4 à 24 mois)", url: "https://www.rti.org/publication/motor-development-study-windows-achievement-six-gross-motor-development-milestones" },
  P: { nom: "Les pros de la petite enfance – « Les grandes étapes du développement psychomoteur »", note: "source secondaire", url: "https://www.lesprosdelapetiteenfance.fr/article/les-grandes-etapes-du-developpement-psychomoteur-de-lenfant/" }
};

window.TRANCHES = [
  {
    id: "v-0-4m", min: 0, max: 4, label: "Premiers mois",
    focus: "Sécurité affective, regards, voix, contact. Le jeu, c'est vous !",
    reperes: {}
  },
  {
    id: "v-6m", min: 4, max: 8, label: "Vers 6 mois",
    focus: "Laisser bébé bouger librement au sol, lui parler et lui répondre, lui proposer des objets à attraper et à porter à la bouche (en toute sécurité).",
    reperes: {
      motricite: [
        { t: "Se retourne du ventre sur le dos", s: ["C", "M"] },
        { t: "Sur le ventre, se redresse en appui sur les bras", s: ["C", "M"] },
        { t: "Tient assis avec un appui (ou en s'aidant de ses mains)", s: ["C", "M"] },
        { t: "Attrape un jouet qu'il veut", s: ["C"] }
      ],
      langage: [
        { t: "Babille de plus en plus, seul ou pour vous appeler", s: ["M"] },
        { t: "Fait des sons chacun son tour avec vous", s: ["C"] },
        { t: "Pousse des petits cris aigus, fait des « prouts » avec la bouche", s: ["C"] }
      ],
      cognitif: [
        { t: "Porte les objets à la bouche pour les découvrir", s: ["C"] },
        { t: "Ferme la bouche pour montrer qu'il n'en veut plus", s: ["C"] }
      ],
      emotions: [
        { t: "Reconnaît les personnes familières", s: ["C"] },
        { t: "Aime se regarder dans un miroir, sourit à son reflet", s: ["C", "M"] },
        { t: "Rit", s: ["C"] }
      ]
    }
  },
  {
    id: "v-9m", min: 8, max: 11, label: "Vers 9 mois",
    focus: "Exploration : de l'espace au sol pour se déplacer, nommer tout ce qu'il touche, jeux de coucou et d'objets cachés.",
    reperes: {
      motricite: [
        { t: "Tient assis seul (souvent entre 7 et 9 mois)", s: ["S", "O"] },
        { t: "Se déplace au sol : rampe, quatre pattes, sur les fesses…", s: ["S"] },
        { t: "Commence à attraper entre le pouce et l'index (la « pince »)", s: ["S"] }
      ],
      langage: [
        { t: "Babille en répétant des syllabes (« ba-ba », « ma-ma »)", s: ["S"] }
      ],
      cognitif: [
        { t: "Cherche un objet qui tombe ou qui disparaît de sa vue", s: ["C"] }
      ],
      emotions: []
    }
  },
  {
    id: "v-12m", min: 11, max: 15, label: "Vers 12 mois",
    focus: "Premiers pas et premiers mots : sécuriser la maison, commenter ce qu'il regarde, lire des imagiers.",
    reperes: {
      motricite: [
        { t: "Se met debout en se tenant", s: ["C", "S"] },
        { t: "Marche en se tenant aux meubles", s: ["C"] },
        { t: "Se déplace à quatre pattes ou en rampant", s: ["S"] }
      ],
      langage: [
        { t: "Fait « au revoir » de la main", s: ["C"] },
        { t: "Premiers mots (souvent entre 9 et 12 mois)", s: ["S"] }
      ],
      cognitif: [],
      emotions: []
    }
  },
  {
    id: "v-18m", min: 15, max: 21, label: "Vers 18 mois",
    focus: "Il veut faire seul : laisser essayer (cuillère, verre), nommer les parties du corps, jouer à imiter les gestes du quotidien.",
    reperes: {
      motricite: [
        { t: "Marche sans se tenir (l'OMS observe cette acquisition entre environ 8 et 18 mois)", s: ["C", "O"] },
        { t: "Commence à boire au verre et à utiliser la cuillère", s: ["P"] }
      ],
      langage: [
        { t: "Essaie de dire au moins 3 mots en plus de « maman » / « papa »", s: ["C"] },
        { t: "Utilise des mots isolés qui veulent dire une phrase (« maman » = « le sac de maman »)", s: ["P"] }
      ],
      cognitif: [
        { t: "Imite vos tâches du quotidien (balayer, ranger…)", s: ["C"] },
        { t: "Montre son nez, sa bouche… quand on le lui demande", s: ["P"] }
      ],
      emotions: [
        { t: "S'éloigne un peu de vous en vérifiant que vous êtes là", s: ["C"] }
      ]
    }
  },
  {
    id: "v-2a", min: 21, max: 30, label: "Vers 2 ans",
    focus: "Le langage décolle : lire beaucoup, reformuler ses phrases, proposer des choix pour accompagner le « moi tout seul ».",
    reperes: {
      motricite: [
        { t: "Court", s: ["C"] },
        { t: "Tape dans un ballon", s: ["C"] },
        { t: "Empile des cubes pour faire une tour", s: ["P"] }
      ],
      langage: [
        { t: "Associe deux mots (« encore lait », « papa parti »)", s: ["C", "P"] },
        { t: "Montre des choses dans un livre quand on demande (« Où est l'ours ? »)", s: ["C"] }
      ],
      cognitif: [
        { t: "Comprend et suit des consignes simples", s: ["P"] }
      ],
      emotions: []
    }
  },
  {
    id: "v-30m", min: 30, max: 42, label: "Vers 2 ans ½ – 3 ans",
    focus: "Âge du « moi tout seul » : laisser s'habiller, faire des choix, jouer à faire semblant, beaucoup de mots nouveaux.",
    reperes: {
      motricite: [
        { t: "Se déshabille seul et commence à mettre certains vêtements", s: ["M"] }
      ],
      langage: [
        { t: "Dit environ 50 mots (repère du CDC vers 30 mois)", s: ["C"] }
      ],
      cognitif: [],
      emotions: []
    }
  },
  {
    id: "v-4a", min: 42, max: 54, label: "3 – 4 ans",
    focus: "Imaginaire et « pourquoi ? » : répondre simplement, inventer des histoires, jeux de règles simples.",
    reperes: {
      motricite: [
        { t: "Monte et descend les escaliers en apprenant à alterner les pieds", s: ["M"] },
        { t: "Saute à pieds joints, essaie de sauter à cloche-pied", s: ["M"] },
        { t: "Tient sur un pied environ 2 secondes (vers 4 ans)", s: ["C"] },
        { t: "Attrape un gros ballon la plupart du temps (vers 4 ans)", s: ["C"] },
        { t: "Commence à découper des formes simples aux ciseaux", s: ["M"] },
        { t: "Dessine un bonhomme « têtard »", s: ["M"] }
      ],
      langage: [
        { t: "Fait des phrases de plus en plus complètes", s: ["M"] }
      ],
      cognitif: [
        { t: "Se repère dans l'espace (dedans / dehors) et dans le temps (hier / demain)", s: ["M"] }
      ],
      emotions: []
    }
  },
  {
    id: "v-5a", min: 54, max: 72, label: "Vers 5 ans",
    focus: "Règles, coopération, fierté : jeux de société, petites responsabilités, encourager l'effort plutôt que le résultat.",
    reperes: {
      motricite: [
        { t: "Saute à cloche-pied", s: ["C"] }
      ],
      langage: [
        { t: "Raconte une histoire entendue ou inventée, avec au moins deux événements", s: ["C"] }
      ],
      cognitif: [
        { t: "Compte jusqu'à 10", s: ["C"] }
      ],
      emotions: []
    }
  },
  {
    id: "v-6a", min: 72, max: 1000, label: "6 ans et plus",
    focus: "Autonomie et passions : lui confier des projets, l'écouter vraiment, laisser de la place au jeu libre.",
    reperes: {}
  }
];

/* Progression d'aisance dans l'eau (indépendante de l'âge). */
window.NIVEAUX_EAU = [
  { niveau: 0, label: "Première découverte", desc: "Découvre l'eau, dans les bras ou dans le bain." },
  { niveau: 1, label: "Joue dans l'eau", desc: "Accepte l'eau sur le visage, joue avec plaisir, souffle des bulles." },
  { niveau: 2, label: "À l'aise", desc: "Met la tête sous l'eau, flotte avec un appui, se déplace avec aide." },
  { niveau: 3, label: "Nage seul(e)", desc: "Se déplace seul(e) dans l'eau sans matériel sur quelques mètres." }
];

window.ETAPES_EAU = [
  { id: "eau-bain", label: "Aime le moment du bain" },
  { id: "eau-visage", label: "Accepte l'eau sur le visage" },
  { id: "eau-bulles", label: "Souffle des bulles dans l'eau" },
  { id: "eau-immersion", label: "Met la tête entièrement sous l'eau" },
  { id: "eau-flotte-aide", label: "Flotte sur le dos avec une main sous la tête" },
  { id: "eau-flotte-seul", label: "Flotte seul(e) en étoile" },
  { id: "eau-jambes", label: "Avance avec des battements de jambes (planche)" },
  { id: "eau-bord", label: "Sait revenir au bord et s'y tenir" },
  { id: "eau-saut", label: "Saute dans l'eau et remonte" },
  { id: "eau-nage", label: "Nage quelques mètres seul(e)" }
];

/* Conseils affichés dans l'onglet Développement, par sous-partie. */
window.CONSEILS = {
  interieur: [
    "Un sol dégagé et un tapis valent souvent mieux que beaucoup de jouets.",
    "Laisser l'enfant essayer seul avant d'aider : il apprend en tâtonnant.",
    "Alterner motricité globale (bouger tout le corps) et fine (mains, doigts)."
  ],
  exterieur: [
    "Sortir tous les jours si possible, même peu de temps et par temps gris.",
    "Terrains variés (herbe, sable, montée, tronc) = équilibre qui progresse.",
    "Laisser prendre de petits risques mesurés, en restant à portée."
  ],
  aquatique: [
    "Ne jamais laisser un enfant seul près de l'eau, même peu profonde, même quelques secondes.",
    "Aller au rythme de l'enfant : on ne force jamais une immersion.",
    "Les brassards et bouées ne remplacent pas la surveillance.",
    "Les étapes (eau sur le visage → bulles → tête sous l'eau → flotter) comptent plus que l'âge."
  ],
  langage: [
    "Parler beaucoup, décrire ce que vous faites, lire tous les jours.",
    "Reformuler correctement plutôt que corriger (« Oui, le chien a couru ! »).",
    "Poser des questions ouvertes : « Qu'est-ce que tu en penses ? »"
  ],
  cognitif: [
    "Proposer des défis un peu au-dessus de ce qu'il sait faire seul.",
    "Féliciter l'effort et la stratégie plutôt que « tu es intelligent ».",
    "Laisser du temps de jeu libre : l'ennui stimule aussi la créativité."
  ],
  emotions: [
    "Accueillir toutes les émotions, poser des limites sur les comportements.",
    "Nommer l'émotion : « Tu es frustré parce que la tour est tombée. »",
    "Montrer l'exemple : parler de vos propres émotions et de comment vous vous calmez."
  ],
  creativite: [
    "Du matériel simple et ouvert (carton, pâte, feuilles) plutôt que des jouets à usage unique.",
    "S'intéresser au processus : « Raconte-moi ton dessin » plutôt que « c'est quoi ? ».",
    "Accepter le désordre temporaire : prévoir un coin où c'est permis."
  ]
};
