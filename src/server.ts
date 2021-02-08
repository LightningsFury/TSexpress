import http from "http";
import express from "express";
import bodyParser from "body-parser";
import env from "./Env";

const router:express.Express = express();

router.use((req, response, next) => {
  console.log(req.ip, req.body, req.hostname);
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/post", (req, res) => {
  console.log(req.body, req.body.message);
  return res.status(200).json({ successful: true });
});

const httpServer = http.createServer(router);
httpServer.listen(env.port, () => console.log("running on... " + env.hostname));
