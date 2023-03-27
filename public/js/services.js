/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
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

// document.querySelector("#contact-form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   e.target.elements.name.value = "";
//   e.target.elements.email.value = "";
//   e.target.elements.message.value = "";
// });

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
const apikey = "61ad97c925f74a92b2c4abdf86bb1e37";
// Functional Programming Starts
// Hospital info Extraction
const info = async () => {
  // User location
  const dt = await getLoc.catch((e) => {
    document.querySelector("body").innerText = e;
  });

  if (!dt) {
    return;
  }
  let lat = dt.coords.latitude;
  let long = dt.coords.longitude;
  // Reverse geocoding => Finding place_id
  const exactloc = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=61ad97c925f74a92b2c4abdf86bb1e37`,
    requestOptions
  ).then((r) => r.json());

  let place_id = exactloc.features[0].properties.place_id;
  //using place_id to find hospitals nearby.
  let url = `https://api.geoapify.com/v2/places?categories=healthcare,healthcare.hospital&filter=place:${place_id}&limit=20&apiKey=${apikey}`;
  const Hosinfo = await fetch(url, requestOptions).then((e) => e.json());
  console.log(Hosinfo);
  Hosinfo.features.forEach((e) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const div2 = document.createElement("div");
    div2.classList.add("finfo");
    const div3 = document.createElement("div3");
    div3.classList.add("image");
    const div4 = document.createElement("div");
    div4.classList.add("top");
    const h4 = document.createElement("h4");
    const b = document.createElement("b"); //h4=>b
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
    // p2=> span
    const btn = document.createElement("button");
    const span2 = document.createElement("span");
    span2.innerText = "Status";
    // hospitals => div =>div3=> div4 => h4 => b
    // div4 => p => span
    // div => div2
    // div2 => div5 => btn=> span;
    // -----------------------------

    const img = document.createElement("img");
    img.src = "../images/hospital-1.jpg";
    div3.appendChild(img);
    b.innerText = e.properties.name;
    h4.appendChild(b);
    p.appendChild(br);
    p.innerHTML = `<br><b>Address:</b> ${e.properties.formatted}`;
    // Insertions Start
    h4.appendChild(b);
    div4.appendChild(h4);
    div4.appendChild(p); //left
    div4.innerHTML += "<br>";
    p2.appendChild(span);
    div4.appendChild(p2);

    // -----------------------
    btn.appendChild(span2);
    div5.appendChild(btn);
    div.appendChild(div3);
    div.appendChild(div2);
    div2.appendChild(div4);
    div2.appendChild(div5);
    const collection = document.querySelector(".collection");
    collection.appendChild(div);
  });
};

// Function for loader
const loadData = async () => {
  loader.classList.remove("hide");
  body.classList.add("hide");
  await info().catch((e) => {
    console.log(e);
    document.querySelector("body").innerText = "Internet issues";
  });
  loader.classList.add("hide");
  body.classList.remove("hide");
};
loadData();
