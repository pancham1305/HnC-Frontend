document.addEventListener("DOMContentLoaded", () => {
  const error = document.getElementById("error");
  error.style.height = "0px";
  error.style.top = "-30px";
});
const center = document.querySelector(".center");
const user = JSON.parse(localStorage.getItem("user"));
const body = document.querySelector("body");

const hidid = document.getElementById("hidid");
hidid.value = user.uid;

const cardCreation = (data) => {
  //Hospital Name
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("MedicalDet");
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.innerText = `${data.hospital.name}`;
  div.appendChild(h3);
  mainDiv.appendChild(div);
  // Type: TypeValue
  const div1 = document.createElement("div");
  div1.classList.add("name");
  const divpart1of2 = document.createElement("div");
  divpart1of2.classList.add("part2");
  divpart1of2.innerHTML = `${data.type}: ${data.typeValue}`;
  const divpart2of2 = document.createElement("div");
  divpart2of2.classList.add("part2");
  divpart2of2.innerHTML = `<section>${
    data.date === "NaN" ? "NaN" : new Date(data.date).toLocaleString()
  }</section><section class="currency">${data.payment}Rs</section>`;

  div1.appendChild(divpart1of2);
  div1.appendChild(divpart2of2);
  mainDiv.appendChild(div1);
  center.appendChild(mainDiv);
};

body.classList.add("hide");
const getProfileData = async () => {
  if (user) {
    body.classList.remove("hide");
    showdata(user);
  } else {
    // sendError("Please login to continue");
    window.location.href = "./login.html";
  }
};

const showdata = (profileData) => {
  let data = profileData;
  const username = data.username;
  let age = data.age;
  let bloodGroup = data.bloodgroup;
  const phone = data.phone;
  if (age == undefined) {
    age = "Not Available";
  }
  if (bloodGroup == undefined) {
    bloodGroup = "Not Available";
  }
  document.getElementById("username").innerHTML = username;
  document.getElementById("age").innerHTML = age;
  document.getElementById("bloodGroup").innerHTML = bloodGroup;
  document.getElementById("phone").innerHTML = phone;
  if (data.medHistory.length) {
    data.medHistory.forEach((e) => {
      cardCreation(e);
    });
  } else {
    data = {
      hospital: { name: "No hospitals visited yet...", address: "Unavailable" },
      payment: "-",
      type: "-",
      typeValue: " ",
      date: "NaN",
    };
    cardCreation(data);
  }
};
getProfileData();
const btn = document.getElementById("logout");
btn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./login.html";
});
function sendError(msg) {
  const error = document.getElementById("error");
  error.style.height = "";
  error.style.top = "";
  error.innerHTML += `<div class='etext'>${msg}</div>`;
}
document.addEventListener("click", (e) => {
  if (e.target.id !== "closeerrorbtn") return;
  const error = document.getElementById("error");
  error.innerHTML = '  <div class="closebtn" id="closeerrorbtn">&times;</div>';
  error.style.height = "0px";
  error.style.top = "-30px";
});

// Main div => div => Heading
// Main Div => div.name => 2*div.part2
// 1st div.part2 => innerText: Type:Typevalue
// 2nd div.part2 => 2*section
// 1st section => innerText:Date-Time
// 2nd section.currency: Payment

const img = document.getElementById("img");
const btnup = document.getElementById("Upload");
const imgupload = document.getElementById("imgupload")
btnup.addEventListener("click", async (e) => {
  e.preventDefault();
  const hidid = document.getElementById("hidid")
  const formData = new FormData(imgupload);

  let url = "https://HnC-Backend.pancham1305.repl.co/api/upload";
  const imglink = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "x-uid": hidid.value,
    },
  }).then((e) => e.json());
  console.log(imglink);
});
