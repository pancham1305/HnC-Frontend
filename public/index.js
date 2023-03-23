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
