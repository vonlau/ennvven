/* Enn-wen portfolio — scroll reveals, parallax */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll reveals ---------- */

  var revealTargets = document.querySelectorAll(
    "[data-reveal], .case-body figure, .case-body h2, .meta, .callout, .feature-row"
  );

  if (!reducedMotion && "IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        var delay = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.style.setProperty("--reveal-delay", delay + "ms");
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
          delay += 90;
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealTargets.forEach(function (el) {
      // Only hide elements below the fold; content stays visible without JS.
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add("will-reveal");
      }
      observer.observe(el);
    });
  }

  /* ---------- parallax on tile imagery and case cover ---------- */

  var parallaxImgs = [];
  document.querySelectorAll(".tile-media img, .case-cover img").forEach(function (img) {
    parallaxImgs.push(img);
  });

  if (!reducedMotion && parallaxImgs.length) {
    var ticking = false;

    var applyParallax = function () {
      var vhCenter = window.innerHeight / 2;
      parallaxImgs.forEach(function (img) {
        var rect = img.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        var offset = ((rect.top + rect.height / 2 - vhCenter) / vhCenter) * -10;
        img.style.setProperty("--py", offset.toFixed(2) + "px");
        img.style.translate = "0 " + offset.toFixed(2) + "px";
      });
      ticking = false;
    };

    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    applyParallax();
  }
})();
