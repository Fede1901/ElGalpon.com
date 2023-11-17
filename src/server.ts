import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { ProductRouter } from "./product/product.router"; 
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import { CategoryRouter } from "./category/category.router";
import { PurchaseProductRouter } from "./purchase/purchases-products.router";
import { UserRouter } from "./user/user.router";
import session from "express-session";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = 3000;

  constructor() {
    super();
    this.initializeApp();
  }

  async initializeApp() {
    try {
      // Asegurarse de que la conexión se inicializa correctamente
      const dataSource = await this.initConnect;
      
      // Verificar si la conexión existe y es válida
      if (dataSource.isConnected) {
        console.log("Database connection established successfully.");
        this.configureApp(dataSource);
        this.listen();
      } else {
        throw new Error("Failed to establish database connection.");
      }
    } catch (error) {
      console.error("Failed to initialize the application:", error);
    }
  }

  configureApp(dataSource: DataSource) {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(session({
      secret:"ekjnekjgne",
      resave: false,
      saveUninitialized: false,

    }));

    // Establece EJS como el motor de vistas
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "..", "views"));

    // Middleware para imprimir las rutas
    this.app.use((req, res, next) => {
      console.log(`Request received for ${req.method} ${req.url}`);
      next();
    });

    // Rutas estáticas
    this.app.use("/public/css", express.static(path.join(__dirname, "..", "public", "css")));
    this.app.use("/public/img", express.static(path.join(__dirname, "..", "public", "img")));

    // Routers
    this.app.use("/", this.routers());
  }

  routers(): Array<express.Router> {
    return [new CategoryRouter().router,
            new UserRouter().router,
            new ProductRouter().router,
            new PurchaseProductRouter().router];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port " + this.port);
    });
  }
}

new ServerBootstrap();
