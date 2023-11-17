import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../dto/product.dto";
import { ProductEntity } from "../entities/product.entity";
import { CategoryService } from "../../category/services/category.services";

export class ProductService extends BaseService<ProductEntity> {
  private readonly categoryService: CategoryService= new CategoryService()
  constructor() {
    super(ProductEntity);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findProductById(id: string): Promise<ProductEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

async createProduct(productDTO: ProductDTO): Promise<ProductEntity> {
  const productRepository = await this.execRepository;
  
 
  const category = await this.categoryService.findCategoryById(productDTO.categoryId);
  
  if (!category) {
    // Manejo de error si la categoría no se encuentra
    throw new Error("Categoría no encontrada");
  }

  
  const productEntity = productRepository.create({
    ...productDTO,
    category: category,
  });

  
  return productRepository.save(productEntity);
}


async findProductsByCategory(category: string): Promise<ProductEntity[]> {
  return (await this.execRepository).find({ where: { category: { categoryName: category } } });
}

  async updateProduct(id: string, productDTO: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, productDTO);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
