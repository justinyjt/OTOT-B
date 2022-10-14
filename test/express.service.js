let express = require('express');
let apiRoutes = require("../src/api-routes");
let bodyParser = require('body-parser');
let cors = require('cors')

exports.createServer = function () {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));

  app.get("/", (req, res) => {
    res.send("Hello CS3219 with Express");
  });

  app.use("/api", apiRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({
      status: "error",
      message: "Page not found"
    });
  });
  return app;
}