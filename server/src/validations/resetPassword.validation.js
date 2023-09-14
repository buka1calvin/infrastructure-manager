import Joi from "joi";

const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords must match',
  }),
});

export const resetPasswordValidation = async (req, res, next) => {
    const { error } = resetPasswordSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Invalid credentials",
        errors: error.details.map((err) => err.message),
      });
    }
    next();
  };
sen