import dotenv from "dotenv";

dotenv.config();

class Env {
  hostname: string;
  port: number | string;
  isDev: boolean;
  constructor() {
    this.hostname = process.env.SERVER_HOSTNAME || "localhost";
    this.port = process.env.SERVER_PORT || 1337;
    this.isDev = process.env.IS_DEV ? true : false;
  }
}

const env: Env = new Env();
export default env;
