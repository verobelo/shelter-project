const slider = document.querySelector(".about-volunteers__slide-group");
const slides = document.querySelectorAll(".about-volunteers__slide");
const prevBtn = document.querySelector(".about-volunteers__prev-btn");
const nextBtn = document.querySelector(".about-volunteers__next-btn");

let currentIndex = 0;
const totalSlides = slides.length;
const slidesToShow = 3;

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalSlides - slidesToShow) {
    currentIndex++;
    slider.style.transform = `translateX(-${
      (100 / slidesToShow) * currentIndex
    }%)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slider.style.transform = `translateX(-${
      (100 / slidesToShow) * currentIndex
    }%)`;
  }
});
