import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalsUseCase } from "./CreateRentalsUseCase";

class CreateRentalsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { expected_return_date, car_id } = request.body;

        const { id } = request.user;

        const createRentalUseCase = container.resolve(CreateRentalsUseCase);

        const rentals = await createRentalUseCase.execute({
            user_id: id,
            car_id,
            expected_return_date,
        });

        return response.status(201).json(rentals);
    }
}

export { CreateRentalsController };
