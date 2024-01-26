import { ObjectId } from "bson";
import path from "path";
import fs from "fs/promises";

import { postProductSchema } from "../models/Products.js";

const pathToDb = path.resolve("db", "products.json");

const readFile = async () => {
	try {
		const products = await fs.readFile(pathToDb);
		return JSON.parse(products);
	} catch (error) {
		throw error;
	}
};

const addNewProduct = async (req, res, next) => {
	try {
		const { error } = postProductSchema.validate(req.body);
		console.log(error);
		if (error) {
			const newError = new Error(error.message);
			newError.status = 400;
			throw newError;
		}
		const product = {
			...req.body,
			id: new ObjectId(),
			imgUrl:
				"https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
			sale: 0,
		};

		const products = await readFile();
		products.push(product);

		await fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

		res.status(201).json(products);
	} catch (error) {
		next(error);
	}
};

const getAllProduct = async (req, res, next) => {
	try {
		const products = await readFile();

		res.json(products);
	} catch (error) {
		next(error);
	}
};

export default { addNewProduct, getAllProduct };
