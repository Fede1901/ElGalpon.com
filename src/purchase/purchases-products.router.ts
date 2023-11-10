import { BaseRouter } from "../shared/router/router";
import { PurchaseProductController } from "./controllers/purchases-products.controller";

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController> {
  constructor() {
    super(PurchaseProductController);
  }

  routes(): void {
    this.router.get("/purchaseProducts", (req, res) => this.controller.getPurchaseProducts(req, res));
    this.router.get("/purchaseProduct", (req, res) => this.controller.getPurchaseProductById(req, res));
    this.router.get("/addPurchaseProduct", (req, res) => {
      res.render("addPurchaseProduct");
    });
    this.router.post("/createPurchaseProduct", (req, res) => this.controller.createPurchaseProduct(req, res));
    this.router.post("/updatePurchaseProduct", (req, res) => this.controller.updatePurchaseProduct(req, res));
    this.router.post("/deletePurchaseProduct", (req, res) => this.controller.deletePurchaseProduct(req, res));
  }
}
