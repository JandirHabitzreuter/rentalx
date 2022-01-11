import { Category } from "../model/Category";
import { categoriesRoutes } from "../routes/categories.routes";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        // Vai passar para dentro do objeto os atributos
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find((cat) => cat.name === name);
        return category;
    }
}

export { CategoriesRepository };
