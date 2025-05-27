const cardInput = document.getElementById("cardNumber");
cardInput.addEventListener("input", function () {
  let value = this.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let formattedValue = "";

  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += " ";
    }
    formattedValue += value[i];
  }

  this.value = formattedValue;
});

// Expiry date formatting (adds / after month)
const expiryInput = document.getElementById("expiry");
expiryInput.addEventListener("input", function () {
  let value = this.value.replace(/\D/g, "");

  if (value.length > 2) {
    this.value = value.substring(0, 2) + "/" + value.substring(2, 4);
  } else {
    this.value = value;
  }
});

// Payment button effect
const payButton = document.getElementById("payButton");
payButton.addEventListener("click", function () {
  this.innerHTML = "<span>Apmokama...</span>";
  this.style.backgroundColor = "#4caf50";

  setTimeout(() => {
    this.innerHTML = "Apmokėta ✓";
    setTimeout(() => {
      window.location.href = "client_my_trips.html";
    }, 200);
  }, 1500);
});

const hamburger = document.getElementById("hamburger-button");
const mobileNav = document.getElementById("mobile-nav");
const overlay = document.getElementById("mobile-nav-overlay");
const body = document.body;

function openMobileNav() {
  hamburger.classList.add("active");
  mobileNav.classList.add("open");
  overlay.classList.add("active");
  body.classList.add("mobile-nav-open");
}

function closeMobileNav() {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("open");
  overlay.classList.remove("active");
  body.classList.remove("mobile-nav-open");
}

hamburger.addEventListener("click", function (e) {
  e.stopPropagation();
  if (mobileNav.classList.contains("open")) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
});

overlay.addEventListener("click", function () {
  closeMobileNav();
});

const mobileNavLinks = mobileNav.querySelectorAll("a");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", function () {
    closeMobileNav();
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && mobileNav.classList.contains("open")) {
    closeMobileNav();
  }
});
