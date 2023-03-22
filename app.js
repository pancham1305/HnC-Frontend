import express from "express";
import { join } from "path";
const app = express();
app.use(express.static(join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true })); // same
app.use(express.json()); // same
app.set("view engine", "ejs"); // same
app.set("views", join(process.cwd(), "views")); // same

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(30001, (e) => {
  if (e) console.log(e);
});
