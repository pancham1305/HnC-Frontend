fetch("http://localhost:50000/api/userLoc", {
  method: "post",
  body: JSON.stringify({ hi: 1 }),
  headers: {
    "Content-Type": "application/json",
  },
}).then((e) => console.log(e));
