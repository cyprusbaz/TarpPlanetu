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
