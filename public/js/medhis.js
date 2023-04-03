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

