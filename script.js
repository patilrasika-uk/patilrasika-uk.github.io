```javascript
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

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

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

        header.style.boxShadow =
            "0 10px 30px rgba(0, 0, 0, 0.25)";

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
    ".hero, .skill-card, .project-card, #about, #contact, #certificates"
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(60px)";
    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

});


function reveal() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const revealTop =
            element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", reveal);

window.addEventListener("load", reveal);


// ======================================
// 5. Typing Effect
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

    // Stop if heading does not exist
    if (!typingText) return;

    const currentWord = words[wordIndex];


    // Typing
    if (!isDeleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;


        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    }


    // Deleting
    else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;


        if (charIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }


    const typingSpeed = isDeleting ? 60 : 120;

    setTimeout(typeEffect, typingSpeed);

}


// Start typing effect
typeEffect();


// ======================================
// 6. Back To Top Button
// ======================================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topBtn";

topButton.setAttribute(
    "aria-label",
    "Back to top"
);


// Add button to page
document.body.appendChild(topButton);


// ======================================
// Back To Top Button Styling
// ======================================

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
topButton.style.visibility = "hidden";
topButton.style.pointerEvents = "none";

topButton.style.transition =
    "opacity 0.3s ease, transform 0.3s ease";

topButton.style.boxShadow =
    "0 8px 20px rgba(0, 0, 0, 0.3)";

topButton.style.zIndex = "999";


// ======================================
// Back To Top Hover Effect
// ======================================

topButton.addEventListener("mouseenter", () => {

    topButton.style.transform =
        "translateY(-4px)";

});


topButton.addEventListener("mouseleave", () => {

    topButton.style.transform =
        "translateY(0)";

});


// ======================================
// Show / Hide Back To Top Button
// ======================================

function toggleTopButton() {

    if (window.scrollY > 400) {

        topButton.style.opacity = "1";
        topButton.style.visibility = "visible";
        topButton.style.pointerEvents = "auto";

    } else {

        topButton.style.opacity = "0";
        topButton.style.visibility = "hidden";
        topButton.style.pointerEvents = "none";

    }

}

window.addEventListener("scroll", toggleTopButton);

window.addEventListener("load", toggleTopButton);


// ======================================
// Back To Top Action
// ======================================

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ======================================
// 7. Project Card Hover Effect
// ======================================

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-8px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});


// ======================================
// 8. Skill Card Hover Effect
// ======================================

const skillCards =
    document.querySelectorAll(".skill-card");


skillCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-6px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});


// ======================================
// 9. Project Links
// ======================================

const projectLinks =
    document.querySelectorAll(".project-card a");


projectLinks.forEach(link => {

    link.addEventListener("click", () => {

        console.log(
            "Opening project:",
            link.closest(".project-card")
                ?.querySelector("h3")
                ?.textContent
        );

    });

});


// ======================================
// 10. Current Year in Footer
// ======================================

const footerText =
    document.querySelector("footer p");


if (footerText) {

    footerText.textContent =
        `© ${new Date().getFullYear()} Rasika Patil | Data Analyst Portfolio`;

}


// ======================================
// 11. Page Loaded Message
// ======================================

console.log(
    "Welcome to Rasika Patil's Data Analyst Portfolio!"
);

console.log(
    "Projects loaded:",
    projectCards.length
);

console.log(
    "Skills loaded:",
    skillCards.length
);


// ======================================
// END OF SCRIPT
// ======================================
```
