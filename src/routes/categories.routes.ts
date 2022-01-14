import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    console.log("teste");
    const { file } = request;
    console.log(file);
    return response.status(201).send();
});

export { categoriesRoutes };
