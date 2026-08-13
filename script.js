// =========================
// THEME TOGGLE
// (Design is dark by default; "light-theme" is the alternate)
// =========================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");

    if (isLight) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
    }
});

// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isOpen = navLinks.classList.contains("active");
    const icon = menuBtn.querySelector("i");

    menuBtn.setAttribute("aria-expanded", isOpen);
    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-xmark", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        const icon = menuBtn.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

// =========================
// ACTIVE NAV LINK ON SCROLL
// =========================

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const setActiveLink = () => {
    let current = sections[0]?.id;

    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.id;
    });

    navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
};

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealElements.forEach(element => revealObserver.observe(element));

// =========================
// STAT COUNT-UP (real numbers, derived from actual content)
// =========================

const stats = [
    { el: document.getElementById("statProjects"), target: 5 },
    { el: document.getElementById("statTools"), target: 10, suffix: "+" }
];

const countUp = (el, target, suffix = "") => {
    let current = 0;
    const step = Math.max(1, Math.round(target / 30));

    const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current < target) requestAnimationFrame(tick);
    };

    tick();
};

const statCards = document.querySelector(".about-stats");

if (statCards) {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(s => s.el && countUp(s.el, s.target, s.suffix || ""));
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statObserver.observe(statCards);
}

// =========================
// HERO TERMINAL TYPING LINE
// =========================

const typedLine = document.getElementById("typedLine");

if (typedLine) {
    const line = "insights.head(5)";
    let i = 0;

    const type = () => {
        if (i <= line.length) {
            typedLine.textContent = line.slice(0, i);
            i++;
            setTimeout(type, 90);
        }
    };

    setTimeout(type, 600);
}

// =========================
// CURRENT YEAR
// =========================

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
