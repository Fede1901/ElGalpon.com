import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchases(req: Request, res: Response) {
    try {
      const purchases = await this.purchaseService.findAllPurchases();
      if (purchases.length === 0) {
        return this.httpResponse.NotFound(res, "No existen compras");
      }
      res.render("purchases", { purchases });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getPurchaseById(req: Request, res: Response) {
    let { id } = req.query;
    id = id?.toString() || "";

    try {
      const data = await this.purchaseService.findPurchaseById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe la compra");
      }
      return res.render("editPurchase", {
        purchase: data,
      });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.createPurchase(req.body);
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async updatePurchase(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const data: UpdateResult = await this.purchaseService.updatePurchase(
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

  async deletePurchase(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const data: DeleteResult = await this.purchaseService.deletePurchase(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
}
