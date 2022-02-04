import { inject, injectable } from "tsyringe";

import { Rentals } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rentals[]> {
        const user = await this.rentalsRepository.findByUser(user_id);
        return user;
    }
}

export { ListRentalsByUserUseCase };
