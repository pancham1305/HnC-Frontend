/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let isDropdownToggled = false;
document.addEventListener("DOMContentLoaded", () => {
  const drop = document.getElementById("dropbtn");
  drop.innerHTML = `${cities
    .map((city) => `<option class="links">${city.name}</option>`)
    .join("\n")}`;
  if (navigator.geolocation) {
    let loc;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const exactloc = await fetch(
          `https://api-hnc.onrender.com/api/userLoc`,
          {
            method: "POST",
            body: JSON.stringify({
              lat: latitude,
              long: longitude,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((r) => r.json());
        console.log(exactloc);
        loc = exactloc.features[0].properties.county;
        console.log(loc);
        let index = cities.findIndex(
          (x) =>
            x.name === loc ||
            x.name === exactloc.features[0].properties.state_district
        );
        console.log(index);

        drop.selectedIndex = index;
      },
      (err) => {
        console.error(err);
      }
    );
  }
});

const searchBar = document.querySelector(".search");
const btn = document.querySelector(".btn");
const drop = document.getElementById("dropbtn");
btn.addEventListener("click", async (e) => {
  // check if user has disabled location access

  e.preventDefault();
  const info = searchBar.value;
  const name = drop.options[drop.selectedIndex].text;
  const query = searchBar.value;
  console.log(name, query);
  localStorage.setItem(
    "searchinfo",
    JSON.stringify({ name, query, selectedIndex: drop.selectedIndex })
  );
  window.location.href = "./html/services.html";
});

const login = document.getElementById("login");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  login.innerHTML = `${user.username}
            <span class="material-symbols-outlined" id="loginicon">
              login
            </span>`;
}

searchBar.addEventListener("input", async () => {
  const query = searchBar.value;
  const name = drop.options[drop.selectedIndex].text;
  console.log(name, query);
  const data = await fetch("https://api-hnc.onrender.com/api/search/auto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, query }),
  }).then((rs) => rs.json());
  console.log(data);

  const arr = data.features;
  const possible = document.querySelector("#possible");
  possible.innerHTML = "";
  createoptions(arr);
});

// data ko iterate karke daal do option
const createoptions = (arr) => {
  const possible = document.querySelector("#possible");
  for (let i of arr) {
    const option = document.createElement("option");
    option.innerText = `${i.properties.name}`;
    possible.appendChild(option);
  }
};
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("../service-worker.js").then(() => {
      console.log("Service Worker Registered");
    });
  });
}
