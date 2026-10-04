/* =====================================================
   JAVASCRIPT INTERACTIVO (LUXURY WEDDING INVITATION)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. PANTALLA DE BIENVENIDA CON SELLO DE CERA
    ===================================================== */
    const welcomeScreen = document.getElementById("welcome-screen");
    const enterButton = document.getElementById("enter-button");
    const music = document.getElementById("background-music");
    const musicButton = document.getElementById("music-button");

    enterButton.addEventListener("click", () => {
        // Animación de ocultar pantalla de bienvenida
        welcomeScreen.classList.add("hidden");

        // Intentar reproducir música de fondo suavemente al abrir
        if (music) {
            music.play()
                .then(() => {
                    musicButton.classList.add("playing");
                })
                .catch((err) => {
                    console.log("El navegador bloqueó la reproducción automática:", err);
                });
        }

        // Iniciar lluvia de pétalos tras abrir la invitación
        createFallingPetals();
    });

    /* =====================================================
       2. REPRODUCTOR FLOTANTE DE MÚSICA
    ===================================================== */
    musicButton.addEventListener("click", () => {
        if (!music || !music.src) {
            showToast("Agrega un archivo de música en el elemento audio del HTML.");
            return;
        }

        if (music.paused) {
            music.play();
            musicButton.classList.add("playing");
            showToast("🎵 Música reproducida");
        } else {
            music.pause();
            musicButton.classList.remove("playing");
            showToast("⏸️ Música pausada");
        }
    });

    /* =====================================================
       3. CUENTA REGRESIVA DINÁMICA
       Fecha de la Boda: 14 de Noviembre de 2026 - 18:00 hrs
    ===================================================== */
    const weddingDate = new Date(2026, 10, 14, 18, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        if (distance <= 0) {
            if (daysElement) daysElement.innerText = "00";
            if (hoursElement) hoursElement.innerText = "00";
            if (minutesElement) minutesElement.innerText = "00";
            if (secondsElement) secondsElement.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysElement) daysElement.innerText = String(days).padStart(2, "0");
        if (hoursElement) hoursElement.innerText = String(hours).padStart(2, "0");
        if (minutesElement) minutesElement.innerText = String(minutes).padStart(2, "0");
        if (secondsElement) secondsElement.innerText = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* =====================================================
       4. ANIMACIONES AL HACER SCROLL (SCROLL REVEAL)
    ===================================================== */
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    revealElements.forEach((el) => observer.observe(el));

    /* =====================================================
       5. BOTÓN COPIAR CUENTA BANCARIA / CLABE
    ===================================================== */
    const copyBankBtn = document.getElementById("copy-bank-btn");
    const bankClabe = document.getElementById("bank-clabe");

    if (copyBankBtn && bankClabe) {
        copyBankBtn.addEventListener("click", () => {
            const clabeText = bankClabe.innerText.replace(/\s+/g, '');
            
            navigator.clipboard.writeText(clabeText)
                .then(() => {
                    showToast("¡CLABE copiada al portapapeles! 📋");
                })
                .catch(() => {
                    showToast("No se pudo copiar automáticamente");
                });
        });
    }

    /* =====================================================
       6. FORMULARIO RSVP INTEGRADO A WHATSAPP
    ===================================================== */
    const rsvpForm = document.getElementById("rsvp-form");

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("rsvp-name").value.trim();
            const attendance = document.getElementById("rsvp-attendance").value;
            const guests = document.getElementById("rsvp-guests").value;
            const song = document.getElementById("rsvp-song").value.trim();

            if (!name) {
                showToast("Por favor ingresa tu nombre");
                return;
            }

            // Construcción del mensaje elegante para WhatsApp
            let message = `¡Hola Heiner & Xochilt! 👋✨\n\n`;
            message += `Soy *${name}* y confirmo mi respuesta para su boda:\n`;
            message += `• *Asistencia:* ${attendance}\n`;
            
            if (attendance.includes("asistiré") || attendance.includes("sí") || attendance.includes("Sí")) {
                message += `• *Pases a utilizar:* ${guests}\n`;
                if (song) {
                    message += `• *Canción sugerida:* 🎵 ${song}\n`;
                }
            }
            
            message += `\n¡Gracias por la invitación! ❤️`;

            // Número de WhatsApp (puedes reemplazar con el número real de los novios)
            const phoneNumber = "50585019486"; 
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Abrir WhatsApp en nueva pestaña
            window.open(whatsappUrl, "_blank");
            showToast("Abriendo WhatsApp para enviar confirmación...");
        });
    }

    /* =====================================================
       7. GALERÍA DE FOTOS (LIGHTBOX MODAL)
    ===================================================== */
    const galleryImages = document.querySelectorAll(".gallery-item img");
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.querySelector(".close-modal");

    if (galleryImages && modal && modalImage) {
        galleryImages.forEach((img) => {
            img.addEventListener("click", () => {
                modalImage.src = img.src;
                modal.classList.add("active");
            });
        });

        if (closeModal) {
            closeModal.addEventListener("click", () => {
                modal.classList.remove("active");
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }

    /* =====================================================
       8. TOAST NOTIFICATION HELPER
    ===================================================== */
    function showToast(text) {
        const toast = document.getElementById("toast");
        const toastMessage = document.getElementById("toast-message");

        if (toast && toastMessage) {
            toastMessage.innerText = text;
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3200);
        }
    }

    /* =====================================================
       9. LLUVIA DE PÉTALOS / HOJAS FLOTANTES
    ===================================================== */
    function createFallingPetals() {
        const container = document.getElementById("petals-container");
        if (!container) return;

        const petalSymbols = ["🌸", "🌿", "🍃", "✨", "🤍"];
        const numberOfPetals = 15;

        for (let i = 0; i < numberOfPetals; i++) {
            const petal = document.createElement("div");
            petal.className = "falling-petal";
            petal.innerText = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
            
            // Posicionamiento aleatorio
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${6 + Math.random() * 7}s`;
            petal.style.animationDelay = `${Math.random() * 5}s`;
            petal.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;

            container.appendChild(petal);
        }
    }
});
