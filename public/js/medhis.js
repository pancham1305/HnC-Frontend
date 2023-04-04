var testb = document.getElementById("testbox");
var scanb = document.getElementById("scanbox");
var checkupb = document.getElementById("checkupbox");
var testbtn = document.getElementById("test");
var scanbtn = document.getElementById("scan");
var checkupbtn = document.getElementById("checkup");

testbtn.addEventListener("click", async (e) => {
  testb.classList.remove("hide");
  scanb.classList.add("hide");
  checkupb.classList.add("hide");
  // console.log("1");
});

scanbtn.addEventListener("click", async (e) => {
  // console.log("2");
  scanb.classList.remove("hide");
  testb.classList.add("hide");
  checkupb.classList.add("hide");
});

checkupbtn.addEventListener("click", async (e) => {
  // console.log("3");
  testb.classList.add("hide");
  checkupb.classList.remove("hide");
  scanb.classList.add("hide");
});

// For Hospital Data
const getData = async () => {
  const hospitalinfo = JSON.parse(localStorage.getItem("hospitalinfo"));
  const a = new URLSearchParams(window.location.search);
  const b = a.get("id");
  console.log(hospitalinfo, b);
  localStorage.removeItem("hospitalinfo");
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
  console.log(data);
};
getData();
