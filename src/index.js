// CURSOR
const cd = document.getElementById("cd"),
  cr = document.getElementById("cr");
let rx = 0,
  ry = 0,
  mx = 0,
  my = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cd.style.left = mx + "px";
  cd.style.top = my + "px";
});
(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cr.style.left = rx + "px";
  cr.style.top = ry + "px";
  requestAnimationFrame(loop);
})();
document
  .querySelectorAll("a,button,.ci,.acard,.wc,.ecd,.pla,.hpt,.spp")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("ch"));
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("ch"),
    );
  });

// Always start at top when opening/reloading (browser would otherwise scroll to #education etc. if hash is in URL)
window.scrollTo(0, 0);
if (window.location.hash)
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );

// LOADER
const lt = document.getElementById("lt"),
  lb = document.getElementById("lb"),
  loader = document.getElementById("loader");
const ls = " loading portfolio...";
let li = 0;
function tl() {
  if (li < ls.length) {
    lt.textContent += ls[li++];
    setTimeout(tl, 55);
  }
}
tl();
setTimeout(() => (lb.style.width = "100%"), 200);
setTimeout(() => {
  loader.classList.add("hide");
  document.body.classList.remove("loading");
  setTimeout(() => (loader.style.display = "none"), 800);
}, 1900);

// TYPEWRITER
const phrases = [
  "building AI-powered systems.",
  "shipping production backends.",
  "MERN + LLMs in the real world.",
  "turning ideas into live products.",
];
const twEl = document.getElementById("tw");
let pi = 0,
  ci = 0,
  del = false,
  started = false;
function tw() {
  if (!started) return;
  const w = phrases[pi];
  if (!del) {
    twEl.textContent = w.slice(0, ++ci);
    if (ci === w.length) {
      del = true;
      setTimeout(tw, 2000);
      return;
    }
    setTimeout(tw, 60);
  } else {
    twEl.textContent = w.slice(0, --ci);
    if (ci === 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(tw, 400);
      return;
    }
    setTimeout(tw, 35);
  }
}
setTimeout(() => {
  started = true;
  tw();
}, 2600);

// NAV
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => nav.classList.toggle("sc", scrollY > 40),
  { passive: true },
);

// MOBILE MENU
const hb = document.getElementById("hb"),
  mm = document.getElementById("mm"),
  mc = document.getElementById("mc");
hb.addEventListener("click", () => {
  mm.classList.toggle("open");
  hb.classList.toggle("open");
});
mc.addEventListener("click", () => {
  mm.classList.remove("open");
  hb.classList.remove("open");
});
document.querySelectorAll(".ml").forEach((l) =>
  l.addEventListener("click", () => {
    mm.classList.remove("open");
    hb.classList.remove("open");
  }),
);

// REVEAL
const rvEls = document.querySelectorAll(".rv,.rl,.rr");
const ro = new IntersectionObserver(
  (e) =>
    e.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("vis");
    }),
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);
rvEls.forEach((el, i) => {
  const p = el.parentElement;
  const s = [...p.querySelectorAll(".rv,.rl,.rr")];
  el.style.transitionDelay = s.indexOf(el) * 0.08 + "s";
  ro.observe(el);
});

// COUNTERS
const co = new IntersectionObserver(
  (e) =>
    e.forEach((en) => {
      if (en.isIntersecting) {
        const el = en.target,
          t = +el.dataset.count,
          d = 1200,
          s = performance.now();
        (function tick(n) {
          const p = Math.min((n - s) / d, 1),
            ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(ease * t);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = t;
        })(s);
        co.unobserve(el);
      }
    }),
  { threshold: 0.5 },
);
document.querySelectorAll("[data-count]").forEach((c) => co.observe(c));

// COPY
function copyTxt(text, el) {
  navigator.clipboard.writeText(text).then(() => {
    const f = el.querySelector(".cf"),
      a = el.querySelector(".cia");
    if (f) {
      f.classList.add("show");
      if (a) a.style.opacity = "0";
      setTimeout(() => {
        f.classList.remove("show");
        if (a) a.style.opacity = "1";
      }, 2000);
    }
  });
}

