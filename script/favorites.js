document.addEventListener("DOMContentLoaded", () => {
  const favoritesCart = document.querySelector(".header__favorites-cart");
  const favoritesCount = document.querySelector(".header__favorites-count");
  const favoritesDropdown = document.querySelector(
    ".header__favorites-dropdown"
  );

  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  updateFavoritesCount();

  if (favoritesCart) {
    favoritesCart.addEventListener("click", () => {
      if (favorites.length > 0) {
        favoritesDropdown.classList.toggle("show");
        displayFavorites();
      }
    });
  }

  document.addEventListener("click", function (e) {
    const button = e.target.closest(".infosheet__add-to-favorites");
    if (button) {
      const animal = {
        name: button.dataset.name,
        image: button.dataset.image,
      };

      if (!isAnimalInFavorites(animal.name)) {
        addAnimalToFavorites(animal);

        button.classList.add("filled");
        button.setAttribute("disabled", true);

        const animalCardHTML = `
          <div class="favorites-item" data-name="${animal.name}">
            <div class="favorites-dropdown__name">
              <h1>${animal.name}</h1>
              <button class="remove-btn" aria-label="закрыть заявку" data-name="${animal.name}">
                <img
                  src="/shelter-project-frontend/assets/images/adoption-form/form-close.png"
                  alt="иконка крестика" />
              </button>
            </div>
            <div class="favorites-dropdown__img">
              <img src="${animal.image}" alt="${animal.name}" />
            </div>
            <button class="infosheet__button">Оформить заявку</button>
          </div>
        `;

        const favoritesList = document.querySelector(".favorites-list");
        if (favoritesList) {
          favoritesList.insertAdjacentHTML("beforeend", animalCardHTML);
        }
      }
    }

    const removeButton = e.target.closest(".remove-btn");
    if (removeButton) {
      const animalName = removeButton.dataset.name;
      removeAnimalFromFavorites(animalName);
    }
  });

  function addAnimalToFavorites(animal) {
    favorites.push(animal);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesCount();
  }

  function removeAnimalFromFavorites(name) {
    favorites = favorites.filter((animal) => animal.name !== name);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesCount();
    displayFavorites();

    if (favorites.length > 0) {
      favoritesDropdown.classList.add("show");
    } else {
      favoritesDropdown.classList.remove("show");
    }
    const enabledButton = document.querySelector(
      `.infosheet__add-to-favorites[data-name="${name}"]`
    );
    if (enabledButton) {
      enabledButton.classList.remove("filled");
      enabledButton.removeAttribute("disabled");
    }
  }

  function updateFavoritesCount() {
    favoritesCount.textContent = favorites.length > 0 ? favorites.length : "";
    favoritesCart.classList.toggle("filled", favorites.length > 0);
  }

  function isAnimalInFavorites(name) {
    return favorites.some((animal) => animal.name === name);
  }

  function displayFavorites() {
    favoritesDropdown.innerHTML = "";
    favorites.forEach((animal) => {
      favoritesDropdown.innerHTML += `
        <div class="favorites-item" data-name="${animal.name}">
          <div class="favorites-dropdown__name">
            <h2>${animal.name}</h2>
            <button class="remove-btn" aria-label="удалить из избранного" data-name="${animal.name}">
              <img
                src="/shelter-project-frontend/assets/images/adoption-form/form-close.png"
                alt="иконка крестика" />
            </button>
          </div>
          <div class="favorites-dropdown__img">
            <img src="${animal.image}" alt="${animal.name}" />
          </div>
          <button class="infosheet__button">Оформить заявку</button>
          <div class="favorites-dropdown__separator"></div>
        </div>
      `;
    });
  }
});
