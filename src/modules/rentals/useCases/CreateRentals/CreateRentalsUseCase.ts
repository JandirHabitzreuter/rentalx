import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositoy";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalsUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rentals> {
        const minimumHour = 24;

        const carUnavailable =
            await this.rentalsRepository.findOpenRentalsByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is unavailable!");
        }

        const user = await this.rentalsRepository.findOpenRentalsByUser(
            user_id
        );

        if (user) {
            throw new AppError("There's a rental in progress for user!");
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }

        const rentals = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rentals;
    }
}

export { CreateRentalsUseCase };
