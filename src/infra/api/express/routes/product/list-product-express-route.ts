import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { 
  ListProductOutputDto, 
  ListProductUsecase 
} from "../../../../../usecases/usecases/list-product/list-product-usecase";

export type ListProductResponseDto ={
  products: {
    id: string;
    name: string;
    price: number
  }[];
};

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUsecase,
  ) {};

  public static create(listProductService: ListProductUsecase) {
    return new ListProductRoute(
      '/products',
      HttpMethod.GET,
      listProductService
    );
  };

  public getHandler() {
    return async (req: Request, res: Response) => {
      const output = await this.listProductService.execute();
      
      const responseBody =  this.present(output);

      res.status(200).json(responseBody).send();
    };
  };

  public getPath(): string {
    return this.path
  };

  public getMethod(): HttpMethod {
    return this.method
  };

  public present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };  
    return response;
  };
};