import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specAlreadyExists = await this.specificationRepository.findByName(
            name
        );

        if (specAlreadyExists) {
            throw new AppError("Specification already exists");
        }

        await this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
