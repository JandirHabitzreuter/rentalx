import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategories/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/ListCategories/ListCategoriesController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
    dest: "./tmp",
});

// Funciona como middware
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
);
export { categoriesRoutes };
