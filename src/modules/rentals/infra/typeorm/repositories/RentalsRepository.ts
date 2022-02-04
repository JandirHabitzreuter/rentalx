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
        const rentals = await this.repository.findOne({
            where: {
                car_id,
                end_date: null,
            },
        });
        return rentals;
    }
    async findOpenRentalsByUser(user_id: string): Promise<Rentals> {
        const rentals = await this.repository.findOne({
            where: {
                user_id,
                end_date: null,
            },
        });
        return rentals;
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rentals> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rentals> {
        const rental = await this.repository.findOne(id);
        return rental;
    }

    async findByUser(user_id: string): Promise<Rentals[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"],
        });

        return rentals;
    }
}

export { RentalsRepository };
