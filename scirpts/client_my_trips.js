document.addEventListener("DOMContentLoaded", function () {
  // Create twinkling stars background
  function createStars() {
    const starsCount = 100;
    const container = document.body;

    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      // Random size between 1-3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Random animation delay
      const delay = Math.random() * 5;
      const duration = Math.random() * 3 + 2;
      star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;

      container.appendChild(star);
    }
  }

  createStars();

  document.querySelectorAll("button").forEach(function (button) {
    const buttonText = button.textContent.toLowerCase();
    const buttonClass = button.className;
    // Pay trip buttons
    if (buttonClass.includes("pay-trip") || buttonText.includes("apmokėti")) {
      button.addEventListener("click", function () {
        window.location.href = "client_pay_for_trip.html";
      });
    }

    // Cancel trip buttons
    if (
      buttonClass.includes("cancel_trip") ||
      buttonText.includes("atšaukti")
    ) {
      button.addEventListener("click", function () {
        const planetCard = this.closest(".planet-card");
        const planetName = planetCard.querySelector(".planet-name").textContent;

        if (confirm(`Ar tikrai norite atšaukti kelionę į ${planetName}?`)) {
          planetCard.querySelector(".planet-status").textContent =
            "Kelionė atšaukta";
          this.style.display = "none";
        }
      });
    }

    // Order trip buttons
    if (buttonClass.includes("order-trip") || buttonText.includes("užsakyti")) {
      button.addEventListener("click", function () {
        var edit = document.querySelector(".edit-plan");
        edit.display = "none";

        this.textContent = "Kelionė užsakyta";
        this.disabled = true;
        const planetCard = this.closest(".planet-card");
        if (planetCard && planetCard.querySelector(".planet-status")) {
          planetCard.querySelector(".planet-status").textContent =
            "Laukiama patvirtinimo";
        }
      });
    }

    // Remove trip buttons
    if (
      buttonClass.includes("remove-trip") ||
      buttonText.includes("pašalinti")
    ) {
      button.addEventListener("click", function () {
        const planetCard = this.closest(".planet-card");
        const planetName = planetCard.querySelector(".planet-name").textContent;

        if (
          confirm(
            `Ar tikrai norite pašalinti kelionę į ${planetName} iš plano?`
          )
        ) {
          planetCard.style.opacity = 0.5;
          setTimeout(() => {
            planetCard.style.display = "none";
          }, 1000);
        }
      });
    }
  });

  // Make planets slightly rotate on hover
  document.querySelectorAll(".planet-image").forEach((planet) => {
    planet.addEventListener("mouseover", function () {
      this.style.transition = "transform 2s ease-in-out";
      this.style.transform = "rotate(20deg)";
    });

    planet.addEventListener("mouseout", function () {
      this.style.transform = "rotate(0deg)";
    });
  });
});
