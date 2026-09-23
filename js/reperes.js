/*
 * Repères de développement indicatifs.
 * Ce ne sont PAS des normes : chaque enfant avance à son rythme et les écarts
 * de plusieurs mois sont fréquents. En cas de doute, en parler au médecin
 * ou au pédiatre (le carnet de santé contient aussi des repères).
 */
window.TRANCHES = [
  {
    id: "0-6m", min: 0, max: 6, label: "0 – 6 mois",
    focus: "Sécurité affective, regards, voix, contact. Le jeu, c'est vous !",
    reperes: {
      motricite: ["Tient de mieux en mieux sa tête", "Sur le ventre, se soulève sur les avant-bras", "Attrape un objet qu'on lui tend", "Porte les mains et les objets à la bouche"],
      langage: ["Réagit aux voix et aux bruits", "Gazouille, fait des vocalises", "Rit aux éclats"],
      cognitif: ["Suit un visage ou un objet des yeux", "S'intéresse à ses mains"],
      emotions: ["Sourit en réponse à un sourire", "Se calme quand on le prend ou lui parle"]
    }
  },
  {
    id: "6-12m", min: 6, max: 12, label: "6 – 12 mois",
    focus: "Exploration : laisser bouger au sol, nommer tout ce qu'il touche, jeux de coucou.",
    reperes: {
      motricite: ["Se retourne dans les deux sens", "Tient assis sans appui", "Se déplace (ramper, quatre pattes, fesses…)", "Attrape de petits objets entre le pouce et l'index"],
      langage: ["Babille en syllabes (« ba-ba », « ma-ma »)", "Réagit à son prénom", "Comprend « non » et quelques mots familiers"],
      cognitif: ["Cherche un objet caché sous un tissu", "Tape deux objets l'un contre l'autre"],
      emotions: ["Fait la différence entre proches et inconnus", "Peut montrer de l'inquiétude à la séparation"]
    }
  },
  {
    id: "12-24m", min: 12, max: 24, label: "1 – 2 ans",
    focus: "Marche et langage explosent : environnement sûr pour explorer, lire beaucoup, mettre des mots sur les émotions.",
    reperes: {
      motricite: ["Marche seul (l'âge varie beaucoup)", "Monte des escaliers en étant tenu", "Empile quelques cubes", "Gribouille avec un crayon"],
      langage: ["Dit ses premiers mots, puis de plus en plus", "Montre du doigt ce qui l'intéresse", "Comprend des consignes simples (« donne-moi »)"],
      cognitif: ["Imite les gestes du quotidien (téléphoner, balayer)", "Encastre des formes simples"],
      emotions: ["Veut faire « tout seul »", "Premières grosses colères : il a besoin de vous pour se calmer"]
    }
  },
  {
    id: "2-3a", min: 24, max: 36, label: "2 – 3 ans",
    focus: "Âge du « non » et du « moi tout seul » : proposer des choix, encourager l'autonomie, jeux de faire-semblant.",
    reperes: {
      motricite: ["Court, grimpe, tape dans un ballon", "Saute à pieds joints", "Tourne les pages d'un livre", "Enfile de grosses perles"],
      langage: ["Associe deux ou trois mots, puis fait de petites phrases", "Dit son prénom", "Pose des questions (« c'est quoi ? »)"],
      cognitif: ["Joue à faire semblant (dînette, poupée)", "Trie par couleur ou par forme"],
      emotions: ["Joue à côté des autres enfants, puis avec eux", "Commence à nommer quelques émotions"]
    }
  },
  {
    id: "3-4a", min: 36, max: 48, label: "3 – 4 ans",
    focus: "Imaginaire et « pourquoi ? » : répondre simplement, inventer des histoires, jeux de règles simples.",
    reperes: {
      motricite: ["Pédale sur un tricycle ou un vélo à roulettes", "Tient sur un pied quelques secondes", "Dessine un rond, un « bonhomme têtard »", "Utilise des ciseaux adaptés"],
      langage: ["Fait des phrases complètes, raconte ce qu'il a fait", "Pose beaucoup de « pourquoi ? »", "Est compris par des personnes extérieures à la famille"],
      cognitif: ["Compte quelques objets", "Connaît plusieurs couleurs", "Comprend « avant / après »"],
      emotions: ["Joue avec d'autres enfants, commence à partager", "Exprime ses émotions avec des mots (encore avec aide)"]
    }
  },
  {
    id: "4-6a", min: 48, max: 72, label: "4 – 6 ans",
    focus: "Règles, coopération, fierté : jeux de société, petites responsabilités, encourager l'effort plutôt que le résultat.",
    reperes: {
      motricite: ["Saute à cloche-pied", "Attrape un ballon", "Dessine un bonhomme avec plusieurs parties du corps", "Commence à écrire son prénom"],
      langage: ["Raconte une histoire dans l'ordre", "Joue avec les sons et les rimes", "Utilise le passé et le futur"],
      cognitif: ["Compte au-delà de 10", "Reconnaît des lettres", "Suit un jeu à règles simples"],
      emotions: ["Comprend qu'un autre peut ressentir autre chose que lui", "Accepte mieux d'attendre son tour", "Aime rendre service"]
    }
  },
  {
    id: "6-8a", min: 72, max: 96, label: "6 – 8 ans",
    focus: "Apprentissages scolaires : soutenir la lecture plaisir, valoriser la persévérance, laisser de la place au jeu libre.",
    reperes: {
      motricite: ["Fait du vélo sans roulettes", "Enchaîne des mouvements (sauter à la corde, dribbler)", "Écrit de façon plus régulière"],
      langage: ["Apprend à lire et à écrire", "Comprend l'humour et les devinettes", "Argumente pour défendre son point de vue"],
      cognitif: ["Additionne, soustrait", "Se repère dans la semaine et les mois", "Planifie un petit projet"],
      emotions: ["Les amitiés prennent de l'importance", "Commence à gérer seul certaines frustrations"]
    }
  },
  {
    id: "8a+", min: 96, max: 1000, label: "8 ans et plus",
    focus: "Autonomie et passions : lui confier des projets, l'écouter vraiment, partager vos propres centres d'intérêt.",
    reperes: {
      motricite: ["Pratique des sports aux gestes plus précis", "Gestes fins précis (bricolage, instrument)"],
      langage: ["Lit seul pour le plaisir", "Exprime des idées plus abstraites"],
      cognitif: ["Raisonne sur des situations plus complexes", "Organise son travail avec un peu d'aide"],
      emotions: ["Sensible au regard des copains", "Besoin d'autonomie ET de moments complices avec les parents"]
    }
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
