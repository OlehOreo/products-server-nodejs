import express from "express";

import productsController from "../../controllers/products-controller.js";

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProduct);
productsRouter.post("/", productsController.addNewProduct);

export default productsRouter;
