import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementation/categoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementation/specificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);
