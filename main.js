// Елементи
const popupOverlay = document.getElementById("popup-overlay");
const popupClose = document.getElementById("popup-close");
const ticketButtons = document.querySelectorAll(".ticket-btn");
const heroButton = document.querySelector(".hero .btn-primary");
const ticketForm = document.getElementById("ticket-form");

// Відкрити pop-up
function openPopup() {
    popupOverlay.style.display = "flex";
}

// Закрити pop-up
function closePopup() {
    popupOverlay.style.display = "none";
}

// кнопки відкриття
ticketButtons.forEach(btn => btn.addEventListener("click", openPopup));
heroButton.addEventListener("click", openPopup);

// закриття по кнопці
popupClose.addEventListener("click", closePopup);

// закриття по фону
popupOverlay.addEventListener("click", e => {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// відправка форми
ticketForm.addEventListener("submit", e => {
    e.preventDefault();

    alert("Ваш квиток заброньовано! 🎟️");

    ticketForm.reset();
    closePopup();
});

// --- Mobile nav toggle (SVG hamburger) ---
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

function openNav() {
    if (!navList || !navToggle) return;
    navList.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    const firstLink = navList.querySelector('a');
    if (firstLink) firstLink.focus();
}

function closeNav() {
    if (!navList || !navToggle) return;
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
}

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navList && navList.classList.contains('open');
        if (isOpen) closeNav(); else openNav();
    });

    const ticketEventInput = document.getElementById('ticket-event');
    const ticketNameInput = document.getElementById('ticket-name');
    const ticketEmailInput = document.getElementById('ticket-email');
    const ticketSubmit = document.getElementById('ticket-submit');
    const contactForm = document.getElementById('contact-form');
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactMessage = document.getElementById('contact-message');
    // close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navList) return;
        popupOverlay.setAttribute('aria-hidden', 'false');
        if (!navList.classList.contains('open')) return;
        const target = e.target;
        if (target === navToggle || navToggle.contains(target) || navList.contains(target)) return;
        closeNav();
        popupOverlay.setAttribute('aria-hidden', 'true');
    });

    // close on Escape (also closes popup)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navList && navList.classList.contains('open')) closeNav();
            if (popupOverlay && popupOverlay.style.display === 'flex') closePopup();
        }
    });
}