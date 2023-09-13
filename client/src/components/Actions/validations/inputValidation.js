import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstname: yup.string().min(3).trim().required(),
  lastname: yup.string().min(3).trim().required(),
  email: yup.string().email().lowercase().trim().required(),
  phoneNumber: yup.string().matches(/^\+?[1-9][0-9]{7,14}$/),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .matches(/[0-9]/, "Password must contain at least one numeric character")
    .required("Password is required")
    .trim(),
    role: yup.string().required(),
});


export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

export const updatePasswordSchema = yup.object().shape({
  currentPassword:yup
    .string()
    .required('fill the field!'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('fill the field!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], "Passwords don't match.")
    .required('fill the field!'),

});
export const twoAuthSchema = yup.object({
  otp: yup.string().min(6).max(6).required(),
});

export const ResetSchema = yup.object().shape({
  password1: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])/,
      'Password must contain at least one lowercase letter and one numeric digit',
    ),
  password2: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Confirm Password is required')
    .oneOf([yup.ref('password1'), null], 'Passwords must match'),
});

export const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email().lowercase().trim().required(),
});

export const UpdateUserSchema=yup.object().shape({
  preferredLanguage: yup.string(),
  preferredCurrency: yup.string(),
  gender: yup.string(),
  phoneNumber: yup.string().matches(/^\+?[1-9][0-9]{7,14}$/),
  profilePic: yup.string(),
  bio: yup.string(),
  DOB: yup
  .date()
  .nullable()
  .min(new Date("1950-01-01"), "Date must be between 1-1-1950 and 1-1-2023")
  .max(new Date(Date.now()), `Date must be between 1-1-1950 and ${new Date(Date.now()).toLocaleDateString()}`)
  ,
  userId: yup.string(),
})

export const updateAdressSchema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .email('Please enter a valid email address'),
  province:yup.string("please make sure that it's valid!").required(),
  district:yup.string("please make sure that it's valid!").required(),
  street:yup.string("please make sure that it's valid!").required(),
});

export const itemRegisterSchema = yup.object().shape({
  itemName:yup.string("please make sure that it's valid!").required(),
  serialNumber: yup
    .string()
    .required("Please provide a serial number.")
    .matches(/^[A-Z0-9]{10}$/i, 'Laptop serial number must be 10 alphanumeric characters.')
});

export const driverApprovalSchema = yup.object().shape({
  verificationStatus:yup.string().required(),
});

export const createRideschema=yup.object().shape({
  origin: yup.string().min(3).required(),
  destination: yup.string().min(3).required(),
  otherStations: yup.string(),
  seats: yup.number().required(),
  departureDate: yup.date().required(),
  price: yup.number().required(),

});
export const bookingSchema = yup.object().shape({
  booked_seats:yup.number().required(),
});
export const bookingApprovalSchema = yup.object().shape({
  status:yup.string().required(),
});
