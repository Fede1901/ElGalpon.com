import { Request, Response } from "express";
import { CategoryService } from "../services/category.services";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.findAllCategories();
      if (categories.length === 0) {
        return this.httpResponse.NotFound(res, "No existen categorías");
      }
      // this.httpResponse.Ok(res, categories);
      res.render("categories", { categories });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    let { id } = req.query;
    id = id?.toString() || "";

    try {
      const data = await this.categoryService.findCategoryById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe la categoría");
      }
      // return this.httpResponse.Ok(res, data);
      return res.render("editCategory", {
        category: data,
      });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      // return this.httpResponse.Ok(res, data);
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async updateCategory(req: Request, res: Response) {
    // const { id } = req.params;
    const { id } = req.body;

    try {
      const data: UpdateResult = await this.categoryService.updateCategory(
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

  async deleteCategory(req: Request, res: Response) {
    // const { id } = req.params;
    const { id } = req.body;

    try {
      const data: DeleteResult = await this.categoryService.deleteCategory(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      // return this.httpResponse.Ok(res, data);
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
}
