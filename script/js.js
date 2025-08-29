document.querySelector(".popup button")?.addEventListener("click", () => {
  const p = document.querySelector(".popup");
  if (p) p.style.display = "none";
});

// main hero carousel with side previews
const main = new Swiper(".main-menu-swiper", {
  loop: true,
  slidesPerView: 1.8,
  centeredSlides: true,
  initialSlide: 1,
  speed: 800,
  autoplay: { 
    delay: 3000,
    disableOnInteraction: false 
  },
  pagination: {
    el: ".main-menu .swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".main-menu .swiper-button-next",
    prevEl: ".main-menu .swiper-button-prev",
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.Swiper) {
    new Swiper(".category-swiper", {
      navigation: {
        nextEl: ".category-swiper .swiper-button-next",
        prevEl: ".category-swiper .swiper-button-prev",
      },
      pagination: {
        el: ".category-swiper .swiper-pagination",
        clickable: true,
      },
    });
  }
});

  new Swiper(".product-swiper", {
  slidesPerView: 4,
  spaceBetween: 40,
  navigation: {
    nextEl: ".product-swiper .swiper-button-next",
    prevEl: ".product-swiper .swiper-button-prev",
  },
  pagination: {
    el: ".product-swiper .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    600: { slidesPerView: 2 },
    900: { slidesPerView: 3 },
    1280: { slidesPerView: 6 },
  },
});
