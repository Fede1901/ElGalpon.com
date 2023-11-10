import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";

export class ProductRouter extends BaseRouter<ProductController> {
  constructor() {
    super(ProductController);
  }

  routes(): void {
    this.router.get("/", (req, res) => this.controller.getProducts(req, res));
    this.router.get("/:id", (req, res) => this.controller.getProductById(req, res));
    this.router.post("/", (req, res) => this.controller.createProduct(req, res));
    this.router.put("/:id", (req, res) => this.controller.updateProduct(req, res));
    this.router.delete("/:id", (req, res) => this.controller.deleteProduct(req, res));
  }
}
