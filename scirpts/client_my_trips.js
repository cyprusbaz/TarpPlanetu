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
  const cancelButton = document.querySelector(".cancel_trip");

  // Add event listeners to buttons
  const planButton = document.querySelector(
    ".action-buttons .action-button:first-child"
  );
  const listButton = document.querySelector(
    ".action-buttons .action-button:last-child"
  );

  // Planet specific buttons
  const payButton = document.querySelector("#neptune .planet-button");
  payButton.addEventListener("click", function () {
    alert("Perkeliama į apmokėjimo puslapį: Kelionė į Neptūną");
  });

  const orderButton = document.querySelector(
    "#jupiter .planet-button:first-child"
  );
  orderButton.addEventListener("click", function () {
    alert("Kelionė į Jupiterį užsakyta!");
    this.textContent = "Kelionė užsakyta";
    this.disabled = true;
  });

  const removeButton = document.querySelector(
    "#jupiter .planet-button.outline"
  );
  removeButton.addEventListener("click", function () {
    if (confirm("Ar tikrai norite pašalinti kelionę į Jupiterį iš plano?")) {
      document.querySelector("#jupiter").style.opacity = 0.5;
      setTimeout(() => {
        document.querySelector("#jupiter").style.display = "none";
      }, 1000);
    }
  });

  // Make planets slightly rotate on hover
  const planets = document.querySelectorAll(".planet-image");
  planets.forEach((planet) => {
    planet.addEventListener("mouseover", function () {
      this.style.transition = "transform 2s ease-in-out";
      this.style.transform = "rotate(20deg)";
    });

    planet.addEventListener("mouseout", function () {
      this.style.transform = "rotate(0deg)";
    });
  });
});