// PARALLAX
const b1 = document.querySelector(".b1"),
  b2 = document.querySelector(".b2");
window.addEventListener(
  "scroll",
  () => {
    const y = scrollY;
    b1 && (b1.style.transform = `translateY(${y * 0.15}px)`);
    b2 && (b2.style.transform = `translateY(${-y * 0.1}px)`);
  },
  { passive: true },
);

// ACTIVE NAV
const secs = document.querySelectorAll("section[id]"),
  nls = document.querySelectorAll(".nl a");
window.addEventListener(
  "scroll",
  () => {
    let cur = "";
    secs.forEach((s) => {
      if (scrollY >= s.offsetTop - 140) cur = s.id;
    });
    nls.forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === "#" + cur),
    );
  },
  { passive: true },
);

// ══ TESTIMONIAL TOGGLE ══
function toggleTestimonial(btn) {
  const body = btn.nextElementSibling;
  const icon = btn.querySelector(".toggle-icon");
  const isOpen = btn.classList.contains("open");

  btn.classList.toggle("open", !isOpen);
  body.classList.toggle("open", !isOpen);
  btn.setAttribute("aria-expanded", String(!isOpen));
  icon.textContent = isOpen ? "+" : "×";
}

// ══ DECRYPT TESTIMONIALS ══
const DECRYPT_CHARS = "x#@kL9&mQz!%^*$Wv3nR7pT2sY0eJdBfC8uAiHoG4";

const REVIEWS = {
  fascave: [
    {
      id: "fascave-1",
      text: "He was dedicated, delivered tasks on time, and demonstrated a good problem-solving approach. Proactive in learning and receptive to feedback — a dependable contributor to the team.",
    },
    {
      id: "fascave-2",
      text: "Delivers quality work, has a positive attitude, and is always open to feedback. His problem-solving approach and willingness to learn make him a valuable team member.",
    },
  ],
  raulo: [
    {
      id: "raulo-1",
      text: "Delivers quality work, has a positive attitude, and is always open to feedback. His problem-solving approach and willingness to learn make him a valuable team member.",
    },
  ],
};

// track running intervals so we can cancel them on re-encrypt
const activeTimers = {};

function scramble(text) {
  return text
    .split("")
    .map((ch) =>
      ch === " "
        ? " "
        : DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)],
    )
    .join("");
}

// continuously re-scramble non-revealed chars so it looks alive
function animateDecrypt(
  el,
  targetText,
  statusEl,
  keywordsEl,
  cardEl,
  staggerDelay,
  onDone,
) {
  const totalDuration = 1600;
  const steps = 32;
  const interval = totalDuration / steps;
  let step = 0;
  let cancelled = false;

  const timerId = setTimeout(() => {
    if (cancelled) return;

    statusEl.textContent = "⟳ decrypting";
    statusEl.className = "decrypt-status decrypting";
    cardEl.classList.add("decrypting-active");

    const ticker = setInterval(() => {
      if (cancelled) {
        clearInterval(ticker);
        return;
      }

      step++;
      const progress = step / steps;
      const revealUpTo = Math.floor(progress * targetText.length);
      const revealed = targetText.slice(0, revealUpTo);
      const scrambled = scramble(targetText.slice(revealUpTo));
      el.textContent = revealed + scrambled;
      el.className = "decrypt-text decrypting";

      if (step >= steps) {
        clearInterval(ticker);
        el.textContent = targetText;
        el.className = "decrypt-text unlocked";
        statusEl.textContent = "✓ unlocked";
        statusEl.className = "decrypt-status unlocked";
        cardEl.classList.remove("decrypting-active");
        keywordsEl.classList.add("show");
        if (onDone) onDone();
      }
    }, interval);

    // store ticker so re-encrypt can cancel it
    activeTimers[el.id] = {
      ticker,
      cancel: () => {
        cancelled = true;
        clearInterval(ticker);
      },
    };
  }, staggerDelay);

  // store the stagger timeout too
  activeTimers[el.id + "_delay"] = {
    cancel: () => {
      cancelled = true;
      clearTimeout(timerId);
    },
  };
}

