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
