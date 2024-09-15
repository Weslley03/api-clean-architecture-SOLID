import { ProductRepositoryPrisma } from "./infra/repositories/product/product-repository.prisma";
import { CreateProductUsercase } from "./usecases/usecases/create-product/create-product-usecase";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product-express-route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product-express-route";
import { ListProductUsecase } from "./usecases/usecases/list-product/list-product-usecase";
import { ApiExpress } from "./infra/api/express/api-express";
import { prisma } from "./packpage/prisma/prisma";

export function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma); 

  const createProductUsecase = CreateProductUsercase.create(aRepository);
  const listProductUsecase = ListProductUsecase.create(aRepository);

  const createRoute = CreateProductRoute.create(createProductUsecase);
  const listRoute = ListProductRoute.create(listProductUsecase);

  const api = ApiExpress.create([ createRoute, listRoute ]);

  const port = 8000;

  api.start(port);
};

main();