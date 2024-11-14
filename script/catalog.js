let fetchedData = [];
const cardsPerPage = 4;
let totalPages;
let currentPage = 1;

// Variables
const catalogCardGroup = document.getElementById("catalog");
const pageLinks = document.querySelector(".catalog__links");
const prevButton = document.querySelector(".catalog__prev-btn");
const nextButton = document.querySelector(".catalog__next-btn");
const applyFiltersButton = document.getElementById("apply-filters");

// Fetch the data based on the type of pet
function fetchPetData(petType) {
  fetch(`https://185.242.107.36:8080/api/pets/${petType}`)
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data;
      totalPages = Math.ceil(fetchedData.length / cardsPerPage);
      displayCards(currentPage, fetchedData);
      createPagination();
      updateButtons();
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function applyFilters() {
  const selectedGenders = Array.from(
    document.querySelectorAll('input[name="gender"]:checked')
  ).map((el) => el.value);

  const selectedBreeds = Array.from(
    document.querySelectorAll('input[name="breed"]:checked')
  ).map((el) => el.value);

  const selectedColors = Array.from(
    document.querySelectorAll('input[name="color"]:checked')
  ).map((el) => el.value);

  const selectedHair = Array.from(
    document.querySelectorAll('input[name="hair"]:checked')
  ).map((el) => el.value);

  const selectedHealth = Array.from(
    document.querySelectorAll('input[name="health"]:checked')
  ).map((el) => el.value);

  const selectedSize = Array.from(
    document.querySelectorAll('input[name="size"]:checked')
  ).map((el) => el.value);
  const selectedAges = Array.from(
    document.querySelectorAll('input[name="age"]:checked')
  ).map((el) => el.value);

  console.log("Selected Gender:", selectedGenders);

  function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  const filteredData = fetchedData.filter((pet) => {
    const genderMatch =
      selectedGenders.includes("all") || selectedGenders.includes(pet.gender);
    const breedMatch =
      selectedBreeds.includes("all") ||
      selectedBreeds.includes(pet.breed ? "true" : "false");
    const colorMatch =
      selectedColors.includes("all") || selectedColors.includes(pet.color);
    const hairMatch =
      selectedHair.includes("all") || selectedHair.includes(pet.hair);
    const healthMatch =
      selectedHealth.includes("all") || selectedHealth.includes(pet.health);
    const sizeMatch =
      selectedSize.includes("all") || selectedSize.includes(pet.size);

    const petAge = calculateAge(pet.birthDate);
    const ageMatch =
      selectedAges.includes("all") ||
      selectedAges.some((ageGroup) => {
        if (ageGroup === "kids") return petAge < 1;
        if (ageGroup === "teens") return petAge >= 1 && petAge <= 5;
        if (ageGroup === "adults") return petAge >= 6 && petAge <= 10;
        if (ageGroup === "wise") return petAge > 10;
        return false;
      });

    return (
      (selectedGenders.length === 0 || genderMatch) &&
      (selectedBreeds.length === 0 || breedMatch) &&
      (selectedColors.length === 0 || colorMatch) &&
      (selectedHair.length === 0 || hairMatch) &&
      (selectedHealth.length === 0 || healthMatch) &&
      (selectedSize.length === 0 || sizeMatch) &&
      (selectedAges.length === 0 || ageMatch)
    );
  });

  console.log("Filtered Data After Filtering:", filteredData);

  currentPage = 1;
  totalPages = Math.ceil(filteredData.length / cardsPerPage);
  displayCards(currentPage, filteredData);
  createPagination();
  updateButtons();
}

applyFiltersButton.addEventListener("click", applyFilters);

// Function to display cards for the current page
function displayCards(page, data = fetchedData) {
  const dataArray = Array.isArray(data) ? data : fetchedData;
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageData = dataArray.slice(start, end);

  catalogCardGroup.innerHTML = "";

  pageData.forEach((pet) => {
    const genderSymbol = pet.gender === "Мальчик" ? "&#9794;" : "&#9792;";
    const petDetails = `${pet.id}-details.html`;

    console.log(pet.gender);

    const card = `
      <div class="catalog__card">
        <div class="catalog__img">
          <img src="${pet.pathToAvatar}" alt="${pet.name}">
        </div>    
        <div class="catalog__text">
          <div class="catalog__name">
            <a href="${petDetails}">
              <h1>${pet.name}</h1>
            </a>
            <button
              class="infosheet__add-to-favorites"
              data-id="${pet.id}" 
              data-name="${pet.name}" 
              data-image="${pet.pathToAvatar}" 
              aria-label="добавить в избранное">
              <svg
                class="infosheet__favorites-icon"
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
            <span><p>${genderSymbol}</p></span><p>${pet.gender}</p>
          </div>
          <div class="catalog__description">
            <p>${pet.description}</p>
          </div>
        </div>       
      </div>
    `;
    catalogCardGroup.innerHTML += card;
  });
}

// Function to create pagination
function createPagination() {
  pageLinks.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === 2 ||
      i === totalPages ||
      i === currentPage ||
      (currentPage > 2 && i === currentPage - 1) ||
      (currentPage < totalPages - 1 && i === currentPage + 1)
    ) {
      const pageNumber = document.createElement("span");
      pageNumber.textContent = i;
      pageNumber.classList.add("catalog__page-number");
      if (i === currentPage) {
        pageNumber.classList.add("active");
      }
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        displayCards(currentPage);
        updateButtons();
      });
      pageLinks.appendChild(pageNumber);
    } else if (
      (i === 3 && currentPage > 3) ||
      (i === totalPages - 1 && currentPage < totalPages - 2)
    ) {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.classList.add("catalog__ellipsis");
      pageLinks.appendChild(ellipsis);
    }
  }
}

// Function to update Previous and Next buttons
function updateButtons() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Event listeners for Previous and Next buttons
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCards(currentPage);
    createPagination();
    updateButtons();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayCards(currentPage);
    createPagination();
    updateButtons();
  }
});

// Filters toggle functionality
const filters = document.querySelectorAll(".catalog__filter-options");
const filterNames = document.querySelectorAll(".catalog__filter-name");

filterNames.forEach((name, index) => {
  name.addEventListener("click", () => {
    name.classList.toggle("active");
    filters[index].classList.toggle("visible");
  });
});

// Initialize catalog with default pet type
function initCatalog(petType) {
  fetchPetData(petType);
}
