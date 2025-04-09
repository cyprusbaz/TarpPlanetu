var faq = document.querySelectorAll(".faq-item");

faq.forEach((element) => {
  var button = element.querySelector(".faq-toggle");
  var content = element.querySelector(".faq-content");

  button.addEventListener("click", () => {
    console.log("siu");
    content.classList.toggle("active");
  });
});
