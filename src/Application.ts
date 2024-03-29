import express from 'express';
import routes from './Routes';
import { Mongo } from './services';

export default class Application {
  public server: express.Application;
  public mongo: Mongo;
  public mongoUrl: string;
  public protocol: string;
  public host: string;
  public port: number;

  constructor(options) {
    this.mongoUrl = options.mongoUrl;
    this.protocol = options.protocol;
    this.host = options.host;
    this.port = options.port;
  }

  start() {
    this.startServer();
    this.connectMongo();
  }

  startServer() {
    this.server = express();
    this.server.use(express.json());
    this.server.use(routes);
    this.server.listen(this.port).on('listening', () => {
      console.log(`Server listening on ${this.protocol}://${this.host}:${this.port}`);
    });
  }

  connectMongo() {
    this.mongo = new Mongo().buildUri(this.mongoUrl).buildOptions({ autoIndex: false });

    this.mongo.connect().then(() => {
      console.log(`Mongo connect: ${this.mongoUrl}`);
    });
  }
}