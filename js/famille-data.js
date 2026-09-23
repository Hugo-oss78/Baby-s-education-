/* Données de l'onglet Famille : étapes de routines, comptines classiques, banque de défis. */

/* Étapes proposées pour composer une routine en images. */
window.ETAPES_ROUTINE = [
  { emoji: "🚽", label: "Toilettes" },
  { emoji: "🧼", label: "Se laver les mains" },
  { emoji: "🪥", label: "Se brosser les dents" },
  { emoji: "👕", label: "S'habiller" },
  { emoji: "🧦", label: "Mettre ses chaussettes" },
  { emoji: "👟", label: "Mettre ses chaussures" },
  { emoji: "🧥", label: "Mettre son manteau" },
  { emoji: "🥣", label: "Petit-déjeuner" },
  { emoji: "🍽️", label: "Repas" },
  { emoji: "💧", label: "Boire de l'eau" },
  { emoji: "🛁", label: "Bain" },
  { emoji: "🚿", label: "Douche" },
  { emoji: "🌙", label: "Mettre son pyjama" },
  { emoji: "💇", label: "Se coiffer" },
  { emoji: "🧴", label: "Crème" },
  { emoji: "🧻", label: "Se moucher" },
  { emoji: "🛏️", label: "Faire son lit" },
  { emoji: "🎒", label: "Préparer son sac" },
  { emoji: "🧸", label: "Ranger ses jouets" },
  { emoji: "📚", label: "Devoirs" },
  { emoji: "🐶", label: "Nourrir l'animal" },
  { emoji: "🌱", label: "Arroser les plantes" },
  { emoji: "📖", label: "Histoire" },
  { emoji: "🎵", label: "Chanson" },
  { emoji: "💛", label: "Câlin" },
  { emoji: "🔦", label: "Veilleuse" },
  { emoji: "😴", label: "Dodo" }
];

/* Modèles de routines créés par défaut. */
window.MODELES_ROUTINES = [
  { nom: "Le matin", emoji: "🌅", etapes: ["Toilettes", "S'habiller", "Petit-déjeuner", "Se brosser les dents", "Mettre ses chaussures", "Mettre son manteau"] },
  { nom: "Le coucher", emoji: "🌙", etapes: ["Bain", "Mettre son pyjama", "Se brosser les dents", "Toilettes", "Histoire", "Câlin", "Dodo"] }
];

/* Comptines traditionnelles françaises (titres uniquement). */
window.COMPTINES_CLASSIQUES = [
  "Ainsi font, font, font", "Une souris verte", "Frère Jacques", "Au clair de la lune",
  "Pirouette cacahuète", "Petit escargot", "Les petits poissons dans l'eau", "Il était un petit navire",
  "Meunier, tu dors", "À la claire fontaine", "Promenons-nous dans les bois", "Fais dodo, Colas mon p'tit frère",
  "Une poule sur un mur", "Savez-vous planter les choux ?", "Alouette, gentille alouette", "Dansons la capucine"
];

/*
 * Banque de défis familiaux.
 * type "jours" : à cocher chaque jour de la semaine (cible = nombre de jours visés)
 * type "fois"  : à faire un certain nombre de fois (cible)
 * ageMin : âge minimal (en mois) de l'aîné pour que le défi ait du sens.
 */
