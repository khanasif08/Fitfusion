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
const startBtn = document.getElementById("startProgramBtn");
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

      // send program to workout page
      startBtn.href = `workouts.html?program=${encodeURIComponent(program.title)}`;

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


/* ====== Workouts page data + filters ====== */
const workoutsSeed = [

  // CHEST
  { name: 'Push-ups', group: 'chest', level: 'beginner', video: 'https://www.youtube.com/embed/IODxDxX7oi4' },
  { name: 'Chest Fly', group: 'chest', level: 'beginner', video: 'https://www.youtube.com/embed/eozdVDA78K0' },
  { name: 'Dumbbell Bench Press', group: 'chest', level: 'beginner', video: 'https://www.youtube.com/embed/VmB1G1K7v94' },

  { name: 'Barbell Bench Press', group: 'chest', level: 'intermediate', video: 'https://www.youtube.com/embed/rT7DgCr-3pg' },
  { name: 'Incline Dumbbell Press', group: 'chest', level: 'intermediate', video: 'https://www.youtube.com/embed/8iPEnn-ltC8' },
  { name: 'Cable Chest Fly', group: 'chest', level: 'intermediate', video: 'https://www.youtube.com/embed/taI4XduLpTk' },

  { name: 'Weighted Dips', group: 'chest', level: 'advanced', video: 'https://www.youtube.com/embed/2z8JmcrW-As' },
  { name: 'Decline Bench Press', group: 'chest', level: 'advanced', video: 'https://www.youtube.com/embed/LfyQBUKR8SE' },
  { name: 'Single Arm Dumbbell Press', group: 'chest', level: 'advanced', video: 'https://www.youtube.com/embed/9QZpQb4xKJQ' },


  // BACK
  { name: 'Lat Pulldown', group: 'back', level: 'beginner', video: 'https://www.youtube.com/embed/CAwf7n6Luuc' },
  { name: 'Seated Cable Row', group: 'back', level: 'beginner', video: 'https://www.youtube.com/embed/HJSVR_67OlM' },
  { name: 'Assisted Pull-ups', group: 'back', level: 'beginner', video: 'https://www.youtube.com/embed/eGo4IYlbE5g' },

  { name: 'Barbell Row', group: 'back', level: 'intermediate', video: 'https://www.youtube.com/embed/vT2GjY_Umpw' },
  { name: 'T-Bar Row', group: 'back', level: 'intermediate', video: 'https://www.youtube.com/embed/j3Igk5nyZE4' },
  { name: 'Single Arm Dumbbell Row', group: 'back', level: 'intermediate', video: 'https://www.youtube.com/embed/pYcpY20QaE8' },

  { name: 'Deadlift', group: 'back', level: 'advanced', video: 'https://www.youtube.com/embed/op9kVnSso6Q' },
  { name: 'Weighted Pull-ups', group: 'back', level: 'advanced', video: 'https://www.youtube.com/embed/HRV5YKKaeVw' },
  { name: 'Pendlay Row', group: 'back', level: 'advanced', video: 'https://www.youtube.com/embed/ZlRrIsoDpKg' },


  // ARMS
  { name: 'Dumbbell Curl', group: 'arms', level: 'beginner', video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo' },
  { name: 'Hammer Curl', group: 'arms', level: 'beginner', video: 'https://www.youtube.com/embed/zC3nLlEvin4' },
  { name: 'Cable Tricep Pushdown', group: 'arms', level: 'beginner', video: 'https://www.youtube.com/embed/2-LAMcpzODU' },

  { name: 'Barbell Curl', group: 'arms', level: 'intermediate', video: 'https://www.youtube.com/embed/kwG2ipFRgfo' },
  { name: 'Preacher Curl', group: 'arms', level: 'intermediate', video: 'https://www.youtube.com/embed/fIWP-FRFNU0' },
  { name: 'Overhead Tricep Extension', group: 'arms', level: 'intermediate', video: 'https://www.youtube.com/embed/YbX7Wd8jQ-Q' },

  { name: 'EZ Bar Curl', group: 'arms', level: 'advanced', video: 'https://www.youtube.com/embed/QZEqB6wUPxQ' },
  { name: 'Close Grip Bench Press', group: 'arms', level: 'advanced', video: 'https://www.youtube.com/embed/nEF0bv2FW94' },
  { name: 'Skull Crushers', group: 'arms', level: 'advanced', video: 'https://www.youtube.com/embed/d_KZxkY_0cM' },


  // LEGS
  { name: 'Bodyweight Squats', group: 'legs', level: 'beginner', video: 'https://www.youtube.com/embed/aclHkVaku9U' },
  { name: 'Walking Lunges', group: 'legs', level: 'beginner', video: 'https://www.youtube.com/embed/QOVaHwm-Q6U' },
  { name: 'Glute Bridge', group: 'legs', level: 'beginner', video: 'https://www.youtube.com/embed/wPM8icPu6H8' },

  { name: 'Leg Press', group: 'legs', level: 'intermediate', video: 'https://www.youtube.com/embed/IZxyjW7MPJQ' },
  { name: 'Romanian Deadlift', group: 'legs', level: 'intermediate', video: 'https://www.youtube.com/embed/2SHsk9AzdjA' },
  { name: 'Leg Curl', group: 'legs', level: 'intermediate', video: 'https://www.youtube.com/embed/1Tq3QdYUuHs' },

  { name: 'Back Squat', group: 'legs', level: 'advanced', video: 'https://www.youtube.com/embed/ultWZbUMPL8' },
  { name: 'Bulgarian Split Squat', group: 'legs', level: 'advanced', video: 'https://www.youtube.com/embed/2C-uNgKwPLE' },
  { name: 'Barbell Hip Thrust', group: 'legs', level: 'advanced', video: 'https://www.youtube.com/embed/LM8XHLYJoYs' },


  // SHOULDERS
  { name: 'Lateral Raises', group: 'shoulders', level: 'beginner', video: 'https://www.youtube.com/embed/kDqklk1ZESo' },
  { name: 'Front Raises', group: 'shoulders', level: 'beginner', video: 'https://www.youtube.com/embed/-t7fuZ0KhDA' },
  { name: 'Dumbbell Shoulder Press', group: 'shoulders', level: 'beginner', video: 'https://www.youtube.com/embed/B-aVuyhvLHU' },

  { name: 'Overhead Press', group: 'shoulders', level: 'intermediate', video: 'https://www.youtube.com/embed/qEwKCR5JCog' },
  { name: 'Arnold Press', group: 'shoulders', level: 'intermediate', video: 'https://www.youtube.com/embed/vj2w851ZHRM' },
  { name: 'Upright Row', group: 'shoulders', level: 'intermediate', video: 'https://www.youtube.com/embed/amCU-ziHITM' },

  { name: 'Barbell Push Press', group: 'shoulders', level: 'advanced', video: 'https://www.youtube.com/embed/iaBVSJm78ko' },
  { name: 'Handstand Push-ups', group: 'shoulders', level: 'advanced', video: 'https://www.youtube.com/embed/tQhrk6WMcKw' },
  { name: 'Cable Face Pull', group: 'shoulders', level: 'advanced', video: 'https://www.youtube.com/embed/rep-qVOkqgk' }

];


(function renderWorkouts() {
  const grid = document.getElementById('workoutGrid');
  const fGroup = document.getElementById('filterGroup');
  const fLevel = document.getElementById('filterLevel');
  if (!grid) return;

  function draw() {
    grid.innerHTML = '';
    const g = (fGroup?.value || 'all');
    const l = (fLevel?.value || 'all');
    workoutsSeed
      .filter(w => (g === 'all' || w.group === g) && (l === 'all' || w.level === l))
      .forEach(w => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-body">
          <span class="badge">${w.group.toUpperCase()}</span>
          <h3 class="exercise-title">${w.name}</h3>
          <p class="muted">Level: ${w.level}</p>

          <div style="display:flex; gap:10px; margin-top:10px;">
          <button class="btn btn-secondary add-plan">Add to Plan</button>
         <button class="btn btn-ghost watch-video" data-video="${w.video}">
        Watch Demo
      </button>
    </div>
  </div>
`;
        grid.appendChild(card);
      });
  }
  fGroup?.addEventListener('change', draw);
  fLevel?.addEventListener('change', draw);
  draw();
})();

/* ===== Exercise Video Modal ===== */

const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("exerciseVideo");

document.addEventListener("click", e => {

  if (e.target.classList.contains("watch-video")) {

    const video = e.target.dataset.video;

    videoFrame.src = video;
    videoModal.classList.add("show");
    videoModal.setAttribute("aria-hidden", "false");

  }

  if (e.target.dataset.close === "videoModal") {

    videoModal.classList.remove("show");
    videoFrame.src = "";

  }

});


