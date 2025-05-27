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
});
