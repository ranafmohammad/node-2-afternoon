require("dotenv").config();
const express = require("express");
// const bodyParser = require ('body-parser')
const { json } = require("body-parser");
const massive = require("massive");
const products_controller = require("./products_controller");
const app = express();
// app.use(bodyParser.json());
app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));
app.post("/api/product", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id", products_controller.update);
app.delete("/api/product/:id", products_controller.delete);

const port = 3005;
app.listen(port, () => console.log(`Listening @ ${port}`));
