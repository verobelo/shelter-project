// Overlay
const overlay = document.getElementById("overlay");

// Form functionality
const formDialog = document.getElementById("dialog");
const confirmationDialog = document.getElementById("confirmation");
const formOpenBtn = document.querySelector(".infosheet__button");
const dialogContent = document.getElementById("dialog-content");
const confirmationCloseBtn = document.getElementById("confirmation-close-btn");

// Open form when the button is clicked

document.addEventListener("click", function (e) {
  const button = e.target.closest(".infosheet__button");
  if (button) {
    fetchForm();
  }
});

function fetchForm() {
  fetch("/shelter-project-frontend/pages/adoption-form.html")
    .then((response) => response.text())
    .then((data) => {
      dialogContent.innerHTML = data;
      formDialog.style.display = "block";
      overlay.style.display = "block";
      attachFormListeners();
    })
    .catch((error) => console.error("Error loading the form:", error));
}

function attachFormListeners() {
  const firstName = document.getElementById("fname");
  const lastName = document.getElementById("lname");
  const tel = document.getElementById("tel");
  const email = document.getElementById("email");
  const personalInfoCheckbox = document.getElementById("personal-info");
  const bookingCheckbox = document.getElementById("booking-conditions");
  const formSubmitBtn = document.querySelector('button[type="submit"]');
  const formCloseBtn = document.getElementById("form-close-btn");
  const firstNameError = document.querySelector('label[for="fname"] ~ .error');
  const lastNameError = document.querySelector('label[for="lname"] ~ .error');
  const telError = document.querySelector('label[for="tel"] ~ .error');
  const emailError = document.querySelector('label[for="email"] ~ .error');
  const personalInfoError = document.querySelector(
    'label[for="personal-info"] ~ .error'
  );
  const bookingError = document.querySelector(
    'label[for="booking-conditions"] ~ .error'
  );

  firstName.addEventListener("blur", validateFirstName);
  lastName.addEventListener("blur", validateLastName);
  tel.addEventListener("blur", validateTel);
  email.addEventListener("blur", validateEmail);
  personalInfoCheckbox.addEventListener("blur", validatePersonalInfo);
  bookingCheckbox.addEventListener("blur", validateBooking);

  function validateFirstName() {
    if (firstName.validity.valid) {
      firstNameError.textContent = "";
    } else if (firstName.validity.patternMismatch) {
      firstNameError.textContent = "Имя должно быть прописано кириллицей";
    } else if (firstName.validity.tooShort) {
      firstNameError.textContent = `Имя должно быть мин. ${firstName.getAttribute(
        "minlength"
      )} буквы; Вы ввели ${firstName.value.length}.`;
    } else if (firstName.validity.valueMissing) {
      firstNameError.textContent = "Пожалуйста, введите Ваше имя";
    }
  }

  function validateLastName() {
    if (lastName.validity.valid) {
      lastNameError.textContent = "";
    } else if (lastName.validity.patternMismatch) {
      lastNameError.textContent = "Фамилия должна быть прописана кириллицей";
    } else if (lastName.validity.tooShort) {
      lastNameError.textContent = `Фамилия должна быть мин. ${lastName.getAttribute(
        "minlength"
      )} буквы; Вы ввели ${lastName.value.length}.`;
    } else if (lastName.validity.valueMissing) {
      lastNameError.textContent = "Пожалуйста, введите Вашу фамилию";
    }
  }

  function validateTel() {
    if (tel.validity.valid) {
      telError.textContent = "";
    } else if (tel.validity.patternMismatch) {
      telError.textContent = "Номер телефона должен быть в формате +7999999999";
    } else if (tel.validity.valueMissing) {
      telError.textContent = "Пожалуйста, введите Ваш номер телефона";
    }
  }

  function validateEmail() {
    if (email.validity.valid) {
      emailError.textContent = "";
    } else if (email.validity.valueMissing) {
      emailError.textContent = "Пожалуйста, введите действительный email адрес";
    } else if (email.validity.patternMismatch) {
      emailError.textContent = "Email адрес должен быть в формате nn@nn.ru";
    }
  }

  function validatePersonalInfo() {
    if (!personalInfoCheckbox.checked) {
      personalInfoError.textContent =
        "Чтобы продолжить, Вы должны согласиться на обработку персональных данных";
    } else {
      personalInfoError.textContent = "";
    }
  }

  function validateBooking() {
    if (!bookingCheckbox.checked) {
      bookingError.textContent =
        "Чтобы продолжить, Вы должны согласиться с условиями бронирования";
    } else {
      bookingError.textContent = "";
    }
  }

  formSubmitBtn.addEventListener("click", (event) => {
    if (
      !firstName.validity.valid ||
      !lastName.validity.valid ||
      !tel.validity.valid ||
      !email.validity.valid ||
      !personalInfoCheckbox.checked ||
      !bookingCheckbox.checked
    ) {
      event.preventDefault();
      validateFirstName();
      validateLastName();
      validateTel();
      validateEmail();
      validatePersonalInfo();
      validateBooking();
    } else {
      formDialog.style.display = "none";
      confirmationDialog.style.display = "block";
    }
  });

  formCloseBtn.addEventListener("click", () => {
    formDialog.style.display = "none";
    overlay.style.display = "none";
  });
}

confirmationCloseBtn.addEventListener("click", () => {
  confirmationDialog.style.display = "none";
});
