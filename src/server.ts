import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = 3000;

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    // Establece EJS como el motor de vistas
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "..", "views"));
    this.app.use(express.static(path.join(__dirname, "..", "public")));
    // Routers
    this.app.use("/", this.routers());

    this.initializeApp();
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router];
  }

  async initializeApp() {
    try {
      await this.initConnect;
      this.listen();
    } catch (error) {
      console.error("Failed to initialize the application:", error);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port " + this.port);
    });
  }
}

new ServerBootstrap();
