/* Concept 3.2 production editorial image loader.
   Empty slots remain stable and neutral until a real raster asset exists. */
(function () {
  "use strict";

  var slots = document.querySelectorAll(".editorial-media-slot[data-image-src]");
  if (!slots.length) return;

  function load(slot) {
    if (slot.dataset.imageChecked === "true") return;
    slot.dataset.imageChecked = "true";

    var src = slot.dataset.imageSrc;
    if (!src) return;

    fetch(src, { method: "HEAD", cache: "no-store" })
      .then(function (response) {
        if (!response.ok || !(response.headers.get("content-type") || "").startsWith("image/")) return;

        var image = new Image();
        image.width = 1200;
        image.height = 630;
        image.loading = "lazy";
        image.decoding = "async";
        image.alt = slot.dataset.imageAlt || "";
        image.addEventListener("load", function () {
          slot.replaceChildren(image);
          slot.classList.add("has-image");
          if (image.alt) slot.removeAttribute("aria-hidden");
        }, { once: true });
        image.src = src;
      })
      .catch(function () {
        // The approved no-image state is intentional until production art arrives.
      });
  }

  if (!("IntersectionObserver" in window)) {
    slots.forEach(load);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      load(entry.target);
    });
  }, { rootMargin: "300px 0px" });

  slots.forEach(function (slot) { observer.observe(slot); });
})();
