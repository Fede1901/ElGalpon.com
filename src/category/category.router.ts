import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";

export class CategoryRouter extends BaseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
  }

  routes(): void {
    this.router.get("/categories", async (req, res) => {
      await this.controller.getCategories(req, res);
    });

    this.router.get("/category", async (req, res) => {
      await this.controller.getCategoryById(req, res);
    });

    this.router.get("/addCategory", (req, res) => {
      res.render("addCategory");
    });
    
    this.router.post("/addCategory", async (req, res) => {
      try {
        const data = await this.controller.createCategory(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error en la creación de la categoría");
      }
    });
    

    this.router.post("/updateCategory", async (req, res) => {
      await this.controller.updateCategory(req, res);
    });

    this.router.post("/deleteCategory", async (req, res) => {
      await this.controller.deleteCategory(req, res);
    });
  }
}

