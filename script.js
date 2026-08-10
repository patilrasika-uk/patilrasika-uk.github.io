// ======================================
// Data Analyst Portfolio - script.js
// ======================================


// ======================================
// 1. Smooth Scrolling Navigation
// ======================================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});


// ======================================
// 2. Active Navigation Link
// ======================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);


// ======================================
// 3. Sticky Header Shadow
// ======================================

const header = document.querySelector("header");

function headerShadow() {

    if (!header) return;

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 30px rgba(16, 32, 28, 0.12)";
    } else {
        header.style.boxShadow = "none";
    }

}

window.addEventListener("scroll", headerShadow);
window.addEventListener("load", headerShadow);


// ======================================
// 4. Scroll Reveal Animation
// ======================================

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, #about, #contact, #certificates"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
});

function reveal() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }

    });

}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// ======================================
// 5. Typing Effect (role title)
// ======================================

const typingText = document.querySelector(".typed-role");

const words = [
    "Data Analyst",
    "Power BI Developer",
    "SQL Enthusiast",
    "Dashboard Designer",
    "Python Analyst"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

    }

    const typingSpeed = isDeleting ? 55 : 110;
    setTimeout(typeEffect, typingSpeed);

}

typeEffect();


// ======================================
// 6. Back To Top Button
// ======================================

const topButton = document.createElement("button");
topButton.innerHTML = "↑";
topButton.id = "topBtn";
topButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(topButton);

function toggleTopButton() {
    topButton.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", toggleTopButton);
window.addEventListener("load", toggleTopButton);

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ======================================
// 7. Current Year in Footer
// ======================================

const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent = `© ${new Date().getFullYear()} Rasika Patil — Data Analyst Portfolio`;
}


// ======================================
// 8. Console Log
// ======================================

console.log("Rasika Patil — Data Analyst Portfolio loaded.");
console.log("Projects loaded:", document.querySelectorAll(".project-card").length);
console.log("Skills loaded:", document.querySelectorAll(".skill-card").length);


// ======================================
// END OF SCRIPT
// ======================================
