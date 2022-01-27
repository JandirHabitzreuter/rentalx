import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "name",
            description: "description",
            daily_rate: 10,
            license_plate: "license",
            fine_amount: 60,
            brand: "brand",
            category_id: "123",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "name1",
                description: "description",
                daily_rate: 10,
                license_plate: "license",
                fine_amount: 60,
                brand: "brand",
                category_id: "123",
            });

            await createCarUseCase.execute({
                name: "name2",
                description: "description",
                daily_rate: 10,
                license_plate: "license",
                fine_amount: 60,
                brand: "brand",
                category_id: "123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car with available by default", async () => {
        const car = await createCarUseCase.execute({
            name: "name",
            description: "description",
            daily_rate: 10,
            license_plate: "license",
            fine_amount: 60,
            brand: "brand",
            category_id: "123",
        });

        expect(car.available).toBe(true);
    });
});
