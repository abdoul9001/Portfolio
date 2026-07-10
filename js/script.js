/* =========================================================
   PORTFOLIO — Abdoul-raouf Sonhouin
   Script principal : thème, navigation, animations, formulaire
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. LOADER ---------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    setTimeout(function () {
      loader.classList.add("is-hidden");
    }, 500);
  });

  /* ---------- 2. THÈME CLAIR / SOMBRE ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (e) { /* stockage indisponible */ }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      themeToggle.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      themeToggle.setAttribute("aria-pressed", "false");
    }
  }

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
  }

  themeToggle.addEventListener("click", function () {
    var isLight = root.getAttribute("data-theme") === "light";
    var next = isLight ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch (e) { /* stockage indisponible */ }
  });

  /* ---------- 3. NAVIGATION : scroll state, burger, liens actifs ---------- */
  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var navBurger = document.getElementById("navBurger");
  var navOverlay = document.getElementById("navOverlay");
  var linkEls = document.querySelectorAll(".nav__link");

  function onScrollNav() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  function openMenu() {
    navLinks.classList.add("is-open");
    navBurger.classList.add("is-open");
    navBurger.setAttribute("aria-expanded", "true");
    if (navOverlay) navOverlay.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navLinks.classList.remove("is-open");
    navBurger.classList.remove("is-open");
    navBurger.setAttribute("aria-expanded", "false");
    if (navOverlay) navOverlay.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  navBurger.addEventListener("click", function () {
    if (navLinks.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  linkEls.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // --- Focus trap pour le menu mobile ---
  (function () {
    var firstFocusable = null;
    var lastFocusable = null;

    function getFocusables() {
      var focusables = navLinks.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
      if (focusables.length) {
        firstFocusable = focusables[0];
        lastFocusable = focusables[focusables.length - 1];
      }
    }

    document.addEventListener("keydown", function (e) {
      if (!navLinks.classList.contains("is-open")) return;
      if (e.key === "Escape") { closeMenu(); return; }
      if (e.key !== "Tab") return;

      getFocusables();
      if (!firstFocusable || !lastFocusable) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  })();

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute("id");
        linkEls.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          if (link.getAttribute("href") === "#" + id) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---------- 4. TYPEWRITER (rôles du hero) ---------- */
  var roles = [
    "Développeur Full-Stack",
    "Étudiant en IA & Big Data",
    "Architecte de bases de données",
    "Bâtisseur de Selvy"
  ];
  var twEl = document.getElementById("typewriter");
  var roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    var current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      twEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      twEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  if (twEl) typeLoop();

  /* ---------- 5. SCROLL REVEAL ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- 6. BARRES DE COMPÉTENCES ANIMÉES ---------- */
  var skillFills = document.querySelectorAll(".skill__fill");
  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.style.width = el.getAttribute("data-width") + "%";
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(function (el) { skillObserver.observe(el); });

  /* ---------- 7. FILTRE PROJETS ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");

      projectCards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---------- 8. CARROUSEL TÉMOIGNAGES ---------- */
  var track = document.getElementById("testiTrack");
  var dotsWrap = document.getElementById("testiDots");
  if (track && dotsWrap) {
    var slides = track.children.length;
    var current = 0;
    var autoplay = null;

    for (var i = 0; i < slides; i++) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Témoignage " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      (function (idx) {
        dot.addEventListener("click", function () { goToSlide(idx); resetAutoplay(); });
      })(i);
      dotsWrap.appendChild(dot);
    }

    function goToSlide(idx) {
      if (idx < 0) idx = slides - 1;
      if (idx >= slides) idx = 0;
      current = idx;
      track.style.transform = "translateX(-" + (100 * current) + "%)";
      Array.prototype.forEach.call(dotsWrap.children, function (d, i2) {
        d.classList.toggle("is-active", i2 === current);
      });
    }

    function startAutoplay() {
      if (autoplay) clearInterval(autoplay);
      autoplay = setInterval(function () {
        goToSlide(current + 1);
      }, 5500);
    }

    function resetAutoplay() {
      if (autoplay) clearInterval(autoplay);
      startAutoplay();
    }

    startAutoplay();

    track.parentElement.addEventListener("mouseenter", function () {
      if (autoplay) clearInterval(autoplay);
    });
    track.parentElement.addEventListener("mouseleave", function () {
      startAutoplay();
    });

    // --- Swipe tactile pour mobile ---
    (function () {
      var wrapper = track.parentElement;
      var startX = 0;
      var currentX = 0;
      var isDragging = false;

      wrapper.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = "none";
        if (autoplay) clearInterval(autoplay);
      }, { passive: true });

      wrapper.addEventListener("touchmove", function (e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        var diff = currentX - startX;
        var offset = -current * 100 + (diff / wrapper.offsetWidth) * 100;
        track.style.transform = "translateX(" + offset + "%)";
      }, { passive: true });

      wrapper.addEventListener("touchend", function () {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = "";
        var diff = currentX - startX;
        var threshold = wrapper.offsetWidth * 0.15;
        if (Math.abs(diff) > threshold) {
          if (diff < 0) goToSlide(current + 1);
          else goToSlide(current - 1);
        } else {
          goToSlide(current);
        }
        startAutoplay();
      }, { passive: true });
    })();
  }

  /* ---------- 9. FORMULAIRE DE CONTACT ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function validateField(field) {
    var row = field.closest(".form-row");
    var errorEl = row.querySelector(".form-error");
    var valid = field.checkValidity();

    if (!valid) {
      row.classList.add("has-error");
      if (field.validity.valueMissing) {
        errorEl.textContent = "Ce champ est requis.";
      } else if (field.validity.typeMismatch) {
        errorEl.textContent = "Format invalide.";
      } else {
        errorEl.textContent = "Valeur invalide.";
      }
    } else {
      row.classList.remove("has-error");
      errorEl.textContent = "";
    }
    return valid;
  }

  if (form) {
    var fields = form.querySelectorAll("input[required], textarea[required]");

    fields.forEach(function (field) {
      field.addEventListener("blur", function () { validateField(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        status.textContent = "Merci de corriger les champs indiqués.";
        status.style.color = "#FF6B6B";
        return;
      }

      document.getElementById("replyTo").value = document.getElementById("email").value;

      var submitBtn = form.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      status.style.color = "";
      status.textContent = "Envoi en cours…";

      fetch(form.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      }).then(function (res) {
        if (res.ok) {
          status.textContent = "Message envoyé avec succès ! Je vous réponds rapidement.";
          form.reset();
        } else {
          status.textContent = "Erreur lors de l'envoi. Réessayez ou envoyez un email directement.";
          status.style.color = "#FF6B6B";
        }
      }).catch(function () {
        status.textContent = "Erreur réseau. Réessayez plus tard.";
        status.style.color = "#FF6B6B";
      }).finally(function () {
        submitBtn.disabled = false;
      });
    });
  }

  /* ---------- 10. PROGRESS BAR ---------- */
  var progressBar = document.getElementById("progressBar");
  if (progressBar) {
    window.addEventListener("scroll", function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = "scaleX(" + progress + ")";
      progressBar.setAttribute("aria-valuenow", Math.round(progress * 100));
    }, { passive: true });
  }

  /* ---------- 11. RETOUR EN HAUT ---------- */
  var backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("is-visible", window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 12. ANNÉE COURANTE (FOOTER) ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