function decryptReviews(company) {
  const reviews = REVIEWS[company];
  if (!reviews) return;

  const btn = document.querySelector(`#decrypt-${company} .decrypt-btn`);
  const isDecrypting = btn.classList.contains("decrypting");
  const isDone = btn.classList.contains("done");

  // ── RE-ENCRYPT ──
  if (isDone) {
    // cancel any lingering timers
    reviews.forEach((r) => {
      const el = document.getElementById(`dt-${r.id}`);
      if (activeTimers[el.id]) activeTimers[el.id].cancel();
      if (activeTimers[el.id + "_delay"])
        activeTimers[el.id + "_delay"].cancel();
    });

    // reset button
    btn.classList.remove("done", "decrypting");
    btn.querySelector(".btn-icon").textContent = "⚷";
    btn.querySelector(".btn-text").textContent = "decrypt_review.sh";

    // reset each card back to scrambled state
    reviews.forEach((r) => {
      const textEl = document.getElementById(`dt-${r.id}`);
      const statusEl = document.getElementById(`ds-${r.id}`);
      const kwEl = document.getElementById(`dk-${r.id}`);
      const cardEl = document.getElementById(`dr-${r.id}`);

      // scramble text again with a rolling animation so it feels like encryption
      let reEncryptSteps = 0;
      const reEncryptTotal = 18;
      const reEncryptInterval = setInterval(() => {
        reEncryptSteps++;
        const progress = reEncryptSteps / reEncryptTotal;
        const lockUpTo = Math.floor(progress * r.text.length);
        // revealed part shrinks, scrambled part grows
        const stillVisible = r.text.slice(0, r.text.length - lockUpTo);
        const nowScrambled = scramble(r.text.slice(r.text.length - lockUpTo));
        textEl.textContent = stillVisible + nowScrambled;
        textEl.className = "decrypt-text decrypting";

        if (reEncryptSteps >= reEncryptTotal) {
          clearInterval(reEncryptInterval);
          textEl.textContent = scramble(r.text);
          textEl.className = "decrypt-text"; // back to red scrambled
          statusEl.textContent = "⚿ locked";
          statusEl.className = "decrypt-status locked";
          kwEl.classList.remove("show");
          cardEl.classList.remove("active", "decrypting-active");
        }
      }, 40);
    });

    return;
  }

  // ignore if mid-decrypt
  if (isDecrypting) return;

  // ── DECRYPT ──
  btn.classList.add("decrypting");
  btn.querySelector(".btn-icon").textContent = "◌";
  btn.querySelector(".btn-text").textContent = "decrypting...";

  let completed = 0;

  reviews.forEach((r, i) => {
    const textEl = document.getElementById(`dt-${r.id}`);
    const statusEl = document.getElementById(`ds-${r.id}`);
    const kwEl = document.getElementById(`dk-${r.id}`);
    const cardEl = document.getElementById(`dr-${r.id}`);

    cardEl.classList.add("active");

    animateDecrypt(textEl, r.text, statusEl, kwEl, cardEl, i * 500, () => {
      completed++;
      if (completed === reviews.length) {
        btn.classList.remove("decrypting");
        btn.classList.add("done");
        btn.querySelector(".btn-icon").textContent = "↺";
        btn.querySelector(".btn-text").textContent = "re-encrypt";
      }
    });
  });
}

// show scrambled text on page load so it always looks encrypted by default
document.addEventListener("DOMContentLoaded", () => {
  Object.values(REVIEWS).forEach((reviews) => {
    reviews.forEach((r) => {
      const el = document.getElementById(`dt-${r.id}`);
      if (el) el.textContent = scramble(r.text);
    });
  });
});

// ══ EXPERIENCE DRAWER TOGGLE ══
function toggleDrawer(btn) {
  const drawerId = btn.getAttribute("data-drawer");
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;

  const isOpen = drawer.classList.contains("open");
  drawer.classList.toggle("open", !isOpen);
  btn.classList.toggle("open", !isOpen);
  btn.setAttribute("aria-expanded", String(!isOpen));
}
