import { Router } from "express";

import { CreateRentalsController } from "@modules/rentals/useCases/CreateRentals/CreateRentalsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalsController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
