import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rentals } from "../entities/Rentals";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rentals>;

    constructor() {
        this.repository = getRepository(Rentals);
    }

    async findOpenRentalsByCar(car_id: string): Promise<Rentals> {
        const rentals = await this.repository.findOne({ car_id });
        return rentals;
    }
    async findOpenRentalsByUser(user_id: string): Promise<Rentals> {
        const rentals = await this.repository.findOne({ user_id });
        return rentals;
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rentals> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        await this.repository.save(rental);

        return rental;
    }
}

export { RentalsRepository };
