import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    // como tem muitos dados para passar,não será desestruturado
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
