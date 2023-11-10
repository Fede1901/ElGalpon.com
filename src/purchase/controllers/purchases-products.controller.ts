import { Request, Response } from "express";
import { PurchaseProductService } from "../services/purchases-products.services";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchaseProducts(req: Request, res: Response) {
    try {
      const purchaseProducts = await this.purchaseProductService.findAllPurchaseProducts();
      if (purchaseProducts.length === 0) {
        return this.httpResponse.NotFound(res, "No existen productos de compra");
      }
      res.render("purchaseProducts", { purchaseProducts });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getPurchaseProductById(req: Request, res: Response) {
    let { id } = req.query;
    id = id?.toString() || "";

    try {
      const data = await this.purchaseProductService.findPurchaseProductById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe el producto de compra");
      }
      return res.render("editPurchaseProduct", {
        purchaseProduct: data,
      });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createPurchaseProduct(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(req.body);
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const data: UpdateResult = await this.purchaseProductService.updatePurchaseProduct(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al actualizar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const data: DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
}
