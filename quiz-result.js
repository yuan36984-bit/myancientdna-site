(function () {
"use strict";

var cfg = document.body.dataset;
var RESULT_NAME = cfg.resultName || "";
var RESULT_FACT = cfg.resultFact || "";
var RESULT_PHOTO = cfg.resultPhoto || "";
var PAGE_URL = cfg.pageUrl || "";
var FILE_SLUG = cfg.fileSlug || "result";

function roundRect(ctx, x, y, w, h, r) {
ctx.beginPath();
ctx.moveTo(x + r, y);
ctx.arcTo(x + w, y, x + w, y + h, r);
ctx.arcTo(x + w, y + h, x, y + h, r);
ctx.arcTo(x, y + h, x, y, r);
ctx.arcTo(x, y, x + w, y, r);
ctx.closePath();
}

function wrapCenterText(ctx, text, cx, y, maxWidth, lineHeight) {
var words = text.split(" ");
var lines = [];
var line = "";
words.forEach(function (w) {
var test = line ? line + " " + w : w;
if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
else { line = test; }
});
if (line) lines.push(line);
var startY = y - ((lines.length - 1) * lineHeight) / 2;
lines.forEach(function (l, i) { ctx.fillText(l, cx, startY + i * lineHeight); });
return lines.length;
}

function drawCard(callback) {
var canvas = document.createElement("canvas");
canvas.width = 1080;
canvas.height = 1350;
var ctx = canvas.getContext("2d");

var bg = ctx.createLinearGradient(0, 0, 1080, 1350);
bg.addColorStop(0, "#22093f");
bg.addColorStop(0.55, "#5a1a82");
bg.addColorStop(1, "#c41060");
ctx.fillStyle = bg;
ctx.fillRect(0, 0, 1080, 1350);

function finishDrawing() {
ctx.fillStyle = "#ffffff";
ctx.font = "700 32px 'Helvetica Neue', Arial, sans-serif";
ctx.textAlign = "left";
ctx.fillText("MY ANCIENT DNA", 80, 100);

ctx.fillStyle = "#ffa800";
ctx.font = "700 26px 'Helvetica Neue', Arial, sans-serif";
ctx.textAlign = "center";
ctx.fillText("MY DNA STORY MATCHES", 540, 860);

ctx.fillStyle = "#ffffff";
ctx.font = "700 66px 'Helvetica Neue', Arial, sans-serif";
wrapCenterText(ctx, RESULT_NAME.toUpperCase(), 540, 940, 900, 76);

ctx.fillStyle = "#f0e3fa";
ctx.font = "400 30px Georgia, serif";
wrapCenterText(ctx, RESULT_FACT, 540, 1090, 820, 42);

ctx.fillStyle = "rgba(255,255,255,0.16)";
roundRect(ctx, 240, 1230, 600, 64, 32);
ctx.fill();
ctx.fillStyle = "#ffffff";
ctx.font = "600 26px 'Helvetica Neue', Arial, sans-serif";
ctx.textAlign = "center";
ctx.fillText("myancientdna.com/ancient-ancestor-quiz", 540, 1270);

callback(canvas);
}

var img = new Image();
img.crossOrigin = "anonymous";
img.onload = function () {
var pw = 920, ph = 620, px = 80, py = 170;
ctx.save();
roundRect(ctx, px, py, pw, ph, 24);
ctx.clip();
var scale = Math.max(pw / img.width, ph / img.height);
var iw = img.width * scale, ih = img.height * scale;
ctx.drawImage(img, px + (pw - iw) / 2, py + (ph - ih) / 2, iw, ih);
ctx.restore();
finishDrawing();
};
img.onerror = function () { finishDrawing(); };
img.src = RESULT_PHOTO;
}

function init() {
var downloadBtn = document.getElementById("download-btn");
if (downloadBtn) {
downloadBtn.addEventListener("click", function () {
var original = downloadBtn.innerHTML;
downloadBtn.disabled = true;
downloadBtn.textContent = "Generating…";
drawCard(function (canvas) {
var link = document.createElement("a");
link.download = "my-ancient-dna-" + FILE_SLUG + ".png";
link.href = canvas.toDataURL("image/png");
link.click();
downloadBtn.disabled = false;
downloadBtn.innerHTML = original;
});
});
}

var shareText = "My DNA story matches: " + RESULT_NAME + "! Take the quiz:";
document.querySelectorAll(".result-share-btn").forEach(function (btn) {
btn.addEventListener("click", function () {
var kind = btn.getAttribute("data-share");
var url = "";
if (kind === "x") {
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(PAGE_URL);
} else if (kind === "pinterest") {
url = "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(PAGE_URL) + "&media=" + encodeURIComponent("https://myancientdna.com" + RESULT_PHOTO) + "&description=" + encodeURIComponent(shareText);
} else if (kind === "reddit") {
url = "https://www.reddit.com/submit?url=" + encodeURIComponent(PAGE_URL) + "&title=" + encodeURIComponent(shareText);
} else if (kind === "facebook") {
url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(PAGE_URL);
} else if (kind === "copy") {
if (navigator.clipboard) { navigator.clipboard.writeText(PAGE_URL); }
var original = btn.innerHTML;
btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4 10-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
setTimeout(function () { btn.innerHTML = original; }, 1500);
return;
}
if (url) { window.open(url, "_blank", "noopener,noreferrer"); }
});
});
}

if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();
