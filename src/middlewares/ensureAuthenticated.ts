import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    responde: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        // sub é o id do usuário
        const { sub: user_id } = verify(
            token,
            "a3441416f91b33c289e4fe43781d6d55"
        ) as IPayload;

        const userRepository = new UserRepository();
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        next();
    } catch (error) {
        throw new AppError("Invalid token!", 401);
    }
}
