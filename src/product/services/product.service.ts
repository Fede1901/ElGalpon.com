import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../dto/product.dto";
import { ProductEntity } from "../entities/product.entity";

export class ProductService extends BaseService<ProductEntity> {
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
    return (await this.execRepository).save(productDTO);
  }

  async updateProduct(id: string, productDTO: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, productDTO);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id);
  }
}
