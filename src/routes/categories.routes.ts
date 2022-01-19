import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategories";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

const upload = multer({
    dest: "./tmp",
});

// Funciona como middware
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
