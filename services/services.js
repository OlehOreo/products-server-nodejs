import path from "path";
import fs from "fs/promises";

import { HttpError } from "../helpers/index.js";

const pathToDb = path.resolve("db", "products.json");

export const readFile = async () => {
	try {
		const products = await fs.readFile(pathToDb);
		return JSON.parse(products);
	} catch (error) {
		throw error;
	}
};

export const findProductById = async id => {
	try {
		const products = await readFile();
		const index = products.findIndex(item => item.id === id);
		if (index === -1) {
			return null;
		}

		return products[index];
	} catch (error) {
		throw error;
	}
};

export const updateProductById = async (id, data) => {
	try {
		const products = await readFile();

		const productIndex = products.findIndex(item => item.id === id);

		if (productIndex === -1) {
			throw HttpError(404);
		}

		products[productIndex] = { ...products[productIndex], ...data };

		await fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

		return products[productIndex];
	} catch (error) {
		throw error;
	}
};

export const removeContact = async id => {
	const products = await readFile();

	const productIndex = products.findIndex(item => item.id === id);

	if (productIndex === -1) {
		throw HttpError(404);
	}

	const [result] = products.splice(productIndex, 1);
	await fs.writeFile(pathToDb, JSON.stringify(products, null, 2));

	return result;
};
