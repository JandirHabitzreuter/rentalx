import { ISpecificationRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationRepository: ISpecificationRepository) {}

    execute({ name, description }: IRequest): void {
        const specAlreadyExists = this.specificationRepository.findByName(name);

        if (specAlreadyExists) {
            throw new Error("Specification already exists");
        }

        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationService };
