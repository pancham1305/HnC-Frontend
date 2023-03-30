const email = document.getElementById("email");
const pass = document.getElementById("password");
const username = document.getElementById("username");
const btn = document.getElementById("submit");
url = "https://HnC-Backend.pancham1305.repl.co/api/register";
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const u = username.value;
  const em = email.value;
  const p = pass.value;
  const registerConfirmation = fetch(url, {
    method: "POST",
    body: JSON.stringify({ u, em, p }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((e) => e.json());
  console.log(registerConfirmation);
  // yahan pe redirect karna hai services.html pe
});
