//192.168.1.133

import express from "express";
import { Request, Response } from "express";
import path from "path";
import expressSession from "express-session";

const app = express();

app.use(express.static('public'));

app.use(
  expressSession({
    secret: "XXXXXXXX",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", (req, res, next) => {
  const counter = req.session["counter"];
  if (!req.session["counter"]) {
    //swapping
    req.session["counter"] = 1;
  } else {
    req.session["counter"] += 1;
  }
  console.log(counter);
  //   console.log(req.session["counter"]);
  next();
});

app.use("/", function (req: Request, res: Response, next) {
  //res.json("Hello World"); // client side
  const now = new Date();
  const timeString =
    now.getFullYear() +
    "-" + //0
    padMonth(now.getMonth()) +
    "-" +
    now.getDate() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();
  console.log(`[${timeString}]`, ` Request ${req.path}`);
  next();
});

function padMonth(num: number) {
  return (num + "").padStart(2, "0");
}

app.use((req, res) => {
  res.sendFile(path.resolve("./public/404.html"));
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})