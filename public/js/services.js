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

// Filter Box JS

var button = document.getElementById("filter-button");
var container = document.getElementById("filter-container");
var input = document.querySelectorAll("input");

button.onclick = function (e) {
  e.stopPropagation();
  if (container.classList.contains("filters--active")) {
    container.classList.remove("filters--active");
  } else {
    container.classList.add("filters--active");
  }
};

container.onclick = function (e) {
  e.stopPropagation();
};

window.onclick = function () {
  container.classList.remove("filters--active");
};

console.log(input);

for (var i = 0; i < input.length; i++) {
  var currentInput = input[i];

  currentInput.onclick = function () {
    var isChecked = false;
    for (var j = 0; j < input.length; j++) {
      if (input[j].checked) {
        isChecked = true;
        break;
      }
    }

    if (isChecked) {
      button.classList.add("button--highlight");
    } else {
      button.classList.remove("button--highlight");
    }
  };
}

const getLoc = new Promise((res, rej) => {
  navigator.geolocation.getCurrentPosition(
    (e) => {
      res(e);
    },
    (e) => {
      rej("Location Access Denied");
    }
  );
});

// Fetch Hospital Details

var requestOptions = {
  method: "GET",
};
// DOM Variables
const loader = document.querySelector(".loaderContainer");
const body = document.querySelector(".hospitals");

const s = document.querySelector(".search");
const btn1 = document.querySelector(".sub");
const collection = document.querySelector(".collection");
// Functional Programming Starts
// Hospital info Extraction
const info = async () => {
  // User location
  const dt = await getLoc.catch((e) => {
    collection.innerText = e;
  });

  if (!dt) {
    return;
  }
  let lat = dt.coords.latitude;
  let long = dt.coords.longitude;
  // Reverse geocoding => Finding place_id
  const exactloc = await fetch(
    `https://HnC-Backend.pancham1305.repl.co/api/userLoc`,
    {
      method: "POST",
      body: JSON.stringify({ lat, long }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((r) => r.json());
  console.log(exactloc);
  let place_id = exactloc.features[0].properties.place_id;
  let url = `https://HnC-Backend.pancham1305.repl.co/api/hospitals`;
  const Hosinfo = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ place_id }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((e) => e.json());
  // console.log(Hosinfo);
  Hosinfo.features.forEach((e) => {
    cardCreation(e.properties.name, e.properties.formatted);
  });
};

// Function for loader
let executed = true;
const loadData = async () => {
  loader.classList.remove("hide");
  body.classList.add("hide");
  await info().catch((e) => {
    console.log(e);
    collection.innerText = "Internet issues";
  });
  loader.classList.add("hide");
  body.classList.remove("hide");
  executed = false;
};

if (executed && !localStorage.getItem("searchinfo")) {
  loadData();
}

const search = async (a, b) => {
  let url = `https://HnC-Backend.pancham1305.repl.co/api/search/`;
  const info = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ city: b, query: a }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((e) => e.json());
  console.log(info);
  return info;
};

btn1.addEventListener("click", async (e) => {
  e.preventDefault();
  loader.classList.remove("hide");
  body.classList.add("hide");
  const params = {
    cityname: cityName.innerText,
    query: s.value,
  };
  const info = await search(params.query, params.cityname);
  console.log(info.results);
  collection.innerHTML = "";
  for (let i of info.results) {
    cardCreation(i.name, i.address_line2);
  }
  loader.classList.add("hide");
  body.classList.remove("hide");
});

const cardCreation = (name, address) => {
  const div = document.createElement("div");
  div.classList.add("card");
  const div2 = document.createElement("div");
  div2.classList.add("finfo");
  const div3 = document.createElement("div3");
  div3.classList.add("image");
  const div4 = document.createElement("div");
  div4.classList.add("top");
  const h4 = document.createElement("h4");
  const b = document.createElement("b");
  const p = document.createElement("p");
  const br = document.createElement("br");
  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined");
  span.id = "star";
  span.innerText = "star";
  const div5 = document.createElement("div");
  div5.classList.add("bottom");
  const p2 = document.createElement("p");
  p2.innerHTML = "<b>Rating:</b>";
  const btn = document.createElement("button");
  const span2 = document.createElement("span");
  span2.innerText = "Status";
  const img = document.createElement("img");
  img.src = "../images/hospital-1.jpg";
  div3.appendChild(img);
  b.innerText = name;
  h4.appendChild(b);
  p.appendChild(br);
  p.innerHTML = `<br><b>Address:</b> ${address}`;
  // Insertions Start
  h4.appendChild(b);
  div4.appendChild(h4);
  div4.appendChild(p); //left
  div4.innerHTML += "<br>";
  p2.appendChild(span);
  div4.appendChild(p2);
  btn.appendChild(span2);
  div5.appendChild(btn);
  div.appendChild(div3);
  div.appendChild(div2);
  div2.appendChild(div4);
  div2.appendChild(div5);
  collection.appendChild(div);
};

if (localStorage.getItem("searchinfo")) {
  const { name, query } = JSON.parse(localStorage.getItem("searchinfo"));
  console.log(name, query);
  s.value = query;
  cityName.innerText = name;
  document.getElementById("clk").click();
  localStorage.removeItem("searchinfo");
}
