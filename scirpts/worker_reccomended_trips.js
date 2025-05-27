function createStars() {
  const starsCount = 100;
  const container = document.body;

  for (let i = 0; i < starsCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;
    star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;

    container.appendChild(star);
  }
}

createStars();

const deleteBtn = document.querySelectorAll(".deleteBtn");

deleteBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    btn.parentElement.remove();
  })
);

function openModal() {
  document.getElementById("tripModal").style.display = "block";
}

function closeModal() {
  document.getElementById("tripModal").style.display = "none";
}

function submitForm(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const planet = document.getElementById("planet").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const selected = document.querySelector('input[name="veiklos"]:checked');
  const duration = document.getElementById("description").value;
  const seats = document.getElementById("seats").value;

  const tripList = document.querySelector(".trip-list");
  const newCard = document.createElement("div");
  newCard.classList.add("trip-card");
  newCard.innerHTML = `
        <h3>${title}</h3>
        <p>Planeta: ${planet}</p>
        <p>Kaina: ${price} €</p>
        <p>Veikla: ${selected.value}</p>
        <p>Trukmė: ${duration}</p>
        <p>Vietų skaičius: ${seats}</p>
        <p>Aprašymas: ${description}</p>
        <button class="deleteBtn">Ištrinti siūloma kelionę</button>
      `;

  tripList.appendChild(newCard);
  document.getElementById("tripForm").reset();
  closeModal();
}

window.onclick = function (event) {
  const modal = document.getElementById("tripModal");
  if (event.target == modal) {
    closeModal();
  }
};
