import { Router } from "express";
import extractToken from "../../middleWares/checkUserWithToken";
import { approveBooking, cancelBooking } from "../../controllers/bookig.controller";
import { getBookings } from "../../controllers/bookig.controller";
import { getBookingsByRideId } from "../../controllers/bookig.controller";

const router = Router();

router.patch('/:_id/approve',extractToken,approveBooking);
router.get('/',extractToken, getBookings);
router.delete('/:id', extractToken, cancelBooking);
router.get("/:id",extractToken,getBookingsByRideId)
export default router;