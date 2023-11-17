import { Request, Response } from "express";
import { ProductService } from "../services/product.service"; 
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import { ProductDTO } from "../dto/product.dto";
import {CategoryService} from "../../category/services/category.services"
export class ProductController {
  private readonly categoryService: CategoryService= new CategoryService()
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.findAllProducts();
      if (products.length === 0) {
        return res.render ("home",{products});
      }
      return res.render("home", {products});
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getProductById(req: Request, res: Response) {
    let { id } = req.query;
    id = id?.toString() || "";

    try {
      const data = await this.productService.findProductById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "Producto no encontrado.");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getAddProductView(req: Request, res: Response) {
    try {
        const categories = await this.categoryService.findAllCategories(); 
        return res.render("addProduct", { categories });
    } catch (e) {
        return this.httpResponse.Error(res, e);
    }
}

  async createProduct(req: Request, res: Response) {
    const productDTO: ProductDTO = req.body;
    productDTO.description = req.body.productDescription;
    productDTO.price = req.body.productPrice;
    try {
      const data = await this.productService.createProduct(productDTO);
      return res.redirect("/");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const productDTO: ProductDTO = req.body;

    try {
      const data: UpdateResult = await this.productService.updateProduct(id, productDTO);
      if (data.affected === 0) {
        return this.httpResponse.NotFound(res, "Producto no encontrado o no se pudo actualizar.");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const data: DeleteResult = await this.productService.deleteProduct(id);
      if (data.affected === 0) {
        return this.httpResponse.NotFound(res, "Producto no encontrado o no se pudo eliminar.");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }


async getProductsByCategory(req: Request, res: Response) {
  const { category } = req.params;

  try {
    // Obtener productos por categoría
    const products = await this.productService.findProductsByCategory(category);

    return res.render("productsByCategory", { products, category });
  } catch (e) {
    return this.httpResponse.Error(res, e);
  }
}

}
