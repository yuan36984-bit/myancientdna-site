(function () {
"use strict";

var ICONS = {
pyramid: '<path d="M12 4 21 20H3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
wave: '<path d="M2 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 13 12 5l6 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
market: '<rect x="4" y="10" width="4" height="10" stroke="currentColor" stroke-width="1.6"/><rect x="10" y="6" width="4" height="14" stroke="currentColor" stroke-width="1.6"/><rect x="16" y="12" width="4" height="8" stroke="currentColor" stroke-width="1.6"/>',
plain: '<path d="M3 18h18M6 18c0-5 3-9 6-9s6 4 6 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
fish: '<path d="M3 12c4-5 12-5 16 0-4 5-12 5-16 0Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="16" cy="12" r="0.8" fill="currentColor"/>',
wine: '<path d="M7 3h10l-1 7a4 4 0 0 1-8 0Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 14v7M8 21h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
leaf: '<path d="M5 19C5 9 13 4 20 4c0 7-5 15-15 15Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 19 14 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
wheat: '<path d="M12 21V7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 7 8 4M12 7l4-3M12 11 8 8m4 3 4-3M12 15l-4-3m4 3 4-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
boat: '<path d="M4 15h16l-2 5H6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 15V4M12 6l5 3-5 2" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
horse: '<path d="M5 20c0-6 2-9 5-11 2 3 1 6-1 7 3 0 6 1 7 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="7.5" r="1" fill="currentColor"/>',
footprints: '<ellipse cx="8" cy="8" rx="2" ry="3" stroke="currentColor" stroke-width="1.4"/><ellipse cx="15" cy="15" rx="2" ry="3" stroke="currentColor" stroke-width="1.4"/>',
path: '<path d="M4 20c4-8 4-12 8-16m0 16c4-8 4-12 8-16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
hammer: '<path d="M14 6 18 10 10 18 6 14Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4 20 9 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
sail: '<path d="M12 3v18M12 4l6 8H12ZM12 13 6 19h6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
scroll: '<path d="M6 4h9a3 3 0 0 1 3 3v10a3 3 0 0 0 3 3M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
spear: '<path d="M4 20 16 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16 8 20 4l0 4-4 4Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
compass: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M15 9l-2 6-4 2 2-6Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
column: '<rect x="6" y="4" width="12" height="2" stroke="currentColor" stroke-width="1.4"/><rect x="6" y="18" width="12" height="2" stroke="currentColor" stroke-width="1.4"/><path d="M8 6v12M12 6v12M16 6v12" stroke="currentColor" stroke-width="1.4"/>',
sun: '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
soil: '<path d="M3 18c3-4 6 2 9-2s6 4 9 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 20h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
};

var QUESTIONS = [
{ q: "Where would you rather spend a free afternoon?", options: [
{ label: "Wandering a monument-filled desert city", cat: "E", icon: "pyramid" },
{ label: "Walking a rocky northern coastline", cat: "V", icon: "wave" },
{ label: "Browsing a busy market square", cat: "R", icon: "market" },
{ label: "Riding across an open plain, horizon to horizon", cat: "S", icon: "plain" }
]},
{ q: "Pick a meal.", options: [
{ label: "Smoked fish and dried meat", cat: "V", icon: "fish" },
{ label: "Bread, cheese, and wine at a tavern", cat: "R", icon: "wine" },
{ label: "Foraged nuts, berries, and roasted game", cat: "H", icon: "leaf" },
{ label: "Fresh bread and porridge from your own grain", cat: "F", icon: "wheat" }
]},
{ q: "What's your ideal way to travel?", options: [
{ label: "By boat down a great river", cat: "E", icon: "boat" },
{ label: "On horseback across grassland", cat: "S", icon: "horse" },
{ label: "On foot, following the herds", cat: "H", icon: "footprints" },
{ label: "Walking between your fields and village", cat: "F", icon: "path" }
]},
{ q: "Pick a skill you'd want to master.", options: [
{ label: "Metalworking and monument-building", cat: "E", icon: "hammer" },
{ label: "Shipbuilding and navigation", cat: "V", icon: "sail" },
{ label: "Law, engineering, and administration", cat: "R", icon: "scroll" },
{ label: "Tracking and toolmaking", cat: "H", icon: "spear" }
]},
{ q: "What matters most to you in a community?", options: [
{ label: "Exploration and daring", cat: "V", icon: "compass" },
{ label: "Order and infrastructure", cat: "R", icon: "column" },
{ label: "Freedom and mobility", cat: "S", icon: "horse" },
{ label: "Stability and shared harvests", cat: "F", icon: "wheat" }
]},
{ q: "Pick a color palette that appeals to you.", options: [
{ label: "Gold and deep blue", cat: "E", icon: "sun" },
{ label: "Golden grass and open sky", cat: "S", icon: "plain" },
{ label: "Earthy green and river-stone grey", cat: "H", icon: "leaf" },
{ label: "Ripe wheat and turned soil", cat: "F", icon: "soil" }
]}
];

var RESULT_URLS = {
E: "/quiz-result-ancient-egyptian",
V: "/quiz-result-viking",
R: "/quiz-result-roman",
S: "/quiz-result-steppe",
H: "/quiz-result-hunter-gatherer",
F: "/quiz-result-early-farmer"
};

var PRIORITY = ["E", "V", "R", "S", "H", "F"];

var currentQ = 0;
var scores = { E: 0, V: 0, R: 0, S: 0, H: 0, F: 0 };

function init() {
var progressLabel = document.getElementById("quiz-progress-label");
var progressFill = document.getElementById("quiz-progress-fill");
var questionText = document.getElementById("quiz-question-text");
var optionsEl = document.getElementById("quiz-options");
if (!progressLabel || !progressFill || !questionText || !optionsEl) { return; }

function render() {
var q = QUESTIONS[currentQ];
progressLabel.textContent = "Question " + (currentQ + 1) + " of " + QUESTIONS.length;
progressFill.style.width = Math.round((currentQ / QUESTIONS.length) * 100) + "%";
questionText.textContent = q.q;
optionsEl.innerHTML = "";
q.options.forEach(function (opt) {
var btn = document.createElement("button");
btn.type = "button";
btn.className = "quiz-option";
btn.innerHTML = '<span class="quiz-option-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none">' + ICONS[opt.icon] + "</svg></span>" + opt.label;
btn.addEventListener("click", function () { selectOption(opt.cat); });
optionsEl.appendChild(btn);
});
}

function selectOption(cat) {
scores[cat] = (scores[cat] || 0) + 1;
currentQ++;
if (currentQ < QUESTIONS.length) {
render();
window.scrollTo({ top: 0, behavior: "smooth" });
} else {
finish();
}
}

function finish() {
progressFill.style.width = "100%";
progressLabel.textContent = "Calculating your match…";
questionText.textContent = "";
optionsEl.innerHTML = "";
var winner = PRIORITY[0];
var max = -1;
PRIORITY.forEach(function (c) {
if (scores[c] > max) { max = scores[c]; winner = c; }
});
window.location.href = RESULT_URLS[winner];
}

render();
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();
