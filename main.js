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