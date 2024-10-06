document.addEventListener("DOMContentLoaded", () => {
  const favoritesCount = document.querySelector(".header__favorites-count");
  const favoritesDropdown = document.querySelector(
    ".header__favorites-dropdown"
  );
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  updateFavoritesCount();

  document.querySelectorAll(".infosheet__favorites").forEach((button) => {
    button.addEventListener("click", function () {
      const animal = {
        name: this.dataset.name,
        image: this.dataset.image,
      };
      addAnimalToFavorites(animal);
    });
  });

  document.querySelector(".header__favorites").addEventListener("click", () => {
    if (favorites.length > 0) {
      favoritesDropdown.classList.toggle("show");
      displayFavorites();
    }
  });

  function addAnimalToFavorites(animal) {
    favorites.push(animal);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesCount();
  }

  function updateFavoritesCount() {
    if (favorites.length === 0) {
      favoritesCount.textContent = "";
    } else {
      favoritesCount.textContent = favorites.length;
    }
  }

  function displayFavorites() {
    favoritesDropdown.innerHTML = "";
    favorites.forEach((animal) => {
      favoritesDropdown.innerHTML += `
                <div class="favorite-item">
                    <img src="${animal.image}" alt="${animal.name}" />
                    <p>${animal.name}</p>
                    <button class="infosheet__button">Оформить заявку</button>
                </div>
            `;
    });
  }
});
