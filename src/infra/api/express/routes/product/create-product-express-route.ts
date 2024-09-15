import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { 
  CreateProductInputDto, 
  CreateProductOutputDto, 
  CreateProductUsercase 
} from "../../../../../usecases/usecases/create-product/create-product-usecase";


export type CreateProductResponseDto = {
  id: string;
};

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUsercase,
  ) {};

  public static create(createProductService: CreateProductUsercase) {
    return new CreateProductRoute(
      '/products',
      HttpMethod.POST,
      createProductService
    );
  };

  public getHandler() {
    return async (req: Request, res: Response) => {
      const { name,  price } = req.body;
      
      const input: CreateProductInputDto = { name, price };
      const output: CreateProductOutputDto = await this.createProductService.execute(input);
      
      const responseBody = this.present(output);

      res.status(201).json(responseBody).send();  
    };
  };

  public getPath(): string {
      return this.path
  };

  public getMethod(): HttpMethod {
    return this.method
  };

  private present(input: CreateProductResponseDto): CreateProductResponseDto {
    const response = { id: input.id };
    return response;
  };
};
