/* ====== Mobile nav ====== */
function setupNav(hamburgerId, navId) {
  const burger = document.getElementById(hamburgerId);
  const nav = document.getElementById(navId);
  if (!burger || !nav) return;
  burger.addEventListener("click", () => nav.classList.toggle("show"));
}
setupNav("hamburger", "navLinks");
setupNav("hamburger2", "navLinks2");

/* ====== Reveal on scroll ====== */
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal-up").forEach(el => io.observe(el));

/* =====================================================
   MODALS — DECLARED ONCE (IMPORTANT)
===================================================== */
const programModal = document.getElementById("modal");
const paymentModal = document.getElementById("paymentModal");
const eliteModal = document.getElementById("elitePaymentModal");

const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");

/* ====== PROGRAM DETAILS MODAL ====== */
document.querySelectorAll(".program-details").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest("[data-program]");
    if (!card) return;

    const program = JSON.parse(card.dataset.program);
    modalTitle.textContent = program.title;
    modalMeta.textContent = `${program.level} • ${program.weeks} weeks`;

    programModal.style.display = "flex";
    programModal.setAttribute("aria-hidden", "false");
  });
});

programModal?.addEventListener("click", e => {
  if (
    e.target.dataset.close === "modal" ||
    e.target.classList.contains("modal-close")
  ) {
    programModal.style.display = "none";
    programModal.setAttribute("aria-hidden", "true");
  }
});

/* ====== GO PRO MODAL ====== */
document.querySelectorAll("button").forEach(btn => {
  if (btn.textContent.trim() === "Go Pro") {
    btn.addEventListener("click", () => {
      paymentModal.style.display = "flex";
      paymentModal.setAttribute("aria-hidden", "false");
    });
  }
});

paymentModal
  ?.querySelectorAll("[data-close='paymentModal']")
  .forEach(el =>
    el.addEventListener("click", () => {
      paymentModal.style.display = "none";
      paymentModal.setAttribute("aria-hidden", "true");
    })
  );

/* ====== ELITE MODAL ====== */
document.querySelectorAll("button").forEach(btn => {
  if (btn.textContent.trim() === "Join Elite") {
    btn.addEventListener("click", () => {
      eliteModal.style.display = "flex";
      eliteModal.setAttribute("aria-hidden", "false");
    });
  }
});

eliteModal
  ?.querySelectorAll("[data-close='elitePaymentModal']")
  .forEach(el =>
    el.addEventListener("click", () => {
      eliteModal.style.display = "none";
      eliteModal.setAttribute("aria-hidden", "true");
    })
  );

/* ====== Scroll to top ====== */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  scrollTopBtn.style.display =
    document.documentElement.scrollTop > 200 ? "block" : "none";
});
scrollTopBtn?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* ====== LOGIN STATE ====== */
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const userGreeting = document.getElementById("userGreeting");

  if (user) {
    logoutBtn.style.display = "inline-block";
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    userGreeting.textContent = `Hi, ${user.username}`;
    userGreeting.style.display = "inline-block";
  }

  logoutBtn?.addEventListener("click", e => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
});
