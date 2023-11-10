import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";

export class CategoryRouter extends BaseRouter<CategoryController> {
  constructor() {
    super(CategoryController);
  }

  routes(): void {
    this.router.get("/categories", (req, res) =>
      this.controller.getCategories(req, res)
    );

    this.router.get("/category", (req, res) =>
      this.controller.getCategoryById(req, res)
    );

    this.router.get("/addCategory", (req, res) => {
      res.render("addCategory");
    });

    this.router.post("/createCategory", (req, res) =>
      this.controller.createCategory(req, res)
    );

    this.router.post("/updateCategory", (req, res) =>
      this.controller.updateCategory(req, res)
    );

    this.router.post("/deleteCategory", (req, res) =>
      this.controller.deleteCategory(req, res)
    );
  }
}
