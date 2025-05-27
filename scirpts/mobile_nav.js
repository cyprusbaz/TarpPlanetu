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
