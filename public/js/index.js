/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let isDropdownToggled = false;
document.addEventListener( 'DOMContentLoaded', () =>
{ 
  const drop = document.getElementById( "dropbtn" );
  drop.innerHTML = `${cities.map(city => `<option class="links">${city}</option>`).join("\n")}`
})

const cityName = document.querySelector(".cityName");
const links = document.querySelectorAll(".links");
for (let i of links) {
  i.addEventListener("click", (e) => {
    e.preventDefault();
    const text = e.target.innerText.toUpperCase();
    cityName.innerText = text;
  });
}
const searchBar = document.querySelector(".search");
const btn = document.querySelector(".btn");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const info = searchBar.value;
  const name = cityName.innerText;
  const query = searchBar.value;
  console.log(name, query);
  localStorage.setItem("searchinfo", JSON.stringify({ name, query }));
  window.location.href = "./html/services.html";
});

