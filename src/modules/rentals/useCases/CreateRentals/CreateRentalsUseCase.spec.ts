import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rentals", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new Rentals", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "teste",
            daily_rate: 100,
            license_plate: "testttt",
            fine_amount: 40,
            category_id: "123",
            brand: "brand",
        });
        const rentals = await createRentalsUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rentals).toHaveProperty("id");
        expect(rentals).toHaveProperty("start_date");
    });

    it("should not be able to create a new Rentals if the is another open to the same user", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalsUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new Rentals if the is another open to the same car", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "123",
                car_id: "1",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalsUseCase.execute({
                user_id: "3232",
                car_id: "1",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new Rentals with invalid return time", async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: "123",
                car_id: "1",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
