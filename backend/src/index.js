const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");

class App {
  constructor() {
    this.server = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    this.mongoose = mongoose.connect(
      "mongodb+srv://semana:semana@cluster0-xiikz.mongodb.net/week10?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
