# 🦁🌱🦦 Titi & Loulou

Application web (installable sur téléphone) pour accompagner l'éducation de nos enfants, Titi et Loulou.

## Onglets

| Onglet | Contenu |
| --- | --- |
| 👧🧒 **Enfants** | Profil de chaque enfant (âge, tempérament, centres d'intérêt, points forts, ce qui l'apaise, peurs, domaines à encourager, aisance dans l'eau, quotidien…) et **pistes personnalisées** : priorités de son âge, conseils, idées d'activités. |
| 🌱 **Développement** | **Motricité** (intérieur, extérieur, dans l'eau) et **développement mental** (langage, réflexion, émotions et relations, créativité) : repères de l'âge à cocher, conseils, activités adaptées. |
| ✨ **Activité** | Assistant en 3 étapes : *pour qui* (un enfant ou les deux) → *type de moment* (calme, sportif, cérébral, créatif, complicité) → *lieu* (intérieur, extérieur, aquatique, en trajet). Il propose des activités triées selon l'âge, les goûts et les objectifs de chaque enfant. |
| 🏡 **Famille** | **Routines en images** (matin, coucher… avec un « mode enfant » plein écran à cocher), **bibliothèque** (livres et comptines : à lire, lus, préférés, nombre de lectures) et **3 défis familiaux par semaine**, renouvelés chaque lundi. |
| 📔 **Journal** | Souvenirs, ressentis, premières fois, activités favorites, et un **bilan des domaines explorés** sur 30 jours pour équilibrer les propositions. |

## Utilisation

- Ouvrir `index.html` dans un navigateur, ou mieux : l'héberger (par ex. GitHub Pages) puis « Ajouter à l'écran d'accueil » sur le téléphone pour l'utiliser comme une application, même hors connexion.
- **Confidentialité** : toutes les données restent dans le navigateur de l'appareil (rien n'est envoyé sur internet). Utiliser ⚙️ → *Envoyer la sauvegarde* puis *Importer* sur l'autre téléphone pour copier les données.

## Personnaliser

- Activités : `js/activities.js` (âge en mois, moments, lieux, domaines, consignes de sécurité).
- Repères de développement et conseils : `js/reperes.js`.
- Étapes de routines, comptines, défis : `js/famille-data.js`.

> Les repères de développement sont indicatifs : chaque enfant avance à son rythme. En cas de question, en parler au médecin ou au pédiatre.
