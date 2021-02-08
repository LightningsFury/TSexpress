import dotenv from 'dotenv'

dotenv.config()

class Env {
  hostname: string;
  port: number | string;

  constructor() {
    this.hostname = process.env.SERVER_HOSTNAME || 'localhost'
    this.port = process.env.SERVER_PORT || 1337
  }
}

const env: Env = new Env()
export default env
