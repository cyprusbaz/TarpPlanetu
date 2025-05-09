const email = document.querySelector("#login-email");
const button = document.querySelector(".loginBtn");

document
  .getElementById("show-register")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("login-form").classList.add("hide");
    document.getElementById("register-form").classList.remove("hide");
  });

document.getElementById("show-login").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("register-form").classList.add("hide");
  document.getElementById("login-form").classList.remove("hide");
});

button.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(email.value);
  let url = "login&registration.html";
  if (email.value == "admin@gmail.com") {
    url = "admin_home_page.html";
  } else if (email.value == "worker@gmail.com") {
    url = "worker_home_page.html";
  } else if (email.value == "user@gmail.com") {
    url = "user_home_page.html";
  }

  window.location.href = url;
});
