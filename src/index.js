import 'dotenv/config';
import express from "express";
import cors from "cors";
import helmet from "helmet";
import expHbs from "express-handlebars";
import path from "path";

import config from "./config/env";
import setRouter from "./router/index";

const startServer = () => {
  const server = express();
  const port = process.env.PORT || config.PORT;

  // se configura handlebars
  server.engine(".hbs", expHbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts")
  }));
  
  server.set("view engine", ".hbs");
  server.set("views", path.join(__dirname, "views"))

  // conectamos los middlewares de terceros
  server.use(cors());
  server.use(helmet());

  // conectamos el ruteo
  setRouter(server);

  // se atrapan los errores en express
  server.use((err, req, res, next) => {
    let { statusCode, message } = err;

    statusCode = statusCode || 500;
    message = message || "Server error";

    res.status(statusCode).send({
      error: true,
      statusCode: statusCode,
      message: message
    });
  });

  server.listen(port, () => {
    console.log(`Server is up in port ${port}`)
  })
};

startServer();