window.DEFIS = [
  { id: "merci", emoji: "🙏", titre: "Le défi merci", desc: "Chacun dit un « merci » sincère à un membre de la famille chaque jour.", type: "jours", cible: 5, ageMin: 30 },
  { id: "repas-sans-ecran", emoji: "📵", titre: "Repas sans écran", desc: "Téléphones rangés dans une boîte pendant les repas (parents compris !).", type: "jours", cible: 5, ageMin: 0 },
  { id: "sortie-nature", emoji: "🌳", titre: "Sortie nature", desc: "Une sortie en forêt, au parc ou à la plage, tous ensemble.", type: "fois", cible: 1, ageMin: 0 },
  { id: "nouvelle-comptine", emoji: "🎵", titre: "Une nouvelle comptine", desc: "Apprendre une comptine ou une chanson que personne ne connaît encore.", type: "fois", cible: 1, ageMin: 12 },
  { id: "compliment", emoji: "🌟", titre: "Pluie de compliments", desc: "Au dîner, chacun fait un compliment à la personne à sa droite.", type: "jours", cible: 4, ageMin: 36 },
  { id: "rangement-musique", emoji: "🧹", titre: "Rangement en musique", desc: "Une chanson = 3 minutes pour tout ranger ensemble, en dansant.", type: "jours", cible: 4, ageMin: 24 },
  { id: "nouveau-legume", emoji: "🥦", titre: "Le goûteur de la semaine", desc: "Goûter un aliment jamais goûté (une seule bouchée suffit, sans forcer).", type: "fois", cible: 1, ageMin: 12 },
  { id: "surprise-proche", emoji: "🎁", titre: "Surprise pour un proche", desc: "Préparer un dessin, un gâteau ou un appel vidéo surprise pour un proche.", type: "fois", cible: 1, ageMin: 24 },
  { id: "histoire-soir", emoji: "📖", titre: "Une histoire chaque soir", desc: "Lire au moins une histoire tous les soirs de la semaine.", type: "jours", cible: 7, ageMin: 0 },
  { id: "soiree-jeux", emoji: "🎲", titre: "Soirée jeux", desc: "Une soirée jeux de société ou jeux de cartes en famille.", type: "fois", cible: 1, ageMin: 36 },
  { id: "a-pied", emoji: "🚶", titre: "On y va à pied", desc: "Faire au moins deux trajets à pied ou à vélo au lieu de la voiture.", type: "fois", cible: 2, ageMin: 0 },
  { id: "cuisine-ensemble", emoji: "👩‍🍳", titre: "Chefs de la semaine", desc: "Préparer un repas complet ensemble ; les enfants choisissent le menu.", type: "fois", cible: 1, ageMin: 30 },
  { id: "moment-special", emoji: "💛", titre: "Rien qu'à nous", desc: "10 minutes de « moment rien qu'à nous » avec chaque enfant, 3 fois dans la semaine.", type: "fois", cible: 3, ageMin: 18 },
  { id: "photo-couleur", emoji: "📸", titre: "Chasse photo", desc: "Photographier 5 choses d'une même couleur en se promenant.", type: "fois", cible: 1, ageMin: 30 },
  { id: "cabane", emoji: "⛺", titre: "Nuit dans la cabane", desc: "Construire une cabane au salon et y lire (ou y dormir !).", type: "fois", cible: 1, ageMin: 24 },
  { id: "trois-choses", emoji: "🌙", titre: "3 choses de ma journée", desc: "Au coucher : un moment agréable, un moment difficile, un merci.", type: "jours", cible: 5, ageMin: 36 },
  { id: "coucher-calme", emoji: "😴", titre: "Coucher tout doux", desc: "Suivre la routine du coucher en images, sans hausser le ton.", type: "jours", cible: 5, ageMin: 18 },
  { id: "matin-autonome", emoji: "🌅", titre: "Matin de grand", desc: "Suivre la routine du matin en images, avec le moins d'aide possible.", type: "jours", cible: 5, ageMin: 30 },
  { id: "aider-maison", emoji: "🧺", titre: "Petite main de la maison", desc: "Chaque enfant a une mission par jour : mettre la table, nourrir l'animal, arroser…", type: "jours", cible: 5, ageMin: 24 },
  { id: "danse-cuisine", emoji: "💃", titre: "Boum dans la cuisine", desc: "Une chanson choisie par un enfant, et tout le monde danse.", type: "jours", cible: 3, ageMin: 0 },
  { id: "lettre", emoji: "💌", titre: "Courrier de la semaine", desc: "Envoyer une vraie carte ou un dessin par la poste.", type: "fois", cible: 1, ageMin: 36 },
  { id: "eau", emoji: "💧", titre: "Moment dans l'eau", desc: "Une séance piscine, plage ou un bain-jeu prolongé tous ensemble.", type: "fois", cible: 1, ageMin: 0 },
  { id: "calme-respiration", emoji: "🎈", titre: "Respirer ensemble", desc: "Faire l'exercice du ballon (respiration) ensemble une fois par jour.", type: "jours", cible: 4, ageMin: 30 },
  { id: "sans-cris", emoji: "🤫", titre: "Journée voix douce", desc: "Parents et enfants essaient de ne pas crier de la journée. On se le rappelle avec un geste secret.", type: "jours", cible: 3, ageMin: 30 },
  { id: "jardin", emoji: "🌱", titre: "Main verte", desc: "Planter quelque chose et s'en occuper chaque jour.", type: "jours", cible: 5, ageMin: 24 },
  { id: "album", emoji: "🖼️", titre: "Souvenirs de la semaine", desc: "Choisir ensemble les 3 plus belles photos de la semaine et les raconter.", type: "fois", cible: 1, ageMin: 24 },
  { id: "bisou-magique", emoji: "😘", titre: "Câlin du matin", desc: "Commencer chaque journée par un gros câlin famille avant de partir.", type: "jours", cible: 5, ageMin: 0 }
];
