import http from "http";
import express from "express";
import bodyParser from "body-parser";
import env from "./Env";

/**
 * Server class to instantiate a http server with express routing
 */
class Server {
  app: express.Express;
  server: http.Server;
  onStart = () => console.log("running on..." + env.hostname + env.port);
  constructor() {
    this.app = express();
    this.app.use((req, res, next) => {
      console.log(Date.now(), req.ip, req.hostname, req.body);
      next();
    });
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.post("/post", (req, res) => {
      console.log(req.body);
      res.status(200).json({ message: "pong!!!" });
    });
    this.server = http.createServer(this.app);
    this.server.listen(env.port, this.onStart);
  }
}

new Server();
