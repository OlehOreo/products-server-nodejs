import path from "path";
import fs from "fs/promises";
import { ObjectId } from "bson";

import { postProductSchema } from "../models/Products.js";
import { readFile, updateProductById, removeContact, findProductById } from "../services/services.js";
import HttpError from "../helpers/HttpError.js";

const pathToDb = path.resolve("db", "products.json");
const updateProducts = products => fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

export const getAllProduct = async (req, res, next) => {
	try {
		const products = await readFile();
		res.json(products);
	} catch (error) {
		next(error);
	}
};
export const getProductById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const product = await findProductById(id);

		if (!product) {
			throw HttpError(404);
		}

		res.json(product);
	} catch (error) {
		next(error);
	}
};
export const addNewProduct = async (req, res, next) => {
	try {
		const { error } = postProductSchema.validate(req.body);

		if (error) {
			return next(HttpError(400, error.message));
		}

		const products = await readFile();

		const newProduct = {
			...req.body,
			id: new ObjectId(),
			imgUrl:
				"https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
			sale: 0,
		};

		products.push(newProduct);

		await updateProducts(products);

		res.status(201).json(newProduct);
	} catch (error) {
		next(error);
	}
};

export const updateProductBuIdController = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await updateProductById(id, req.body);

		res.json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteProductBuId = async (req, res, next) => {
	try {
		const { id } = req.params;

		const products = await removeContact(id);

		if (!products) {
			throw HttpError(404);
		}

		res.json(products);
	} catch (error) {
		next(error);
	}
};
