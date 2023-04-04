var testb = document.getElementById("testbox");
var scanb = document.getElementById("scanbox");
var checkupb = document.getElementById("checkupbox");
var testbtn = document.getElementById("test");
var scanbtn = document.getElementById("scan");
var checkupbtn = document.getElementById("checkup");
const loader = document.querySelector(".loaderContainer");
const address = document.querySelector("#address");
const body = document.querySelector("body");
testbtn.addEventListener("click", async (e) => {
  testb.classList.remove("hide");
  scanb.classList.add("hide");
  checkupb.classList.add("hide");
});

scanbtn.addEventListener("click", async (e) => {
  scanb.classList.remove("hide");
  testb.classList.add("hide");
  checkupb.classList.add("hide");
});

checkupbtn.addEventListener("click", async (e) => {
  testb.classList.add("hide");
  checkupb.classList.remove("hide");
  scanb.classList.add("hide");
});

// For Hospital Data
const getData = async () => {
  const a = new URLSearchParams(window.location.search);
  const [b,hospitalinfo] = a.get("id").split(":");

  // localStorage.removeItem("hospitalinfo");
  loader.classList.remove("hide");
  body.classList.add("hide");
  const data = await fetch(
    "https://hnc-backend.pancham1305.repl.co/api/hospital",
    {
      method: "POST",
      body: JSON.stringify({ hospitalinfo, b }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((r) => r.json());
  const arr = data.split(":");
  showdata(arr);
  loader.classList.add("hide");
  body.classList.remove("hide");
};
getData();
const showdata = async (arr) => {
  const name = document.getElementById("name");
  name.innerHTML = arr[0].split(",")[0];
  address.innerHTML = arr[0].split(",")[1] + " " + arr[4];
};
