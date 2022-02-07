import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    responde: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    const userTokenRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        // sub é o id do usuário
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const userRepository = new UserRepository();
        const user = await userTokenRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        // Precisa sobreescrever o request do Express para colocar a propriedade user (typescript)
        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError("Invalid token!", 401);
    }
}
