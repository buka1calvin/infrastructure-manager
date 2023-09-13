import "dotenv/config";
import {
  signUp,
  loginUser,
  getUserProfile,
  userProfile,
  verifyOTP,
  logoutUser,
  resetEmail,
  ResetPassword,
  verifyEmail,
} from "./documents/user.doc";
import { updateUserStatus, assignUserRole } from "./documents/admin.doc";
import {
  updateDriverProfile,
  updateVerificationStatus,
} from "./documents/driverProfile.doc";
import { newRide, searchRide, getRides, getRide, cancelRide } from "./documents/ride.doc";
import {
  createBooking,
  approveBooking,
  getBooks,
} from "./documents/booking.doc";
import userPayment from "./documents/payment";
import { statistic } from "./documents/statistic.doc";

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "WOoHoo_car APIs Document",
    description:
      "This an aoi  for testing my back-end which will do serve as my carpooling server",
    termsOfService: "",
    contact: {
      name: "WOoHoo_Car",
      email: "calvinusbukaran@gmail.com",
      url: "",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`, // url
      description: "Local server", //
    },
    {
      url: `${process.env.DEPLOYED_VERSION}`, // url
      description: "Hosted version", // name
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  paths: {
    "/api/v1/users/signup": {
      post: signUp,
    },
    "/api/v1/users/login": {
      post: loginUser,
    },
    "/api/v1/users/logout": {
      post: logoutUser,
    },
    "/api/v1/users/profile": {
      get: getUserProfile,
      put: userProfile,
    },
    "/api/v1/users/login/validate/{token}": {
      post: verifyOTP,
    },
    "/api/v1/users/{id}/status": {
      patch: updateUserStatus,
    },
    "/api/v1/users/{id}/roles": {
      patch: assignUserRole,
    },
    "/api/v1/users/profile/driver": {
      patch: updateDriverProfile,
    },
    "/api/v1/users/verification/{id}": {
      patch: updateVerificationStatus,
    },
    "/api/v1/rides": {
      post: newRide,
    },
    "/api/v1/rides/search": {
      get: searchRide,
    },
    "/api/v1/rides/": {
      get: getRides,
    },
    "/api/v1/rides/passenger": {
      get: getRide,
    },
    "/api/v1/users/verify-email": {
      get: verifyEmail,
    },
    "/api/v1/users/reset-password/{token}": {
      patch: ResetPassword,
    },
    "/api/v1/users/reset-password": {
      post: resetEmail,
    },
    "/api/v1/rides/{_id}/bookings": {
      post: createBooking,
    },
    "/api/v1/bookings/{_id}/approve": {
      patch: approveBooking,
    },
    "/api/v1/bookings": {
      get: getBooks,
    },
    "/api/v1/users/payment": {
      post: userPayment,
    },
    "/api/v1/users/stats": {
      get: statistic,
    },
    '/api/v1/bookings/{_id}/approve': {
      patch:approveBooking,
    },
    '/api/v1/rides/{id}': {
      delete:cancelRide,
    }
  },
};
