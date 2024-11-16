// Function to handle the data
const happyStoriesData = [
  {
    image: "../../assets/images/happy-stories/happy-1200-1.jpg",
    title: "Он не был баловнем судьбы до одного счастливого вторника",
    button: "Подробнее",
    link: "story-details.html",
  },
  {
    image: "../../assets/images/happy-stories/happy-1200-2.jpg",
    title: "Неслучайные случайности или история блудного кота Мура",
    button: "Подробнее",
    link: "",
  },
  {
    image: "../../assets/images/happy-stories/happy-1200-3.jpg",
    title: "Весёлая история Пегаса, который держал хвост пистолетом",
    button: "Подробнее",
    link: "",
  },
  {
    image: "../../assets/images/happy-stories/happy-1200-4.jpg",
    title: "Ушко на макушке или как кот Степан нашёл свой родной дом",
    button: "Подробнее",
    link: "",
  },
  {
    image: "../../assets/images/happy-stories/happy-1200-5.jpg",
    title: "“В гостях хорошо, а дома лучше!”- невероятное приключение Спайка",
    button: "Подробнее",
    link: "",
  },
  {
    image: "../../assets/images/happy-stories/happy-1200-6.jpg",
    title: "Пёс Блэк, который обрёл дом и научился снова доверять людям",
    button: "Подробнее",
    link: "",
  },
  {
    image: "../../assets/images/happy-stories/happy-1200-7.jpg",
    title: "Путь к уюту: Как Мурзик из приюта стал хозяином дивана",
    button: "Подробнее",
    link: "",
  },
  {
    image: "../../assets/images/happy-stories/happy-1200-8.jpg",
    title: "Барон и его хвостатое королевство: Жизнь пса после приюта",
    button: "Подробнее",
    link: "",
  },
];

// Variables
const happyStoriesCardGroup = document.querySelector(
  ".happy-stories__card-group"
);
const prevButton = document.querySelector(".happy-stories__prev-btn");
const nextButton = document.querySelector(".happy-stories__next-btn");
const pagination = document.querySelector(".happy-stories__pagination");
const pageLinks = document.querySelector(".happy-stories__links");

const cardsPerPage = 6;
const maxPages = 7;
let currentPage = 1;

// Function to display stories cards
function displayStories(page) {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  happyStoriesCardGroup.innerHTML = "";

  for (let i = start; i < end && i < happyStoriesData.length; i++) {
    const card = document.createElement("div");
    card.classList.add("happy-stories__card");
    card.innerHTML = `
        <div class="happy-stories__img">
          <img src="${happyStoriesData[i].image}" alt="картинка истории"/>
        </div>
        <div class="happy-stories__title">
          <h2>${happyStoriesData[i].title}</h2>
          <a href="${happyStoriesData[i].link}" aria-label="читать историю">${happyStoriesData[i].button}</a>
        </div>
        `;
    happyStoriesCardGroup.appendChild(card);
  }

  updateButtons();
}

// Function to create pagination
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
      pageNumber.classList.add("happy-stories__page-number");
      if (i === currentPage) {
        pageNumber.classList.add("active");
      }
      pageNumber.addEventListener("click", () => {
        currentPage = i;
        displayStories(currentPage);
      });
      pageLinks.appendChild(pageNumber);
    } else if (
      (i === 3 && currentPage > 3) ||
      (i === maxPages - 1 && currentPage < maxPages - 2)
    ) {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.classList.add("happy-stories__ellipsis");
      pageLinks.appendChild(ellipsis);
    }
  }
}

// Function to update buttons
function updateButtons() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === maxPages;
  createPagination();
}

// Event listeners
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayStories(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage++;
    displayStories(currentPage);
  }
});

// Initialize display
displayStories(currentPage);
