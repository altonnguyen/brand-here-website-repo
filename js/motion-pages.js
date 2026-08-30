/* Brand Here — inner-page interactive/motion layer (Concept 3.2 behaviour
   layer, Phase 4-9). Progressive enhancement only: every component already
   renders complete, readable content before this file runs. JS makes it
   more compact/interactive; it never reveals hidden meaning. Respects
   prefers-reduced-motion by simply not adding the "js-enhanced" hook where
   that would remove default visible content beyond a simple transition. */
(function(){
  "use strict";

  /* ---------- Stage picker (People & Business / Intelligence / Partners) ---------- */
  function initStagePicker(){
    var sections = document.querySelectorAll("[data-stage-section]");
    sections.forEach(function(section){
      var picks = section.querySelectorAll(".stage-pick");
      var panels = section.querySelectorAll(".stage-detail-panel");
      if(!picks.length || !panels.length) return;
      section.classList.add("stage-section", "js-enhanced");

      function activate(key){
        picks.forEach(function(p){ p.classList.toggle("is-active", p.getAttribute("data-stage") === key); p.setAttribute("aria-pressed", p.getAttribute("data-stage") === key ? "true" : "false"); });
        panels.forEach(function(p){ p.classList.toggle("is-active", p.getAttribute("data-stage") === key); });
      }

      picks.forEach(function(btn){
        btn.setAttribute("aria-pressed", "false");
        btn.addEventListener("click", function(){ activate(btn.getAttribute("data-stage")); });
      });

      activate(picks[0].getAttribute("data-stage"));
    });
  }

  /* ---------- Journey toggle (Market & Brand) ---------- */
  function initJourneyToggle(){
    var sections = document.querySelectorAll("[data-journey-section]");
    sections.forEach(function(section){
      var row = section.querySelector(".journey-row");
      var btn = section.querySelector(".journey-switch");
      var reveal = section.querySelector(".journey-reveal");
      if(!row || !btn) return;
      var steps = row.querySelectorAll(".journey-step");
      var showingNew = false;

      function render(){
        steps.forEach(function(step){
          var text = showingNew ? step.getAttribute("data-new") : step.getAttribute("data-old");
          if(text) step.textContent = text;
        });
        row.classList.toggle("is-new", showingNew);
        if(reveal){
          var revealText = showingNew ? reveal.getAttribute("data-new") : reveal.getAttribute("data-old");
          if(revealText) reveal.textContent = revealText;
        }
        btn.textContent = showingNew ? (btn.getAttribute("data-label-old") || "See the old journey") : (btn.getAttribute("data-label-new") || "See the new journey");
      }

      btn.addEventListener("click", function(){ showingNew = !showingNew; render(); });
      render();
    });
  }

  /* ---------- Gap reveal toggle (Adaptation) ---------- */
  function initGapReveal(){
    var sections = document.querySelectorAll("[data-gap-reveal-section]");
    sections.forEach(function(section){
      var btn = section.querySelector(".gap-reveal-toggle");
      var list = section.querySelector(".gap-reveal-list");
      if(!btn || !list) return;
      section.classList.add("gap-reveal-section", "js-enhanced");
      btn.setAttribute("aria-expanded", "false");

      btn.addEventListener("click", function(){
        var open = list.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? (btn.getAttribute("data-label-close") || "Hide the method") : (btn.getAttribute("data-label-open") || "Show how the gap closes");
      });
    });
  }

  /* ---------- Problem picker (Experts) ---------- */
  function initProblemPicker(){
    var picker = document.querySelector(".problem-picker");
    if(!picker) return;
    var picks = picker.querySelectorAll(".problem-pick");
    var profiles = document.querySelectorAll(".expert-profile");
    var hint = document.querySelector(".problem-picker-hint");
    if(!picks.length || !profiles.length) return;

    function apply(problem){
      picks.forEach(function(p){ p.classList.toggle("is-active", p.getAttribute("data-problem") === problem); });
      profiles.forEach(function(profile){
        var matches = !problem || profile.className.indexOf("expert-profile--" + problem) !== -1;
        profile.classList.toggle("is-match", !!problem && matches);
        profile.classList.toggle("is-dimmed", !!problem && !matches);
      });
      if(hint){
        hint.textContent = problem ? (hint.getAttribute("data-hint-active") || "Highlighted below.") : (hint.getAttribute("data-hint-default") || "Pick what you're solving for.");
      }
    }

    picks.forEach(function(btn){
      btn.addEventListener("click", function(){
        var current = btn.classList.contains("is-active");
        apply(current ? null : btn.getAttribute("data-problem"));
      });
    });
  }

  /* ---------- Work reading-progress ---------- */
  function initWorkProgress(){
    var track = document.querySelector(".work-progress-track");
    var fill = track ? track.querySelector(".work-progress-fill") : null;
    var scope = document.querySelector("[data-work-progress-scope]");
    if(!track || !fill || !scope) return;
    var ticking = false;

    function update(){
      ticking = false;
      var rect = scope.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var progress = total > 0 ? (-rect.top) / total : 0;
      progress = Math.max(0, Math.min(1, progress));
      fill.style.width = (progress * 100) + "%";
    }
    function onScroll(){
      if(!ticking){ ticking = true; window.requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  function init(){
    initStagePicker();
    initJourneyToggle();
    initGapReveal();
    initProblemPicker();
    initWorkProgress();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
