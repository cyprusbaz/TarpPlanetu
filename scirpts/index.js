var faq = document.querySelectorAll(".faq-item");

faq.forEach((element) => {
  var button = document.querySelector(".faq-toggle");
  var content = document.querySelector(".faq-content");

  button.addEventListener("click", () => {
    console.log("siu");
    content.classList.toggle("faq-content");
  });
});
