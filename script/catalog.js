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

// Fetch

fetch("http://localhost:8080/api/pets/cats")
  .then((response) => response.json())
  .then((data) => {
    const catalog = document.getElementById("catalog");
    let catalogHTML = "";
    data.forEach((cat) => {
      const genderSymbol = cat.gender === "Мальчик" ? "&#9794;" : "&#9792;";
      const catDetails = `${cat.id}-cat-details.html`;

      const card = `
        <div class="catalog__card">
        <a href="${catDetails}">
        <img src="${cat.pathToAvatar}" alt="${cat.name}">
        </a>          
          <div class="catalog__text">
          <div class="catalog__name">
          <h1>${cat.name}</h1>
          <button class="infosheet__favorites">
          <svg
                class="header__favorites-icon"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M34.7047 5.00194L34.7048 5.00191L34.6983 4.99827C32.4433 3.71474 29.7782 3.74902 27.1868 4.68447C24.8798 5.51722 22.5724 7.07953 20.5111 9.17794C18.4332 7.06336 16.1158 5.49918 13.8061 4.66991C11.2141 3.7393 8.55722 3.71484 6.32059 5.00036L6.32059 5.00034L6.31576 5.00315C3.51648 6.63293 2.15123 9.80947 2.01205 13.3954C1.87235 16.9946 2.9475 21.1581 5.20176 25.078C9.09421 31.8465 14.7617 35.1268 20.4844 35.01C25.7524 35.0058 31.8361 31.8745 35.7442 25.0807C38.0188 21.1776 39.1028 17.005 38.9731 13.3983C38.8441 9.8079 37.4918 6.6156 34.7047 5.00194Z"
                  stroke="#FFE8DA"
                  stroke-width="2" />
              </svg>
          </button>
          </div>          
          <div class="catalog__gender">
          <span>${genderSymbol}</span><p>${cat.gender}</p>
          </div>
          <div class="catalog__description">
          <p>${cat.description}</p>
          </div>
          </div>       
        </div>
      `;
      catalogHTML += card;
      console.log("Full cat data:", cat);
    });
    catalog.innerHTML = catalogHTML;
  })
  .catch((error) => console.error("Error fetching data:", error));
