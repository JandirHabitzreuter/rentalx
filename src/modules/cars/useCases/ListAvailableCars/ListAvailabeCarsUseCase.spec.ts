import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUserCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUserCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUserCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car",
            description: "desc",
            daily_rate: 110,
            license_plate: "dee",
            fine_amount: 10,
            brand: "brand",
            category_id: "cate",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car",
            description: "desc",
            daily_rate: 110,
            license_plate: "dee",
            fine_amount: 10,
            brand: "brand",
            category_id: "cate",
        });

        const cars = await listCarsUseCase.execute({
            brand: "brand",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car",
            description: "desc",
            daily_rate: 110,
            license_plate: "dee",
            fine_amount: 10,
            brand: "brand",
            category_id: "cate",
        });

        const cars = await listCarsUseCase.execute({
            name: "car",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "car",
            description: "desc",
            daily_rate: 110,
            license_plate: "dee",
            fine_amount: 10,
            brand: "brand",
            category_id: "cate",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "cate",
        });

        expect(cars).toEqual([car]);
    });
});
