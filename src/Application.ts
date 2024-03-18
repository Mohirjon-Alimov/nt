import { createServer, Server as HttpServer } from 'http';
import { Mongo } from './core';
import express from 'express';
import routes from './Routes';

export default class Application {
  public server: express.Application;
  public http: HttpServer;
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
    this.http = createServer(this.server);
    this.http.listen(this.port).on('listening', () => {
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