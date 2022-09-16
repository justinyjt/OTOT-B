const BodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const routes = require("../routes/contact.route");

function createServer() {
  const app = express();
  app.use(cors());
  app.use(
    BodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(BodyParser.json());
  routes(app);

  return app;
}

export default createServer;