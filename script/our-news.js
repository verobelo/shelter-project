// Function to handle the data
const newsData = [
  {
    title: "Новый постоялец",
    date: "23 августа 2024г.",
    content:
      "Сегодня в нашем приюте появился новый пушистый друг — котёнок, которого нашли на улице. Он быстро завоевал наши сердца своим милым видом и дружелюбным характером. Несмотря на то, что этот маленький непоседа долгое время провёл без крыши над головой, его здоровье в полном порядке — котёнок уже привит и готов к новым приключениям. Малыш быстро освоится в новом доме и станет полноправным членом семьи. Мы точно уверены, что впереди Вас ждёт множество радостных моментов и забавных историй с этим чудесным пушистым комочком! Теперь приют “У них лапки” наполнен еще большим счастьем и теплом, ведь у нас появился настоящий маленький друг.",
    image: "../assets/images/home/home-news-1200-1.jpg",
  },
  {
    title: "История Маркиза",
    date: "25 августа 2024г.",
    content:
      "Сегодня мы хотим представить Вам нашего долгожителя — Маркиза. Ему уже 15 лет, но несмотря на почтенный возраст, он всё ещё полон энергии и жизненных сил. Маркиз живет в приюте уже много лет и стал настоящим символом преданности и стойкости. Этот мудрый и добродушный пёс пережил многое, но по-прежнему радуется каждому новому дню и с удовольствием общается с волонтёрами и гостями приюта. Мы гордимся нашим Маркизом и надеемся, что его история вдохновит всех, кто думает о том, чтобы подарить дом пожилому питомцу. Ведь они могут стать не только верными друзьями, но и настоящими хранителями мудрости и любви.",
    image: "../assets/images/home/home-news-1200-2.jpg",
  },
  {
    title: "Нам уже 1 год!",
    date: "1 сентября 2024г.",
    content:
      "Мы рады сообщить, что наш приют для бездомных животных отмечает свой первый день рождения! За этот год мы нашли дом для сотен хвостатых друзей, подарили им заботу, тепло и новую жизнь. Это был непростой, но удивительный путь, который был бы невозможен без вашей поддержки. Благодаря вам — нашим волонтёрам, партнёрам и всем неравнодушным людям — мы смогли создать безопасное и любящее пространство для наших подопечных. В честь этого события мы планируем серию праздничных мероприятий, включая благотворительные акции и экскурсии по приюту. Следите за новостями и присоединяйтесь к нашему празднику! Давайте вместе продолжим делать мир лучше для животных!",
    image: "../assets/images/home/home-news-1200-3.jpg",
  },
  {
    title: "День открытых дверей",
    date: "5 сентября 2024г.",
    content:
      "Приглашаем всех на День открытых дверей в нашем приюте для бездомных животных! 25 октября с 10:00 до 16:00 у вас будет уникальная возможность познакомиться с нашими четвероногими друзьями, узнать больше о нашей работе и о том, как вы можете помочь. В программе: экскурсии по приюту, где вы увидите, как мы заботимся о наших питомцах, мастер-классы по уходу за животными, интерактивные зоны для детей и взрослых, и, конечно, возможность пообщаться с нашими подопечными. Мы будем рады любым вопросам и расскажем, как проходит процесс усыновления. А для тех, кто давно думал о том, чтобы взять питомца домой, этот день — отличный шанс познакомиться с будущим другом поближе!",
    image: "../assets/images/our-news/news-1200-4.jpg",
  },
];

// Variables

const newsCardGroup = document.querySelector(".news__card-group");
const prevButton = document.querySelector(".news__prev-btn");
const nextButton = document.querySelector(".news__next-btn");
const pagination = document.querySelector(".news__pagination");
const pageLinks = document.querySelector(".news__links");

const cardsPerPage = 2;
const maxPages = 7;
let currentPage = 1;

// Function to display news cards

function displayNews(page) {
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  newsCardGroup.innerHTML = "";

  for (let i = start; i < end; i++) {
    const card = document.createElement("div");
    card.classList.add("news__card");
    card.innerHTML = `
    <div class="news__img">
    <img src="${newsData[i].image}" alt="картинка новости"/>
    </div>
    <div class="news__content">
    <div class="news__title">
    <h2>${newsData[i].title}</h2>
    <div class="news__date">${newsData[i].date}</div>
    </div>
    <div class="news__text">
    <p>${newsData[i].content}</p>
    </div>   
    </div>
    `;
    newsCardGroup.appendChild(card);
  }

  createPagination();
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
      pageNumber.classList.add("news__page-number");
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
      ellipsis.classList.add("news__ellipsis");
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
    displayNews(currentPage);
    updateButtons();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage++;
    displayNews(currentPage);
    updateButtons();
  }
});

displayNews(currentPage);
updateButtons();
