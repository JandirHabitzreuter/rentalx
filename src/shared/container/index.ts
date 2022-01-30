import { container } from "tsyringe";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/carsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/categoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/specificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositoy";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository",
    SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UserRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
