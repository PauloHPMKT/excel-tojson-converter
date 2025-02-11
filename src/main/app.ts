import express, { Application, json, urlencoded } from "express";
import { RouterGroup } from "./routes";

export class App {
  public readonly app: Application;
  public readonly routerGroup: RouterGroup;
  constructor() {
    this.app = express();
    this.routerGroup = new RouterGroup();
    this.useRouter();
  }

  setMiddlewares() {
    const middlewares = [
      json(),
      urlencoded({ extended: true }),
    ];
    middlewares.forEach(middleware => this.app.use(middleware));
  }

  useRouter() {
    this.routerGroup.initRouter();
    this.app.use(this.routerGroup.router);
  }

  start() {
    this.app.listen(3000, () => {
      console.log(`application is running on: http://localhost:${3000}`);
    });
  }
}
