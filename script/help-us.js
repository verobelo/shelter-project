const slider = document.querySelector(".help__slider-group");
const slides = document.querySelectorAll(".help__slide");
const prevBtn = document.querySelector(".help__prev-button");
const nextBtn = document.querySelector(".help__next-button");

let currentIndex = 0;
const totalSlides = slides.length;
const slidesToShow = 1;
const slideWidth = slides[0].getBoundingClientRect().width;
const slideGap = 48;

function updateBtnVisibility() {
  if (currentIndex === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (currentIndex === totalSlides - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
}

updateBtnVisibility();

nextBtn.addEventListener("click", () => {
  if (currentIndex < totalSlides - slidesToShow) {
    currentIndex++;
    slider.style.transform = `translateX(-${
      (slideWidth + slideGap) * currentIndex
    }px)`;
  }
  updateBtnVisibility();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    slider.style.transform = `translateX(-${
      (slideWidth + slideGap) * currentIndex
    }px)`;
  }
  updateBtnVisibility();
});

window.addEventListener("resize", () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slider.style.transform = `translateX(-${
    (slideWidth + slideGap) * currentIndex
  }px)`;
});
