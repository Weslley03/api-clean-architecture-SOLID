import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/product/entity/product-entity";
import { ProductGateway } from "../../../domain/product/gateway/product-gateway";

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {};

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient);
  };

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };

    await this.prismaClient.product.create({
      data,
    });
  };

  public async listProduct(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();

    const productsList = products.map((p) => {
      const product = Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });
      return product;
    });
    return productsList;
  }
};