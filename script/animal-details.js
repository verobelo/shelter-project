const slideImg = document.querySelectorAll(".glide__slide img");
const glideTrack = document.querySelector(".glide__track");
const glideArrowLeft = document.querySelector(".glide__arrow--left");
const glideArrowRight = document.querySelector(".glide__arrow--right");

slideImg.forEach((image) => {
  image.addEventListener("mouseenter", function () {
    glideTrack.style.overflow = "visible";
    glideArrowLeft.style.display = "none";
    glideArrowRight.style.display = "none";
    image.classList.add("zoom");
  });
  image.addEventListener("mouseleave", function () {
    glideTrack.style.overflow = "hidden";
    glideArrowLeft.style.display = "block";
    glideArrowRight.style.display = "block";
    image.classList.remove("zoom");
  });
});
