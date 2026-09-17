// ==============================
// MENU MOBILE
// ==============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Fecha o menu quando um link é clicado

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


// ==============================
// MODAL
// ==============================

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const buttons = document.querySelectorAll(".learn-more");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const title = button.getAttribute("data-title");
        const text = button.getAttribute("data-text");

        modalTitle.textContent = title;
        modalText.textContent = text;

        modal.classList.add("active");

    });

});


// Fecha o modal

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


// Fecha clicando fora da janela

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("active");
    }

});


// Fecha com a tecla ESC

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("active");
    }

});


// ==============================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ==============================

const elements = document.querySelectorAll(
    ".card, .timeline-item, .info-box, .quote-box, .legacy-grid div"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


// Estado inicial dos elementos

elements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});
