/* ── helpers ───────────────────────────────────────── */
const get = (id) => document.getElementById(id);

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
  const sections = [...document.querySelectorAll("section[id]")];
  const links    = [...document.querySelectorAll(".nav-link")];

  if (!sections.length || !links.length) return;

  function setActive() {
    const mid = window.innerHeight * 0.4;
    let current = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top < mid) current = s;
    }
    const target = `#${current.id}`;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === target));
  }

  window.addEventListener("scroll", setActive, { passive: true });
  window.addEventListener("resize", setActive, { passive: true });

  // run after first paint so layout is finalised
  requestAnimationFrame(() => requestAnimationFrame(setActive));
}

/* ══════════════════════════════════════════════════
   Mobile sidebar toggle
   ══════════════════════════════════════════════════ */
function initBurger() {
  const burger  = get("burger");
  const sidebar = get("sidebar");
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
  const backTop = get("back-top");
  if (!backTop) return;
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 480);
  }, { passive: true });
}

/* ══════════════════════════════════════════════════
   Boot
   ══════════════════════════════════════════════════ */
const yearEl = get("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

initReveal();
initActiveNav();
initBurger();
initBackTop();
initReveal();
initActiveNav();
initBurger();
initBackTop();
