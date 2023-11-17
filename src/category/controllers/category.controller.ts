import { Request, Response } from "express";
import { CategoryService } from "../services/category.services";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
/* import { Admin } from '../../middleware/admin.middleware'; */

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
      res.render("categories", { categories });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const id = req.query.id as string | undefined;
  
      if (!id) {
        return this.httpResponse.NotFound(res, "No se proporcionó un ID de categoría");
      }
  
      const data = await this.categoryService.findCategoryById(id);
  
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe la categoría");
      }
  
      return res.render("editCategory", { category: data });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  

  async getAddCategoryView(req: Request, res: Response) {
    console.log("Llegó a getAddCategoryView"); 
    res.render("addCategory");
  }
  

  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      return res.redirect("/");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
  

  //@Admin
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const data: UpdateResult = await this.categoryService.updateCategory(id, req.body);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al actualizar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  //@Admin
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const data: DeleteResult = await this.categoryService.deleteCategory(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      res.redirect("/categories");
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}
