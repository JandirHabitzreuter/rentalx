import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const authenticateUserConroller = new AuthenticateUserController();

authenticateRoutes.post("/session", authenticateUserConroller.handle);

export { authenticateRoutes };
