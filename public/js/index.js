function myFunction() {
  const btn = document.getElementById("cbtn");
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
    btn.classList.add("fa-bars");
    btn.classList.remove("fa-times");
  } else {
    x.style.display = "block";
    btn.classList.add("fa-times");
    btn.classList.remove("fa-bars");
  }
}

// Fetch Hospital Details
var requestOptions = {
  method: "GET",
};
let url =
  "https://api.geoapify.com/v2/places?categories=healthcare.hospital,healthcare.clinic_or_praxis,healthcare&filter=rect:86.9348720361654,25.292838276519298,87.0307541638414,25.206116841109612&apiKey=61ad97c925f74a92b2c4abdf86bb1e37";

// DOM Variables
const loader = document.querySelector(".loaderContainer");
const body = document.querySelector(".body");

// Functional Programming Starts

const info = async () => {
  const Hosinfo = await fetch(url, requestOptions).then((e) => e.json());
  Hosinfo.features.forEach((e) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const div2 = document.createElement("div");
    div2.classList.add("info");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    h4.innerText = e.properties.name;
    div2.appendChild(h4);
    div2.appendChild(p);
    div.appendChild(div2);

    const hospitals = document.querySelector(".hospitals");

    hospitals.appendChild(div);
  });
};
// Noto Sans

// Function for loader
const loadData = async () => {
  loader.classList.remove("hide");
  body.classList.add("hide");
  await info().catch((e) => {
    document.querySelector("body").innerText = e;
  });
  loader.classList.add("hide");
  body.classList.remove("hide");
};
loadData();
