import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rentals[] = [];

    async findOpenRentalsByCar(car_id: string): Promise<Rentals> {
        return this.rentals.find(
            (rent) => rent.car_id === car_id && !rent.end_date
        );
    }
    async findOpenRentalsByUser(user_id: string): Promise<Rentals> {
        return this.rentals.find(
            (rent) => rent.user_id === user_id && !rent.end_date
        );
    }

    async create({
        user_id,
        car_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rentals> {
        const rentals = new Rentals();

        Object.assign(rentals, {
            user_id,
            car_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rentals.push(rentals);

        return rentals;
    }
}

export { RentalsRepositoryInMemory };
