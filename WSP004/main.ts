//192.168.1.133

import express from "express";
import { Request, Response } from "express";
import path from "path";
import expressSession from "express-session";
import fs from "fs";

const app = express();

// Need this for form submissions
app.use(express.urlencoded({ extended: true }))
// Need for later lectures
app.use(express.json())

app.use(express.static('public'));

// app.post('/contact', (req, res) => {
//   // Console log the request body to see what is inside!
//   console.log(req.body)
//   res.end('Hello World')
// })

import formidable from 'formidable'

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: part => part.mimetype?.startsWith('image/') || false,
})

app.post('/contact', (req, res) => {
  form.parse(req, (err, fields, files) => {
    console.log({ err, fields, files })
    res.redirect('/')
  })
})


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


//------------------------------------------------------------
app.use((req, res) => {
  res.sendFile(path.resolve("./public/404.html"));
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})