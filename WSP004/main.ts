//192.168.1.133

import express from "express"
// import path from "path";

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    // const counter = req.session["counter"];
    req.session["counter"] += 1;
    console.log(req.session["counter"]);
    next()
  });

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})