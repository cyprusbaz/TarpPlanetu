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

// REMOVED OLD DELETE BUTTON CODE - this was causing conflicts

let currentEditCard = null;

// Use event delegation - attach listeners to the parent container
document.addEventListener('DOMContentLoaded', function() {
  attachDelegatedListeners();
});

function attachDelegatedListeners() {
  // Attach one listener to the trip list container that handles all edit/delete clicks
  const tripList = document.querySelector('.trip-list');
  
  if (tripList) {
    tripList.addEventListener('click', function(e) {
      if (e.target.classList.contains('editBtn')) {
        currentEditCard = e.target.closest('.trip-card');
        openEditModal();
      } else if (e.target.classList.contains('deleteBtn')) {
        const tripCard = e.target.closest('.trip-card');
        tripCard.remove();
      }
    });
  }
}

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
  const duration = document.getElementById("duration").value; // FIXED: was getting description instead of duration
  const seats = document.getElementById("seats").value;

  const tripList = document.querySelector(".trip-list");
  const newCard = document.createElement("div");
  newCard.classList.add("trip-card");
  newCard.innerHTML = `
    <h3>${title}</h3>
    <p>Planeta: ${planet}</p>
    <p>Kaina: ${price} €</p>
    <p>Veikla: ${selected.value}</p>
    <p>Trukmė: ${duration} dienų</p>
    <p>Vietų skaičius: ${seats}</p>
    <p>Aprašymas: ${description}</p>
    <div class="card-buttons">
      <button class="editBtn">Redaguoti kelionę</button>
      <button class="deleteBtn">Ištrinti siūlomą kelionę</button>
    </div>
  `;

  tripList.appendChild(newCard);
  document.getElementById("tripForm").reset();
  closeModal();
}

function openEditModal() {
  if (!currentEditCard) return;
  
  // Extract current values from the card
  const title = currentEditCard.querySelector('h3').textContent;
  const planetText = currentEditCard.querySelector('p:nth-of-type(1)').textContent;
  const planet = planetText.replace('Planeta: ', '');
  const priceText = currentEditCard.querySelector('p:nth-of-type(2)').textContent;
  const price = priceText.replace('Kaina: ', '').replace(' €', '');
  const activityText = currentEditCard.querySelector('p:nth-of-type(3)').textContent;
  const activity = activityText.replace('Veikla: ', '');
  const durationText = currentEditCard.querySelector('p:nth-of-type(4)').textContent;
  const duration = durationText.replace('Trukmė: ', '').replace(' dienų', '');
  const seatsText = currentEditCard.querySelector('p:nth-of-type(5)').textContent;
  const seats = seatsText.replace('Vietų skaičius: ', '');
  const descriptionText = currentEditCard.querySelector('p:nth-of-type(6)').textContent;
  const description = descriptionText.replace('Aprašymas: ', '');
  
  // Populate the edit form
  document.getElementById("editTitle").value = title;
  document.getElementById("editPlanet").value = planet;
  document.getElementById("editPrice").value = price;
  document.getElementById("editDuration").value = duration;
  document.getElementById("editSeats").value = seats;
  document.getElementById("editDescription").value = description;
  
  // Set the correct activity radio button
  const activityRadios = document.querySelectorAll('input[name="editVeiklos"]');
  activityRadios.forEach(radio => {
    if (radio.value === activity) {
      radio.checked = true;
    }
  });
  
  document.getElementById("editTripModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editTripModal").style.display = "none";
  currentEditCard = null;
}

function submitEditForm(event) {
  event.preventDefault();
  
  if (!currentEditCard) return;
  
  const title = document.getElementById("editTitle").value;
  const planet = document.getElementById("editPlanet").value;
  const price = document.getElementById("editPrice").value;
  const description = document.getElementById("editDescription").value;
  const selected = document.querySelector('input[name="editVeiklos"]:checked');
  const duration = document.getElementById("editDuration").value;
  const seats = document.getElementById("editSeats").value;
  
  // Update the current card
  currentEditCard.innerHTML = `
    <h3>${title}</h3>
    <p>Planeta: ${planet}</p>
    <p>Kaina: ${price} €</p>
    <p>Veikla: ${selected.value}</p>
    <p>Trukmė: ${duration} dienų</p>
    <p>Vietų skaičius: ${seats}</p>
    <p>Aprašymas: ${description}</p>
    <div class="card-buttons">
      <button class="editBtn">Redaguoti kelionę</button>
      <button class="deleteBtn">Ištrinti siūlomą kelionę</button>
    </div>
  `;
  
  document.getElementById("editTripForm").reset();
  closeEditModal();
}

// Window click handler for modals
window.onclick = function (event) {
  const modal = document.getElementById("tripModal");
  const editModal = document.getElementById("editTripModal");
  if (event.target == modal) {
    closeModal();
  }
  if (event.target == editModal) {
    closeEditModal();
  }
};