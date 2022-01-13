import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listaCategoriesUseCase: ListCategoriesUseCase) {}

    handle(request: Request, response: Response): Response {
        return response.json(this.listaCategoriesUseCase.execute());
    }
}

export { ListCategoriesController };
