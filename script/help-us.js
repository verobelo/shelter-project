const slider = document.querySelector(".help__slider-group");
const slides = document.querySelectorAll(".help__slide");
const prevBtn = document.querySelector(".help__prev-button");
const nextBtn = document.querySelector(".help__next-button");

let currentIndex = 0;
const totalSlides = slides.length;
const slidesToShow = 1;
const slideWidth = slides[0].getBoundingClientRect().width;
const slideGap = 48;

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalSlides - slidesToShow) {
    currentIndex++;
    slider.style.transform = `translateX(-${
      (slideWidth + slideGap) * currentIndex
    }px)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slider.style.transform = `translateX(-${
      (slideWidth + slideGap) * currentIndex
    }px)`;
  }
});

window.addEventListener("resize", () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slider.style.transform = `translateX(-${
    (slideWidth + slideGap) * currentIndex
  }px)`;
});
