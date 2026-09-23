(function () {
  "use strict";

  // ───────────────────────── Référentiels ─────────────────────────
  const STORAGE_KEY = "educ-enfants-v1";

  const DOMAINES = {
    motricite_globale: { label: "Motricité globale", emoji: "🏃" },
    motricite_fine: { label: "Motricité fine", emoji: "✋" },
    langage: { label: "Langage", emoji: "💬" },
    cognitif: { label: "Réflexion", emoji: "🧠" },
    emotions: { label: "Émotions", emoji: "💛" },
    social: { label: "Relations", emoji: "🤝" },
    sensoriel: { label: "Sens", emoji: "👃" },
    creativite: { label: "Créativité", emoji: "🎨" },
    autonomie: { label: "Autonomie", emoji: "🌟" }
  };

  const MOMENTS = {
    calme: { label: "Moment calme", emoji: "🌙", desc: "Se poser, se câliner, se ressourcer" },
    sport: { label: "Activité sportive", emoji: "⚡", desc: "Bouger, se dépenser" },
    cerebral: { label: "Moment cérébral", emoji: "🧠", desc: "Réfléchir, chercher, apprendre" },
    creatif: { label: "Moment créatif", emoji: "🎨", desc: "Inventer, fabriquer, imaginer" },
    complicite: { label: "Moment complicité", emoji: "💛", desc: "Renforcer le lien avec vous" }
  };

  const LIEUX = {
    interieur: { label: "Intérieur", emoji: "🏠" },
    exterieur: { label: "Extérieur", emoji: "🌳" },
    aquatique: { label: "Aquatique", emoji: "💧" },
    trajet: { label: "En trajet / attente", emoji: "🚗" }
  };

  const INTERETS = {
    animaux: "🐾 Animaux", musique: "🎵 Musique", danse: "💃 Danse", dessin: "🖍️ Dessin",
    construction: "🧱 Construction", nature: "🌿 Nature", livres: "📚 Histoires", cuisine: "🍳 Cuisine",
    vehicules: "🚜 Véhicules", eau: "💧 Eau", sport: "⚽ Sport", puzzles: "🧩 Jeux de réflexion",
    sciences: "🔬 Sciences", imaginaire: "🦄 Imaginaire / déguisements"
  };

  const AVANCES = { "0": "Son âge", "6": "Un peu plus grand (+6 mois)", "12": "Plus grand (+1 an)", "18": "Bien plus grand (+1 an ½)" };
  const TEMPERAMENTS = { calme: "Plutôt calme", equilibre: "Entre les deux", energique: "Très énergique" };
  const SOCIABILITE = { reserve: "Plutôt réservé(e)", variable: "Ça dépend", sociable: "Très sociable" };
  const RESSENTIS = { "😍": "Adoré", "🙂": "Bien", "😐": "Mitigé", "😣": "Difficile" };
  /* Emblèmes dessinés (img/*.svg), utilisables comme avatar à la place d'un emoji. */
  const EMBLEMES = { lion: { label: "Lion", src: "img/lion.svg" }, loutre: { label: "Loutre", src: "img/loutre.svg" } };
  const AVATARS = ["lion", "loutre", "🦁", "🐻", "🐰", "🦊", "🐼", "🐯", "🐨", "🐸", "🦄", "🐳", "🐥", "🐶", "🐱", "🦋"];
  const COULEURS = ["#3f6fb5", "#d0799a", "#c9a45c", "#8b5a38", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444", "#3b82f6", "#ec4899"];

  const SUBS = {
    motricite: { interieur: "🏠 Intérieur", exterieur: "🌳 Extérieur", aquatique: "💧 Dans l'eau" },
    mental: { langage: "💬 Langage", cognitif: "🧠 Réflexion", emotions: "💛 Émotions & relations", creativite: "🎨 Créativité" }
  };

  const ACTIVITES = window.ACTIVITES;
  const ACT_BY_ID = Object.fromEntries(ACTIVITES.map(a => [a.id, a]));

  // ───────────────────────── État ─────────────────────────
  let state = load();
  const ui = {
    tab: "enfants",
    dev: { childId: null, section: "motricite", sub: "interieur", offset: 0 },
    wiz: { step: 1, who: null, moment: null, lieu: null, seed: Math.random(), shown: 3 },
    fam: { sub: "routines", childId: null, bibType: "livre", bibFiltre: "tous" }
  };

  function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }

  function newChild(nom, emoji, couleur) {
    return {
      id: uid(), nom, emoji, couleur, naissance: "", temperament: "", sociabilite: "",
      interets: [], forces: "", aEncourager: [], eau: 0, langues: "", garde: "", sommeil: "",
      sante: "", peurs: "", apaise: "", notes: "", acquis: {}, avance: 0
    };
  }

  function defaultState() {
    return { version: 1, enfants: [newChild("Titi", "lion", "#3f6fb5"), newChild("Loulou", "loutre", "#d0799a")], journal: [], favoris: [], routines: [], routineLog: {}, bibliotheque: [], defis: {} };
  }

  function migrate(s) {
    const base = defaultState();
    const out = { version: 1, enfants: Array.isArray(s.enfants) ? s.enfants : base.enfants, journal: Array.isArray(s.journal) ? s.journal : [], favoris: Array.isArray(s.favoris) ? s.favoris : [] };
    out.enfants = out.enfants.map(e => Object.assign(newChild(e.nom || "Enfant", e.emoji || "🐥", e.couleur || COULEURS[2]), e));
    // Anciens avatars emoji de Titi et Loulou → nouveaux emblèmes dessinés
    out.enfants.forEach(e => {
      if (e.emoji === "🦁") e.emoji = "lion";
      if (e.nom === "Loulou" && e.emoji === "🐻") e.emoji = "loutre";
      // Couleurs par défaut d'origine → bleu pour le lion, rose pour la loutre
      if (e.emoji === "lion" && ["#f59e0b", "#c9a45c"].includes(e.couleur)) e.couleur = "#3f6fb5";
      if (e.emoji === "loutre" && ["#8b5cf6", "#8b5a38"].includes(e.couleur)) e.couleur = "#d0799a";
    });
    const obj = v => (v && typeof v === "object" && !Array.isArray(v)) ? v : {};
    out.routines = Array.isArray(s.routines) ? s.routines : [];
    out.routineLog = obj(s.routineLog);
    out.bibliotheque = Array.isArray(s.bibliotheque) ? s.bibliotheque : [];
    out.defis = obj(s.defis);
    out.derniereSauvegarde = s.derniereSauvegarde || "";
    return out;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return migrate(JSON.parse(raw));
    } catch (e) { /* stockage indisponible ou corrompu : on repart des valeurs par défaut */ }
    return defaultState();
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { toast("⚠️ Impossible d'enregistrer sur cet appareil."); }
  }

  // ───────────────────────── Utilitaires ─────────────────────────
  const $ = sel => document.querySelector(sel);
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function today() {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }
  function child(id) { return state.enfants.find(e => e.id === id); }

  function ageMois(e) {
    if (!e || !e.naissance) return null;
    const b = new Date(e.naissance + "T00:00:00"), n = new Date();
    if (isNaN(b)) return null;
    let m = (n.getFullYear() - b.getFullYear()) * 12 + (n.getMonth() - b.getMonth());
    if (n.getDate() < b.getDate()) m--;
    return Math.max(0, m);
  }
  function ageTexte(e) {
    const m = ageMois(e);
    if (m === null) return "Âge à renseigner";
    if (m < 1) return "Nouveau-né";
    if (m < 24) return m + " mois";
    const a = Math.floor(m / 12), r = m % 12;
    return a + " ans" + (a < 6 && r ? " et " + r + " mois" : "");
  }
  function ageRange(a) {
    const f = m => m < 24 ? m + " mois" : Math.floor(m / 12) + " ans";
    if (a[0] === 0 && a[1] >= 144) return "tous âges";
    return a[1] >= 144 ? "dès " + f(a[0]) : f(a[0]) + " – " + f(a[1]);
  }
  function tranchePour(m) {
    if (m === null) return null;
    return window.TRANCHES.find(t => m >= t.min && m < t.max) || window.TRANCHES[window.TRANCHES.length - 1];
  }
  function kidsFor(who) {
    if (!who) return [];
    return who === "tous" ? state.enfants.slice() : [child(who)].filter(Boolean);
  }
  function nomsKids(kids) {
    if (!kids.length) return "";
    if (kids.length === 1) return kids[0].nom;
    return kids.slice(0, -1).map(k => k.nom).join(", ") + " et " + kids[kids.length - 1].nom;
  }
  function daysAgo(dateStr) {
    return Math.floor((Date.now() - new Date(dateStr + "T12:00:00").getTime()) / 86400000);
  }
  function hash(str, seed) {
    let h = Math.floor(seed * 1e9) | 0;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
    return ((h >>> 0) % 1000) / 1000;
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  // ───────────────────────── Moteur de recommandation ─────────────────────────
  /* L'activité convient si sa tranche d'âge croise [âge réel, âge réel + avance choisie dans le profil]. */
  function ageOk(a, kid) {
    const m = ageMois(kid);
    if (m === null) return true;
    const avance = kid.avance || 0;
    return a.age[0] <= m + avance && a.age[1] >= m;
  }
  function pourPlusGrand(a, kid) {
    const m = ageMois(kid);
    return m !== null && m < a.age[0];
  }
  function eauOk(a, kid) {
    return a.eauMin === undefined || (kid.eau || 0) >= a.eauMin;
  }

  /* Retourne la liste des activités adaptées, triées, avec les raisons du choix. */
  function recommander(kids, filtre, seed) {
    filtre = filtre || {};
    const res = [];
    for (const a of ACTIVITES) {
      if (filtre.moment && !a.moments.includes(filtre.moment)) continue;
      if (filtre.lieu && filtre.lieu !== "tous" && !a.lieux.includes(filtre.lieu)) continue;
      if (filtre.domaines && !a.domaines.some(d => filtre.domaines.includes(d))) continue;
      if (kids.length < 2 && a.fratrie === "duo") continue;
      if (!kids.every(k => eauOk(a, k))) continue;
      const nbAge = kids.filter(k => ageOk(a, k)).length;
      if (nbAge === 0) continue;
      const aAdapter = nbAge < kids.length;
      const plusGrand = kids.filter(k => ageOk(a, k) && pourPlusGrand(a, k));

      let score = 0;
      const raisons = [];
      for (const k of kids) {
        const inter = a.interets.filter(i => (k.interets || []).includes(i));
        if (inter.length) { score += 2 * inter.length; raisons.push(k.nom + " aime : " + inter.map(i => INTERETS[i].replace(/^\S+\s/, "").toLowerCase()).join(", ")); }
        const dom = a.domaines.filter(d => (k.aEncourager || []).includes(d));
        if (dom.length) { score += 2 * dom.length; raisons.push("Encourage " + dom.map(d => DOMAINES[d].label.toLowerCase()).join(", ") + " pour " + k.nom); }
        if (k.temperament === "energique" && a.moments.includes("sport")) { score += 1; raisons.push(k.nom + " a besoin de se dépenser"); }
        if (k.temperament === "calme" && a.moments.includes("calme")) score += 1;
        const recent = state.journal.some(j => j.activiteId === a.id && j.enfants.includes(k.id) && daysAgo(j.date) < 10);
        if (recent) score -= 3;
      }
      if (kids.length > 1 && (a.fratrie === "ideal" || a.fratrie === "duo")) { score += 2; raisons.push("Idéal à plusieurs"); }
      if (state.favoris.includes(a.id)) { score += 1; raisons.push("Dans vos favoris"); }
      if (a.lien) score += 0.5;
      if (aAdapter) score -= 4;
      score += hash(a.id, seed || 0.5) * 2.5;
      if (plusGrand.length) raisons.push("Un peu au-dessus de l'âge de " + nomsKids(plusGrand) + " : à accompagner");
      res.push({ a, score, raisons: [...new Set(raisons)], aAdapter, plusGrand: plusGrand.length > 0 });
    }
    return res.sort((x, y) => y.score - x.score);
  }

  // ───────────────────────── Composants ─────────────────────────
  /* Emblème de l'enfant : image dessinée ou emoji. */
  function embleme(k) {
    const em = EMBLEMES[k.emoji];
    return em ? `<img class="emb" src="${em.src}" alt="${esc(em.label)}">` : esc(k.emoji);
  }
  function avatar(k, size) {
    return `<span class="avatar ${EMBLEMES[k.emoji] ? "img" : ""} ${size || ""}" style="--c:${esc(k.couleur)}">${embleme(k)}</span>`;
  }
  /* Emblème + prénom, pour les boutons et puces. */
  function nomAvecEmbleme(k) { return `<span class="inline-emb">${embleme(k)}</span> ${esc(k.nom)}`; }

  function carteActivite(r, kids) {
    const a = r.a;
    const fav = state.favoris.includes(a.id);
    const lieux = a.lieux.map(l => LIEUX[l].emoji).join(" ");
    return `<button class="act-card" data-action="open-activity" data-id="${a.id}" data-kids="${kids.map(k => k.id).join(",")}">
      <span class="act-emoji">${a.emoji}</span>
      <span class="act-body">
        <strong>${esc(a.titre)} ${fav ? '<span class="fav">♥</span>' : ""}</strong>
        <span class="muted">${esc(a.resume)}</span>
        <span class="meta">⏱ ${a.duree} min · ${lieux} · ${ageRange(a.age)}${a.lien ? " · 💛 lien" : ""}</span>
        ${r.aAdapter ? `<span class="tag warn">À adapter selon l'âge</span>` : ""}
        ${r.plusGrand && !r.aAdapter ? `<span class="tag grand">⬆️ Pour plus grand</span>` : ""}
        ${r.raisons && r.raisons.length ? `<span class="why">✨ ${esc(r.raisons[0])}</span>` : ""}
      </span>
    </button>`;
  }

  function listeActivites(resultats, kids, max) {
    if (!resultats.length) return `<p class="empty">Aucune activité ne correspond pour l'instant. Essayez un autre critère ou complétez les profils.</p>`;
    return `<div class="act-list">${resultats.slice(0, max || resultats.length).map(r => carteActivite(r, kids)).join("")}</div>`;
  }

  function chipsChoix(name, options, selected, multi) {
    return `<div class="chip-group">${Object.entries(options).map(([v, l]) =>
      `<label class="chip"><input type="${multi ? "checkbox" : "radio"}" name="${name}" value="${v}" ${(multi ? (selected || []).includes(v) : selected === v) ? "checked" : ""}><span>${esc(typeof l === "string" ? l : l.emoji + " " + l.label)}</span></label>`
    ).join("")}</div>`;
  }

  // ───────────────────────── Onglet : Enfants ─────────────────────────
  function renderEnfants() {
    const cards = state.enfants.map(k => {
      const m = ageMois(k);
      const t = tranchePour(m);
      const tags = [];
      if (k.temperament) tags.push(TEMPERAMENTS[k.temperament]);
      (k.interets || []).slice(0, 4).forEach(i => tags.push(INTERETS[i]));
      const reco = recommander([k], {}, 0.37).slice(0, 3);
      const encourager = (k.aEncourager || []).map(d => {
        const tip = conseilDomaine(d);
        return tip ? `<li><strong>${DOMAINES[d].emoji} ${DOMAINES[d].label} :</strong> ${esc(tip)}</li>` : "";
      }).join("");
      const peuExplores = domainesPeuExplores(k);
      return `<article class="card child-card" style="--c:${esc(k.couleur)}">
        <div class="child-head">
          ${avatar(k, "lg")}
          <div>
            <h2>${esc(k.nom)}</h2>
            <p class="muted">${ageTexte(k)}${t ? " · repères « " + t.label + " »" : ""}</p>
          </div>
          <div class="child-actions">
            <button class="btn small ghost" data-action="quiz-start" data-id="${k.id}">✨ Pas à pas</button>
            <button class="btn small ghost" data-action="edit-child" data-id="${k.id}">✏️ Profil</button>
          </div>
        </div>
        ${tags.length ? `<div class="tags">${tags.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>` : ""}
        <div class="pistes">
          <h3>🧭 Pistes pour ${esc(k.nom)}</h3>
          ${m === null ? `<p class="hint">👉 Renseignez la date de naissance pour obtenir des propositions adaptées à son âge.</p>` : `<p>${esc(t.focus)}</p>`}
          ${encourager ? `<ul class="tips">${encourager}</ul>` : `<p class="hint">Astuce : dans le profil, choisissez les domaines à encourager et ses centres d'intérêt pour affiner les propositions.</p>`}
          ${peuExplores.length ? `<p class="hint">Peu explorés ces 30 derniers jours : ${peuExplores.map(d => DOMAINES[d].emoji + " " + DOMAINES[d].label).join(", ")}</p>` : ""}
          <h4>Idées du moment</h4>
          ${listeActivites(reco, [k])}
        </div>
      </article>`;
    }).join("");
    const aCompleter = state.enfants.filter(k => !k.naissance || !k.temperament);
    const bienvenue = aCompleter.length ? `<div class="card welcome">
        <div class="welcome-emb">${aCompleter.map(k => avatar(k, "lg")).join("")}</div>
        <h2>Bienvenue 👋</h2>
        <p>Remplissons ${aCompleter.length > 1 ? "les profils de " + esc(nomsKids(aCompleter)) : "le profil de " + esc(aCompleter[0].nom)} ensemble, une question à la fois. Environ 2 minutes par enfant, et chaque question peut être passée.</p>
        <button class="btn primary" data-action="quiz-start" data-id="${aCompleter.map(k => k.id).join(",")}">Commencer</button>
      </div>` : "";
    return `${bandeauSauvegarde()}${bienvenue}<p class="intro">Les informations saisies restent <strong>uniquement sur cet appareil</strong>. Plus le profil est complet, plus les propositions sont personnalisées.</p>
      ${cards}
      <button class="btn block ghost" data-action="add-child">➕ Ajouter un enfant</button>`;
  }

  /* Rappel de sauvegarde : les données n'existent que sur ce téléphone. */
  function aDesDonnees() {
    return state.journal.length || state.bibliotheque.length || state.routines.length ||
      state.enfants.some(k => k.naissance || k.forces || k.notes || (k.interets || []).length);
  }
  function bandeauSauvegarde() {
    if (!aDesDonnees()) return "";
    const jours = state.derniereSauvegarde ? daysAgo(state.derniereSauvegarde) : null;
    if (jours !== null && jours < 7) return "";
    return `<div class="backup-banner">
      <div><strong>💾 ${jours === null ? "Aucune sauvegarde pour l'instant" : "Dernière sauvegarde il y a " + jours + " jours"}</strong>
      <span>Vos informations n'existent que sur ce téléphone. Envoyez-vous une copie (e-mail, Notes, WhatsApp…) pour ne rien perdre.</span></div>
      <button class="btn primary small" data-action="share">Sauvegarder</button>
    </div>`;
  }

  function conseilDomaine(d) {
    const map = { langage: "langage", cognitif: "cognitif", emotions: "emotions", social: "emotions", creativite: "creativite", motricite_globale: "exterieur", motricite_fine: "interieur" };
    if (d === "autonomie") return "Laisser faire seul(e) même si c'est plus long ou moins bien fait, et confier de petites responsabilités.";
    if (d === "sensoriel") return "Varier les textures, les sons, les odeurs : cuisine, nature, bain, musique.";
    const c = window.CONSEILS[map[d]];
    return c ? c[0] : "";
  }

  function domainesPeuExplores(k) {
    const recents = state.journal.filter(j => j.enfants.includes(k.id) && daysAgo(j.date) <= 30 && ACT_BY_ID[j.activiteId]);
    if (recents.length < 3) return [];
    const vus = new Set();
    recents.forEach(j => ACT_BY_ID[j.activiteId].domaines.forEach(d => vus.add(d)));
    return Object.keys(DOMAINES).filter(d => !vus.has(d));
  }

  function formEnfant(k) {
    return `<form data-form="child" data-id="${k.id}" class="form">
      <h2>${k.nom ? "Profil de " + esc(k.nom) : "Nouvel enfant"}</h2>
      <fieldset><legend>L'essentiel</legend>
        <label>Prénom ou surnom<input name="nom" required value="${esc(k.nom)}"></label>
        <label>Date de naissance<input type="date" name="naissance" value="${esc(k.naissance)}" max="${today()}"></label>
        <div class="field"><span>Emblème</span><div class="chip-group">${AVATARS.map(a => `<label class="chip avatar-choice"><input type="radio" name="emoji" value="${a}" ${k.emoji === a ? "checked" : ""}><span>${EMBLEMES[a] ? `<img class="emb" src="${EMBLEMES[a].src}" alt="${EMBLEMES[a].label}">` : a}</span></label>`).join("")}</div></div>
        <div class="field"><span>Couleur</span><div class="chip-group">${COULEURS.map(c => `<label class="chip color"><input type="radio" name="couleur" value="${c}" ${k.couleur === c ? "checked" : ""}><span style="background:${c}"></span></label>`).join("")}</div></div>
      </fieldset>
      <fieldset><legend>Sa personnalité</legend>
        <div class="field"><span>Tempérament</span>${chipsChoix("temperament", TEMPERAMENTS, k.temperament)}</div>
        <div class="field"><span>Avec les autres</span>${chipsChoix("sociabilite", SOCIABILITE, k.sociabilite)}</div>
        <div class="field"><span>Centres d'intérêt</span>${chipsChoix("interets", INTERETS, k.interets, true)}</div>
        <label>Ses points forts<textarea name="forces" rows="2" placeholder="Ex. : très observateur, adore aider…">${esc(k.forces)}</textarea></label>
        <label>Ce qui l'apaise<textarea name="apaise" rows="2" placeholder="Ex. : son doudou, une chanson, être porté…">${esc(k.apaise)}</textarea></label>
        <label>Peurs ou sensibilités<textarea name="peurs" rows="2" placeholder="Ex. : bruits forts, le noir, l'eau sur le visage…">${esc(k.peurs)}</textarea></label>
      </fieldset>
      <fieldset><legend>Niveau des activités proposées</legend>
        <div class="field">${chipsChoix("avance", AVANCES, String(k.avance || 0))}</div>
        <p class="hint">Si votre enfant fait souvent des activités de plus grand, l'application lui en proposera aussi (marquées « ⬆️ Pour plus grand »). Les repères de développement restent ceux de son âge réel.</p>
      </fieldset>
      <fieldset><legend>Ce que vous souhaitez encourager</legend>
        ${chipsChoix("aEncourager", Object.fromEntries(Object.entries(DOMAINES).map(([id, d]) => [id, d.emoji + " " + d.label])), k.aEncourager, true)}
      </fieldset>
      <fieldset><legend>Dans l'eau</legend>
        <div class="field">${chipsChoix("eau", Object.fromEntries(window.NIVEAUX_EAU.map(n => [String(n.niveau), n.label])), String(k.eau || 0))}</div>
        <p class="hint">${window.NIVEAUX_EAU.map(n => `<b>${n.label}</b> : ${n.desc}`).join("<br>")}</p>
      </fieldset>
      <fieldset><legend>Son quotidien</legend>
        <label>Mode de garde / école<input name="garde" value="${esc(k.garde)}" placeholder="Crèche, assistante maternelle, maternelle…"></label>
        <label>Langue(s) parlée(s) à la maison<input name="langues" value="${esc(k.langues)}"></label>
        <label>Rythme et sommeil<input name="sommeil" value="${esc(k.sommeil)}" placeholder="Sieste, heure du coucher…"></label>
        <label>Santé, allergies<input name="sante" value="${esc(k.sante)}"></label>
        <label>Notes libres<textarea name="notes" rows="3">${esc(k.notes)}</textarea></label>
      </fieldset>
      <div class="form-actions">
        ${state.enfants.some(e => e.id === k.id) ? `<button type="button" class="btn danger ghost" data-action="delete-child" data-id="${k.id}">Supprimer</button>` : ""}
        <button type="button" class="btn ghost" data-action="close-modal">Annuler</button>
        <button type="submit" class="btn primary">Enregistrer</button>
      </div>
    </form>`;
  }

  let brouillonEnfant = null;

  function saveChildForm(form) {
    const fd = new FormData(form);
    const id = form.dataset.id;
    let k = child(id);
    const isNew = !k;
    if (isNew) k = brouillonEnfant;
    k.nom = (fd.get("nom") || "").trim() || "Enfant";
    ["naissance", "emoji", "couleur", "temperament", "sociabilite", "forces", "apaise", "peurs", "garde", "langues", "sommeil", "sante", "notes"].forEach(f => { k[f] = fd.get(f) || ""; });
    k.interets = fd.getAll("interets");
    k.aEncourager = fd.getAll("aEncourager");
    k.eau = parseInt(fd.get("eau") || "0", 10);
    k.avance = parseInt(fd.get("avance") || "0", 10);
    if (isNew) state.enfants.push(k);
    save();
    closeModal();
    toast("Profil de " + k.nom + " enregistré ✓");
    render();
  }

  // ───────────────────────── Questionnaire pas à pas ─────────────────────────
  const QUIZ = [
    { id: "naissance", titre: k => "Date de naissance de " + k.nom, aide: "Sert à proposer des activités et des repères adaptés à son âge." },
    { id: "temperament", titre: k => "Au quotidien, " + k.nom + " est plutôt…" },
    { id: "sociabilite", titre: k => "Avec les personnes qu'il ou elle connaît peu, " + k.nom + " est…" },
    { id: "interets", titre: k => "Qu'est-ce qui plaît à " + k.nom + " ?", aide: "Plusieurs choix possibles. Pour un bébé, ce qui l'attire ou le calme." },
    { id: "aEncourager", titre: k => "Qu'aimeriez-vous encourager chez " + k.nom + " en ce moment ?", aide: "Plusieurs choix possibles. Les propositions mettront ces domaines en avant." },
    { id: "avance", titre: k => "Quel niveau d'activités proposer à " + k.nom + " ?", aide: "S'il fait souvent des activités de plus grand, choisissez un niveau au-dessus : les repères de développement resteront ceux de son âge réel." },
    { id: "eau", titre: k => "Dans l'eau, " + k.nom + " en est où ?" },
    { id: "apaise", titre: k => "Qu'est-ce qui apaise " + k.nom + " ? Et ce qui l'inquiète ?", aide: "Facultatif : doudou, chanson, bercement… peurs, bruits, le noir…" }
  ];

  function vueQuiz() {
    const q = ui.quiz;
    const k = child(q.ids[q.idx]);
    const etape = QUIZ[q.step];
    const total = QUIZ.length;
    let champ = "";
    switch (etape.id) {
      case "naissance": champ = `<input class="big-input" type="date" name="naissance" value="${esc(k.naissance)}" max="${today()}">`; break;
      case "temperament": champ = chipsChoix("temperament", TEMPERAMENTS, k.temperament); break;
      case "sociabilite": champ = chipsChoix("sociabilite", SOCIABILITE, k.sociabilite); break;
      case "interets": champ = chipsChoix("interets", INTERETS, k.interets, true); break;
      case "aEncourager": champ = chipsChoix("aEncourager", Object.fromEntries(Object.entries(DOMAINES).map(([id, d]) => [id, d.emoji + " " + d.label])), k.aEncourager, true); break;
      case "avance": champ = chipsChoix("avance", AVANCES, String(k.avance || 0)); break;
      case "eau": champ = `${chipsChoix("eau", Object.fromEntries(window.NIVEAUX_EAU.map(n => [String(n.niveau), n.label])), String(k.eau || 0))}
        <p class="muted small">${window.NIVEAUX_EAU.map(n => `<b>${n.label}</b> : ${n.desc}`).join("<br>")}</p>`; break;
      case "apaise": champ = `<label>Ce qui l'apaise<textarea name="apaise" rows="2">${esc(k.apaise)}</textarea></label>
        <label>Peurs ou sensibilités<textarea name="peurs" rows="2">${esc(k.peurs)}</textarea></label>`; break;
    }
    return `<form data-form="quiz" class="form quiz">
      <div class="quiz-head">${avatar(k, "lg")}<div><strong>${esc(k.nom)}</strong><span class="muted small">Question ${q.step + 1} sur ${total}${q.ids.length > 1 ? ` · enfant ${q.idx + 1} sur ${q.ids.length}` : ""}</span></div></div>
      <div class="progress"><span style="width:${Math.round(100 * q.step / total)}%"></span></div>
      <h2 class="q">${esc(etape.titre(k))}</h2>
      ${etape.aide ? `<p class="muted">${esc(etape.aide)}</p>` : ""}
      <div class="quiz-champ">${champ}</div>
      <div class="form-actions">
        ${q.step > 0 ? `<button type="button" class="btn ghost" data-action="quiz-back">← Retour</button>` : `<button type="button" class="btn ghost" data-action="close-modal">Plus tard</button>`}
        <button type="button" class="btn ghost" data-action="quiz-skip">Passer</button>
        <button type="submit" class="btn primary">${q.step === total - 1 ? "Terminer" : "Suivant →"}</button>
      </div>
    </form>`;
  }

  function vueQuizFin() {
    const q = ui.quiz;
    const k = child(q.ids[q.idx]);
    const suivant = child(q.ids[q.idx + 1]);
    const reco = recommander([k], {}, 0.61).slice(0, 3);
    return `<div class="form quiz">
      <div class="quiz-head">${avatar(k, "lg")}<div><strong>Profil de ${esc(k.nom)} complété 🎉</strong><span class="muted small">Vous pourrez tout modifier plus tard dans « ✏️ Profil ».</span></div></div>
      <h3>Premières idées pour ${esc(k.nom)}</h3>
      ${listeActivites(reco, [k])}
      <div class="form-actions">
        ${suivant ? `<button class="btn primary" data-action="quiz-next-child">Continuer avec ${esc(suivant.nom)} →</button>` : `<button class="btn primary" data-action="quiz-done">Terminer</button>`}
      </div>
    </div>`;
  }

  function enregistrerQuiz(form) {
    const q = ui.quiz;
    const k = child(q.ids[q.idx]);
    const fd = new FormData(form);
    const id = QUIZ[q.step].id;
    if (id === "interets" || id === "aEncourager") k[id] = fd.getAll(id);
    else if (id === "eau" || id === "avance") k[id] = parseInt(fd.get(id) || "0", 10);
    else if (id === "apaise") { k.apaise = (fd.get("apaise") || "").trim(); k.peurs = (fd.get("peurs") || "").trim(); }
    else if (fd.get(id) !== null) k[id] = fd.get(id);
    save();
  }

  function quizAvancer() {
    const q = ui.quiz;
    if (q.step < QUIZ.length - 1) { q.step++; openModal(vueQuiz()); }
    else { render(); openModal(vueQuizFin()); }
  }

  // ───────────────────────── Onglet : Développement ─────────────────────────
  function renderDeveloppement() {
    const d = ui.dev;
    if (!state.enfants.length) return `<p class="empty">Ajoutez d'abord un enfant dans l'onglet « Enfants ».</p>`;
    if (!child(d.childId)) d.childId = state.enfants[0].id;
    const k = child(d.childId);
    const m = ageMois(k);
    const trancheIdx = m === null ? -1 : window.TRANCHES.indexOf(tranchePour(m));
    const idx = trancheIdx < 0 ? -1 : Math.min(Math.max(trancheIdx + d.offset, 0), window.TRANCHES.length - 1);
    const t = idx < 0 ? null : window.TRANCHES[idx];

    const selecteur = `<div class="seg kids">${state.enfants.map(e => `<button class="${e.id === k.id ? "on" : ""}" data-action="dev-child" data-id="${e.id}">${nomAvecEmbleme(e)}</button>`).join("")}</div>`;
    const sections = `<div class="seg big">
      <button class="${d.section === "motricite" ? "on" : ""}" data-action="dev-section" data-v="motricite">🤸 Motricité</button>
      <button class="${d.section === "mental" ? "on" : ""}" data-action="dev-section" data-v="mental">🧠 Mental</button>
    </div>`;
    const subs = `<div class="seg small">${Object.entries(SUBS[d.section]).map(([v, l]) => `<button class="${d.sub === v ? "on" : ""}" data-action="dev-sub" data-v="${v}">${l}</button>`).join("")}</div>`;

    let contenu = "";
    const navTranche = t ? `<div class="tranche-nav">
        <button class="btn small ghost" data-action="dev-offset" data-v="-1" ${idx === 0 ? "disabled" : ""}>‹</button>
        <span>Repères <strong>${t.label}</strong>${d.offset ? ` <em>(${k.nom} : ${ageTexte(k)})</em>` : ""}</span>
        <button class="btn small ghost" data-action="dev-offset" data-v="1" ${idx === window.TRANCHES.length - 1 ? "disabled" : ""}>›</button>
      </div>` : `<p class="hint">👉 Renseignez la date de naissance de ${esc(k.nom)} pour voir les repères de son âge.</p>`;

    const SRC = window.SOURCES_REPERES;
    const checklist = (items, prefix) => (items && items.length) ? `<ul class="checklist">${items.map(it => {
      const key = prefix + "|" + it.t;
      const badges = (it.s || []).map(c => `<abbr class="src" title="${esc(SRC[c].nom)}">${c}</abbr>`).join("");
      return `<li><label><input type="checkbox" data-action="toggle-acquis" data-key="${esc(key)}" ${k.acquis[key] ? "checked" : ""}><span>${esc(it.t)} ${badges}</span></label></li>`;
    }).join("")}</ul>` : `<p class="muted">Pas de repère vérifié pour ce domaine à cet âge dans l'application.</p>`;

    const disclaimer = `<p class="disclaimer">Repères indicatifs, pas des normes : chaque enfant avance à son rythme. Les lettres renvoient aux sources (bas de page). En cas de question, parlez-en à votre médecin ou pédiatre, qui dispose de la grille de repérage de la Haute Autorité de santé (2020).</p>`;
    const sources = `<details class="card soft sources"><summary>📚 Sources des repères</summary><ul>${Object.entries(SRC).map(([c, x]) => `<li><abbr class="src">${c}</abbr> <a href="${x.url}" target="_blank" rel="noopener">${esc(x.nom)}</a> — ${esc(x.note)}</li>`).join("")}</ul>
      <p class="muted small">Repères recoupés entre ces sources en septembre 2026. Ils peuvent évoluer : vérifiez auprès des sources officielles.</p></details>`;
    const conseils = key => window.CONSEILS[key] ? `<div class="card soft"><h3>💡 Conseils</h3><ul class="tips">${window.CONSEILS[key].map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>` : "";

    if (d.section === "motricite" && d.sub === "aquatique") {
      const niv = window.NIVEAUX_EAU[k.eau || 0];
      contenu = `<div class="card">
          <h3>💧 Aisance dans l'eau de ${esc(k.nom)}</h3>
          <div class="chip-group">${window.NIVEAUX_EAU.map(n => `<button class="chip-btn ${n.niveau === (k.eau || 0) ? "on" : ""}" data-action="set-eau" data-v="${n.niveau}">${esc(n.label)}</button>`).join("")}</div>
          <p class="muted">${esc(niv.desc)}</p>
          <h4>Étapes franchies</h4>
          <ul class="checklist">${window.ETAPES_EAU.map(e => { const key = "eau|" + e.id; return `<li><label><input type="checkbox" data-action="toggle-acquis" data-key="${key}" ${k.acquis[key] ? "checked" : ""}><span>${esc(e.label)}</span></label></li>`; }).join("")}</ul>
        </div>
        ${conseils("aquatique")}
        <h3 class="section-title">Activités dans l'eau pour ${esc(k.nom)}</h3>
        ${listeActivites(recommander([k], { lieu: "aquatique" }, 0.21), [k])}
        <p class="hint">Les activités demandant plus d'aisance apparaîtront quand vous ferez évoluer son niveau.</p>`;
    } else if (d.section === "motricite") {
      contenu = `${navTranche}
        ${t ? `<div class="card"><h3>🤸 Ce qui se met souvent en place</h3>${checklist(t.reperes.motricite, t.id + "|motricite")}${disclaimer}</div>` : ""}
        ${conseils(d.sub)}
        <h3 class="section-title">Activités motrices · ${SUBS.motricite[d.sub]}</h3>
        ${listeActivites(recommander([k], { lieu: d.sub, domaines: ["motricite_globale", "motricite_fine"] }, 0.13), [k])}
        ${t ? sources : ""}`;
    } else {
      const domaines = { langage: ["langage"], cognitif: ["cognitif"], emotions: ["emotions", "social"], creativite: ["creativite"] }[d.sub];
      const cleReperes = { langage: "langage", cognitif: "cognitif", emotions: "emotions" }[d.sub];
      contenu = `${cleReperes ? navTranche : ""}
        ${t && cleReperes ? `<div class="card"><h3>${SUBS.mental[d.sub]} : ce qui se met souvent en place</h3>${checklist(t.reperes[cleReperes], t.id + "|" + cleReperes)}${disclaimer}</div>` : ""}
        ${conseils(d.sub)}
        <h3 class="section-title">Activités · ${SUBS.mental[d.sub]}</h3>
        ${listeActivites(recommander([k], { domaines }, 0.29), [k])}
        ${t && cleReperes ? sources : ""}`;
    }
    return selecteur + sections + subs + contenu;
  }

  // ───────────────────────── Onglet : Activité du moment ─────────────────────────
  function renderActivite() {
    const w = ui.wiz;
    const kids = kidsFor(w.who);
    const fil = [];
    if (w.who) fil.push(`<button class="crumb" data-action="wiz-goto" data-v="1">${w.who === "tous" ? kids.map(k => `<span class="inline-emb">${embleme(k)}</span>`).join("") + " " + esc(nomsKids(kids)) : nomAvecEmbleme(kids[0])}</button>`);
    if (w.moment) fil.push(`<button class="crumb" data-action="wiz-goto" data-v="2">${MOMENTS[w.moment].emoji} ${MOMENTS[w.moment].label}</button>`);
    if (w.lieu) fil.push(`<button class="crumb" data-action="wiz-goto" data-v="3">${w.lieu === "tous" ? "✨ Peu importe" : LIEUX[w.lieu].emoji + " " + LIEUX[w.lieu].label}</button>`);
    const filHtml = fil.length ? `<div class="crumbs">${fil.join("<span>›</span>")}</div>` : "";
    const steps = `<div class="steps">${[1, 2, 3, 4].map(i => `<span class="${w.step >= i ? "on" : ""}"></span>`).join("")}</div>`;

    let body = "";
    if (w.step === 1) {
      body = `<h2 class="q">Pour qui ?</h2><div class="choice-grid">
        ${state.enfants.map(k => `<button class="choice" data-action="wiz-who" data-v="${k.id}">${avatar(k, "lg")}<strong>${esc(k.nom)}</strong><span class="muted">${ageTexte(k)}</span></button>`).join("")}
        ${state.enfants.length > 1 ? `<button class="choice" data-action="wiz-who" data-v="tous"><span class="duo">${state.enfants.slice(0, 3).map(k => avatar(k, "lg")).join("")}</span><strong>${state.enfants.length === 2 ? "Les deux" : "Tous ensemble"}</strong><span class="muted">${esc(nomsKids(state.enfants))}</span></button>` : ""}
      </div>`;
    } else if (w.step === 2) {
      body = `<h2 class="q">Quel type de moment ?</h2><div class="choice-grid">
        ${Object.entries(MOMENTS).map(([v, m]) => `<button class="choice" data-action="wiz-moment" data-v="${v}"><span class="big-emoji">${m.emoji}</span><strong>${m.label}</strong><span class="muted">${m.desc}</span></button>`).join("")}
      </div>`;
    } else if (w.step === 3) {
      const dispo = l => recommander(kids, { moment: w.moment, lieu: l }, 0.5).length;
      body = `<h2 class="q">Où ?</h2><div class="choice-grid">
        ${Object.entries(LIEUX).map(([v, l]) => { const n = dispo(v); return `<button class="choice ${n ? "" : "disabled"}" data-action="wiz-lieu" data-v="${v}" ${n ? "" : "disabled"}><span class="big-emoji">${l.emoji}</span><strong>${l.label}</strong><span class="muted">${n ? n + " idée" + (n > 1 ? "s" : "") : "Pas d'idée ici"}</span></button>`; }).join("")}
        <button class="choice" data-action="wiz-lieu" data-v="tous"><span class="big-emoji">✨</span><strong>Peu importe</strong><span class="muted">Surprenez-moi</span></button>
      </div>`;
    } else {
      const res = recommander(kids, { moment: w.moment, lieu: w.lieu }, w.seed);
      const kidsAge = kids.filter(k => ageMois(k) === null);
      body = `<h2 class="q">Nos idées pour ${esc(nomsKids(kids))}</h2>
        ${kidsAge.length ? `<p class="hint">👉 Âge non renseigné pour ${esc(nomsKids(kidsAge))} : les propositions ne sont pas filtrées par âge.</p>` : ""}
        ${listeActivites(res, kids, w.shown)}
        <div class="row">
          ${res.length > 1 ? `<button class="btn ghost" data-action="wiz-shuffle">🔀 D'autres idées</button>` : ""}
          ${res.length > w.shown ? `<button class="btn ghost" data-action="wiz-more">➕ Voir plus (${res.length - w.shown})</button>` : ""}
          <button class="btn ghost" data-action="wiz-reset">↺ Recommencer</button>
        </div>`;
    }
    return steps + filHtml + body;
  }

  // ───────────────────────── Onglet : Journal ─────────────────────────
  function renderJournal() {
    const entrees = state.journal.slice().sort((a, b) => b.date.localeCompare(a.date));
    const moisFmt = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });
    const jourFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short" });
    let html = `<button class="btn primary block" data-action="new-entry">✍️ Noter un moment</button>`;

    // Équilibre des 30 derniers jours
    const bilan = state.enfants.map(k => {
      const compte = {};
      state.journal.filter(j => j.enfants.includes(k.id) && daysAgo(j.date) <= 30 && ACT_BY_ID[j.activiteId])
        .forEach(j => ACT_BY_ID[j.activiteId].domaines.forEach(d => { compte[d] = (compte[d] || 0) + 1; }));
      return `<div class="bilan-row"><div class="bilan-name">${avatar(k)} ${esc(k.nom)}</div><div class="tags">${Object.keys(DOMAINES).map(d => `<span class="tag ${compte[d] ? "ok" : "off"}" title="${DOMAINES[d].label}">${DOMAINES[d].emoji} ${compte[d] || 0}</span>`).join("")}</div></div>`;
    }).join("");
    html += `<div class="card"><h3>⚖️ Équilibre des 30 derniers jours</h3><p class="muted">Domaines travaillés via les activités notées. Les pastilles grisées sont à explorer.</p>${bilan}
      <p class="legend">${Object.values(DOMAINES).map(d => d.emoji + " " + d.label).join(" · ")}</p></div>`;

    // Favoris
    const favs = state.favoris.map(id => ACT_BY_ID[id]).filter(Boolean);
    if (favs.length) html += `<h3 class="section-title">♥ Activités favorites</h3>${listeActivites(favs.map(a => ({ a, raisons: [] })), state.enfants)}`;

    // Souvenirs
    html += `<h3 class="section-title">📔 Souvenirs</h3>`;
    if (!entrees.length) html += `<p class="empty">Aucun moment noté pour l'instant. Après une activité, touchez « On l'a fait » pour garder une trace : ressenti, progrès, anecdotes…</p>`;
    let moisCourant = "";
    entrees.forEach(j => {
      const d = new Date(j.date + "T12:00:00");
      const mois = moisFmt.format(d);
      if (mois !== moisCourant) { html += `<h4 class="month">${mois}</h4>`; moisCourant = mois; }
      const kids = j.enfants.map(child).filter(Boolean);
      const act = ACT_BY_ID[j.activiteId];
      html += `<article class="card entry">
        <div class="entry-head">
          <span class="date">${jourFmt.format(d)}</span>
          <span>${kids.map(k => avatar(k, "sm")).join("")}</span>
          ${j.ressenti ? `<span class="mood" title="${esc(RESSENTIS[j.ressenti] || "")}">${esc(j.ressenti)}</span>` : ""}
        </div>
        <strong>${j.progres ? "⭐ " : ""}${esc(j.titre || (act ? act.titre : "Moment"))}</strong>
        ${j.note ? `<p>${esc(j.note).replace(/\n/g, "<br>")}</p>` : ""}
        <div class="entry-actions"><button class="btn small ghost" data-action="edit-entry" data-id="${j.id}">Modifier</button></div>
      </article>`;
    });
    return html;
  }

  function formEntree(j) {
    const act = ACT_BY_ID[j.activiteId];
    return `<form data-form="entry" data-id="${j.id}" class="form">
      <h2>${act ? act.emoji + " " + esc(act.titre) : "Noter un moment"}</h2>
      <label>Date<input type="date" name="date" value="${esc(j.date)}" max="${today()}" required></label>
      <div class="field"><span>Avec</span><div class="chip-group">${state.enfants.map(k => `<label class="chip"><input type="checkbox" name="enfants" value="${k.id}" ${j.enfants.includes(k.id) ? "checked" : ""}><span>${nomAvecEmbleme(k)}</span></label>`).join("")}</div></div>
      <label>Activité liée (facultatif)<select name="activiteId"><option value="">— Aucune —</option>${ACTIVITES.slice().sort((a, b) => a.titre.localeCompare(b.titre, "fr")).map(a => `<option value="${a.id}" ${a.id === j.activiteId ? "selected" : ""}>${a.emoji} ${esc(a.titre)}</option>`).join("")}</select></label>
      <label>Titre (facultatif)<input name="titre" value="${esc(j.titre)}" placeholder="Ex. : premier plongeon !"></label>
      <div class="field"><span>Comment ça s'est passé ?</span>${chipsChoix("ressenti", Object.fromEntries(Object.entries(RESSENTIS).map(([e, l]) => [e, e + " " + l])), j.ressenti)}</div>
      <label class="check"><input type="checkbox" name="progres" ${j.progres ? "checked" : ""}> ⭐ Une première fois ou un progrès</label>
      <label>Notes, anecdotes, mots d'enfant<textarea name="note" rows="4">${esc(j.note)}</textarea></label>
      <div class="form-actions">
        ${state.journal.some(e => e.id === j.id) ? `<button type="button" class="btn danger ghost" data-action="delete-entry" data-id="${j.id}">Supprimer</button>` : ""}
        <button type="button" class="btn ghost" data-action="close-modal">Annuler</button>
        <button type="submit" class="btn primary">Enregistrer</button>
      </div>
    </form>`;
  }

  function saveEntryForm(form) {
    const fd = new FormData(form);
    const id = form.dataset.id;
    let j = state.journal.find(e => e.id === id);
    const isNew = !j;
    if (isNew) j = { id };
    j.date = fd.get("date") || today();
    j.enfants = fd.getAll("enfants");
    j.activiteId = fd.get("activiteId") || "";
    j.titre = (fd.get("titre") || "").trim();
    j.ressenti = fd.get("ressenti") || "";
    j.progres = !!fd.get("progres");
    j.note = (fd.get("note") || "").trim();
    if (!j.enfants.length) { toast("Choisissez au moins un enfant."); return; }
    if (isNew) state.journal.push(j);
    save();
    closeModal();
    toast("Moment enregistré dans le journal 📔");
    render();
  }

  // ───────────────────────── Fiche activité ─────────────────────────
  function ficheActivite(a, kids) {
    const recos = kids.length ? recommander(kids, {}, 0.5).find(r => r.a.id === a.id) : null;
    const fav = state.favoris.includes(a.id);
    return `<div class="fiche">
      <div class="fiche-head"><span class="big-emoji">${a.emoji}</span><h2>${esc(a.titre)}</h2></div>
      <div class="tags">
        <span class="tag">⏱ ${a.duree} min</span><span class="tag">👶 ${ageRange(a.age)}</span>
        ${a.lieux.map(l => `<span class="tag">${LIEUX[l].emoji} ${LIEUX[l].label}</span>`).join("")}
        ${a.fratrie === "ideal" ? `<span class="tag">👫 Idéal à plusieurs</span>` : a.fratrie === "duo" ? `<span class="tag">👫 Pour les deux</span>` : ""}
        ${a.lien ? `<span class="tag">💛 Crée du lien</span>` : ""}
      </div>
      <p class="lead">${esc(a.resume)}</p>
      ${recos && recos.raisons.length ? `<div class="card soft"><strong>✨ Pourquoi pour ${esc(nomsKids(kids))} ?</strong><ul class="tips">${recos.raisons.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>` : ""}
      <h3>Comment faire</h3>
      <ol class="etapes">${a.etapes.map(e => `<li>${esc(e)}</li>`).join("")}</ol>
      <p><strong>🧺 Matériel :</strong> ${esc(a.materiel)}</p>
      <p><strong>🌱 Ce que ça développe :</strong> ${esc(a.benefices)}</p>
      <div class="tags">${a.domaines.map(d => `<span class="tag">${DOMAINES[d].emoji} ${DOMAINES[d].label}</span>`).join("")}</div>
      ${a.securite ? `<div class="safety">⚠️ <strong>Sécurité :</strong> ${esc(a.securite)}</div>` : ""}
      <div class="form-actions">
        <button class="btn ghost" data-action="toggle-fav" data-id="${a.id}">${fav ? "♥ Retirer des favoris" : "♡ Favori"}</button>
        <button class="btn primary" data-action="done-activity" data-id="${a.id}" data-kids="${kids.map(k => k.id).join(",")}">✓ On l'a fait !</button>
      </div>
    </div>`;
  }

  // ───────────────────────── Onglet : Famille ─────────────────────────
  const FAM_SUBS = { routines: "🌅 Routines", bibliotheque: "📚 Bibliothèque", defis: "🏆 Défis" };
  const BIB_STATUTS = {
    livre: { envie: "📌 À lire", fait: "✅ Lu" },
    comptine: { envie: "📌 À apprendre", fait: "✅ Connue" }
  };
  const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

  function renderFamille() {
    const f = ui.fam;
    const seg = `<div class="seg big">${Object.entries(FAM_SUBS).map(([v, l]) => `<button class="${f.sub === v ? "on" : ""}" data-action="fam-sub" data-v="${v}">${l}</button>`).join("")}</div>`;
    const contenu = { routines: renderRoutines, bibliotheque: renderBibliotheque, defis: renderDefis }[f.sub]();
    return seg + contenu;
  }

  // ── Routines en images ──
  function etapeParLabel(label) {
    const e = window.ETAPES_ROUTINE.find(x => x.label === label) || { emoji: "⭐", label };
    return { id: uid(), emoji: e.emoji, label: e.label };
  }
  function routinesDe(k) { return state.routines.filter(r => r.enfantId === k.id); }
  function faitesAujourdhui(r) { return state.routineLog[today() + "|" + r.id] || []; }
  function routineTerminee(r, faites) { return r.etapes.length > 0 && r.etapes.every(e => faites.includes(e.id)); }
  function nbRoutinesReussies(k) {
    const ids = routinesDe(k);
    return Object.entries(state.routineLog).filter(([key, faites]) => {
      const r = ids.find(x => x.id === key.split("|")[1]);
      return r && routineTerminee(r, faites);
    }).length;
  }
  function nettoyerLog() {
    for (const key of Object.keys(state.routineLog)) if (daysAgo(key.split("|")[0]) > 120) delete state.routineLog[key];
  }

  function renderRoutines() {
    if (!state.enfants.length) return `<p class="empty">Ajoutez d'abord un enfant dans l'onglet « Enfants ».</p>`;
    if (!child(ui.fam.childId)) ui.fam.childId = state.enfants[0].id;
    const k = child(ui.fam.childId);
    const selecteur = `<div class="seg kids">${state.enfants.map(e => `<button class="${e.id === k.id ? "on" : ""}" data-action="fam-child" data-id="${e.id}">${nomAvecEmbleme(e)}</button>`).join("")}</div>`;
    const routines = routinesDe(k);
    const m = ageMois(k);
    let html = selecteur;
    if (!routines.length) {
      html += `<div class="card"><h3>🌅 Des routines en images pour ${esc(k.nom)}</h3>
        <p>Une suite d'images montre à l'enfant les étapes du matin ou du coucher. Il coche lui-même chaque étape : c'est plus clair pour lui, et ça évite de répéter les consignes.</p>
        <button class="btn primary" data-action="routine-defaut" data-id="${k.id}">✨ Créer « Le matin » et « Le coucher »</button>
        <button class="btn ghost" data-action="routine-new" data-id="${k.id}">➕ Routine vide</button></div>`;
    } else {
      const stars = nbRoutinesReussies(k);
      if (stars) html += `<p class="stars">⭐ ${stars} routine${stars > 1 ? "s" : ""} terminée${stars > 1 ? "s" : ""} par ${esc(k.nom)} ces derniers mois</p>`;
      html += routines.map(r => {
        const faites = faitesAujourdhui(r);
        const n = r.etapes.filter(e => faites.includes(e.id)).length;
        const pct = r.etapes.length ? Math.round(100 * n / r.etapes.length) : 0;
        return `<article class="card routine">
          <div class="routine-head"><span class="big-emoji">${esc(r.emoji)}</span><div><h3>${esc(r.nom)}</h3><span class="muted">Aujourd'hui : ${n}/${r.etapes.length}${routineTerminee(r, faites) ? " 🎉" : ""}</span></div></div>
          <div class="progress"><span style="width:${pct}%"></span></div>
          <div class="mini-steps">${r.etapes.map(e => `<span class="${faites.includes(e.id) ? "done" : ""}" title="${esc(e.label)}">${esc(e.emoji)}</span>`).join("")}</div>
          <div class="row">
            <button class="btn primary" data-action="routine-play" data-id="${r.id}">▶️ Mode enfant</button>
            <button class="btn ghost" data-action="routine-edit" data-id="${r.id}">✏️ Modifier</button>
          </div>
        </article>`;
      }).join("");
      html += `<button class="btn block ghost" data-action="routine-new" data-id="${k.id}">➕ Nouvelle routine (retour d'école, repas…)</button>`;
    }
    html += `<div class="card soft"><h3>💡 Conseils</h3><ul class="tips">
      ${m !== null && m < 24 ? `<li>Avant 2 ans, c'est surtout vous qui montrez les images en nommant chaque étape : la répétition rassure.</li>` : ""}
      <li>Peu d'étapes au début (3 ou 4), puis on en ajoute.</li>
      <li>Laisser l'enfant toucher lui-même l'image quand l'étape est faite.</li>
      <li>Féliciter l'effort (« tu t'es habillé tout seul ! ») plutôt que de récompenser avec des objets.</li>
    </ul></div>`;
    return html;
  }

  function vueModeEnfant(r) {
    const k = child(r.enfantId);
    const faites = faitesAujourdhui(r);
    const fini = routineTerminee(r, faites);
    return `<div class="kid-mode">
      <h2>${esc(r.emoji)} ${esc(r.nom)}${k ? ` <span class="muted">· ${esc(k.nom)}</span>` : ""}</h2>
      <div class="progress big"><span style="width:${r.etapes.length ? Math.round(100 * faites.filter(id => r.etapes.some(e => e.id === id)).length / r.etapes.length) : 0}%"></span></div>
      ${fini ? `<div class="bravo">🎉<strong>Bravo ${k ? esc(k.nom) : ""} !</strong><span>Tu as tout fait !</span></div>` : ""}
      <div class="kid-grid">${r.etapes.map((e, i) => `<button class="kid-step ${faites.includes(e.id) ? "done" : ""}" data-action="routine-step" data-r="${r.id}" data-e="${e.id}">
        <span class="num">${i + 1}</span><span class="e">${esc(e.emoji)}</span><span class="l">${esc(e.label)}</span></button>`).join("")}</div>
      <div class="form-actions"><button class="btn ghost" data-action="close-modal">Fermer</button></div>
    </div>`;
  }

  function vueEditeurRoutine(r) {
    return `<div class="form">
      <h2>✏️ Modifier la routine</h2>
      <label>Nom<input value="${esc(r.nom)}" data-action="routine-rename" data-id="${r.id}"></label>
      <div class="field"><span>Icône</span><div class="chip-group">${["🌅", "🌙", "🏫", "🍽️", "🛁", "⚽", "🧹", "⭐"].map(em => `<button type="button" class="chip-btn ${r.emoji === em ? "on" : ""}" data-action="routine-icon" data-id="${r.id}" data-v="${em}">${em}</button>`).join("")}</div></div>
      <h3>Étapes</h3>
      ${r.etapes.length ? `<ol class="edit-steps">${r.etapes.map((e, i) => `<li><span class="e">${esc(e.emoji)}</span><span class="l">${esc(e.label)}</span>
        <button type="button" class="btn small ghost" data-action="step-move" data-id="${r.id}" data-i="${i}" data-v="-1" ${i === 0 ? "disabled" : ""} aria-label="Monter">↑</button>
        <button type="button" class="btn small ghost" data-action="step-move" data-id="${r.id}" data-i="${i}" data-v="1" ${i === r.etapes.length - 1 ? "disabled" : ""} aria-label="Descendre">↓</button>
        <button type="button" class="btn small ghost danger" data-action="step-del" data-id="${r.id}" data-i="${i}" aria-label="Supprimer">✕</button></li>`).join("")}</ol>` : `<p class="empty">Aucune étape : ajoutez-en ci-dessous.</p>`}
      <div class="field"><span>Ajouter une étape</span><div class="chip-group">${window.ETAPES_ROUTINE.map(e => `<button type="button" class="chip-btn" data-action="step-add" data-id="${r.id}" data-v="${esc(e.label)}">${e.emoji} ${esc(e.label)}</button>`).join("")}</div></div>
      <form data-form="step-custom" data-id="${r.id}" class="inline-form">
        <input name="emoji" maxlength="4" placeholder="🙂" aria-label="Emoji">
        <input name="label" placeholder="Autre étape…" required aria-label="Nom de l'étape">
        <button class="btn" type="submit">Ajouter</button>
      </form>
      <div class="form-actions">
        <button type="button" class="btn danger ghost" data-action="routine-del" data-id="${r.id}">Supprimer la routine</button>
        <button type="button" class="btn primary" data-action="close-modal">Terminé</button>
      </div>
    </div>`;
  }

  // ── Bibliothèque ──
  function renderBibliotheque() {
    const f = ui.fam;
    const type = f.bibType;
    const statuts = BIB_STATUTS[type];
    let items = state.bibliotheque.filter(b => b.type === type);
    const total = items.length;
    if (f.bibFiltre === "coeur") items = items.filter(b => b.coeur);
    else if (f.bibFiltre !== "tous") items = items.filter(b => b.statut === f.bibFiltre);
    items.sort((a, b) => (b.coeur - a.coeur) || (b.derniere || "").localeCompare(a.derniere || "") || a.titre.localeCompare(b.titre, "fr"));
    const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });

    let html = `<div class="seg small">
      <button class="${type === "livre" ? "on" : ""}" data-action="bib-type" data-v="livre">📕 Livres</button>
      <button class="${type === "comptine" ? "on" : ""}" data-action="bib-type" data-v="comptine">🎵 Comptines & chansons</button>
    </div>
    <button class="btn primary block" data-action="bib-new">➕ Ajouter ${type === "livre" ? "un livre" : "une comptine"}</button>`;
    if (total) {
      const filtres = { tous: "Tous", coeur: "♥ Préférés", envie: statuts.envie, fait: statuts.fait };
      html += `<div class="seg">${Object.entries(filtres).map(([v, l]) => `<button class="${f.bibFiltre === v ? "on" : ""}" data-action="bib-filtre" data-v="${v}">${l}</button>`).join("")}</div>`;
    }
    if (!items.length) {
      html += `<p class="empty">${total ? "Rien dans ce filtre." : type === "livre" ? "Notez ici les livres lus, à lire et les grands préférés de chacun." : "Notez les comptines et chansons que vous chantez ensemble."}</p>`;
    } else {
      html += `<div class="bib-list">${items.map(b => {
        const kids = (b.enfants || []).map(child).filter(Boolean);
        return `<article class="card bib-item">
          <div class="bib-main" data-action="bib-edit" data-id="${b.id}">
            <strong>${b.coeur ? '<span class="fav">♥</span> ' : ""}${esc(b.titre)}</strong>
            ${b.auteur ? `<span class="muted">${esc(b.auteur)}</span>` : ""}
            <span class="meta">${kids.map(k => avatar(k, "sm")).join("")} ${kids.length ? "&nbsp;&nbsp;" : ""}${statuts[b.statut] || ""}${b.lectures ? ` · ${type === "livre" ? "lu" : "chanté"} ${b.lectures} fois` : ""}${b.derniere ? ` · dernière fois le ${fmt.format(new Date(b.derniere + "T12:00:00"))}` : ""}</span>
            ${b.note ? `<span class="muted small">${esc(b.note)}</span>` : ""}
          </div>
          <div class="bib-actions">
            <button class="btn small ghost" data-action="bib-plus" data-id="${b.id}" title="${type === "livre" ? "Lu aujourd'hui" : "Chantée aujourd'hui"}">+1 ${type === "livre" ? "📖" : "🎵"}</button>
            <button class="btn small ghost" data-action="bib-coeur" data-id="${b.id}" aria-label="Préféré">${b.coeur ? "♥" : "♡"}</button>
          </div>
        </article>`;
      }).join("")}</div>`;
    }
    if (type === "comptine") {
      const deja = new Set(state.bibliotheque.filter(b => b.type === "comptine").map(b => b.titre.toLowerCase()));
      const restantes = window.COMPTINES_CLASSIQUES.filter(t => !deja.has(t.toLowerCase()));
      if (restantes.length) html += `<div class="card soft"><h3>🎶 Comptines traditionnelles</h3><p class="muted">Touchez pour ajouter à votre liste.</p>
        <div class="chip-group">${restantes.map(t => `<button class="chip-btn" data-action="bib-classique" data-v="${esc(t)}">+ ${esc(t)}</button>`).join("")}</div></div>`;
    } else {
      html += `<div class="card soft"><h3>💡 Idées</h3><ul class="tips">
        <li>Relire le même livre encore et encore est normal chez les petits : la répétition aide à comprendre et à anticiper.</li>
        <li>La médiathèque ou bibliothèque municipale permet de varier sans acheter ; les bibliothécaires jeunesse sont de bon conseil.</li>
        <li>Notez les livres « à lire » quand un ami ou l'école en recommande un.</li></ul></div>`;
    }
    return html;
  }

  function formLivre(b) {
    const statuts = BIB_STATUTS[b.type];
    return `<form data-form="book" data-id="${b.id}" class="form">
      <h2>${state.bibliotheque.some(x => x.id === b.id) ? "Modifier" : "Ajouter"} ${b.type === "livre" ? "un livre" : "une comptine"}</h2>
      <input type="hidden" name="type" value="${b.type}">
      <label>Titre<input name="titre" required value="${esc(b.titre)}"></label>
      <label>${b.type === "livre" ? "Auteur / illustrateur" : "Origine (facultatif)"}<input name="auteur" value="${esc(b.auteur)}"></label>
      <div class="field"><span>Pour qui</span><div class="chip-group">${state.enfants.map(k => `<label class="chip"><input type="checkbox" name="enfants" value="${k.id}" ${(b.enfants || []).includes(k.id) ? "checked" : ""}><span>${nomAvecEmbleme(k)}</span></label>`).join("")}</div></div>
      <div class="field"><span>Statut</span>${chipsChoix("statut", statuts, b.statut)}</div>
      <label class="check"><input type="checkbox" name="coeur" ${b.coeur ? "checked" : ""}> ♥ Un grand préféré</label>
      <label>Notes<textarea name="note" rows="3" placeholder="Ex. : passage qu'il adore, âge conseillé, où l'emprunter…">${esc(b.note)}</textarea></label>
      <div class="form-actions">
        ${state.bibliotheque.some(x => x.id === b.id) ? `<button type="button" class="btn danger ghost" data-action="bib-del" data-id="${b.id}">Supprimer</button>` : ""}
        <button type="button" class="btn ghost" data-action="close-modal">Annuler</button>
        <button type="submit" class="btn primary">Enregistrer</button>
      </div>
    </form>`;
  }

  function saveBookForm(form) {
    const fd = new FormData(form);
    let b = state.bibliotheque.find(x => x.id === form.dataset.id);
    const isNew = !b;
    if (isNew) b = { id: form.dataset.id, lectures: 0, derniere: "" };
    b.type = fd.get("type");
    b.titre = (fd.get("titre") || "").trim();
    b.auteur = (fd.get("auteur") || "").trim();
    b.enfants = fd.getAll("enfants");
    b.statut = fd.get("statut") || "envie";
    b.coeur = !!fd.get("coeur");
    b.note = (fd.get("note") || "").trim();
    if (!b.titre) { toast("Indiquez un titre."); return; }
    if (isNew) state.bibliotheque.push(b);
    save(); closeModal(); render();
  }

  function nouveauLivre(type, titre) {
    return { id: uid(), type, titre: titre || "", auteur: "", enfants: state.enfants.map(k => k.id), statut: "envie", coeur: false, lectures: 0, derniere: "", note: "" };
  }

  // ── Défis de la semaine ──
  function lundiDe(d) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  }
  function cleSemaine(d) {
    const l = lundiDe(d || new Date());
    return l.getFullYear() + "-" + String(l.getMonth() + 1).padStart(2, "0") + "-" + String(l.getDate()).padStart(2, "0");
  }
  function jourSemaine() { return (new Date().getDay() + 6) % 7; }
  function defiDepuisBanque(d) {
    return { id: d.id, emoji: d.emoji, titre: d.titre, desc: d.desc, type: d.type, cible: d.cible, jours: [], fois: 0 };
  }
  function candidatsDefis(exclus) {
    const ages = state.enfants.map(ageMois).filter(m => m !== null);
    const aine = ages.length ? Math.max(...ages) : 1000;
    return window.DEFIS.filter(d => d.ageMin <= aine && !exclus.has(d.id));
  }
  function defisSemaine() {
    const key = cleSemaine();
    if (!state.defis[key]) {
      const recents = new Set();
      Object.keys(state.defis).sort().reverse().slice(0, 2).forEach(k => state.defis[k].forEach(d => recents.add(d.id)));
      let cand = candidatsDefis(recents);
      if (cand.length < 3) cand = candidatsDefis(new Set());
      state.defis[key] = cand.sort((a, b) => hash(a.id, hash(key, 0.7)) - hash(b.id, hash(key, 0.7))).slice(0, 3).map(defiDepuisBanque);
      save();
    }
    return state.defis[key];
  }
  function progresDefi(d) { return d.type === "jours" ? d.jours.length : d.fois; }
  function defiReussi(d) { return progresDefi(d) >= d.cible; }

  function renderDefis() {
    const key = cleSemaine();
    const defis = defisSemaine();
    const lundi = lundiDe(new Date());
    const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });
    const auj = jourSemaine();
    const totalReussis = Object.values(state.defis).reduce((n, l) => n + l.filter(defiReussi).length, 0);

    let html = `<div class="week-head"><h2>Semaine du ${fmt.format(lundi)}</h2>
      ${totalReussis ? `<span class="stars">🏆 ${totalReussis} défi${totalReussis > 1 ? "s" : ""} réussi${totalReussis > 1 ? "s" : ""} en famille</span>` : ""}</div>
      <p class="muted">Trois défis à relever ensemble, renouvelés chaque lundi. Changez ceux qui ne vous parlent pas !</p>`;
    html += defis.map((d, i) => {
      const p = progresDefi(d);
      const ok = defiReussi(d);
      const suivi = d.type === "jours"
        ? `<div class="days">${JOURS.map((j, n) => `<button class="day ${d.jours.includes(n) ? "on" : ""} ${n === auj ? "today" : ""}" data-action="defi-jour" data-i="${i}" data-v="${n}" ${n > auj ? "disabled" : ""} aria-label="Jour ${n + 1}">${j}</button>`).join("")}</div>`
        : `<div class="counter"><button class="btn small ghost" data-action="defi-fois" data-i="${i}" data-v="-1" ${d.fois <= 0 ? "disabled" : ""}>−</button><strong>${d.fois}</strong><button class="btn small" data-action="defi-fois" data-i="${i}" data-v="1">+</button></div>`;
      return `<article class="card defi ${ok ? "reussi" : ""}">
        <div class="defi-head"><span class="big-emoji">${esc(d.emoji)}</span><div><h3>${esc(d.titre)}</h3><p class="muted">${esc(d.desc)}</p></div></div>
        <div class="defi-suivi">${suivi}<span class="defi-score">${ok ? "🏆 Réussi !" : `${p}/${d.cible} ${d.type === "jours" ? "jours" : "fois"}`}</span></div>
        <div class="progress"><span style="width:${Math.min(100, Math.round(100 * p / d.cible))}%"></span></div>
        <div class="row end">
          <button class="btn small ghost" data-action="defi-changer" data-i="${i}">🔄 Changer</button>
          <button class="btn small ghost" data-action="defi-retirer" data-i="${i}">✕ Retirer</button>
        </div>
      </article>`;
    }).join("");
    html += `<button class="btn block ghost" data-action="defi-ajouter">➕ Ajouter un défi</button>`;

    const passees = Object.keys(state.defis).filter(k => k < key).sort().reverse().slice(0, 8);
    if (passees.length) {
      html += `<h3 class="section-title">📅 Semaines passées</h3><div class="card">${passees.map(k => {
        const l = state.defis[k];
        const n = l.filter(defiReussi).length;
        return `<div class="past-week"><span>Semaine du ${fmt.format(new Date(k + "T12:00:00"))}</span><span>${l.map(d => `<span title="${esc(d.titre)}" class="${defiReussi(d) ? "" : "off"}">${esc(d.emoji)}</span>`).join(" ")}</span><strong>${n}/${l.length}</strong></div>`;
      }).join("")}</div>`;
    }
    return html;
  }

  function vueAjoutDefi() {
    const actuels = new Set(defisSemaine().map(d => d.id));
    const cand = candidatsDefis(actuels);
    return `<div class="form">
      <h2>➕ Ajouter un défi</h2>
      <div class="defi-bank">${cand.map(d => `<button class="act-card" data-action="defi-pick" data-v="${d.id}"><span class="act-emoji">${d.emoji}</span><span class="act-body"><strong>${esc(d.titre)}</strong><span class="muted">${esc(d.desc)}</span></span></button>`).join("")}</div>
      <h3 class="section-title">Ou inventez le vôtre</h3>
      <form data-form="defi-custom">
        <label>Emoji<input name="emoji" maxlength="4" placeholder="⭐"></label>
        <label>Défi<input name="titre" required placeholder="Ex. : aller voir les canards"></label>
        <label>Détails<input name="desc"></label>
        <div class="field"><span>Suivi</span>${chipsChoix("type", { jours: "Chaque jour", fois: "Un nombre de fois" }, "fois")}</div>
        <label>Objectif (jours ou fois)<input type="number" name="cible" min="1" max="7" value="1"></label>
        <div class="form-actions"><button type="button" class="btn ghost" data-action="close-modal">Annuler</button><button class="btn primary" type="submit">Ajouter</button></div>
      </form>
    </div>`;
  }

  // ───────────────────────── Réglages / sauvegarde ─────────────────────────
  function renderReglages() {
    return `<div class="form">
      <h2>⚙️ Sauvegarde & confidentialité</h2>
      <p>Toutes les données (profils, journal) sont enregistrées <strong>uniquement dans ce navigateur, sur cet appareil</strong>. Rien n'est envoyé sur internet.</p>
      <div class="safety">⚠️ <strong>Important :</strong> supprimer l'icône de l'écran d'accueil ou vider les données du navigateur peut <strong>effacer définitivement</strong> les informations. Faites une sauvegarde avant, et régulièrement.</div>
      <p class="muted">${state.derniereSauvegarde ? "Dernière sauvegarde : " + new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(state.derniereSauvegarde + "T12:00:00")) : "Aucune sauvegarde faite pour l'instant."}</p>
      <h3>📲 Passer les données sur l'autre téléphone</h3>
      <ol class="etapes"><li>Sur ce téléphone : « Envoyer » (par Messages, WhatsApp, AirDrop, e-mail…).</li><li>Sur l'autre téléphone : enregistrer le fichier reçu, puis « Importer ».</li></ol>
      <div class="form-actions stack">
        <button class="btn primary" data-action="share">📤 Envoyer la sauvegarde</button>
        <button class="btn ghost" data-action="export">⬇️ Télécharger la sauvegarde</button>
        <label class="btn ghost">⬆️ Importer une sauvegarde<input type="file" accept="application/json,.json,text/plain" data-action="import" hidden></label>
        <button class="btn danger ghost" data-action="reset">🗑️ Tout effacer</button>
        <button class="btn ghost" data-action="close-modal">Fermer</button>
      </div>
    </div>`;
  }

  function marquerSauvegarde() {
    state.derniereSauvegarde = today();
    save();
    render();
  }

  function exporter() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "titi-loulou-sauvegarde-" + today() + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    marquerSauvegarde();
  }

  async function partager() {
    const nom = "titi-loulou-sauvegarde-" + today() + ".json";
    const fichier = new File([JSON.stringify(state)], nom, { type: "application/json" });
    if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
      try { await navigator.share({ files: [fichier], title: "Sauvegarde Titi & Loulou" }); marquerSauvegarde(); toast("Sauvegarde envoyée ✓"); }
      catch (e) { /* partage annulé */ }
    } else {
      exporter();
      toast("Partage direct indisponible : fichier téléchargé.");
    }
  }

  // ── Import : fusion (recommandée) ou remplacement ──
  let importEnAttente = null;

  function importer(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.enfants)) throw new Error("format");
        importEnAttente = migrate(data);
        const d = importEnAttente;
        openModal(`<div class="form">
          <h2>⬆️ Importer une sauvegarde</h2>
          <p>Ce fichier contient : <strong>${d.enfants.map(k => esc(k.nom)).join(", ") || "aucun enfant"}</strong>,
            ${d.journal.length} souvenir${d.journal.length > 1 ? "s" : ""}, ${d.bibliotheque.length} livre${d.bibliotheque.length > 1 ? "s" : ""} ou comptine${d.bibliotheque.length > 1 ? "s" : ""}, ${d.routines.length} routine${d.routines.length > 1 ? "s" : ""}.</p>
          <div class="form-actions stack">
            <button class="btn primary" data-action="import-fusion">🔀 Fusionner avec ce téléphone (recommandé)</button>
            <p class="muted small">Ajoute ce qui manque et complète les profils, sans rien effacer. Les enfants de même prénom sont regroupés.</p>
            <button class="btn danger ghost" data-action="import-remplacer">Remplacer toutes les données de ce téléphone</button>
            <button class="btn ghost" data-action="close-modal">Annuler</button>
          </div>
        </div>`);
      } catch (e) { toast("⚠️ Fichier invalide."); }
    };
    reader.readAsText(file);
  }

  const vide = v => v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length);
  const union = (a, b) => [...new Set([...(a || []), ...(b || [])])];

  /* Fusionne la sauvegarde importée dans l'état local, sans rien supprimer. */
  function fusionner(local, imp) {
    const stats = { enfants: 0, souvenirs: 0, livres: 0, routines: 0 };
    const idEnfant = {};
    for (const ki of imp.enfants) {
      let kl = local.enfants.find(k => k.id === ki.id) ||
        local.enfants.find(k => k.nom.trim().toLowerCase() === ki.nom.trim().toLowerCase());
      if (!kl) { local.enfants.push(ki); idEnfant[ki.id] = ki.id; stats.enfants++; continue; }
      idEnfant[ki.id] = kl.id;
      for (const [cle, val] of Object.entries(ki)) {
        if (["id", "nom", "acquis"].includes(cle)) continue;
        if (Array.isArray(val)) kl[cle] = union(kl[cle], val);
        else if (vide(kl[cle]) || (typeof val === "number" && val > (kl[cle] || 0))) kl[cle] = val;
      }
      for (const [cle, date] of Object.entries(ki.acquis || {})) {
        if (!kl.acquis[cle] || date < kl.acquis[cle]) kl.acquis[cle] = date;
      }
    }
    const mapEnfants = ids => union([], (ids || []).map(id => idEnfant[id] || id)).filter(id => local.enfants.some(k => k.id === id));

    const signature = j => [j.date, j.activiteId, j.titre, j.note].join("|");
    for (const j of imp.journal) {
      if (local.journal.some(x => x.id === j.id || signature(x) === signature(j))) continue;
      local.journal.push({ ...j, enfants: mapEnfants(j.enfants) });
      stats.souvenirs++;
    }
    local.favoris = union(local.favoris, imp.favoris);

    for (const b of imp.bibliotheque) {
      const bl = local.bibliotheque.find(x => x.id === b.id || (x.type === b.type && x.titre.trim().toLowerCase() === b.titre.trim().toLowerCase()));
      if (!bl) { local.bibliotheque.push({ ...b, enfants: mapEnfants(b.enfants) }); stats.livres++; continue; }
      bl.lectures = Math.max(bl.lectures || 0, b.lectures || 0);
      if ((b.derniere || "") > (bl.derniere || "")) bl.derniere = b.derniere;
      bl.coeur = bl.coeur || b.coeur;
      if (b.statut === "fait") bl.statut = "fait";
      bl.enfants = union(bl.enfants, mapEnfants(b.enfants));
      if (!bl.note) bl.note = b.note;
      if (!bl.auteur) bl.auteur = b.auteur;
    }

    const idRoutine = {};
    for (const r of imp.routines) {
      const enfantId = idEnfant[r.enfantId] || r.enfantId;
      const rl = local.routines.find(x => x.id === r.id || (x.enfantId === enfantId && x.nom === r.nom));
      if (rl) { idRoutine[r.id] = rl.id; continue; }
      local.routines.push({ ...r, enfantId });
      idRoutine[r.id] = r.id;
      stats.routines++;
    }
    for (const [cle, faites] of Object.entries(imp.routineLog)) {
      const [date, rid] = cle.split("|");
      const r = local.routines.find(x => x.id === (idRoutine[rid] || rid));
      if (!r) continue;
      const k2 = date + "|" + r.id;
      // Les étapes d'une routine regroupée par nom n'ont pas les mêmes identifiants : on ne garde que celles qui existent.
      local.routineLog[k2] = union(local.routineLog[k2], faites.filter(id => r.etapes.some(e => e.id === id)));
    }

    for (const [semaine, liste] of Object.entries(imp.defis)) {
      if (!local.defis[semaine]) { local.defis[semaine] = liste; continue; }
      for (const d of liste) {
        const dl = local.defis[semaine].find(x => x.id === d.id);
        if (!dl) { local.defis[semaine].push(d); continue; }
        dl.jours = union(dl.jours, d.jours);
        dl.fois = Math.max(dl.fois || 0, d.fois || 0);
      }
    }
    if ((imp.derniereSauvegarde || "") > (local.derniereSauvegarde || "")) local.derniereSauvegarde = imp.derniereSauvegarde;
    return stats;
  }

  // ───────────────────────── Modale ─────────────────────────
  function openModal(html, classe) {
    const dlg = $("#modal");
    dlg.className = classe || "";
    $("#modal-body").innerHTML = html;
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    $("#modal-body").scrollTop = 0;
  }
  function closeModal() { const dlg = $("#modal"); if (dlg.open) dlg.close(); }

  // ───────────────────────── Rendu principal ─────────────────────────
  const TITRES = { enfants: "Nos enfants", developpement: "Développement", activite: "Activité du moment", famille: "Famille", journal: "Journal" };

  function render() {
    $("#page-title").textContent = TITRES[ui.tab];
    document.title = state.enfants.length ? state.enfants.map(k => k.nom).join(" & ") : "Grandir ensemble";
    const view = $("#view");
    view.innerHTML = { enfants: renderEnfants, developpement: renderDeveloppement, activite: renderActivite, famille: renderFamille, journal: renderJournal }[ui.tab]();
    document.querySelectorAll(".tabbar button").forEach(b => b.classList.toggle("on", b.dataset.tab === ui.tab));
  }

  function routine(id) { return state.routines.find(r => r.id === id); }
  function majEditeur(r) {
    save();
    const scroll = $("#modal-body").scrollTop;
    openModal(vueEditeurRoutine(r));
    $("#modal-body").scrollTop = scroll;
    render();
  }

  // ───────────────────────── Événements ─────────────────────────
  const actions = {
    "tab": el => { ui.tab = el.dataset.tab; window.scrollTo(0, 0); render(); },
    "open-settings": () => openModal(renderReglages()),
    "close-modal": () => closeModal(),
    "edit-child": el => openModal(formEnfant(child(el.dataset.id))),
    "quiz-start": el => { ui.quiz = { ids: el.dataset.id.split(",").filter(child), idx: 0, step: 0 }; if (ui.quiz.ids.length) openModal(vueQuiz()); },
    "quiz-back": () => { ui.quiz.step = Math.max(0, ui.quiz.step - 1); openModal(vueQuiz()); },
    "quiz-skip": () => quizAvancer(),
    "quiz-next-child": () => { ui.quiz.idx++; ui.quiz.step = 0; openModal(vueQuiz()); },
    "quiz-done": () => { closeModal(); render(); toast("Profils enregistrés ✓ Pensez à faire une sauvegarde."); },
    "add-child": () => { brouillonEnfant = newChild("", AVATARS[state.enfants.length % AVATARS.length], COULEURS[state.enfants.length % COULEURS.length]); openModal(formEnfant(brouillonEnfant)); },
    "delete-child": el => {
      const k = child(el.dataset.id);
      if (!k || !confirm("Supprimer le profil de " + k.nom + " ? Ses souvenirs resteront dans le journal des autres enfants.")) return;
      state.enfants = state.enfants.filter(e => e.id !== k.id);
      state.journal.forEach(j => { j.enfants = j.enfants.filter(id => id !== k.id); });
      state.journal = state.journal.filter(j => j.enfants.length);
      if (ui.wiz.who === k.id) actions["wiz-reset"]();
      save(); closeModal(); render();
    },
    "dev-child": el => { ui.dev.childId = el.dataset.id; ui.dev.offset = 0; render(); },
    "dev-section": el => { ui.dev.section = el.dataset.v; ui.dev.sub = Object.keys(SUBS[el.dataset.v])[0]; render(); },
    "dev-sub": el => { ui.dev.sub = el.dataset.v; render(); },
    "dev-offset": el => { ui.dev.offset += parseInt(el.dataset.v, 10); render(); },
    "set-eau": el => { const k = child(ui.dev.childId); k.eau = parseInt(el.dataset.v, 10); save(); render(); },
    "toggle-acquis": el => {
      const k = child(ui.dev.childId);
      if (el.checked) k.acquis[el.dataset.key] = today(); else delete k.acquis[el.dataset.key];
      save();
    },
    "wiz-who": el => { Object.assign(ui.wiz, { who: el.dataset.v, step: 2 }); render(); },
    "wiz-moment": el => { Object.assign(ui.wiz, { moment: el.dataset.v, step: 3 }); render(); },
    "wiz-lieu": el => { Object.assign(ui.wiz, { lieu: el.dataset.v, step: 4, seed: Math.random(), shown: 3 }); render(); },
    "wiz-goto": el => {
      const s = parseInt(el.dataset.v, 10);
      ui.wiz.step = s;
      if (s <= 1) ui.wiz.who = null;
      if (s <= 2) ui.wiz.moment = null;
      if (s <= 3) ui.wiz.lieu = null;
      render();
    },
    "wiz-shuffle": () => { ui.wiz.seed = Math.random(); ui.wiz.shown = 3; render(); },
    "wiz-more": () => { ui.wiz.shown += 3; render(); },
    "wiz-reset": () => { Object.assign(ui.wiz, { step: 1, who: null, moment: null, lieu: null, shown: 3 }); render(); },
    "open-activity": el => {
      const kids = (el.dataset.kids || "").split(",").map(child).filter(Boolean);
      openModal(ficheActivite(ACT_BY_ID[el.dataset.id], kids));
    },
    "toggle-fav": el => {
      const id = el.dataset.id;
      state.favoris = state.favoris.includes(id) ? state.favoris.filter(f => f !== id) : state.favoris.concat(id);
      save();
      el.textContent = state.favoris.includes(id) ? "♥ Retirer des favoris" : "♡ Favori";
      render();
    },
    "done-activity": el => {
      const kids = (el.dataset.kids || "").split(",").filter(id => child(id));
      openModal(formEntree({ id: uid(), date: today(), enfants: kids.length ? kids : state.enfants.map(k => k.id), activiteId: el.dataset.id, titre: "", ressenti: "", progres: false, note: "" }));
    },
    "new-entry": () => openModal(formEntree({ id: uid(), date: today(), enfants: state.enfants.map(k => k.id), activiteId: "", titre: "", ressenti: "", progres: false, note: "" })),
    "edit-entry": el => openModal(formEntree(state.journal.find(j => j.id === el.dataset.id))),
    "delete-entry": el => {
      if (!confirm("Supprimer ce souvenir ?")) return;
      state.journal = state.journal.filter(j => j.id !== el.dataset.id);
      save(); closeModal(); render();
    },
    "export": () => exporter(),
    "import-fusion": () => {
      if (!importEnAttente) return;
      const st = fusionner(state, importEnAttente);
      importEnAttente = null;
      save(); closeModal(); render();
      const parts = [];
      if (st.enfants) parts.push(st.enfants + " enfant(s)");
      if (st.souvenirs) parts.push(st.souvenirs + " souvenir(s)");
      if (st.livres) parts.push(st.livres + " livre(s)/comptine(s)");
      if (st.routines) parts.push(st.routines + " routine(s)");
      toast("Fusion terminée ✓ " + (parts.length ? "Ajouté : " + parts.join(", ") : "Profils complétés"));
    },
    "import-remplacer": () => {
      if (!importEnAttente || !confirm("Remplacer TOUTES les données de ce téléphone par cette sauvegarde ?")) return;
      state = importEnAttente;
      importEnAttente = null;
      save(); closeModal(); render();
      toast("Sauvegarde importée ✓");
    },
    "share": () => partager(),

    // Famille
    "fam-sub": el => { ui.fam.sub = el.dataset.v; render(); },
    "fam-child": el => { ui.fam.childId = el.dataset.id; render(); },
    "routine-defaut": el => {
      window.MODELES_ROUTINES.forEach(m => state.routines.push({ id: uid(), enfantId: el.dataset.id, nom: m.nom, emoji: m.emoji, etapes: m.etapes.map(etapeParLabel) }));
      save(); render(); toast("Routines créées : modifiez-les à votre goût ✏️");
    },
    "routine-new": el => {
      const r = { id: uid(), enfantId: el.dataset.id, nom: "Nouvelle routine", emoji: "⭐", etapes: [] };
      state.routines.push(r); save(); render(); openModal(vueEditeurRoutine(r));
    },
    "routine-play": el => { nettoyerLog(); openModal(vueModeEnfant(routine(el.dataset.id)), "kid"); },
    "routine-edit": el => openModal(vueEditeurRoutine(routine(el.dataset.id))),
    "routine-step": el => {
      const r = routine(el.dataset.r);
      const key = today() + "|" + r.id;
      const faites = state.routineLog[key] || [];
      const avant = routineTerminee(r, faites);
      state.routineLog[key] = faites.includes(el.dataset.e) ? faites.filter(id => id !== el.dataset.e) : faites.concat(el.dataset.e);
      save();
      const scroll = $("#modal-body").scrollTop;
      openModal(vueModeEnfant(r), "kid");
      $("#modal-body").scrollTop = routineTerminee(r, state.routineLog[key]) && !avant ? 0 : scroll;
      render();
    },
    "routine-icon": el => { const r = routine(el.dataset.id); r.emoji = el.dataset.v; save(); openModal(vueEditeurRoutine(r)); render(); },
    "step-add": el => { const r = routine(el.dataset.id); r.etapes.push(etapeParLabel(el.dataset.v)); majEditeur(r); },
    "step-del": el => { const r = routine(el.dataset.id); r.etapes.splice(+el.dataset.i, 1); majEditeur(r); },
    "step-move": el => {
      const r = routine(el.dataset.id), i = +el.dataset.i, j = i + +el.dataset.v;
      [r.etapes[i], r.etapes[j]] = [r.etapes[j], r.etapes[i]];
      majEditeur(r);
    },
    "routine-del": el => {
      const r = routine(el.dataset.id);
      if (!confirm("Supprimer la routine « " + r.nom + " » ?")) return;
      state.routines = state.routines.filter(x => x.id !== r.id);
      save(); closeModal(); render();
    },
    "bib-type": el => { ui.fam.bibType = el.dataset.v; ui.fam.bibFiltre = "tous"; render(); },
    "bib-filtre": el => { ui.fam.bibFiltre = el.dataset.v; render(); },
    "bib-new": () => openModal(formLivre(nouveauLivre(ui.fam.bibType))),
    "bib-edit": el => openModal(formLivre(state.bibliotheque.find(b => b.id === el.dataset.id))),
    "bib-plus": el => {
      const b = state.bibliotheque.find(x => x.id === el.dataset.id);
      b.lectures = (b.lectures || 0) + 1; b.derniere = today(); b.statut = "fait";
      save(); render(); toast((b.type === "livre" ? "📖 Lecture" : "🎵 Chanson") + " notée : " + b.lectures + " fois");
    },
    "bib-coeur": el => { const b = state.bibliotheque.find(x => x.id === el.dataset.id); b.coeur = !b.coeur; save(); render(); },
    "bib-classique": el => { state.bibliotheque.push(nouveauLivre("comptine", el.dataset.v)); save(); render(); },
    "bib-del": el => {
      if (!confirm("Supprimer de la bibliothèque ?")) return;
      state.bibliotheque = state.bibliotheque.filter(b => b.id !== el.dataset.id);
      save(); closeModal(); render();
    },
    "defi-jour": el => {
      const d = defisSemaine()[+el.dataset.i], n = +el.dataset.v;
      d.jours = d.jours.includes(n) ? d.jours.filter(x => x !== n) : d.jours.concat(n);
      const bravo = !defiReussi({ ...d, jours: d.jours.filter(x => x !== n) }) && defiReussi(d);
      save(); render(); if (bravo) toast("🏆 Défi « " + d.titre + " » réussi, bravo la famille !");
    },
    "defi-fois": el => {
      const d = defisSemaine()[+el.dataset.i];
      const avant = defiReussi(d);
      d.fois = Math.max(0, d.fois + +el.dataset.v);
      save(); render(); if (!avant && defiReussi(d)) toast("🏆 Défi « " + d.titre + " » réussi, bravo la famille !");
    },
    "defi-changer": el => {
      const liste = defisSemaine(), i = +el.dataset.i;
      const cand = candidatsDefis(new Set(liste.map(d => d.id)));
      if (!cand.length) { toast("Plus d'autre défi disponible."); return; }
      liste[i] = defiDepuisBanque(cand[Math.floor(Math.random() * cand.length)]);
      save(); render();
    },
    "defi-retirer": el => { defisSemaine().splice(+el.dataset.i, 1); save(); render(); },
    "defi-ajouter": () => openModal(vueAjoutDefi()),
    "defi-pick": el => {
      defisSemaine().push(defiDepuisBanque(window.DEFIS.find(d => d.id === el.dataset.v)));
      save(); closeModal(); render();
    },
    "reset": () => {
      if (!confirm("Effacer TOUTES les données (profils et journal) ? Cette action est définitive.")) return;
      state = defaultState(); save(); closeModal(); actions["wiz-reset"](); toast("Données effacées.");
    }
  };

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-action], [data-tab]");
    if (!el || el.disabled) return;
    if (el.tagName === "INPUT") return; // géré par l'événement change
    const name = el.dataset.tab ? "tab" : el.dataset.action;
    if (actions[name]) { e.preventDefault(); actions[name](el); }
  });

  document.addEventListener("change", e => {
    const el = e.target;
    if (el.dataset.action === "toggle-acquis") actions["toggle-acquis"](el);
    if (el.dataset.action === "import" && el.files[0]) importer(el.files[0]);
    if (el.dataset.action === "routine-rename") { const r = routine(el.dataset.id); r.nom = el.value.trim() || r.nom; save(); render(); }
  });

  document.addEventListener("submit", e => {
    const f = e.target;
    if (f.dataset.form === "child") { e.preventDefault(); saveChildForm(f); }
    if (f.dataset.form === "quiz") { e.preventDefault(); enregistrerQuiz(f); quizAvancer(); }
    if (f.dataset.form === "entry") { e.preventDefault(); saveEntryForm(f); }
    if (f.dataset.form === "book") { e.preventDefault(); saveBookForm(f); }
    if (f.dataset.form === "step-custom") {
      e.preventDefault();
      const fd = new FormData(f), r = routine(f.dataset.id);
      const label = (fd.get("label") || "").trim();
      if (!label) return;
      r.etapes.push({ id: uid(), emoji: (fd.get("emoji") || "").trim() || "⭐", label });
      majEditeur(r);
    }
    if (f.dataset.form === "defi-custom") {
      e.preventDefault();
      const fd = new FormData(f);
      const type = fd.get("type") || "fois";
      const cible = Math.min(type === "jours" ? 7 : 50, Math.max(1, parseInt(fd.get("cible"), 10) || 1));
      defisSemaine().push({ id: "perso-" + uid(), emoji: (fd.get("emoji") || "").trim() || "⭐", titre: (fd.get("titre") || "").trim(), desc: (fd.get("desc") || "").trim(), type, cible, jours: [], fois: 0 });
      save(); closeModal(); render();
    }
  });

  // Fermer la modale en touchant le fond
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });

  render();

  // Demande au navigateur de ne pas effacer les données automatiquement (pris en compte selon le navigateur).
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
