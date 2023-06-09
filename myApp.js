require('dotenv').config();
let bodyParser = require('body-parser');

let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let response = "Hello json";

  if(process.env.MESSAGE_STYLE === "uppercase"){
    response = response.toUpperCase();
  }

  res.json({"message": response});
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time});
});

app.get("/:word/echo", (req, res)=> {
  const { word } = req.params;

  res.json({echo: word});
});

app.get("/name", (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;

  res.json({"name": `${firstName} ${lastName}`});
});

app.post("/name", (req, res) => {
  let firstName = req.body.first;
  let lastName = req.body.last;

  res.json({"name": `${firstName} ${lastName}`});
});

































 module.exports = app;
