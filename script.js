// ======================================
// RASIKA PATIL — INTERACTIVE PORTFOLIO
// ======================================

// Smooth navigation
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Active navigation
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// Header shadow
const header = document.querySelector('header');
function updateHeader() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeader, { passive: true });

// Scroll progress
const progress = document.createElement('div');
progress.id = 'scrollProgress';
document.body.appendChild(progress);
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });

// Scroll reveal
const revealItems = document.querySelectorAll('.skill-card, .project-card, .cert-badge, #about, #contact, .toolkit-chart');
revealItems.forEach(el => el.classList.add('reveal-item'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => revealObserver.observe(el));

// Typing effect
const typed = document.querySelector('.typed-role');
const words = ['Data Analyst', 'Power BI Developer', 'SQL Enthusiast', 'Dashboard Designer', 'Python Analyst'];
let wordIndex = 0, charIndex = 0, deleting = false;
function typeEffect() {
  if (!typed) return;
  const word = words[wordIndex];
  typed.textContent = word.substring(0, charIndex);
  if (!deleting) {
    charIndex++;
    if (charIndex > word.length) {
      deleting = true;
      return setTimeout(typeEffect, 1400);
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      charIndex = 0;
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 105);
}
typeEffect();

// Theme toggle
const themeButton = document.createElement('button');
themeButton.id = 'themeToggle';
themeButton.setAttribute('aria-label', 'Toggle light and dark mode');
themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
document.body.appendChild(themeButton);
if (localStorage.getItem('rasika-theme') === 'light') document.body.classList.add('light-theme');
function updateThemeIcon() {
  themeButton.innerHTML = document.body.classList.contains('light-theme')
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}
updateThemeIcon();
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('rasika-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  updateThemeIcon();
});

// KPI counter animation
let countersStarted = false;
const counterObserver = new IntersectionObserver(entries => {
  if (countersStarted) return;
  if (entries.some(entry => entry.isIntersecting)) {
    countersStarted = true;
    document.querySelectorAll('.kpi-num').forEach(el => {
      const target = parseInt(el.textContent, 10);
      if (Number.isNaN(target)) return;
      const start = performance.now();
      const duration = 1000;
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = String(Math.floor(p * target)).padStart(2, '0');
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
}, { threshold: 0.4 });
const heroPanel = document.querySelector('.hero-panel');
if (heroPanel) counterObserver.observe(heroPanel);

// Project carousel
const projectScroll = document.getElementById('projectScroll');
function scrollProjects(direction) {
  if (!projectScroll) return;
  const card = projectScroll.querySelector('.project-card');
  const distance = card ? card.getBoundingClientRect().width + 24 : 364;
  projectScroll.scrollBy({ left: direction * distance, behavior: 'smooth' });
}
document.getElementById('carPrev')?.addEventListener('click', () => scrollProjects(-1));
document.getElementById('carNext')?.addEventListener('click', () => scrollProjects(1));

// Project modal
const projectData = {
  "Domino's Sales Dashboard": {
    tool: 'Tableau + Excel',
    icon: 'fa-chart-column',
    summary: 'Sales performance dashboard covering revenue, orders, product categories and monthly trends.',
    insights: ['Total sales and revenue', 'Total orders', 'Top-selling pizza categories', 'Monthly sales trends', 'Customer ordering patterns']
  },
  'Instagram Analytics Dashboard': {
    tool: 'Power BI + Excel',
    icon: 'fa-chart-line',
    summary: 'Interactive dashboard for engagement, follower growth and top-performing Instagram content.',
    insights: ['Follower growth', 'Likes and comments', 'Engagement rate', 'Top-performing posts', 'Content performance trends']
  },
  'Zudio Sales Dashboard': {
    tool: 'Tableau + Excel',
    icon: 'fa-chart-bar',
    summary: 'Retail sales analysis covering product performance, customers, revenue and categories.',
    insights: ['Total revenue and sales', 'Product performance', 'Category analysis', 'Customer analysis', 'Sales trends']
  },
  'Marketing Analytics Dashboard': {
    tool: 'Power BI + Excel',
    icon: 'fa-bullseye',
    summary: 'Marketing dashboard evaluating campaign performance, engagement, conversion and ROI.',
    insights: ['Campaign performance', 'Customer engagement', 'Conversion rate', 'Marketing ROI', 'Performance trends']
  },
  'Super Sales Dashboard': {
    tool: 'Power BI + DAX',
    icon: 'fa-chart-pie',
    summary: 'Business intelligence dashboard analyzing sales, profit, customers and regional performance.',
    insights: ['Total sales and profit', 'Regional performance', 'Category analysis', 'Customer performance', 'Sales and profit trends']
  }
};

const modal = document.createElement('div');
modal.id = 'projectModal';
modal.innerHTML = `
  <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button class="modal-close" aria-label="Close project details"><i class="fa-solid fa-xmark"></i></button>
    <span class="modal-ref">PROJECT DETAILS</span>
    <div class="modal-icon"><i id="modalIcon" class="fa-solid fa-chart-line"></i></div>
    <h2 id="modalTitle"></h2>
    <p id="modalDescription"></p>
    <div class="modal-info"><div><span>TOOLS</span><strong id="modalTools"></strong></div><div><span>ANALYSIS</span><strong>Business Intelligence</strong></div></div>
    <h3>Key Insights</h3><ul id="modalList"></ul>
    <a id="modalLink" class="modal-project-btn" target="_blank" rel="noopener">Open Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
  </div>`;
document.body.appendChild(modal);

function openProject(card) {
  const title = card.querySelector('h3')?.textContent.trim();
  const data = projectData[title];
  if (!data) return;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDescription').textContent = data.summary;
  document.getElementById('modalTools').textContent = data.tool;
  document.getElementById('modalIcon').className = `fa-solid ${data.icon}`;
  document.getElementById('modalList').innerHTML = data.insights.map(item => `<li>${item}</li>`).join('');
  document.getElementById('modalLink').href = card.querySelector('a')?.href || '#';
  modal.classList.add('active');
  document.body.classList.add('modal-open');
}
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    openProject(card);
  });
});
function closeModal() {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// 3D project tilt
if (window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// Back to top
const topButton = document.createElement('button');
topButton.id = 'topBtn';
topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
topButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(topButton);
window.addEventListener('scroll', () => topButton.classList.toggle('visible', window.scrollY > 450), { passive: true });
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Current year
const footerText = document.querySelector('footer p');
if (footerText) footerText.textContent = `© ${new Date().getFullYear()} Rasika Patil — Data Analyst Portfolio`;

updateActiveNav();
updateHeader();
updateProgress();
console.log('Rasika Patil — Interactive Data Analyst Portfolio loaded.');
