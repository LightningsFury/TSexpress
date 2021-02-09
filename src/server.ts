import http from "http";
import express from "express";
import bodyParser from "body-parser";
import env from "./Env";
import config from "./config.json";
/**
 * Server class to instantiate a http server with express routing
 */
class Server {
  app: express.Express;
  server: http.Server;
  onStart = () => console.log("running on..." + env.hostname + env.port);
  /**
   * Initialises the express router and the http server.
   *
   * @return {void} No return value
   */
  constructor() {
    this.app = express();

    this.app.use((req, res, next) => {
      if (env.isDev) console.log(Date.now(), req.ip, req.hostname, req.body);
      next();
    });

    this.app.use((req, res, next) => {
      const origin: string | undefined = req.headers.origin;
      if (env.isDev) res.setHeader("Access-Control-Allow-Origin", "*");
      else if (origin && (<string[]>config.origins).includes(origin))
        res.setHeader("Access-Control-Allow-Origin", origin);
      if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        return res.status(200).json({});
      }
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.post("/post", (req, res) => {
      console.log(req.body);
      res.status(200).json({ message: "pong!!!" });
    });

    this.app.use((req, res, next) => {
      const error = new Error("Not found");

      res.status(404).json({
        message: error.message,
      });
    });
    this.server = http.createServer(this.app);
    this.server.listen(env.port, this.onStart);
  }
}

new Server();
