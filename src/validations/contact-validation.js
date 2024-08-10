import Joi from "joi";

export const createContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(13).optional(),
});

export const updateContactValidation = Joi.object({
  id: Joi.number().positive().required(),
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(12).optional(),
});

export const searchContactValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.string().optional(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
});

export const getContactValidation = Joi.number().positive().required();
