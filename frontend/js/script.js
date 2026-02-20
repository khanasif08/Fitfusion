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

/* =================================================
   PROGRAM DETAILS MODAL  (SAFE — LIKE OLD VERSION)
================================================= */
const modal = document.getElementById("modal");
if (modal) {
  const title = document.getElementById("modalTitle");
  const meta = document.getElementById("modalMeta");

  document.querySelectorAll(".program-details").forEach(btn => {
    btn.addEventListener("click", () => {
      const program = JSON.parse(
        btn.closest("[data-program]").dataset.program
      );

      title.textContent = program.title;
      meta.textContent = `${program.level} • ${program.weeks} weeks`;

      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modal.addEventListener("click", e => {
    if (
      e.target.dataset.close === "modal" ||
      e.target.classList.contains("modal-close")
    ) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

/* =================================================
   GO PRO MODAL
================================================= */
const paymentModal = document.getElementById("paymentModal");
document.querySelectorAll(".go-pro-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    paymentModal.classList.add("show");
    paymentModal.setAttribute("aria-hidden", "false");
  });
});

paymentModal?.addEventListener("click", e => {
  if (e.target.dataset.close === "paymentModal") {
    paymentModal.classList.remove("show");
    paymentModal.setAttribute("aria-hidden", "true");
  }
});

/* =================================================
   ELITE MODAL
================================================= */
const eliteModal = document.getElementById("elitePaymentModal");
document.querySelectorAll(".elite-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    eliteModal.classList.add("show");
    eliteModal.setAttribute("aria-hidden", "false");
  });
});

eliteModal?.addEventListener("click", e => {
  if (e.target.dataset.close === "elitePaymentModal") {
    eliteModal.classList.remove("show");
    eliteModal.setAttribute("aria-hidden", "true");
  }
});

/* ====== Scroll to top ====== */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display =
    document.documentElement.scrollTop > 200 ? "block" : "none";
});
scrollTopBtn?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* ====== Login state ====== */
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
