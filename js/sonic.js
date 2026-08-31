/* Brand Here — global sonic control (Concept 3.2 sonic integration).
   Site-wide, self-contained: injects its own styling so it renders
   identically whether the host page loads style.css, concept-3.css or
   concept-3-2.css. No autoplay, ever — sound only starts from a direct
   user click/keypress on the control. Single <audio> element; the 6s
   sonic sting and 40s immersive cut are never layered, only sequenced,
   and the sting plays at most once per browser session (first activation),
   not on every page navigation. */
(function () {
  "use strict";
  if (document.getElementById("bhSoundToggle")) return; // avoid double-init if included twice

  var sourceScript = document.currentScript;
  var siteRoot = sourceScript && sourceScript.src
    ? new URL("../", sourceScript.src)
    : new URL("/", window.location.origin);
  var STING_SRC = new URL("audio/brand-here-sonic-sting-6s.mp3", siteRoot).href;
  var CUT_SRC = new URL("audio/brand-here-official-sound-40s.mp3", siteRoot).href;
  var STING_SESSION_KEY = "bh-sonic-sting-played";

  var isVi = document.documentElement.lang === "vi";
  var LABEL_ON = isVi ? "ÂM THANH" : "SOUND";

  function injectStyle() {
    var css = [
      ".bh-sound-toggle{position:fixed;z-index:60;right:22px;bottom:calc(22px + env(safe-area-inset-bottom));",
      "display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;",
      "background:#2D2926;color:#F3F0E8;border:1px solid rgba(243,240,232,.28);",
      "font:600 11px/1 Manrope,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;",
      "cursor:pointer;transition:border-color .2s ease,transform .2s ease;}",
      ".bh-sound-toggle:hover{transform:translateY(-2px);border-color:#E03C31;}",
      ".bh-sound-toggle:focus-visible{outline:2px solid #E03C31;outline-offset:3px;}",
      ".bh-sound-toggle .bh-sound-dot{font-size:13px;line-height:1;color:#E03C31;}",
      ".bh-sound-toggle[aria-pressed=\"true\"] .bh-sound-dot{color:#E03C31;}",
      "@media (max-width:640px){.bh-sound-toggle{top:calc(76px + env(safe-area-inset-top));right:12px;bottom:auto;padding:8px 11px;font-size:9px;}}",
      "@media print{.bh-sound-toggle{display:none;}}"
    ].join("");
    var style = document.createElement("style");
    style.setAttribute("data-bh-sonic", "");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init() {
    injectStyle();

    var audio = document.createElement("audio");
    audio.id = "bhSound";
    audio.preload = "none"; // never fetched before user intent — keeps this off the LCP/network critical path
    audio.loop = false; // brand rule: never loop forever

    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "bhSoundToggle";
    btn.className = "bh-sound-toggle";
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", isVi ? "Bật âm thanh thương hiệu Brand Here" : "Turn on the Brand Here sound");

    var dot = document.createElement("span");
    dot.className = "bh-sound-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.textContent = "○";
    var label = document.createElement("span");
    label.textContent = LABEL_ON;
    btn.appendChild(label);
    btn.appendChild(dot);

    document.body.appendChild(audio);
    document.body.appendChild(btn);

    var state = "idle"; // idle -> playing -> idle

    function setPlayingUI(on) {
      dot.textContent = on ? "●" : "○";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", on
        ? (isVi ? "Tắt âm thanh thương hiệu Brand Here" : "Turn off the Brand Here sound")
        : (isVi ? "Bật âm thanh thương hiệu Brand Here" : "Turn on the Brand Here sound"));
    }

    function stop() {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      state = "idle";
      setPlayingUI(false);
    }

    function playCut() {
      audio.src = CUT_SRC;
      audio.play().catch(function () { stop(); });
    }

    function playSignatureMoment() {
      // First activation this browser session: sonic sting, then the immersive cut.
      // Never repeats on later toggles or page navigations within the same session.
      audio.src = STING_SRC;
      var chained = false;
      audio.addEventListener("ended", function onStingEnd() {
        audio.removeEventListener("ended", onStingEnd);
        if (state === "playing" && !chained) {
          chained = true;
          try { sessionStorage.setItem(STING_SESSION_KEY, "1"); } catch (e) {}
          playCut();
        }
      });
      audio.play().catch(function () { stop(); });
    }

    audio.addEventListener("ended", function () {
      if (audio.src.indexOf("brand-here-official-sound-40s") !== -1) stop();
    });

    btn.addEventListener("click", function () {
      if (state === "playing") {
        stop();
        return;
      }
      state = "playing";
      setPlayingUI(true);
      var stingPlayed = false;
      try { stingPlayed = sessionStorage.getItem(STING_SESSION_KEY) === "1"; } catch (e) {}
      if (stingPlayed) {
        playCut();
      } else {
        playSignatureMoment();
      }
    });

    // Silence on tab hide — the brand's sound is never a background loop.
    // Intentionally does not auto-resume when the tab becomes visible again:
    // resuming without a fresh user gesture would be a quiet form of autoplay,
    // and the control's own state should always reflect what's really playing.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && state === "playing") stop();
    });

    // Never carry playback across a page unload — no persistent "player" state.
    window.addEventListener("pagehide", function () { audio.pause(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
