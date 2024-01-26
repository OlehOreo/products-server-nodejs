import Joi from "joi";

export const postProductSchema = Joi.object({
	name: Joi.string().alphanum().min(3).max(30).required(),
	price: Joi.number().min(1).required(),
});
