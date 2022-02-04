import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rentals } from "../infra/typeorm/entities/Rentals";

interface IRentalsRepository {
    findOpenRentalsByCar(car_id: string): Promise<Rentals>;
    findOpenRentalsByUser(user_id: string): Promise<Rentals>;
    create(data: ICreateRentalDTO): Promise<Rentals>;
    findById(id: string): Promise<Rentals>;
    findByUser(user_id: string): Promise<Rentals[]>;
}

export { IRentalsRepository };
