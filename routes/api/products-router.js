import express from "express";

import {
	getAllProduct,
	addNewProduct,
	updateProductBuIdController,
	deleteProductBuId,
	getProductById,
} from "../../controllers/products-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProduct);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", isEmptyBody, addNewProduct);
productsRouter.patch("/:id", updateProductBuIdController);
productsRouter.delete("/:id", deleteProductBuId);
export default productsRouter;
