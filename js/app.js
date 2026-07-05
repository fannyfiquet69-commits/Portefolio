// ===============================
// MENU ACTIF AU SCROLL
// ===============================

const sections = document.querySelectorAll(".section, .slider");
const navLinks = document.querySelectorAll(".header-menu a");

const menuProjects = document.getElementById("menu-projects");
const submenuPhotos = document.getElementById("submenu-photos");
const submenuDrone = document.getElementById("submenu-drone");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.id;
        }

    });

    if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 10
    ) {
        current = "contact";
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    menuProjects.classList.remove("active");
    submenuPhotos.classList.remove("active");
    submenuDrone.classList.remove("active");

    navLinks.forEach(link => {

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

    if (current === "projects") {
        menuProjects.classList.add("active");
        submenuPhotos.classList.add("active");
    }

    if (current === "drone") {
        menuProjects.classList.add("active");
        submenuDrone.classList.add("active");
    }

});


// ===============================
// GALERIES PHOTOS
// ===============================

const galleries = {

    2026: [
        "img/2026/soleil-2026.jpg",
        "img/2026/soleil-2026-1.jpg",
        "img/2026/soleil-2026-2.jpg",
        "img/2026/emilie-2026.jpg",
        "img/2026/cygne-2026.jpg"
    ],

    2025: [
        "img/2025/puydufou-2025.JPG",
        "img/2025/vacance-alice-2025-1.JPG",
        "img/2025/vacance-alice-2025-2.JPG"
    ],

    2024: [
        "img/2024/concert-2024.jpg",
        "img/2024/concert-2024-1.jpg",
        "img/2024/concert-2024-2.jpg"
    ],

    2023: [
        "img/2023/erwan-2023.jpg",
        "img/2023/ciel-2023.jpg"
    ],

    2022: [
        "img/2022/rallye-2022.jpg",
        "img/2022/rallye-2022-1.jpg",
        "img/2022/rallye-2022-2.jpg",
        "img/2022/rallye-2022-3.jpg",
        "img/2022/rallye-2022-4.jpg"
    ],

    2021: [
        "img/2021/agathe-2021.JPG",
        "img/2021/agathe-2021-1.JPG",
        "img/2021/agathe-2021-2.JPG"
    ]

};


// ===============================
// GALERIES DRONE
// ===============================

const droneGalleries = {

    photos: [
        "img/Drone/imgdrone.JPG",
        "img/Drone/drone-1.JPG",
        "img/Drone/drone-2.JPG",
        "img/Drone/drone-3.JPG"
    ],

    videos: [
        "video/DRONE-1.mp4",
        "video/DRONE-2.mp4"
    ]

};


// ===============================
// VARIABLE SWIPER
// ===============================

let swiper;

// ===============================
// OUVERTURE CARROUSEL PHOTOS
// ===============================

function openCarousel(year) {

    document.body.style.overflow = "hidden";

    document.getElementById("modal").classList.add("active");
    document.getElementById("carousel-title").innerText = year;

    const wrapper = document.getElementById("swiperWrapper");

    if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
    }

    wrapper.innerHTML = "";

    galleries[year].forEach(image => {
        wrapper.innerHTML += `
            <div class="swiper-slide">
                <img src="${image}" alt="">
            </div>
        `;
    });

    swiper = new Swiper(".mySwiper", {

        loop: true,
        speed: 800,

        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 20,

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }

    });
}

// ===============================
// OUVERTURE CARROUSEL DRONE
// ===============================

function openDroneCarousel(type) {

    document.body.style.overflow = "hidden";

    document.getElementById("modal").classList.add("active");

    document.getElementById("carousel-title").innerText =
        type === "photos" ? "Drone - Photos" : "Drone - Videos";

    const wrapper = document.getElementById("swiperWrapper");

    if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
    }

    wrapper.innerHTML = "";

    droneGalleries[type].forEach(item => {

        if (type === "photos") {
            wrapper.innerHTML += `
                <div class="swiper-slide">
                    <img src="${item}" alt="">
                </div>
            `;
        } else {
            wrapper.innerHTML += `
                <div class="swiper-slide">
                    <video controls>
                        <source src="${item}" type="video/mp4">
                    </video>
                </div>
            `;
        }

    });

    swiper = new Swiper(".mySwiper", {

        loop: true,
        speed: 800,

        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 20,

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        on: {

        init: playCurrentVideo,

        slideChangeTransitionEnd: playCurrentVideo

    }

    });
}

// ===============================
// CREATION DU SWIPER
// ===============================

function createSwiper(totalSlides) {

    swiper = new Swiper(".mySwiper", {

        loop: true,
        speed: 800,

        allowTouchMove: true,

        slidesPerView: 1,

        centeredSlides: true,

        spaceBetween: 20,

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        observer: true,
        observeParents: true,
        observeSlideChildren: true,

        on: {

    init() {
        updateCounter(totalSlides);
        playCurrentVideo();
    },

    slideChange() {
        updateCounter(totalSlides);
    },

    slideChangeTransitionEnd() {
        playCurrentVideo();
    }

}

    });

}

function playCurrentVideo() {

    // Arrêter toutes les vidéos
    document.querySelectorAll(".swiper-slide video").forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    // Récupérer la slide actuellement affichée
    const activeSlide = document.querySelector(".swiper-slide-active");

    if (!activeSlide) return;

    // Chercher une vidéo dans cette slide
    const currentVideo = activeSlide.querySelector("video");

    if (currentVideo) {
        currentVideo.play().catch(() => {});
    }

}

// ===============================
// FERMETURE DU CARROUSEL
// ===============================

function closeCarousel() {

    document.body.style.overflow = "";

    document.getElementById("modal").classList.remove("active");

    if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
    }
}


// ===============================
// FERMETURE EN CLIQUANT À L'EXTERIEUR
// ===============================

document.getElementById("modal").addEventListener("click", function (e) {

    if (e.target.id === "modal") {
        closeCarousel();
    }

});


// ===============================
// RACCOURCIS CLAVIER
// ===============================

document.addEventListener("keydown", (e) => {

    const modal = document.getElementById("modal");

    if (!modal.classList.contains("active")) return;
    if (!swiper) return;

    switch (e.key) {

        case "Escape":
            closeCarousel();
            break;

        case "ArrowRight":
            e.preventDefault();
            swiper.slideNext();
            break;

        case "ArrowLeft":
            e.preventDefault();
            swiper.slidePrev();
            break;
    }
});

document.addEventListener("keydown", function (e) {

    // si le carrousel n'est pas ouvert, on ne fait rien
    if (!document.getElementById("modal").classList.contains("active")) {
        return;
    }

    // fermer avec Echap
    if (e.key === "Escape") {
        closeCarousel();
        return;
    }

    // si swiper n'existe pas, stop
    if (!swiper) return;

    // flèche droite → suivant
    if (e.key === "ArrowRight") {
        e.preventDefault();
        swiper.slideNext();
    }

    // flèche gauche ← précédent
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        swiper.slidePrev();
    }
});