import { Router } from "express";

import { SpecificationRepository } from "../modules/cars/repositories/implementation/specificationRepository";
import { CreateSpecificationService } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationUseCase";

const specificationRoutes = Router();
// Se precisar mudar para outro banco é só alterar o repository
const specificationRepository = new SpecificationRepository();

specificationRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const specificationService = new CreateSpecificationService(
        specificationRepository
    );

    specificationService.execute({ name, description });

    return response.status(201).send();
});

specificationRoutes.get("/", (request, response) => {
    return response.json(specificationRepository.list());
});

export { specificationRoutes };
