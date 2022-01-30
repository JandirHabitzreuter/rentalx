import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should be able to add a new specification to a now-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54231"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "name",
            description: "description",
            daily_rate: 10,
            license_plate: "license",
            fine_amount: 60,
            brand: "brand",
            category_id: "123",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "teste",
        });

        const specifications_id = [specification.id];

        const carSpec = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(carSpec).toHaveProperty("specifications");
        expect(carSpec.specifications.length).toBe(1);
    });
});
