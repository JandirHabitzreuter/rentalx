import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDto";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepositoy";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((c) => c.license_plate === license_plate);
    }
}

export { CarsRepositoryInMemory };
