document.querySelector("button").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.Swiper) {
    new Swiper(".category-swiper", {
      slidesPerView: 3,
      spaceBetween: 24,
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
