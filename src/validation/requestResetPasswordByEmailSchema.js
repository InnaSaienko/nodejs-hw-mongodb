import Joi from 'joi';

export const requestResetPasswordByEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});