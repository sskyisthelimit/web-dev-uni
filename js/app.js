function burgerMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
      body.classList.remove("locked");
    } else {
      menu.classList.add("active");
      burger.classList.add("active-burger");
      body.classList.add("locked");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove("active");
      burger.classList.remove("active-burger");
      body.classList.remove("locked");
    }
  });
}

function fixedNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  if (window.scrollY >= 1) {
    nav.classList.add("fixed__nav");
  } else {
    nav.classList.remove("fixed__nav");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function createThemeToggle() {
  const toggle = document.createElement("button");
  toggle.className = "theme-toggle";
  toggle.setAttribute("aria-label", "Toggle dark theme");
  toggle.innerHTML = `
    <svg class="moon-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
    <svg class="sun-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>
    </svg>
  `;
  toggle.addEventListener("click", toggleTheme);
  document.body.appendChild(toggle);
}

function initFormValidation() {
  const contactForm = document.querySelector(".contact__form");
  const newsletterForm = document.querySelector(".newsletter-form");

  if (contactForm) {
    setupContactFormValidation(contactForm);
  }

  if (newsletterForm) {
    setupNewsletterFormValidation(newsletterForm);
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  return name.trim().length >= 2 && name.trim().length <= 50;
}

function validateMessage(message) {
  return message.trim().length >= 10 && message.trim().length <= 1000;
}

function showError(input, message) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  
  let errorEl = input.nextElementSibling;
  if (!errorEl || !errorEl.classList.contains("form-error")) {
    errorEl = document.createElement("span");
    errorEl.className = "form-error";
    input.parentNode.insertBefore(errorEl, input.nextSibling);
  }
  errorEl.textContent = message;
  errorEl.classList.add("visible");
}

function showValid(input) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  
  const errorEl = input.nextElementSibling;
  if (errorEl && errorEl.classList.contains("form-error")) {
    errorEl.classList.remove("visible");
  }
}

function clearValidation(input) {
  input.classList.remove("invalid", "valid");
  const errorEl = input.nextElementSibling;
  if (errorEl && errorEl.classList.contains("form-error")) {
    errorEl.classList.remove("visible");
  }
}

function setupContactFormValidation(form) {
  const nameInput = form.querySelector('input[placeholder="Name"]');
  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector("textarea");
  const submitBtn = form.querySelector("button");

  if (nameInput) {
    nameInput.addEventListener("blur", () => {
      if (!validateName(nameInput.value)) {
        showError(nameInput, "Name must be 2-50 characters");
      } else {
        showValid(nameInput);
      }
    });
    nameInput.addEventListener("input", () => clearValidation(nameInput));
  }

  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address");
      } else {
        showValid(emailInput);
      }
    });
    emailInput.addEventListener("input", () => clearValidation(emailInput));
  }

  if (messageInput) {
    messageInput.addEventListener("blur", () => {
      if (!validateMessage(messageInput.value)) {
        showError(messageInput, "Message must be 10-1000 characters");
      } else {
        showValid(messageInput);
      }
    });
    messageInput.addEventListener("input", () => clearValidation(messageInput));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    if (nameInput && !validateName(nameInput.value)) {
      showError(nameInput, "Name must be 2-50 characters");
      isValid = false;
    }

    if (emailInput && !validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    if (messageInput && !validateMessage(messageInput.value)) {
      showError(messageInput, "Message must be 10-1000 characters");
      isValid = false;
    }

    if (isValid) {
      let successEl = form.querySelector(".form-success");
      if (!successEl) {
        successEl = document.createElement("div");
        successEl.className = "form-success";
        successEl.textContent = "Thank you! Your message has been sent successfully.";
        form.appendChild(successEl);
      }
      successEl.classList.add("visible");

      form.reset();
      [nameInput, emailInput, messageInput].forEach((input) => {
        if (input) clearValidation(input);
      });

      setTimeout(() => {
        successEl.classList.remove("visible");
      }, 5000);
    }
  });
}

function setupNewsletterFormValidation(form) {
  const emailInput = form.querySelector('input[type="email"], .newsletter-form__input');
  const messageInput = form.querySelector(".newsletter-form__textarea");
  const submitBtn = form.querySelector(".newsletter-form__btn");

  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email");
      } else {
        showValid(emailInput);
      }
    });
    emailInput.addEventListener("input", () => clearValidation(emailInput));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    if (emailInput && !validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email");
      isValid = false;
    }

    if (isValid) {
      let successEl = form.querySelector(".form-success");
      if (!successEl) {
        successEl = document.createElement("div");
        successEl.className = "form-success";
        successEl.textContent = "Thank you for subscribing!";
        form.appendChild(successEl);
      }
      successEl.classList.add("visible");

      form.reset();
      if (emailInput) clearValidation(emailInput);

      setTimeout(() => {
        successEl.classList.remove("visible");
      }, 5000);
    }
  });
}

let currentFontSize = 100;
const MIN_FONT_SIZE = 80;
const MAX_FONT_SIZE = 150;
const FONT_STEP = 5;

function initFontSizeControl() {
  const indicator = document.createElement("div");
  indicator.className = "font-size-indicator";
  indicator.textContent = "Font: 100%";
  document.body.appendChild(indicator);

  const savedSize = localStorage.getItem("fontSize");
  if (savedSize) {
    currentFontSize = parseInt(savedSize, 10);
    applyFontSize();
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && !e.target.matches("input, textarea")) {
      e.preventDefault();
      changeFontSize(FONT_STEP);
    } else if (e.key === "ArrowDown" && !e.target.matches("input, textarea")) {
      e.preventDefault();
      changeFontSize(-FONT_STEP);
    }
  });
}

function changeFontSize(delta) {
  const newSize = currentFontSize + delta;
  if (newSize >= MIN_FONT_SIZE && newSize <= MAX_FONT_SIZE) {
    currentFontSize = newSize;
    applyFontSize();
    showFontSizeIndicator();
    localStorage.setItem("fontSize", currentFontSize.toString());
  }
}

function applyFontSize() {
  document.documentElement.style.fontSize = currentFontSize + "%";
}

function showFontSizeIndicator() {
  const indicator = document.querySelector(".font-size-indicator");
  if (indicator) {
    indicator.textContent = `Font: ${currentFontSize}%`;
    indicator.classList.add("visible");
    setTimeout(() => {
      indicator.classList.remove("visible");
    }, 2000);
  }
}

function initMenuHover() {
  const menuLinks = document.querySelectorAll(".menu__item-link");

  menuLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.classList.add("hover-active");
    });

    link.addEventListener("mouseleave", () => {
      link.classList.remove("hover-active");
    });

    link.addEventListener("focus", () => {
      link.classList.add("hover-active");
    });

    link.addEventListener("blur", () => {
      link.classList.remove("hover-active");
    });
  });
}

function initLightGallery() {
  const galleryEl = document.getElementById("lightgallery");
  if (galleryEl && typeof lightGallery !== "undefined") {
    lightGallery(galleryEl, {});
  }
}

function displayCurrentDate() {
  const footerText = document.querySelector(".footer__text");
  if (!footerText) return;

  const dateElement = document.createElement("div");
  dateElement.className = "footer__text-item";
  
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  dateElement.textContent = formattedDate;
  footerText.appendChild(dateElement);
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  createThemeToggle();
  burgerMenu();
  initFormValidation();
  initFontSizeControl();
  initMenuHover();
  initLightGallery();
  displayCurrentDate();
});

window.addEventListener("scroll", fixedNav);
