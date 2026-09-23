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

  const TEMPERAMENTS = { calme: "Plutôt calme", equilibre: "Entre les deux", energique: "Très énergique" };
  const SOCIABILITE = { reserve: "Plutôt réservé(e)", variable: "Ça dépend", sociable: "Très sociable" };
  const RESSENTIS = { "😍": "Adoré", "🙂": "Bien", "😐": "Mitigé", "😣": "Difficile" };
  const AVATARS = ["🦁", "🐻", "🐰", "🦊", "🐼", "🐯", "🐨", "🐸", "🦄", "🐳", "🐥", "🐶", "🐱", "🦋"];
  const COULEURS = ["#f59e0b", "#8b5cf6", "#10b981", "#ef4444", "#3b82f6", "#ec4899"];

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
    wiz: { step: 1, who: null, moment: null, lieu: null, seed: Math.random(), shown: 3 }
  };

  function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }

  function newChild(nom, emoji, couleur) {
    return {
      id: uid(), nom, emoji, couleur, naissance: "", temperament: "", sociabilite: "",
      interets: [], forces: "", aEncourager: [], eau: 0, langues: "", garde: "", sommeil: "",
      sante: "", peurs: "", apaise: "", notes: "", acquis: {}
    };
  }

  function defaultState() {
    return { version: 1, enfants: [newChild("Titi", "🦁", COULEURS[0]), newChild("Loulou", "🐻", COULEURS[1])], journal: [], favoris: [] };
  }

  function migrate(s) {
    const base = defaultState();
    const out = { version: 1, enfants: Array.isArray(s.enfants) ? s.enfants : base.enfants, journal: Array.isArray(s.journal) ? s.journal : [], favoris: Array.isArray(s.favoris) ? s.favoris : [] };
    out.enfants = out.enfants.map(e => Object.assign(newChild(e.nom || "Enfant", e.emoji || "🐥", e.couleur || COULEURS[2]), e));
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
  function ageOk(a, kid) {
    const m = ageMois(kid);
    return m === null || (m >= a.age[0] && m <= a.age[1]);
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
      res.push({ a, score, raisons: [...new Set(raisons)], aAdapter });
    }
    return res.sort((x, y) => y.score - x.score);
  }

  // ───────────────────────── Composants ─────────────────────────
  function avatar(k, size) {
    return `<span class="avatar ${size || ""}" style="--c:${esc(k.couleur)}">${esc(k.emoji)}</span>`;
  }

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
          <button class="btn small ghost" data-action="edit-child" data-id="${k.id}">✏️ Profil</button>
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
    return `<p class="intro">Les informations saisies restent <strong>uniquement sur cet appareil</strong>. Plus le profil est complet, plus les propositions sont personnalisées.</p>
      ${cards}
      <button class="btn block ghost" data-action="add-child">➕ Ajouter un enfant</button>`;
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
        <div class="field"><span>Avatar</span>${chipsChoix("emoji", Object.fromEntries(AVATARS.map(a => [a, a])), k.emoji)}</div>
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
    if (isNew) state.enfants.push(k);
    save();
    closeModal();
    toast("Profil de " + k.nom + " enregistré ✓");
    render();
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

    const selecteur = `<div class="seg kids">${state.enfants.map(e => `<button class="${e.id === k.id ? "on" : ""}" data-action="dev-child" data-id="${e.id}">${esc(e.emoji)} ${esc(e.nom)}</button>`).join("")}</div>`;
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

    const checklist = (items, prefix) => `<ul class="checklist">${items.map(txt => {
      const key = prefix + "|" + txt;
      return `<li><label><input type="checkbox" data-action="toggle-acquis" data-key="${esc(key)}" ${k.acquis[key] ? "checked" : ""}><span>${esc(txt)}</span></label></li>`;
    }).join("")}</ul>`;

    const disclaimer = `<p class="disclaimer">Repères indicatifs : chaque enfant avance à son rythme et des écarts de plusieurs mois sont courants. En cas de question, parlez-en à votre médecin ou pédiatre.</p>`;
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
        ${listeActivites(recommander([k], { lieu: d.sub, domaines: ["motricite_globale", "motricite_fine"] }, 0.13), [k])}`;
    } else {
      const domaines = { langage: ["langage"], cognitif: ["cognitif"], emotions: ["emotions", "social"], creativite: ["creativite"] }[d.sub];
      const cleReperes = { langage: "langage", cognitif: "cognitif", emotions: "emotions" }[d.sub];
      contenu = `${cleReperes ? navTranche : ""}
        ${t && cleReperes ? `<div class="card"><h3>${SUBS.mental[d.sub]} : ce qui se met souvent en place</h3>${checklist(t.reperes[cleReperes], t.id + "|" + cleReperes)}${disclaimer}</div>` : ""}
        ${conseils(d.sub)}
        <h3 class="section-title">Activités · ${SUBS.mental[d.sub]}</h3>
        ${listeActivites(recommander([k], { domaines }, 0.29), [k])}`;
    }
    return selecteur + sections + subs + contenu;
  }

  // ───────────────────────── Onglet : Activité du moment ─────────────────────────
  function renderActivite() {
    const w = ui.wiz;
    const kids = kidsFor(w.who);
    const fil = [];
    if (w.who) fil.push(`<button class="crumb" data-action="wiz-goto" data-v="1">${w.who === "tous" ? "👨‍👩‍👧‍👦 " + esc(nomsKids(kids)) : esc(kids[0].emoji + " " + kids[0].nom)}</button>`);
    if (w.moment) fil.push(`<button class="crumb" data-action="wiz-goto" data-v="2">${MOMENTS[w.moment].emoji} ${MOMENTS[w.moment].label}</button>`);
    if (w.lieu) fil.push(`<button class="crumb" data-action="wiz-goto" data-v="3">${w.lieu === "tous" ? "✨ Peu importe" : LIEUX[w.lieu].emoji + " " + LIEUX[w.lieu].label}</button>`);
    const filHtml = fil.length ? `<div class="crumbs">${fil.join("<span>›</span>")}</div>` : "";
    const steps = `<div class="steps">${[1, 2, 3, 4].map(i => `<span class="${w.step >= i ? "on" : ""}"></span>`).join("")}</div>`;

    let body = "";
    if (w.step === 1) {
      body = `<h2 class="q">Pour qui ?</h2><div class="choice-grid">
        ${state.enfants.map(k => `<button class="choice" data-action="wiz-who" data-v="${k.id}">${avatar(k, "lg")}<strong>${esc(k.nom)}</strong><span class="muted">${ageTexte(k)}</span></button>`).join("")}
        ${state.enfants.length > 1 ? `<button class="choice" data-action="wiz-who" data-v="tous"><span class="avatar lg" style="--c:#f97316">👨‍👩‍👧‍👦</span><strong>${state.enfants.length === 2 ? "Les deux" : "Tous ensemble"}</strong><span class="muted">${esc(nomsKids(state.enfants))}</span></button>` : ""}
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
      <div class="field"><span>Avec</span><div class="chip-group">${state.enfants.map(k => `<label class="chip"><input type="checkbox" name="enfants" value="${k.id}" ${j.enfants.includes(k.id) ? "checked" : ""}><span>${esc(k.emoji + " " + k.nom)}</span></label>`).join("")}</div></div>
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

  // ───────────────────────── Réglages / sauvegarde ─────────────────────────
  function renderReglages() {
    return `<div class="form">
      <h2>⚙️ Sauvegarde & confidentialité</h2>
      <p>Toutes les données (profils, journal) sont enregistrées <strong>uniquement dans ce navigateur, sur cet appareil</strong>. Rien n'est envoyé sur internet.</p>
      <p class="hint">Si vous videz les données du navigateur, elles seront perdues : pensez à exporter une sauvegarde de temps en temps. Pour partager entre deux téléphones, exportez sur l'un et importez sur l'autre.</p>
      <div class="form-actions stack">
        <button class="btn primary" data-action="export">⬇️ Exporter une sauvegarde</button>
        <label class="btn ghost">⬆️ Importer une sauvegarde<input type="file" accept="application/json,.json" data-action="import" hidden></label>
        <button class="btn danger ghost" data-action="reset">🗑️ Tout effacer</button>
        <button class="btn ghost" data-action="close-modal">Fermer</button>
      </div>
    </div>`;
  }

  function exporter() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "education-enfants-" + today() + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function importer(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.enfants)) throw new Error("format");
        if (!confirm("Remplacer les données actuelles par cette sauvegarde ?")) return;
        state = migrate(data);
        save();
        closeModal();
        toast("Sauvegarde importée ✓");
        render();
      } catch (e) { toast("⚠️ Fichier invalide."); }
    };
    reader.readAsText(file);
  }

  // ───────────────────────── Modale ─────────────────────────
  function openModal(html) {
    const dlg = $("#modal");
    $("#modal-body").innerHTML = html;
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    $("#modal-body").scrollTop = 0;
  }
  function closeModal() { const dlg = $("#modal"); if (dlg.open) dlg.close(); }

  // ───────────────────────── Rendu principal ─────────────────────────
  const TITRES = { enfants: "Nos enfants", developpement: "Développement", activite: "Activité du moment", journal: "Journal" };

  function render() {
    $("#page-title").textContent = TITRES[ui.tab];
    const view = $("#view");
    view.innerHTML = { enfants: renderEnfants, developpement: renderDeveloppement, activite: renderActivite, journal: renderJournal }[ui.tab]();
    document.querySelectorAll(".tabbar button").forEach(b => b.classList.toggle("on", b.dataset.tab === ui.tab));
  }

  // ───────────────────────── Événements ─────────────────────────
  const actions = {
    "tab": el => { ui.tab = el.dataset.tab; window.scrollTo(0, 0); render(); },
    "open-settings": () => openModal(renderReglages()),
    "close-modal": () => closeModal(),
    "edit-child": el => openModal(formEnfant(child(el.dataset.id))),
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
  });

  document.addEventListener("submit", e => {
    const f = e.target;
    if (f.dataset.form === "child") { e.preventDefault(); saveChildForm(f); }
    if (f.dataset.form === "entry") { e.preventDefault(); saveEntryForm(f); }
  });

  // Fermer la modale en touchant le fond
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });

  render();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
