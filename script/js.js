document.querySelector("button").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
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

// product swiper
document.addEventListener("DOMContentLoaded", function () {
  if (window.Swiper) {
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
  }
});
