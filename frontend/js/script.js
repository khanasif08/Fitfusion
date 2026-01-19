/* ====== Mobile nav ====== */
function setupNav(hamburgerId, navId) {
  const burger = document.getElementById(hamburgerId);
  const nav = document.getElementById(navId);
  if (!burger || !nav) return;
  burger.addEventListener('click', () => nav.classList.toggle('show'));
}
setupNav('hamburger', 'navLinks');
setupNav('hamburger2', 'navLinks2');

/* ====== Reveal on scroll ====== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: .15 });

document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));

/* ====== Program modal ====== */
const modal = document.getElementById('modal');
if (modal) {
  const title = document.getElementById('modalTitle');
  const meta = document.getElementById('modalMeta');
  document.querySelectorAll('.program-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = JSON.parse(btn.closest('[data-program]').dataset.program);
      title.textContent = data.title;
      meta.textContent = `${data.level} • ${data.weeks}-week cycle`;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  modal.addEventListener('click', (e) => {
    if (e.target.dataset.close === 'modal' || e.target.classList.contains('modal-close')) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ====== Mini calendar (index) ====== */
(function setupCalendar() {
  const grid = document.getElementById('calGrid');
  const title = document.getElementById('calTitle');
  const prev = document.getElementById('prevMonth');
  const next = document.getElementById('nextMonth');
  if (!grid || !title) return;

  let ref = new Date(); // current displayed month
  const todayKey = key(new Date());
  const done = new Set(JSON.parse(localStorage.getItem('ff_done_days') || '[]'));

  function key(d) { return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }

  function render() {
    grid.innerHTML = '';
    const year = ref.getFullYear();
    const month = ref.getMonth();
    title.textContent = ref.toLocaleString(undefined, { month: 'long', year: 'numeric' });

    const first = new Date(year, month, 1);
    const startIdx = (first.getDay() + 6) % 7; // make Monday=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // prev month filler
    const prevDays = new Date(year, month, 0).getDate();
    for (let i = startIdx - 1; i >= 0; i--) {
      const d = prevDays - i;
      const cell = cellEl(d, true, new Date(year, month - 1, d));
      grid.appendChild(cell);
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const cell = cellEl(d, false, date);
      if (key(date) === todayKey) cell.classList.add('today');
      grid.appendChild(cell);
    }
    // next month filler
    while (grid.children.length < 42) {
      const idx = grid.children.length - (startIdx + daysInMonth) + 1;
      const date = new Date(year, month + 1, idx);
      grid.appendChild(cellEl(idx, true, date));
    }

    function cellEl(label, muted, date) {
      const div = document.createElement('button');
      div.type = 'button';
      div.className = 'cal-cell' + (muted ? ' muted' : '');
      div.textContent = label;
      const k = key(date);
      if (done.has(k)) div.classList.add('done');
      div.addEventListener('click', () => {
        if (done.has(k)) done.delete(k); else done.add(k);
        localStorage.setItem('ff_done_days', JSON.stringify([...done]));
        render();
      });
      return div;
    }
  }

  prev?.addEventListener('click', () => { ref.setMonth(ref.getMonth() - 1); render(); });
  next?.addEventListener('click', () => { ref.setMonth(ref.getMonth() + 1); render(); });
  render();
})();

/* ====== Workouts page data + filters ====== */
const workoutsSeed = [
  { name: 'Barbell Bench Press', group: 'chest', level: 'intermediate' },
  { name: 'Incline DB Press', group: 'chest', level: 'beginner' },
  { name: 'Pull Ups', group: 'back', level: 'intermediate' },
  { name: 'Barbell Row', group: 'back', level: 'advanced' },
  { name: 'Back Squat', group: 'legs', level: 'advanced' },
  { name: 'Leg Press', group: 'legs', level: 'beginner' },
  { name: 'Overhead Press', group: 'shoulders', level: 'intermediate' },
  { name: 'Lateral Raises', group: 'shoulders', level: 'beginner' },
  { name: 'Barbell Curl', group: 'arms', level: 'beginner' },
  { name: 'Skull Crushers', group: 'arms', level: 'intermediate' },
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
            <h3 style="margin-top:6px">${w.name}</h3>
            <p class="muted" style="margin:6px 0 12px;">Level: ${w.level}</p>
            <button class="btn btn-secondary">Add to Plan</button>
          </div>`;
        grid.appendChild(card);
      });
  }
  fGroup?.addEventListener('change', draw);
  fLevel?.addEventListener('change', draw);
  draw();
})();


const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});






document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const logoutBtn = document.getElementById("logoutBtn");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const userGreeting = document.getElementById("userGreeting");

  if (user) {
    // Show greeting and logout if logged in
    logoutBtn.style.display = "inline-block";
    loginLink.style.display = "none";
    registerLink.style.display = "none";

    if (user.username) {
      userGreeting.textContent = `Hi, ${user.username}`;
      userGreeting.style.display = "inline-block";
    }
  }

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
});
