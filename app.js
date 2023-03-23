import express from "express";
import { join } from "path";
import { Transmitter, TransmitterFlags, WsEventsList } from "aoi.db";
import { config } from "dotenv";
import { setTimeout as st } from "timers/promises";
const app = express();
app.use(express.static(join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", join(process.cwd(), "views"));

config();
const db = new Transmitter({
  path: process.env.url,
  //path : "ws://localhost:443",
  databaseType: "KeyValue",
  dbOptions: {
    path: "./db/",
    encryptOption: {
      securitykey: process.env.skey,
      enabled: true,
    },
  },
  name: "HosPos",
  pass: process.env.pass,
  flags: TransmitterFlags.READ_WRITE,
  tables: ["main"],
});

db.on(WsEventsList.OPEN, () => {
  console.log("ready");
});
db.on("close", (code, reason) => {
  console.log("[TRANSMITTER] => " + code + " " + reason);
});
db.connect();

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(30001, (e) => {
  if (e) console.log(e);
});
setTimeout(async () => {
  await db.set("main", "test", {
    value: 1,
  });
  await db.set("main", "ok", {
    value: 2,
  });

  console.log(await db.all("main"));
  await db.delete("main", "test");
  await st(5000);
  console.log(await db.all("main"));
  console.log({ a: await db.get("main", "test") });
  console.log(await db.analyze("get", { table: "main", key: "ok" }));
}, 5000);

