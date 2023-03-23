import express from "express";
import { join } from "path";
import { config } from "dotenv";
const app = express();
app.use(express.static(join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", join(process.cwd(), "views"));

config();

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(30001, (e) => {
  if (e) console.log(e);
});

