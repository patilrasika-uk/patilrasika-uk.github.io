// ======================================
// Data Analyst Portfolio - script.js
// ======================================

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ======================================
// Active Navigation Link
// ======================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ======================================
// Sticky Header Shadow
// ======================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";
    }
    else {

        header.style.boxShadow = "none";
    }

});

// ======================================
// Scroll Reveal Animation
// ======================================

const revealElements = document.querySelectorAll(
    ".hero, .skill-card, .project-card, #about, #contact, #certificates"
);

const reveal = () => {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            element.style.transition = "all .8s ease";

        }

    });

};

revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(60px)";

});

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// ======================================
// Typing Effect
// ======================================

const typingText = document.querySelector(".hero-text h2");

const words = [
    "Aspiring Data Analyst",
    "Power BI Developer",
    "SQL Enthusiast",
    "Python Learner",
    "Tableau Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingText.textContent = currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1200);

            return;
        }

    }
    else {

        typingText.textContent = currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= words.length)
                wordIndex = 0;

        }

    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);

}

typeEffect();

// ======================================
// Back To Top Button
// ======================================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";
topButton.id = "topBtn";
topButton.setAttribute("aria-label", "Back to top");

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.right = "25px";
topButton.style.bottom = "25px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.borderRadius = "50%";
topButton.style.border = "none";
topButton.style.cursor = "pointer";
topButton.style.fontSize = "22px";
topButton.style.fontWeight = "600";
topButton.style.background = "#38bdf8";
topButton.style.color = "#0f172a";
topButton.style.opacity = "0";
topButton.style.pointerEvents = "none";
topButton.style.transition = "opacity .3s ease, transform .3s ease";
topButton.style.boxShadow = "0 8px 20px rgba(0,0,0,.3)";
topButton.style.zIndex = "999";

topButton.addEventListener("mouseenter", () => {
    topButton.style.transform = "translateY(-4px)";
});

topButton.addEventListener("mouseleave", () => {
    topButton.style.transform = "translateY(0)";
});

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.style.opacity = "1";
        topButton.style.pointerEvents = "auto";

    } else {

        topButton.style.opacity = "0";
        topButton.style.pointerEvents = "none";

    }

});

topButton.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

// ======================================
// Console Message
// ======================================

console.log("Welcome to Rasika Patil's Data Analyst Portfolio!");
