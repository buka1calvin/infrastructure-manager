const emailSchema = Joi.object({
  email: Joi.string().required().email(),
});

export const emailValidation = async (req, res, next) => {
  const { error } = emailSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Invalid credentials",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};
