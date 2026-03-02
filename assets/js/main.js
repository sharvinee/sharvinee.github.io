/* ── helpers ───────────────────────────────────────── */
const get = (id) => document.getElementById(id);

/* ── DOM refs ──────────────────────────────────────── */
const yearEl   = get("year");
const backTop  = get("back-top");
const burger   = get("burger");
const sidebar  = get("sidebar");
const navLinks = document.querySelectorAll(".nav-link");

/* ══════════════════════════════════════════════════
   Intersection-observer reveal (progressive enhancement)
   ══════════════════════════════════════════════════ */
function initReveal() {
  const targets = document.querySelectorAll(
    ".tcard, .pcard, .ccard, .scard, .contact-list li"
  );
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("show"); obs.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  targets.forEach((el) => {
    el.classList.add("reveal");
    obs.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   Active nav on scroll
   ══════════════════════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`);
          });
        }
      });
    },
    { rootMargin: "-10% 0px -85% 0px", threshold: 0 }
  );
  sections.forEach((s) => obs.observe(s));
}

/* ══════════════════════════════════════════════════
   Mobile sidebar toggle
   ══════════════════════════════════════════════════ */
function initBurger() {
  if (!burger || !sidebar) return;
  burger.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  sidebar.querySelectorAll(".nav-link").forEach((l) =>
    l.addEventListener("click", () => {
      sidebar.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

/* ══════════════════════════════════════════════════
   Back to top
   ══════════════════════════════════════════════════ */
function initBackTop() {
  if (!backTop) return;
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 480);
  }, { passive: true });
}

/* ══════════════════════════════════════════════════
   Boot
   ══════════════════════════════════════════════════ */
if (yearEl) yearEl.textContent = new Date().getFullYear();

initReveal();
initActiveNav();
initBurger();
initBackTop();
