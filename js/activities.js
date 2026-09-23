/*
 * Banque d'activités.
 * age : [min, max] en mois.
 * moments : calme | sport | cerebral | creatif | complicite
 * lieux : interieur | exterieur | aquatique | trajet
 * domaines : voir DOMAINES dans app.js
 * fratrie : "ok" (se fait à un ou à deux), "ideal" (encore mieux à deux), "duo" (nécessite les deux enfants)
 * eauMin : niveau d'aisance aquatique minimum (0 à 3), uniquement pour les activités aquatiques
 */
window.ACTIVITES = [
  // ───────────── MOMENTS CALMES ─────────────
  {
    id: "lecture-partagee", emoji: "📖", titre: "Lecture partagée « Et après ? »",
    resume: "Lire un album en s'arrêtant pour faire deviner la suite et commenter les images.",
    etapes: ["Laisser l'enfant choisir le livre.", "Montrer les images et nommer ce qu'on voit.", "Avant de tourner la page : « À ton avis, que va-t-il se passer ? »", "À la fin, demander son passage préféré."],
    materiel: "Un livre adapté à l'âge", benefices: "Vocabulaire, compréhension, imagination, et un vrai moment de proximité.",
    moments: ["calme", "cerebral", "complicite"], lieux: ["interieur", "trajet"], domaines: ["langage", "cognitif"],
    interets: ["livres"], age: [6, 144], duree: 15, lien: true, fratrie: "ideal"
  },
  {
    id: "massage-meteo", emoji: "🌦️", titre: "Le massage météo",
    resume: "Raconter la météo en la « dessinant » sur le dos de l'enfant : pluie, vent, soleil, orage…",
    etapes: ["L'enfant s'allonge sur le ventre.", "Pluie = tapoter du bout des doigts, vent = glisser les mains, soleil = grands cercles chauds, orage = petits roulements des poings (doucement !).", "Inverser les rôles : l'enfant fait la météo sur votre dos.", "À deux enfants : ils peuvent le faire l'un sur l'autre."],
    materiel: "Rien", benefices: "Détente, conscience du corps, confiance et toucher bienveillant.",
    moments: ["calme", "complicite"], lieux: ["interieur"], domaines: ["emotions", "sensoriel"],
    interets: [], age: [6, 144], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "panier-tresors", emoji: "🧺", titre: "Panier à trésors",
    resume: "Un panier d'objets du quotidien aux textures variées que bébé explore librement.",
    etapes: ["Remplir un panier bas avec 8 à 10 objets sûrs : cuillère en bois, brosse douce, balle en tissu, bouchon géant, tissu soyeux…", "Asseoir bébé à côté (ou le caler s'il ne tient pas encore seul).", "Observer sans intervenir, nommer simplement ce qu'il touche."],
    materiel: "Panier, objets du quotidien", benefices: "Exploration sensorielle, préhension, concentration.",
    securite: "Aucun objet assez petit pour être avalé ou avec des parties détachables. Surveillance constante.",
    moments: ["calme", "cerebral"], lieux: ["interieur"], domaines: ["sensoriel", "motricite_fine", "cognitif"],
    interets: [], age: [5, 14], duree: 15, lien: false, fratrie: "ok"
  },
  {
    id: "respiration", emoji: "🎈", titre: "Respirer comme un ballon",
    resume: "Petits exercices de respiration imagés pour apprendre à se calmer.",
    etapes: ["Main sur le ventre : on gonfle le ballon en inspirant par le nez, on le dégonfle doucement par la bouche.", "Sentir la fleur (inspirer), souffler la bougie (expirer).", "Répéter 3 à 5 fois, sans forcer.", "Réutiliser la même image quand une colère monte."],
    materiel: "Rien (une peluche sur le ventre pour les petits)", benefices: "Outil concret pour gérer les émotions fortes.",
    moments: ["calme"], lieux: ["interieur", "exterieur", "trajet"], domaines: ["emotions"],
    interets: [], age: [30, 144], duree: 5, lien: true, fratrie: "ok"
  },
  {
    id: "chasse-sons", emoji: "👂", titre: "La chasse aux sons",
    resume: "Fermer les yeux et compter / nommer tous les sons que l'on entend.",
    etapes: ["S'asseoir confortablement, fermer les yeux 1 minute.", "Chacun dit ce qu'il a entendu : oiseau, voiture, frigo…", "Variante : deviner un son que vous produisez (clés, papier froissé)."],
    materiel: "Rien", benefices: "Attention, écoute fine, vocabulaire, apaisement.",
    moments: ["calme", "cerebral"], lieux: ["interieur", "exterieur", "trajet"], domaines: ["sensoriel", "langage", "cognitif"],
    interets: ["nature", "musique"], age: [24, 144], duree: 5, lien: false, fratrie: "ideal"
  },
  {
    id: "cabane-lampe", emoji: "⛺", titre: "Cabane et lampe de poche",
    resume: "Construire une cabane avec draps et chaises, puis y lire ou jouer aux ombres.",
    etapes: ["Construire la cabane ensemble (l'enfant choisit l'emplacement).", "Éteindre la lumière, allumer la lampe.", "Lire une histoire ou faire des ombres chinoises avec les mains."],
    materiel: "Draps, chaises, coussins, lampe de poche", benefices: "Sentiment de sécurité, imagination, complicité.",
    moments: ["calme", "complicite", "creatif"], lieux: ["interieur"], domaines: ["creativite", "emotions", "langage"],
    interets: ["construction", "livres", "imaginaire"], age: [24, 144], duree: 30, lien: true, fratrie: "ideal"
  },
  {
    id: "roue-emotions", emoji: "🎭", titre: "La météo des émotions",
    resume: "Chaque jour, montrer sur une roue ou un dessin comment on se sent, et pourquoi.",
    etapes: ["Dessiner ensemble 4 à 6 visages : joyeux, triste, en colère, peur, calme, surpris.", "Chacun (parents compris !) pose une pince sur son émotion du moment.", "Demander : « Qu'est-ce qui t'a fait ressentir ça ? », sans juger."],
    materiel: "Carton, feutres, pinces à linge", benefices: "Mettre des mots sur les émotions, empathie.",
    moments: ["calme", "complicite"], lieux: ["interieur"], domaines: ["emotions", "langage"],
    interets: ["dessin"], age: [30, 144], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "comptines-gestes", emoji: "🎶", titre: "Comptines à gestes",
    resume: "Chanter face à face des comptines avec des gestes (« Ainsi font font font », « Petit escargot »…).",
    etapes: ["Se placer face à l'enfant, à hauteur de ses yeux.", "Chanter lentement en exagérant les gestes.", "Laisser des pauses pour qu'il complète un mot ou un geste."],
    materiel: "Rien", benefices: "Langage, rythme, imitation, lien d'attachement.",
    moments: ["calme", "complicite"], lieux: ["interieur", "trajet"], domaines: ["langage", "social"],
    interets: ["musique"], age: [0, 48], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "nuages", emoji: "☁️", titre: "Qu'est-ce que tu vois dans les nuages ?",
    resume: "Allongés dans l'herbe, trouver des formes dans les nuages et inventer leur histoire.",
    etapes: ["S'allonger côte à côte.", "Chacun cherche une forme et la décrit.", "Inventer ce que fait ce « nuage-animal »."],
    materiel: "Une couverture", benefices: "Imagination, langage, pause calme en plein air.",
    moments: ["calme", "creatif", "complicite"], lieux: ["exterieur"], domaines: ["creativite", "langage"],
    interets: ["nature", "imaginaire"], age: [30, 144], duree: 15, lien: true, fratrie: "ideal"
  },
  {
    id: "transvasement", emoji: "🥄", titre: "Transvasements",
    resume: "Transvaser des pâtes, de la semoule ou de l'eau d'un récipient à l'autre avec cuillères et entonnoirs.",
    etapes: ["Poser un plateau pour limiter les dégâts.", "Proposer 2 bols, une cuillère, un petit pichet, un entonnoir.", "Montrer une fois, puis laisser faire."],
    materiel: "Plateau, bols, cuillères, pâtes / semoule / eau", benefices: "Motricité fine, coordination œil-main, concentration.",
    securite: "Petits grains : surveiller pour qu'ils ne soient ni avalés ni mis dans le nez.",
    moments: ["calme", "cerebral"], lieux: ["interieur"], domaines: ["motricite_fine", "sensoriel", "cognitif"],
    interets: ["cuisine"], age: [18, 60], duree: 20, lien: false, fratrie: "ok"
  },
  {
    id: "peau-a-peau", emoji: "🤱", titre: "Câlin chanté et portage",
    resume: "Porter bébé contre soi en chantant doucement ou en lui parlant de ce que vous faites.",
    etapes: ["Porter bébé (bras ou porte-bébé adapté).", "Chanter, fredonner ou commenter : « Maintenant on range les tasses… »", "Observer ses réactions et y répondre."],
    materiel: "Éventuellement un porte-bébé", benefices: "Sécurité affective, apaisement, bain de langage.",
    moments: ["calme", "complicite"], lieux: ["interieur", "exterieur"], domaines: ["emotions", "langage"],
    interets: ["musique"], age: [0, 12], duree: 15, lien: true, fratrie: "ok"
  },

  // ───────────── MOMENTS SPORTIFS ─────────────
  {
    id: "parcours-coussins", emoji: "🛋️", titre: "Parcours de motricité au salon",
    resume: "Coussins, chaises, tunnels de couverture : un parcours à escalader, ramper, sauter.",
    etapes: ["Installer 4 à 6 étapes : ramper sous la table, marcher sur une ligne de scotch, sauter d'un coussin à l'autre…", "Faire une démonstration.", "Laisser l'enfant modifier le parcours à son tour."],
    materiel: "Coussins, chaises, scotch de peintre, couverture", benefices: "Équilibre, coordination, confiance en son corps.",
    securite: "Éloigner les angles de meubles, sol dégagé.",
    moments: ["sport"], lieux: ["interieur"], domaines: ["motricite_globale", "cognitif"],
    interets: ["construction", "sport"], age: [12, 96], duree: 20, lien: false, fratrie: "ideal"
  },
  {
    id: "parcours-nature", emoji: "🌳", titre: "Parcours nature",
    resume: "Utiliser le terrain : marcher sur un tronc, sauter les flaques, grimper une butte.",
    etapes: ["Repérer les obstacles naturels lors d'une balade.", "Proposer un défi à la fois (« tu arrives à marcher sur ce tronc ? »).", "Donner la main au début, puis juste être à côté."],
    materiel: "Bonnes chaussures", benefices: "Équilibre, gestion du risque, confiance.",
    securite: "Rester à portée de main sur les hauteurs.",
    moments: ["sport"], lieux: ["exterieur"], domaines: ["motricite_globale", "emotions"],
    interets: ["nature", "sport"], age: [24, 144], duree: 30, lien: true, fratrie: "ideal"
  },
  {
    id: "temps-ventre", emoji: "🐢", titre: "Temps sur le ventre",
    resume: "Quelques minutes sur le ventre, éveillé, avec un visage ou un jouet devant lui.",
    etapes: ["Poser bébé sur le ventre sur un tapis (ou sur votre poitrine).", "Se mettre à sa hauteur, lui parler, montrer un jouet coloré.", "Arrêter dès qu'il montre de l'inconfort ; recommencer plus tard, plusieurs fois par jour."],
    materiel: "Tapis, jouet coloré ou miroir incassable", benefices: "Muscles du cou et du dos, préparation au ramper.",
    securite: "Uniquement quand bébé est éveillé et surveillé. Le couchage pour dormir reste sur le dos.",
    moments: ["sport"], lieux: ["interieur"], domaines: ["motricite_globale"],
    interets: [], age: [0, 8], duree: 5, lien: true, fratrie: "ok"
  },
  {
    id: "statues-musicales", emoji: "🗿", titre: "Statues musicales",
    resume: "On danse quand la musique joue, on se fige quand elle s'arrête.",
    etapes: ["Mettre une musique entraînante.", "Couper la musique à des moments imprévisibles.", "Variantes : se figer en animal, en forme précise, sur un pied."],
    materiel: "Musique", benefices: "Motricité, écoute, contrôle de soi (s'arrêter sur signal).",
    moments: ["sport", "complicite"], lieux: ["interieur", "exterieur"], domaines: ["motricite_globale", "emotions", "social"],
    interets: ["musique", "danse"], age: [24, 144], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "miroir", emoji: "🪞", titre: "Le jeu du miroir",
    resume: "L'un fait des gestes, l'autre les imite comme un miroir. Puis on échange.",
    etapes: ["Face à face, commencer par des gestes lents et simples.", "Ajouter des grimaces, des mouvements de jambes.", "Laisser l'enfant mener : il adore être imité !"],
    materiel: "Rien", benefices: "Coordination, attention, schéma corporel, fou rire garanti.",
    moments: ["sport", "complicite"], lieux: ["interieur", "exterieur"], domaines: ["motricite_globale", "social"],
    interets: ["danse", "imaginaire"], age: [18, 144], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "ballon", emoji: "⚽", titre: "Jeux de ballon",
    resume: "Rouler, lancer, attraper, viser une cible (seau, carton, quilles en bouteilles).",
    etapes: ["Petits : se faire rouler un gros ballon assis jambes écartées.", "Plus grands : viser une cible, attraper au rebond, dribbler.", "Augmenter la distance progressivement."],
    materiel: "Ballon, bouteilles vides ou seau", benefices: "Coordination œil-main/pied, tour de rôle.",
    moments: ["sport"], lieux: ["exterieur", "interieur"], domaines: ["motricite_globale", "social"],
    interets: ["sport"], age: [12, 144], duree: 20, lien: true, fratrie: "ideal"
  },
  {
    id: "draisienne", emoji: "🚲", titre: "Draisienne, trottinette ou vélo",
    resume: "Sortie roulante adaptée à l'âge, avec petits défis (slalom, freiner sur une ligne).",
    etapes: ["Choisir un lieu sans voitures.", "Proposer des défis : slalom entre des pommes de pin, s'arrêter pile sur un trait.", "Féliciter l'effort plutôt que la réussite."],
    materiel: "Draisienne / trottinette / vélo, casque", benefices: "Équilibre, coordination, autonomie.",
    securite: "Casque obligatoire, lieu à l'écart de la circulation.",
    moments: ["sport"], lieux: ["exterieur"], domaines: ["motricite_globale", "autonomie"],
    interets: ["vehicules", "sport"], age: [24, 144], duree: 30, lien: false, fratrie: "ideal"
  },
  {
    id: "yoga-animaux", emoji: "🧘", titre: "Yoga des animaux",
    resume: "Imiter des animaux avec des postures simples : chat, chien tête en bas, cobra, flamant rose.",
    etapes: ["Raconter une histoire où l'on rencontre des animaux.", "À chaque animal, prendre la posture quelques respirations.", "Finir allongé en « étoile de mer » pour se détendre."],
    materiel: "Un tapis ou une serviette", benefices: "Souplesse, équilibre, calme, conscience du corps.",
    moments: ["sport", "calme"], lieux: ["interieur", "exterieur"], domaines: ["motricite_globale", "emotions"],
    interets: ["animaux"], age: [30, 144], duree: 15, lien: true, fratrie: "ideal"
  },
  {
    id: "marelle", emoji: "🔢", titre: "Marelle",
    resume: "Tracer une marelle à la craie et sauter à cloche-pied en suivant les chiffres.",
    etapes: ["Dessiner la marelle ensemble (l'enfant écrit les chiffres s'il sait).", "Lancer le caillou, sauter sans marcher sur la case.", "Variante petits : sauter à pieds joints dans des ronds."],
    materiel: "Craie, caillou", benefices: "Équilibre, saut, reconnaissance des chiffres.",
    moments: ["sport", "cerebral"], lieux: ["exterieur"], domaines: ["motricite_globale", "cognitif"],
    interets: ["sport"], age: [48, 144], duree: 20, lien: false, fratrie: "ideal"
  },
  {
    id: "un-deux-trois-soleil", emoji: "☀️", titre: "1, 2, 3 Soleil / Chat perché",
    resume: "Les grands classiques de cour de récré, joués en famille.",
    etapes: ["Expliquer une règle simple à la fois.", "Laisser l'enfant être « le loup » ou « le soleil » à son tour.", "Accepter les petites triches au début : le plaisir d'abord."],
    materiel: "Rien", benefices: "Course, arrêt, respect des règles, jeu en groupe.",
    moments: ["sport", "complicite"], lieux: ["exterieur"], domaines: ["motricite_globale", "social", "emotions"],
    interets: ["sport"], age: [42, 144], duree: 20, lien: true, fratrie: "ideal"
  },
  {
    id: "brouette-roulades", emoji: "🤸", titre: "Brouette, roulades et avion",
    resume: "Jeux physiques parent-enfant : faire la brouette, rouler sur le lit, faire l'avion sur les jambes.",
    etapes: ["Choisir une surface molle (lit, tapis épais, herbe).", "Brouette : tenir l'enfant par les cuisses pendant qu'il avance sur les mains.", "Avion : allongé sur le dos, porter l'enfant sur vos tibias."],
    materiel: "Surface molle", benefices: "Force, tonus, et beaucoup de rires partagés.",
    securite: "Aller doucement, s'arrêter au premier « stop ».",
    moments: ["sport", "complicite"], lieux: ["interieur", "exterieur"], domaines: ["motricite_globale", "emotions"],
    interets: ["sport"], age: [30, 108], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "defis-famille", emoji: "⏱️", titre: "Olympiades familiales",
    resume: "Une série de défis chronométrés ou comptés : sauts, lancers, course en sac, équilibre.",
    etapes: ["Choisir 4 à 5 épreuves avec les enfants.", "Chacun essaie de battre SON propre record (pas celui des autres).", "Remise de médailles en carton pour tout le monde."],
    materiel: "Chronomètre, carton, objets du jardin", benefices: "Motricité, persévérance, se comparer à soi-même.",
    moments: ["sport", "complicite"], lieux: ["exterieur"], domaines: ["motricite_globale", "emotions", "social"],
    interets: ["sport"], age: [48, 144], duree: 45, lien: true, fratrie: "ideal"
  },
  {
    id: "tunnel-ramper", emoji: "🐛", titre: "Tunnel et ramper",
    resume: "Encourager bébé à ramper ou marcher à quatre pattes vers vous ou à travers un tunnel.",
    etapes: ["Placer un jouet ou votre visage un peu hors de portée.", "Encourager avec la voix.", "Plus tard : tunnel en carton ou sous des chaises."],
    materiel: "Jouet, carton ouvert aux deux bouts", benefices: "Coordination bras-jambes, force, exploration.",
    moments: ["sport"], lieux: ["interieur"], domaines: ["motricite_globale"],
    interets: [], age: [6, 24], duree: 10, lien: true, fratrie: "ok"
  },

  // ───────────── DANS L'EAU ─────────────
  {
    id: "bain-decouverte", emoji: "🛁", titre: "Le bain laboratoire",
    resume: "Dans le bain : remplir, verser, faire couler et flotter des objets.",
    etapes: ["Proposer gobelets, passoire, éponge, bouchons.", "Commenter : plein / vide, lourd / léger.", "Laisser verser de l'eau sur ses mains, son ventre, puis ses épaules."],
    materiel: "Gobelets, passoire, éponge", benefices: "Familiarisation à l'eau, notions de volume, sensorialité.",
    securite: "Ne jamais laisser un enfant seul dans le bain, même quelques secondes.",
    moments: ["cerebral", "calme"], lieux: ["aquatique", "interieur"], domaines: ["sensoriel", "cognitif", "motricite_fine"],
    interets: ["eau", "sciences"], age: [8, 72], duree: 15, lien: true, fratrie: "ideal", eauMin: 0
  },
  {
    id: "arrosoir", emoji: "🚿", titre: "La pluie de l'arrosoir",
    resume: "Apprivoiser l'eau sur le visage en jouant à la pluie avec un petit arrosoir.",
    etapes: ["Commencer sur les mains, puis les épaules, puis l'arrière de la tête.", "Annoncer avant : « 1, 2, 3… pluie ! » pour que l'enfant se prépare.", "Laisser l'enfant tenir l'arrosoir et vous arroser aussi.", "Ne jamais forcer : on revient à l'étape précédente si besoin."],
    materiel: "Petit arrosoir ou gobelet percé", benefices: "Accepter l'eau sur le visage, première étape vers l'immersion.",
    securite: "Toujours à portée de main de l'enfant.",
    moments: ["sport", "complicite"], lieux: ["aquatique"], domaines: ["sensoriel", "emotions"],
    interets: ["eau"], age: [12, 72], duree: 10, lien: true, fratrie: "ok", eauMin: 0
  },
  {
    id: "bulles", emoji: "🫧", titre: "Faire des bulles dans l'eau",
    resume: "Souffler dans l'eau avec la bouche, puis le nez : un pas essentiel avant de mettre la tête sous l'eau.",
    etapes: ["Souffler une balle de ping-pong à la surface.", "Souffler des bulles avec la bouche dans l'eau.", "Puis bouche et nez, puis tout le visage si l'enfant est prêt.", "Faire un concours de grosses bulles avec papa/maman."],
    materiel: "Balle de ping-pong", benefices: "Contrôle de la respiration dans l'eau, confiance.",
    securite: "Surveillance à portée de bras.",
    moments: ["sport"], lieux: ["aquatique"], domaines: ["motricite_globale", "sensoriel"],
    interets: ["eau"], age: [18, 108], duree: 10, lien: true, fratrie: "ideal", eauMin: 1
  },
  {
    id: "bebe-nageur", emoji: "👶", titre: "Découverte de la piscine en portage",
    resume: "Promener bébé dans l'eau contre vous, en chantant, pour qu'il découvre les sensations.",
    etapes: ["Choisir une eau suffisamment chaude et un moment où bébé est en forme.", "Le tenir contre vous, visage hors de l'eau, et le promener doucement.", "Chanter une comptine connue pour le rassurer.", "Séances courtes : on sort au premier frisson."],
    materiel: "Couche de bain, serviette", benefices: "Découverte sensorielle, plaisir partagé.",
    securite: "Renseignez-vous auprès de votre médecin et du club « bébés nageurs » (âge minimum, température de l'eau). Sortir dès que bébé a froid.",
    moments: ["complicite", "calme"], lieux: ["aquatique"], domaines: ["sensoriel", "emotions"],
    interets: ["eau"], age: [4, 36], duree: 20, lien: true, fratrie: "ok", eauMin: 0
  },
  {
    id: "ramasser-objets", emoji: "💎", titre: "La pêche aux trésors",
    resume: "Lancer des objets lestés au fond et aller les chercher (d'abord sur les marches, puis plus profond).",
    etapes: ["Commencer sur la marche où l'enfant a pied, avec les yeux au-dessus de l'eau.", "Puis objets un peu plus profonds nécessitant de mettre la tête sous l'eau.", "Compter les trésors récupérés."],
    materiel: "Anneaux ou jouets lestés, lunettes de piscine", benefices: "Immersion, apnée courte, orientation sous l'eau.",
    securite: "Adulte dans l'eau à portée de bras. Profondeur adaptée.",
    moments: ["sport"], lieux: ["aquatique"], domaines: ["motricite_globale", "emotions"],
    interets: ["eau", "sport"], age: [42, 144], duree: 15, lien: true, fratrie: "ideal", eauMin: 2
  },
  {
    id: "battements", emoji: "🦵", titre: "Battements de jambes à la planche",
    resume: "Tenir une planche ou une frite et avancer avec les jambes.",
    etapes: ["L'adulte tient d'abord les mains de l'enfant et recule doucement.", "Puis avec planche/frite, adulte à côté.", "Défi : aller jusqu'à papa/maman en éclaboussant le moins possible (ou le plus !)."],
    materiel: "Planche ou frite", benefices: "Propulsion, coordination, premières bases de nage.",
    securite: "Adulte dans l'eau à portée de bras.",
    moments: ["sport"], lieux: ["aquatique"], domaines: ["motricite_globale"],
    interets: ["eau", "sport"], age: [36, 144], duree: 15, lien: true, fratrie: "ok", eauMin: 1
  },
  {
    id: "etoile-de-mer", emoji: "⭐", titre: "L'étoile de mer",
    resume: "Apprendre à flotter sur le dos, bras et jambes écartés, avec votre main sous la tête.",
    etapes: ["Main de l'adulte sous l'arrière de la tête et le dos.", "Oreilles dans l'eau, regarder le ciel/plafond, ventre vers le haut.", "Retirer progressivement le soutien, si l'enfant est détendu."],
    materiel: "Rien", benefices: "Flottaison, relâchement, compétence clé de sécurité dans l'eau.",
    securite: "Adulte dans l'eau à portée de bras.",
    moments: ["calme", "sport"], lieux: ["aquatique"], domaines: ["motricite_globale", "emotions"],
    interets: ["eau"], age: [36, 144], duree: 10, lien: true, fratrie: "ok", eauMin: 1
  },
  {
    id: "course-bateaux", emoji: "⛵", titre: "Course de bateaux à souffle",
    resume: "Fabriquer des bateaux (bouchon, éponge, papier) et les faire avancer en soufflant.",
    etapes: ["Fabriquer les bateaux ensemble.", "Tracer une ligne d'arrivée dans la bassine ou la baignoire.", "Tester : lequel flotte le mieux ? Pourquoi ?"],
    materiel: "Bouchons, cure-dents, papier, bassine", benefices: "Souffle, bricolage, premières observations scientifiques.",
    securite: "Surveillance près de l'eau, même peu profonde.",
    moments: ["creatif", "cerebral"], lieux: ["aquatique", "interieur", "exterieur"], domaines: ["creativite", "cognitif", "motricite_fine"],
    interets: ["eau", "vehicules", "construction"], age: [30, 108], duree: 25, lien: true, fratrie: "ideal", eauMin: 0
  },
  {
    id: "barrage", emoji: "🏞️", titre: "Construire un barrage",
    resume: "Au bord d'un ruisseau ou à la plage : détourner l'eau avec des cailloux, du sable, des branches.",
    etapes: ["Observer où va l'eau.", "Imaginer ensemble comment la retenir ou la détourner.", "Tester, observer ce qui fuit, améliorer."],
    materiel: "Bottes ou sandales, seau, pelle", benefices: "Résolution de problèmes, coopération, force.",
    securite: "Eau peu profonde et calme uniquement, adulte à côté.",
    moments: ["cerebral", "sport", "complicite"], lieux: ["aquatique", "exterieur"], domaines: ["cognitif", "motricite_globale", "social"],
    interets: ["eau", "nature", "construction", "sciences"], age: [36, 144], duree: 45, lien: true, fratrie: "ideal", eauMin: 0
  },
  {
    id: "peinture-eau", emoji: "🖌️", titre: "Peindre avec de l'eau",
    resume: "Un seau d'eau et de gros pinceaux pour « peindre » le mur, la terrasse ou le trottoir.",
    etapes: ["Donner un seau et un pinceau large.", "Peindre des formes, des lettres, son prénom.", "Regarder la peinture « magique » disparaître au soleil."],
    materiel: "Seau, pinceaux larges", benefices: "Motricité, créativité sans salir, observation de l'évaporation.",
    moments: ["creatif", "calme"], lieux: ["exterieur", "aquatique"], domaines: ["motricite_fine", "creativite", "cognitif"],
    interets: ["dessin", "eau"], age: [18, 84], duree: 20, lien: false, fratrie: "ideal", eauMin: 0
  },
  {
    id: "flotte-coule", emoji: "🧪", titre: "Ça flotte ou ça coule ?",
    resume: "Faire des hypothèses avant de plonger des objets dans l'eau, puis vérifier.",
    etapes: ["Rassembler 8 objets variés (pomme, clé, bouchon, pâte à modeler…).", "Pour chaque objet : « Tu penses qu'il va flotter ou couler ? »", "Tester et trier en deux tas.", "Bonus plus grands : faire flotter la pâte à modeler en changeant sa forme (en bateau)."],
    materiel: "Bassine d'eau, objets divers", benefices: "Démarche scientifique : prédire, tester, conclure.",
    moments: ["cerebral"], lieux: ["interieur", "aquatique", "exterieur"], domaines: ["cognitif", "langage"],
    interets: ["sciences", "eau"], age: [30, 120], duree: 20, lien: true, fratrie: "ideal", eauMin: 0
  },

  // ───────────── MOMENTS CÉRÉBRAUX ─────────────
  {
    id: "tri-couleurs", emoji: "🟥", titre: "Tri des couleurs et des formes",
    resume: "Trier des objets du quotidien par couleur, taille ou forme dans des bols.",
    etapes: ["Préparer des bols de couleur (ou une feuille de couleur au fond).", "Mélanger pompons, légos, chaussettes…", "Trier ensemble, nommer les couleurs.", "Plus grands : trouver soi-même un critère de tri."],
    materiel: "Bols, objets colorés", benefices: "Catégoriser, vocabulaire des couleurs, logique.",
    securite: "Pas de petits objets avant 3 ans.",
    moments: ["cerebral", "calme"], lieux: ["interieur"], domaines: ["cognitif", "langage", "motricite_fine"],
    interets: ["puzzles"], age: [18, 60], duree: 15, lien: false, fratrie: "ok"
  },
  {
    id: "memory", emoji: "🃏", titre: "Memory maison",
    resume: "Fabriquer un memory avec des photos de famille ou des dessins, puis y jouer.",
    etapes: ["Coller des paires d'images sur du carton (photos, stickers, dessins).", "Commencer avec 4 à 6 paires, augmenter progressivement.", "Laisser l'enfant gagner parfois, mais pas toujours !"],
    materiel: "Carton, images en double", benefices: "Mémoire, attention, patience, tour de rôle.",
    moments: ["cerebral"], lieux: ["interieur"], domaines: ["cognitif", "social"],
    interets: ["puzzles"], age: [36, 144], duree: 20, lien: true, fratrie: "ideal"
  },
  {
    id: "jeu-kim", emoji: "🙈", titre: "Jeu de Kim",
    resume: "Observer des objets, fermer les yeux, deviner celui qui a disparu.",
    etapes: ["Poser 4 à 8 objets sur un plateau.", "Observer 30 secondes, puis cacher sous un tissu.", "Retirer un objet : lequel manque ?", "Variante : Kim du toucher (deviner à l'aveugle)."],
    materiel: "Plateau, torchon, petits objets", benefices: "Mémoire visuelle, concentration, vocabulaire.",
    moments: ["cerebral"], lieux: ["interieur"], domaines: ["cognitif", "langage"],
    interets: ["puzzles"], age: [36, 144], duree: 15, lien: true, fratrie: "ideal"
  },
  {
    id: "chasse-tresor", emoji: "🗺️", titre: "Chasse au trésor à indices",
    resume: "Une série d'indices (dessins pour les petits, énigmes pour les grands) mène à un trésor.",
    etapes: ["Cacher 4 à 6 indices ; chaque indice mène au suivant.", "Petits : dessin du lieu (frigo, lit). Grands : devinette ou mot codé.", "Le trésor peut être une surprise simple : goûter, livre, bon pour un câlin."],
    materiel: "Papier, crayons, un petit trésor", benefices: "Déduction, lecture, orientation, excitation partagée.",
    moments: ["cerebral", "complicite"], lieux: ["interieur", "exterieur"], domaines: ["cognitif", "langage", "motricite_globale"],
    interets: ["imaginaire", "puzzles"], age: [36, 144], duree: 30, lien: true, fratrie: "ideal"
  },
  {
    id: "cuisine-mesures", emoji: "🧁", titre: "Pâtisserie mathématique",
    resume: "Préparer un gâteau simple (type gâteau au yaourt) : compter, mesurer, verser, mélanger.",
    etapes: ["Lire la recette ensemble (images pour les petits).", "L'enfant compte les pots, casse les œufs, mélange.", "Parler de la transformation : liquide → solide à la cuisson.", "Déguster ensemble, c'est la meilleure partie !"],
    materiel: "Ingrédients, pot de yaourt, saladier", benefices: "Nombres, mesures, autonomie, fierté d'avoir fait soi-même.",
    securite: "Le four et les couteaux restent pour l'adulte.",
    moments: ["cerebral", "complicite", "creatif"], lieux: ["interieur"], domaines: ["cognitif", "motricite_fine", "autonomie"],
    interets: ["cuisine", "sciences"], age: [30, 144], duree: 45, lien: true, fratrie: "ideal"
  },
  {
    id: "je-vois", emoji: "🔍", titre: "« Je vois quelque chose de… »",
    resume: "Faire deviner un objet visible par sa couleur, sa forme ou sa première lettre.",
    etapes: ["« Je vois quelque chose de rouge… »", "L'enfant pose des questions ou propose.", "Grands : « … qui commence par le son [b] »."],
    materiel: "Rien", benefices: "Observation, vocabulaire, conscience des sons (pré-lecture).",
    moments: ["cerebral", "calme"], lieux: ["trajet", "interieur", "exterieur"], domaines: ["langage", "cognitif"],
    interets: [], age: [36, 144], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "puzzles", emoji: "🧩", titre: "Puzzles et encastrements",
    resume: "Du puzzle à boutons pour les petits au puzzle de 100 pièces à faire ensemble.",
    etapes: ["Choisir un niveau légèrement au-dessus de ce qu'il réussit seul.", "Aider par des questions (« tu cherches un bord ? ») plutôt qu'en faisant à sa place.", "Célébrer la persévérance."],
    materiel: "Puzzle adapté", benefices: "Logique spatiale, persévérance, motricité fine.",
    moments: ["cerebral", "calme"], lieux: ["interieur"], domaines: ["cognitif", "motricite_fine"],
    interets: ["puzzles"], age: [15, 144], duree: 20, lien: false, fratrie: "ok"
  },
  {
    id: "histoire-relais", emoji: "🗣️", titre: "L'histoire à relais",
    resume: "Chacun ajoute une phrase à une histoire inventée ensemble.",
    etapes: ["Commencer : « Il était une fois un dragon qui avait peur du noir… »", "Chacun continue à son tour.", "Plus grands : ajouter une contrainte (placer le mot « banane »)."],
    materiel: "Rien", benefices: "Langage, imagination, écoute des autres.",
    moments: ["creatif", "cerebral", "complicite"], lieux: ["trajet", "interieur", "exterieur"], domaines: ["langage", "creativite", "social"],
    interets: ["imaginaire", "livres"], age: [48, 144], duree: 15, lien: true, fratrie: "ideal"
  },
  {
    id: "rythmes", emoji: "🥁", titre: "Répète mon rythme",
    resume: "Taper un rythme dans les mains ou sur une casserole ; l'autre doit le reproduire.",
    etapes: ["Commencer par 2-3 coups simples.", "Allonger la séquence petit à petit.", "L'enfant invente un rythme pour vous."],
    materiel: "Mains, casseroles, cuillères", benefices: "Mémoire de travail, écoute, rythme (utile au langage).",
    moments: ["cerebral", "complicite"], lieux: ["interieur", "trajet"], domaines: ["cognitif", "sensoriel"],
    interets: ["musique"], age: [30, 144], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "coucou-cache", emoji: "🙊", titre: "Coucou-caché et objet disparu",
    resume: "Cacher son visage ou un jouet sous un tissu et le faire réapparaître.",
    etapes: ["Coucou : cacher votre visage derrière vos mains ou un foulard.", "Cacher un jouet sous un tissu devant lui : va-t-il le chercher ?", "Augmenter la difficulté : deux tissus."],
    materiel: "Foulard, jouet", benefices: "Permanence de l'objet (comprendre que ce qu'on ne voit plus existe encore), rires partagés.",
    moments: ["cerebral", "complicite"], lieux: ["interieur"], domaines: ["cognitif", "emotions"],
    interets: [], age: [5, 20], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "compter-nature", emoji: "🍂", titre: "Collecte à compter",
    resume: "En balade, ramasser « 3 feuilles, 5 cailloux, 2 bâtons » et les classer.",
    etapes: ["Donner une mission de collecte adaptée à l'âge.", "À la maison, trier par taille ou couleur.", "Grands : faire des additions avec la collecte."],
    materiel: "Un sac", benefices: "Dénombrement, observation de la nature, vocabulaire.",
    moments: ["cerebral", "calme"], lieux: ["exterieur"], domaines: ["cognitif", "langage"],
    interets: ["nature"], age: [30, 96], duree: 20, lien: true, fratrie: "ideal"
  },
  {
    id: "jeu-cooperatif", emoji: "🎲", titre: "Jeu de société coopératif",
    resume: "Un jeu où l'on gagne (ou perd) tous ensemble contre le jeu.",
    etapes: ["Choisir un jeu coopératif adapté à l'âge (il en existe dès 2-3 ans).", "Discuter des choix à voix haute.", "Perdre ensemble apprend aussi à gérer la frustration, sans rivalité entre frères et sœurs."],
    materiel: "Un jeu coopératif", benefices: "Coopération, règles, stratégie, gestion de la frustration.",
    moments: ["cerebral", "complicite"], lieux: ["interieur"], domaines: ["cognitif", "social", "emotions"],
    interets: ["puzzles"], age: [30, 144], duree: 25, lien: true, fratrie: "ideal"
  },
  {
    id: "planter-graine", emoji: "🌱", titre: "Faire pousser une graine",
    resume: "Planter une lentille, un haricot ou une fleur, et suivre sa croissance.",
    etapes: ["Coton humide dans un pot transparent + quelques graines.", "Arroser un peu chaque jour (mission de l'enfant).", "Dessiner ou photographier la plante chaque jour pour comparer."],
    materiel: "Graines, coton, pot transparent", benefices: "Patience, responsabilité, observation du vivant.",
    moments: ["cerebral", "calme"], lieux: ["interieur", "exterieur"], domaines: ["cognitif", "autonomie", "langage"],
    interets: ["nature", "sciences"], age: [30, 144], duree: 10, lien: false, fratrie: "ok"
  },
  {
    id: "constructions-modele", emoji: "🧱", titre: "Construire d'après un modèle",
    resume: "Reproduire une construction (kapla, legos, tangram) d'après une photo ou un dessin.",
    etapes: ["L'adulte fait un modèle simple ou montre une image.", "L'enfant reproduit.", "Inverser : l'enfant fait le modèle, l'adulte copie (en se trompant parfois exprès)."],
    materiel: "Kapla, blocs, legos ou tangram", benefices: "Logique spatiale, précision, persévérance.",
    moments: ["cerebral", "creatif"], lieux: ["interieur"], domaines: ["cognitif", "motricite_fine"],
    interets: ["construction", "puzzles"], age: [36, 144], duree: 20, lien: true, fratrie: "ideal"
  },
  {
    id: "qui-suis-je", emoji: "❓", titre: "Devinettes « Qui suis-je ? »",
    resume: "Décrire un animal ou un objet en indices ; les autres devinent.",
    etapes: ["« J'ai quatre pattes, je dis meuh, je donne du lait… »", "L'enfant fait deviner à son tour.", "Plus grands : répondre seulement par oui/non aux questions."],
    materiel: "Rien", benefices: "Langage, catégorisation, logique.",
    moments: ["cerebral"], lieux: ["trajet", "interieur", "exterieur"], domaines: ["langage", "cognitif"],
    interets: ["animaux"], age: [36, 144], duree: 10, lien: true, fratrie: "ideal"
  },

  // ───────────── MOMENTS CRÉATIFS ─────────────
  {
    id: "peinture-sac", emoji: "🎨", titre: "Peinture propre en sac",
    resume: "De la peinture enfermée dans un sac congélation scotché à la table : bébé étale sans se salir.",
    etapes: ["Mettre 2-3 couleurs de peinture dans un sac zip, bien fermer.", "Scotcher le sac sur la table ou le sol.", "Laisser bébé appuyer, glisser, mélanger les couleurs."],
    materiel: "Sac congélation, peinture, scotch", benefices: "Découverte des couleurs, motricité fine, sensorialité.",
    securite: "Vérifier que le sac reste bien fermé.",
    moments: ["creatif", "calme"], lieux: ["interieur"], domaines: ["sensoriel", "motricite_fine", "creativite"],
    interets: ["dessin"], age: [8, 30], duree: 15, lien: false, fratrie: "ok"
  },
  {
    id: "pate-a-sel", emoji: "🥨", titre: "Pâte à sel maison",
    resume: "Fabriquer la pâte ensemble (farine, sel, eau), puis modeler des personnages.",
    etapes: ["Mélanger 2 verres de farine, 1 verre de sel, 1 verre d'eau (environ).", "Pétrir ensemble.", "Modeler, puis laisser sécher ou cuire à four doux pour garder les créations."],
    materiel: "Farine, sel, eau", benefices: "Motricité fine, créativité, fierté de garder ses œuvres.",
    securite: "Très salée : ne pas en manger.",
    moments: ["creatif", "complicite", "calme"], lieux: ["interieur"], domaines: ["motricite_fine", "creativite", "sensoriel"],
    interets: ["cuisine", "dessin"], age: [24, 144], duree: 40, lien: true, fratrie: "ideal"
  },
  {
    id: "land-art", emoji: "🍁", titre: "Land art",
    resume: "Créer une œuvre éphémère avec feuilles, cailloux, bâtons et fleurs trouvés dehors.",
    etapes: ["Collecter des matériaux naturels.", "Composer un visage, un mandala, un animal au sol.", "Prendre une photo souvenir pour le journal."],
    materiel: "Ce que la nature offre", benefices: "Créativité, observation, motricité fine.",
    moments: ["creatif", "calme"], lieux: ["exterieur"], domaines: ["creativite", "motricite_fine", "sensoriel"],
    interets: ["nature", "dessin"], age: [30, 144], duree: 30, lien: true, fratrie: "ideal"
  },
  {
    id: "marionnettes", emoji: "🧦", titre: "Spectacle de marionnettes",
    resume: "Fabriquer des marionnettes en chaussettes ou en papier et jouer une histoire.",
    etapes: ["Fabriquer 2 personnages.", "Improviser une scène derrière le canapé.", "Utiliser les marionnettes pour parler d'une situation vécue (dispute, peur…)."],
    materiel: "Chaussettes, feutres, boutons, colle", benefices: "Langage, expression des émotions, créativité.",
    moments: ["creatif", "complicite"], lieux: ["interieur"], domaines: ["langage", "emotions", "creativite"],
    interets: ["imaginaire", "dessin"], age: [36, 144], duree: 30, lien: true, fratrie: "ideal"
  },
  {
    id: "jeu-de-role", emoji: "👩‍⚕️", titre: "Jeux de rôle : marchand, docteur, restaurant",
    resume: "Jouer à faire « comme les grands » avec des objets de la maison.",
    etapes: ["Installer le décor avec l'enfant.", "Prendre un rôle (client, patient) et le laisser mener.", "Introduire des petits problèmes à résoudre (« je n'ai pas assez d'argent ! »)."],
    materiel: "Objets du quotidien, déguisements", benefices: "Langage, compréhension sociale, empathie, maths (au marché).",
    moments: ["creatif", "complicite"], lieux: ["interieur"], domaines: ["social", "langage", "creativite"],
    interets: ["imaginaire"], age: [24, 120], duree: 30, lien: true, fratrie: "ideal"
  },
  {
    id: "instruments", emoji: "🎸", titre: "Orchestre maison",
    resume: "Fabriquer des instruments (maracas en bouteille, tambour en boîte) et jouer ensemble.",
    etapes: ["Fabriquer : bouteille + riz = maracas ; boîte + élastiques = guitare.", "Jouer fort / doucement, vite / lentement.", "Accompagner une chanson connue."],
    materiel: "Bouteilles, riz, boîtes, élastiques", benefices: "Rythme, écoute, créativité, motricité fine.",
    securite: "Bien fermer les bouteilles (scotch) pour les petits.",
    moments: ["creatif", "sport"], lieux: ["interieur"], domaines: ["creativite", "sensoriel", "motricite_fine"],
    interets: ["musique", "construction"], age: [18, 108], duree: 30, lien: true, fratrie: "ideal"
  },
  {
    id: "dessin-dialogue", emoji: "✏️", titre: "Le dessin à quatre mains",
    resume: "Un dessin commun où chacun ajoute un élément à son tour, sans parler.",
    etapes: ["Une grande feuille, une couleur chacun.", "Chacun ajoute un élément à tour de rôle.", "À la fin, inventer ensemble l'histoire du dessin."],
    materiel: "Grande feuille, feutres", benefices: "Créativité, écoute de l'autre, complicité.",
    moments: ["creatif", "complicite", "calme"], lieux: ["interieur", "trajet"], domaines: ["creativite", "social", "motricite_fine"],
    interets: ["dessin"], age: [30, 144], duree: 15, lien: true, fratrie: "ideal"
  },
  {
    id: "lettre-proche", emoji: "💌", titre: "Courrier pour un proche",
    resume: "Préparer une carte ou un dessin pour un grand-parent, un ami, et aller le poster.",
    etapes: ["Choisir le destinataire et ce qu'on veut lui dire.", "Dessiner, dicter ou écrire le message.", "Aller à la boîte aux lettres ensemble."],
    materiel: "Papier, feutres, enveloppe, timbre", benefices: "Liens familiaux, expression, écriture.",
    moments: ["creatif", "complicite"], lieux: ["interieur"], domaines: ["social", "langage", "motricite_fine"],
    interets: ["dessin"], age: [36, 144], duree: 20, lien: true, fratrie: "ok"
  },

  // ───────────── COMPLICITÉ / LIEN ─────────────
  {
    id: "moment-special", emoji: "💛", titre: "Le moment rien qu'à nous",
    resume: "10 à 15 minutes où l'enfant choisit le jeu et le parent suit, sans téléphone ni consignes.",
    etapes: ["Annoncer : « C'est notre moment, tu choisis ! »", "Suivre son jeu : décrire ce qu'il fait, imiter, s'enthousiasmer.", "Éviter les questions-test et les corrections.", "À faire idéalement avec chaque enfant séparément, régulièrement."],
    materiel: "Rien", benefices: "Renforce le lien, l'estime de soi, et réduit souvent la recherche d'attention négative.",
    moments: ["complicite"], lieux: ["interieur", "exterieur"], domaines: ["emotions", "social"],
    interets: [], age: [18, 144], duree: 15, lien: true, fratrie: "ok"
  },
  {
    id: "trois-choses", emoji: "🌙", titre: "Rituel « 3 choses de ma journée »",
    resume: "Au coucher, chacun raconte 3 choses : un moment agréable, un moment difficile, un merci.",
    etapes: ["Le parent commence pour montrer l'exemple.", "Écouter sans corriger ni minimiser.", "Finir par un câlin ou une phrase rituelle."],
    materiel: "Rien", benefices: "Expression, gratitude, apaisement avant le sommeil.",
    moments: ["calme", "complicite"], lieux: ["interieur"], domaines: ["emotions", "langage"],
    interets: [], age: [36, 144], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "album-souvenirs", emoji: "📸", titre: "Album de famille commenté",
    resume: "Regarder des photos de quand l'enfant était bébé, de la famille, et raconter.",
    etapes: ["Sortir un album ou les photos du téléphone.", "Raconter les anecdotes de sa naissance, de ses premiers pas.", "Laisser l'enfant poser toutes ses questions."],
    materiel: "Photos", benefices: "Identité, sentiment d'appartenance, langage.",
    moments: ["calme", "complicite"], lieux: ["interieur"], domaines: ["emotions", "langage"],
    interets: [], age: [24, 144], duree: 20, lien: true, fratrie: "ideal"
  },
  {
    id: "balade-explorateur", emoji: "🧭", titre: "Balade d'explorateur",
    resume: "Une balade lente où c'est l'enfant qui décide du chemin et des arrêts.",
    etapes: ["Aller à son rythme, sans objectif de distance.", "S'arrêter sur ce qui l'intrigue : fourmi, flaque, feuille.", "Emporter une loupe pour les plus grands."],
    materiel: "Une loupe (facultatif)", benefices: "Curiosité, vocabulaire, attention partagée.",
    moments: ["complicite", "calme", "cerebral"], lieux: ["exterieur"], domaines: ["langage", "sensoriel", "cognitif"],
    interets: ["nature", "animaux"], age: [12, 144], duree: 30, lien: true, fratrie: "ok"
  },
  {
    id: "calin-sandwich", emoji: "🥪", titre: "Câlin sandwich et bataille de chatouilles",
    resume: "Les enfants au milieu, les parents sont le pain : gros câlin collectif, puis chatouilles.",
    etapes: ["Annoncer le « câlin sandwich » ou le « câlin cabane ».", "Chatouilles douces, en respectant immédiatement le « stop ».", "Finir par un moment calme tous serrés."],
    materiel: "Rien", benefices: "Complicité familiale, décharge des tensions, apprendre le consentement (le « stop » est respecté).",
    moments: ["complicite", "sport"], lieux: ["interieur"], domaines: ["emotions", "social"],
    interets: [], age: [12, 120], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "grand-enseigne", emoji: "🧑‍🏫", titre: "Le grand montre au petit",
    resume: "L'aîné devient « prof » et apprend quelque chose à son cadet (un jeu, une chanson, un geste).",
    etapes: ["Choisir avec l'aîné ce qu'il veut transmettre.", "Le parent reste en soutien, sans reprendre la main.", "Remercier l'aîné pour son aide et féliciter les deux."],
    materiel: "Selon l'activité", benefices: "Valorise l'aîné, renforce le lien fraternel, apprentissage par imitation.",
    moments: ["complicite", "cerebral"], lieux: ["interieur", "exterieur"], domaines: ["social", "emotions", "langage"],
    interets: [], age: [12, 144], duree: 15, lien: true, fratrie: "duo"
  },
  {
    id: "pique-nique", emoji: "🧺", titre: "Pique-nique préparé ensemble",
    resume: "Préparer le pique-nique avec les enfants, puis le manger dehors.",
    etapes: ["Chacun a une mission : laver les tomates, faire les sandwichs, porter la nappe.", "Choisir le lieu ensemble.", "Après le repas : un jeu libre ou une sieste sous un arbre."],
    materiel: "Nappe, panier", benefices: "Autonomie, coopération, souvenirs de famille.",
    moments: ["complicite", "calme"], lieux: ["exterieur"], domaines: ["autonomie", "social"],
    interets: ["cuisine", "nature"], age: [24, 144], duree: 90, lien: true, fratrie: "ideal"
  },
  {
    id: "conversation-bebe", emoji: "👶", titre: "Conversation de babillages",
    resume: "Répondre aux sons de bébé comme à une vraie conversation : il « parle », vous répondez, pause…",
    etapes: ["Face à face, attendre qu'il émette un son ou fasse une mimique.", "Répondre en l'imitant ou en mettant des mots dessus.", "Faire une pause pour lui laisser son « tour de parole »."],
    materiel: "Rien", benefices: "Base de l'acquisition du langage et de l'attachement.",
    moments: ["complicite", "calme"], lieux: ["interieur", "trajet", "exterieur"], domaines: ["langage", "emotions", "social"],
    interets: [], age: [0, 18], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "petites-missions", emoji: "🧹", titre: "Petites missions de grand",
    resume: "Confier une vraie tâche : mettre la table, arroser les plantes, trier le linge par couleur.",
    etapes: ["Choisir une tâche réalisable (même imparfaitement).", "Montrer une fois, puis laisser faire.", "Remercier pour l'aide, sans refaire derrière lui devant lui."],
    materiel: "Selon la tâche", benefices: "Autonomie, confiance, sentiment d'être utile à la famille.",
    moments: ["complicite", "cerebral"], lieux: ["interieur", "exterieur"], domaines: ["autonomie", "motricite_fine", "social"],
    interets: ["cuisine"], age: [20, 144], duree: 15, lien: true, fratrie: "ok"
  },
  // ───────────── AJOUTS : BÉBÉ DE 6 À 12 MOIS ─────────────
  {
    id: "miroir-bebe", emoji: "🪞", titre: "Coucou dans le miroir",
    resume: "Face à un miroir incassable, faire des grimaces, nommer les parties du visage, se cacher et réapparaître.",
    etapes: ["S'installer avec bébé devant un miroir incassable (au sol ou sur vos genoux).", "Montrer et nommer : « Voilà ton nez ! Voilà maman ! »", "Faire des grimaces lentes : bébé observe et imite parfois.", "Se cacher sur le côté et réapparaître : « Coucou ! »"],
    materiel: "Miroir incassable", benefices: "Attention au visage, reconnaissance de soi et des proches, premiers échanges.",
    moments: ["calme", "complicite"], lieux: ["interieur"], domaines: ["emotions", "langage", "cognitif"],
    interets: [], age: [4, 14], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "bouteilles-sensorielles", emoji: "🍶", titre: "Bouteilles sensorielles",
    resume: "Des petites bouteilles remplies d'eau colorée, de paillettes ou de riz, bien fermées, à faire rouler et secouer.",
    etapes: ["Remplir 3 petites bouteilles : eau + colorant alimentaire, riz, grelots.", "Coller le bouchon et l'entourer de scotch solide.", "Les faire rouler devant bébé, le laisser les attraper et les secouer."],
    materiel: "Petites bouteilles, riz, eau, colorant, colle forte, scotch", benefices: "Suivi visuel, écoute, préhension, envie d'aller chercher (motivation à bouger).",
    securite: "Bouchons collés et scotchés, vérifier régulièrement qu'ils tiennent. Toujours sous surveillance.",
    moments: ["calme", "cerebral"], lieux: ["interieur"], domaines: ["sensoriel", "motricite_fine", "cognitif"],
    interets: ["sciences"], age: [5, 18], duree: 10, lien: false, fratrie: "ok"
  },
  {
    id: "jouet-hors-portee", emoji: "🧸", titre: "Le jouet un peu plus loin",
    resume: "Poser un jouet attrayant juste hors de portée pour donner envie de se tourner, pivoter ou avancer.",
    etapes: ["Bébé sur le ventre ou assis avec appui, sur un tapis.", "Poser un jouet à quelques centimètres de sa main, puis un peu plus loin ou sur le côté.", "Encourager avec la voix, sans lui donner trop vite : l'effort fait partie du jeu.", "Arrêter s'il s'agace : on réessaiera plus tard."],
    materiel: "Tapis, jouet coloré ou sonore", benefices: "Retournements, pivots, préparation au déplacement.",
    securite: "Toujours éveillé et surveillé quand bébé est sur le ventre.",
    moments: ["sport"], lieux: ["interieur"], domaines: ["motricite_globale", "cognitif"],
    interets: [], age: [4, 11], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "livres-tissu", emoji: "📚", titre: "Livres à toucher",
    resume: "Livres en tissu ou cartonnés avec des matières, des rabats, des images simples : bébé touche, mâchouille, tourne.",
    etapes: ["Bébé sur vos genoux, livre devant lui.", "Nommer l'image, faire le bruit de l'animal, guider sa main sur la matière.", "Le laisser manipuler (et goûter) le livre : c'est normal à cet âge."],
    materiel: "Livres en tissu ou cartonnés", benefices: "Bain de langage, découverte des textures, goût précoce pour les livres.",
    moments: ["calme", "complicite"], lieux: ["interieur", "trajet"], domaines: ["langage", "sensoriel"],
    interets: ["livres", "animaux"], age: [4, 20], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "tambour-casseroles", emoji: "🥁", titre: "Concert de casseroles",
    resume: "Casseroles retournées, boîtes et cuillères en bois : taper, écouter la différence de sons.",
    etapes: ["Installer 2 ou 3 « instruments » devant l'enfant (assis avec appui pour les bébés).", "Taper doucement, puis fort, lentement, puis vite.", "Laisser imiter, puis imiter à votre tour ce qu'il fait."],
    materiel: "Casseroles, boîtes, cuillères en bois", benefices: "Cause-effet, écoute, coordination, imitation.",
    moments: ["sport", "creatif", "complicite"], lieux: ["interieur"], domaines: ["sensoriel", "motricite_fine", "cognitif"],
    interets: ["musique"], age: [6, 48], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "foulards-boite", emoji: "🧣", titre: "La boîte à foulards",
    resume: "Glisser des foulards légers dans une boîte à mouchoirs vide : bébé les tire un par un.",
    etapes: ["Nouer ou non des foulards légers, les glisser dans une boîte à mouchoirs vide.", "Montrer comment en tirer un.", "Le laisser vider la boîte, puis remplir ensemble."],
    materiel: "Boîte à mouchoirs vide, foulards légers", benefices: "Pince pouce-index, cause-effet, concentration.",
    securite: "Ranger les foulards après le jeu (risque d'étranglement sans surveillance).",
    moments: ["calme", "cerebral"], lieux: ["interieur"], domaines: ["motricite_fine", "cognitif"],
    interets: [], age: [7, 18], duree: 10, lien: false, fratrie: "ok"
  },
  {
    id: "pieds-nus", emoji: "🦶", titre: "Pieds nus dans l'herbe",
    resume: "Découvrir avec les pieds et les mains l'herbe, le sable, les feuilles, la terre.",
    etapes: ["Choisir un coin propre et sans danger.", "Poser bébé assis ou tenir ses pieds sur l'herbe ; les plus grands marchent pieds nus.", "Nommer : « C'est doux, ça pique, c'est froid ! »"],
    materiel: "Rien", benefices: "Découvertes sensorielles, équilibre, vocabulaire.",
    securite: "Vérifier le sol (objets, déjections), rester à côté.",
    moments: ["calme", "complicite"], lieux: ["exterieur"], domaines: ["sensoriel", "langage", "motricite_globale"],
    interets: ["nature"], age: [6, 72], duree: 15, lien: true, fratrie: "ideal"
  },
  {
    id: "jeux-doigts", emoji: "🖐️", titre: "Jeux de doigts",
    resume: "Comptines avec les mains et les doigts : « La petite bête qui monte », « Voici ma main », « Ainsi font font font »…",
    etapes: ["Face à face ou bébé sur vos genoux.", "Dire la comptine lentement en touchant ses doigts, sa main, son bras.", "Garder un petit suspense avant la chatouille finale."],
    materiel: "Rien", benefices: "Langage, anticipation, rires partagés.",
    moments: ["calme", "complicite"], lieux: ["interieur", "trajet", "exterieur"], domaines: ["langage", "emotions"],
    interets: ["musique"], age: [4, 36], duree: 5, lien: true, fratrie: "ideal"
  },
  {
    id: "bulles-savon", emoji: "🫧", titre: "Bulles de savon",
    resume: "Souffler des bulles que bébé suit des yeux et que les plus grands essaient d'attraper ou d'éclater.",
    etapes: ["Souffler doucement des bulles devant l'enfant.", "Bébé : il les suit du regard, tend la main.", "Plus grands : éclater avec un doigt, un pied, compter les bulles."],
    materiel: "Flacon à bulles", benefices: "Suivi visuel, coordination, émerveillement partagé.",
    securite: "Garder le flacon hors de portée des petits (ne pas boire le liquide).",
    moments: ["calme", "sport", "complicite"], lieux: ["exterieur", "interieur"], domaines: ["sensoriel", "motricite_globale"],
    interets: [], age: [5, 72], duree: 10, lien: true, fratrie: "ideal"
  },
  {
    id: "gobelets-gigognes", emoji: "🥤", titre: "Gobelets à empiler",
    resume: "Emboîter, empiler, faire tomber des gobelets gigognes (ou des pots de yaourt vides).",
    etapes: ["Construire une petite tour : bébé adore la faire tomber.", "Cacher un jouet sous un gobelet : où est-il ?", "Plus grands : empiler du plus grand au plus petit."],
    materiel: "Gobelets gigognes ou pots vides", benefices: "Cause-effet, notion de grand/petit, motricité fine.",
    moments: ["cerebral", "calme"], lieux: ["interieur", "aquatique"], domaines: ["cognitif", "motricite_fine"],
    interets: ["construction", "puzzles"], age: [6, 30], duree: 10, lien: false, fratrie: "ideal"
  },
  {
    id: "photos-famille", emoji: "🖼️", titre: "L'album des visages",
    resume: "Regarder avec bébé des photos de la famille et nommer chacun.",
    etapes: ["Préparer quelques photos bien nettes (album, téléphone, photos plastifiées).", "Nommer : « C'est papi ! Là, c'est Titi ! »", "Observer ses réactions : sourires, gazouillis, regards."],
    materiel: "Photos", benefices: "Reconnaissance des proches, langage, sentiment d'appartenance.",
    moments: ["calme", "complicite"], lieux: ["interieur", "trajet"], domaines: ["langage", "emotions"],
    interets: [], age: [5, 24], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "bain-gant", emoji: "🧽", titre: "Bain-découverte des petits",
    resume: "Dans le bain, presser une éponge ou un gant pour faire couler l'eau sur les mains, le ventre, les pieds.",
    etapes: ["Eau à bonne température, bébé bien calé.", "Faire couler l'eau doucement en nommant les parties du corps.", "Lui donner l'éponge : il découvre qu'en serrant, l'eau coule."],
    materiel: "Éponge ou gant", benefices: "Familiarisation à l'eau, sensations, cause-effet.",
    securite: "Ne jamais laisser un enfant seul dans le bain, même quelques secondes.",
    moments: ["calme", "complicite"], lieux: ["aquatique", "interieur"], domaines: ["sensoriel", "emotions"],
    interets: ["eau"], age: [3, 18], duree: 10, lien: true, fratrie: "ok", eauMin: 0
  },

  // ───────────── AJOUTS : 2 À 4 ANS ─────────────
  {
    id: "enfiler-perles", emoji: "📿", titre: "Enfiler des perles ou des pâtes",
    resume: "Enfiler de grosses perles ou des pâtes tubes sur un lacet rigide pour faire un collier.",
    etapes: ["Scotcher le bout du lacet pour le rendre rigide, faire un gros nœud à l'autre bout.", "Commencer par de grosses perles ou des rigatonis.", "Plus grands : suivre un motif de couleurs (rouge, bleu, rouge…)."],
    materiel: "Lacet, grosses perles ou pâtes tubes", benefices: "Motricité fine, coordination des deux mains, concentration, logique (motifs).",
    securite: "Petits objets : surveiller de près avant 3 ans.",
    moments: ["calme", "cerebral", "creatif"], lieux: ["interieur", "trajet"], domaines: ["motricite_fine", "cognitif"],
    interets: ["puzzles"], age: [30, 72], duree: 15, lien: false, fratrie: "ok"
  },
  {
    id: "pate-serpents", emoji: "🐍", titre: "Serpents et boulettes en pâte à modeler",
    resume: "Rouler des serpents, faire des boulettes, découper avec un couteau à pâte ou des ciseaux adaptés.",
    etapes: ["Montrer comment rouler une boule entre les mains, puis un serpent sur la table.", "Découper le serpent en morceaux (couteau à pâte).", "Inventer : un escargot, un nid avec des œufs, un gâteau d'anniversaire."],
    materiel: "Pâte à modeler, couteau à pâte, ciseaux enfants", benefices: "Force des mains, motricité fine (préparation au dessin), imagination.",
    moments: ["creatif", "calme"], lieux: ["interieur"], domaines: ["motricite_fine", "creativite"],
    interets: ["dessin", "cuisine"], age: [24, 72], duree: 20, lien: true, fratrie: "ok"
  },
  {
    id: "apporte-rouge", emoji: "🔴", titre: "Apporte-moi quelque chose de…",
    resume: "Une mission : trouver dans la maison un objet rouge, rond, doux, plus grand que la cuillère…",
    etapes: ["Donner une consigne simple : « Apporte-moi quelque chose de rouge ! »", "Célébrer chaque trouvaille en la décrivant.", "Augmenter la difficulté : deux critères (« rouge ET doux »), ou une consigne en deux étapes."],
    materiel: "Rien", benefices: "Couleurs, vocabulaire, compréhension des consignes, mouvement.",
    moments: ["cerebral", "sport"], lieux: ["interieur", "exterieur"], domaines: ["langage", "cognitif", "motricite_globale"],
    interets: ["puzzles"], age: [22, 60], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "paires-chaussettes", emoji: "🧦", titre: "La chasse aux paires",
    resume: "Retrouver les paires de chaussettes dans le linge propre (ou des cartes, des chaussures).",
    etapes: ["Étaler une dizaine de chaussettes.", "« Trouve la jumelle de celle-ci ! »", "Ranger les paires ensemble dans le tiroir."],
    materiel: "Linge propre", benefices: "Observation, appariement, sentiment d'être utile.",
    moments: ["cerebral", "complicite"], lieux: ["interieur"], domaines: ["cognitif", "autonomie"],
    interets: ["puzzles"], age: [22, 54], duree: 10, lien: true, fratrie: "ok"
  },
  {
    id: "petit-jardinier", emoji: "🪴", titre: "Petit jardinier",
    resume: "Remplir des pots de terre à la pelle, planter des graines ou des bulbes, arroser.",
    etapes: ["Installer une bâche ou aller dehors.", "Remplir le pot, faire un trou avec le doigt, déposer la graine.", "Arroser avec un petit arrosoir et poser le pot à un endroit qu'il pourra surveiller."],
    materiel: "Pots, terreau, graines faciles (radis, haricot, tournesol), arrosoir", benefices: "Motricité, patience, observation du vivant, responsabilité.",
    moments: ["cerebral", "calme"], lieux: ["exterieur", "interieur"], domaines: ["motricite_fine", "cognitif", "autonomie"],
    interets: ["nature", "sciences"], age: [22, 96], duree: 25, lien: true, fratrie: "ok"
  },
  {
    id: "rampe-voitures", emoji: "🚗", titre: "La rampe à voitures",
    resume: "Un carton ou une planche inclinée : faire descendre voitures et balles, comparer qui va le plus loin.",
    etapes: ["Incliner une planche ou un grand carton contre le canapé.", "Lâcher deux voitures en même temps : laquelle arrive en premier ?", "Changer la pente (plus de coussins) et observer ce qui change."],
    materiel: "Carton ou planche, petites voitures, balles", benefices: "Premières expériences de physique, prédiction, vocabulaire (vite, lent, loin).",
    moments: ["cerebral"], lieux: ["interieur"], domaines: ["cognitif", "langage"],
    interets: ["vehicules", "sciences", "construction"], age: [18, 72], duree: 20, lien: true, fratrie: "ideal"
  },
  {
    id: "flaques", emoji: "🥾", titre: "Sauter dans les flaques",
    resume: "Bottes et ciré : sauter dans les flaques, comparer les éclaboussures, faire des ronds dans l'eau.",
    etapes: ["S'équiper : bottes, pantalon de pluie.", "Sauter à pieds joints, en courant, à reculons…", "Jeter un caillou : observer les ronds dans l'eau."],
    materiel: "Bottes, vêtements de pluie", benefices: "Saut, équilibre, plaisir du dehors par tous les temps.",
    moments: ["sport", "complicite"], lieux: ["exterieur", "aquatique"], domaines: ["motricite_globale", "sensoriel"],
    interets: ["eau", "nature"], age: [18, 96], duree: 20, lien: true, fratrie: "ok", eauMin: 0
  },
  {
    id: "danse-foulards", emoji: "💃", titre: "Danse des foulards",
    resume: "Danser avec des foulards en suivant la musique : lent comme une plume, rapide comme le vent.",
    etapes: ["Un foulard chacun.", "Alterner musique douce et musique rapide.", "Imiter : « On fait la pluie… le vent… l'oiseau ! »"],
    materiel: "Foulards légers, musique", benefices: "Coordination, écoute du rythme, expression corporelle.",
    moments: ["sport", "creatif", "complicite"], lieux: ["interieur", "exterieur"], domaines: ["motricite_globale", "creativite", "sensoriel"],
    interets: ["danse", "musique"], age: [12, 96], duree: 10, lien: true, fratrie: "ideal"
  },

  // ───────────── AJOUTS : POUR LES DEUX (GRAND + BÉBÉ) ─────────────
  {
    id: "spectacle-bebe", emoji: "🎪", titre: "Le spectacle pour bébé",
    resume: "Le grand fait un petit spectacle pour le bébé : chanson, marionnette, coucou-caché. Le bébé est le public !",
    etapes: ["Installer bébé confortablement face au « scène ».", "Aider le grand à choisir : une chanson, une marionnette, un coucou.", "Montrer au grand comment bébé réagit : « Regarde, elle te sourit ! »"],
    materiel: "Une marionnette ou une peluche", benefices: "Valorise le grand, crée un lien entre frère et sœur, bain de langage pour bébé.",
    moments: ["complicite", "creatif"], lieux: ["interieur"], domaines: ["social", "emotions", "langage"],
    interets: ["imaginaire", "musique"], age: [0, 144], duree: 10, lien: true, fratrie: "duo"
  },
  {
    id: "aide-bebe", emoji: "🍼", titre: "Grand assistant de bébé",
    resume: "Le grand aide pour s'occuper du bébé : apporter la couche, choisir le body, chanter pendant le change.",
    etapes: ["Proposer une mission simple et facultative (ne pas imposer).", "Le remercier précisément : « Merci d'avoir choisi le body, elle est très jolie avec ! »", "Prévoir aussi un moment rien que pour le grand ensuite."],
    materiel: "Rien", benefices: "Sentiment d'être important, empathie, relation fraternelle.",
    moments: ["complicite"], lieux: ["interieur"], domaines: ["social", "autonomie", "emotions"],
    interets: [], age: [0, 144], duree: 10, lien: true, fratrie: "duo"
  },
  {
    id: "tapis-ensemble", emoji: "🧩", titre: "Tapis d'éveil à deux",
    resume: "Bébé sur le tapis, le grand à côté : il lui montre des jouets, les fait bouger, les nomme.",
    etapes: ["Installer les deux sur un grand tapis.", "Donner au grand 2 ou 3 jouets « pour bébé » (hochet, livre en tissu).", "Rester tout près : guider les gestes doux, féliciter."],
    materiel: "Tapis, jouets de bébé", benefices: "Complicité entre frère et sœur, apprentissage de la douceur.",
    securite: "Surveiller de près : les jouets du grand peuvent être dangereux pour bébé (petites pièces).",
    moments: ["calme", "complicite"], lieux: ["interieur"], domaines: ["social", "emotions", "sensoriel"],
    interets: [], age: [0, 144], duree: 15, lien: true, fratrie: "duo"
  }
];
