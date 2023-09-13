import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
import JoiPhoneNumber from 'joi-phone-number';

const validateForm = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const signUpSchema = Joi.object({
  firstname: Joi.string().min(1).trim().required(),
  lastname: Joi.string().min(1).trim().required(),
  email: Joi.string().email().trim().required(),
  // password: new PasswordComplexity({
  //   min: 8,
  //   max: 15,
  //   lowerCase: 1,
  //   numeric: 1,
  // }).required(),
  password:Joi.string().min(6).required(),
  phoneNumber: Joi.string().regex(/^(\+250)?[0-9]{9}$/).required().messages({
    'string.pattern.base': 'Phone number must be a valid Rwandan phone number.',
  }),
  role:Joi.string().required(),
});
const validateSignup=validateForm(signUpSchema)
export const signupValidation = (req, res, next) => {
    const { error } = validateSignup(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        error: error.details.map((detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, '')),
      });
    } else {
      next();
    }
  };