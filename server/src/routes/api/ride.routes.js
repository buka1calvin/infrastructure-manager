import { Router } from "express";
import { createRide, getRid, searchRide, cancelRides, findRides } from "../../controllers/ride.controller";
import extractToken from "../../middleWares/checkUserWithToken";
import { rideValidation } from "../../validations/rideCreation.validation";
import { createBooking } from "../../controllers/ride.controller";
import { getRide } from "../../controllers/ride.controller";
import { getRideById } from "../../controllers/ride.controller";

const router = Router();

router.post("/", extractToken, rideValidation, createRide);
router.get("/search", searchRide);
router.post("/:_id/bookings", extractToken, createBooking);
router.get("/", extractToken, getRide);
router.get("/passenger", getRid)
router.get("/:_id",getRideById)
router.get('/', extractToken, findRides);
router.delete('/:id', extractToken, cancelRides);


export default router;
