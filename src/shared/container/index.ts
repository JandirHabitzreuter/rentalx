import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepository";
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

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UserRepository
);
