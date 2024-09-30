// Function to create pagination

/*const prevButton = document.querySelector(".catalog__prev-btn");
const nextButton = document.querySelector(".catalog__next-btn");

function createPagination() {
  pageLinks.innerHTML = "";

  for (let i = 1; i <= maxPages; i++) {
    if (
      i === 1 ||
      i === 2 ||
      i === maxPages ||
      i === currentPage ||
      (currentPage > 2 && i === currentPage - 1) ||
      (currentPage < maxPages - 1 && i === currentPage + 1)
    ) {
      const pageNumber = document.createElement("span");
      pageNumber.textContent = i;
      pageNumber.classList.add("cat-catalog__page-number");
      if (i === currentPage) {
        pageNumber.classList.add("active");
      }
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        displayNews(currentPage);
        updateButtons();
      });
      pageLinks.appendChild(pageNumber);
    } else if (
      (i === 3 && currentPage > 3) ||
      (i === maxPages - 1 && currentPage < maxPages - 2)
    ) {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.classList.add("cat-catalog__ellipsis");
      pageLinks.appendChild(ellipsis);
    }
  }
}

// Function to disable buttons

function updateButtons() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === maxPages;
  createPagination();
}

// Event listeners
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCards(currentPage);
    updateButtons();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage++;
    displayCards(currentPage);
    updateButtons();
  }
});*/

// Filters
const filters = document.querySelectorAll(".catalog__filter-options");
const filterNames = document.querySelectorAll(".catalog__filter-name");

filterNames.forEach((name, index) => {
  name.addEventListener("click", () => {
    name.classList.toggle("active");
    filters[index].classList.toggle("visible");
  });
});
