import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
    specifications: Specification[] = [];

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((spec) => spec.name === name);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });

        this.specifications.push(specification);
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const all = this.specifications.filter((spec) => ids.includes(spec.id));

        return all;
    }
}

export { SpecificationRepositoryInMemory };
