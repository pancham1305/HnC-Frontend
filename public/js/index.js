/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
const cityName = document.querySelector(".cityName");
const links = document.querySelectorAll(".links");
for (let i of links) {
  i.addEventListener("click", (e) => {
    e.preventDefault();
    const text = e.target.innerText.toUpperCase();
    cityName.innerText = text;
  });
}
