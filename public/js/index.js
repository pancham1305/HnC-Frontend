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
const body = document.querySelector(".body");
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

// Function for loader
const loadData = async () => {
  loader.classList.remove("hide");
  body.classList.add("hide");
  await info().catch((e) => {
    document.querySelector("body").innerText = "Internet issues";
  });
  loader.classList.add("hide");
  body.classList.remove("hide");
};
loadData();

// todo SearchBar implementation
