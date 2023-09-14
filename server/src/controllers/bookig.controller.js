import Booking from "../models/Booking";
import Ride from "../models/Ride";
import Blacklist from "../models/BlackListModel";
import { verifyToken } from "../utils/generateToken";
import { deleteBooking } from "../service/booking.service";


export const approveBooking = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "driver") {
      return res.status(401).json({ message: "unauthorized1" });
    }
    const bookingId = req.params._id;
    const booking = await Booking.findById(bookingId);
    const rideId = booking.ride_id;
    const ride = await Ride.findById(rideId);

    if (!booking) {
      return res.status(400).json({ message: "Booking doesn't exist!" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Booking is already approved or rejected!" });
    }
    if (user._id.toString() !== ride.driverId.toString()) {
      return res
        .status(401)
        .json({ message: "You're not the driver who posted the ride!" });
    }
    const newStatus = req.body.status;

    if (newStatus === "approved") {
      booking.status = "approved";
      await booking.save();

      const bookedSeats = booking.booked_seats;

      if (!ride) {
        return res.status(400).json({ message: "Ride doesn't exist!" });
      }

      ride.seats -= bookedSeats;
      await ride.save();

      return res
        .status(200)
        .json({ message: "Booking approved successfully!" });
    } else if (newStatus === "rejected") {
      await Booking.findByIdAndDelete(bookingId);

      return res.status(200).json({ message: "Booking rejected and removed!" });
    } else {
      return res.status(400).json({ message: "Invalid status provided!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Please sign in" });
    }

    const token = req.header("Authorization").split(" ")[1];
    let bookings;
    const isTokenExist = await Blacklist.findOne({ token });
    if (isTokenExist) {
      return res
        .status(200)
        .json({ message: "Your session has expired, please login!" });
    }

    const details = verifyToken(token);

    if (details.data.role === "admin") {
      bookings = await Booking.find();
      res.status(200).send(bookings);
    }
    if (details.data.role === "passenger") {
      bookings = await Booking.find({
        user_id: details.data._id,
      });
      const rideIds=bookings.map((booking)=>booking.ride_id)
      const ridesInfo=await Ride.find({ _id: { $in: rideIds } })
      const bookingsWithRidesInfo=bookings.map((booking)=>{
        const rideInfo=ridesInfo.find((rideInfo)=>rideInfo._id.equals(booking.ride_id))
        console.log("ride",rideInfo) 
        return {
          ...booking.toObject(),
          rideData:rideInfo,
        }
      })
      res.status(200).send(bookingsWithRidesInfo);
    }
    if (details.data.role === "driver") {
      const driver = await Ride.find({
        driverId: details.data._id,
      });
      const rideIds = driver.map((ride) => ride._id);
      const bookings = await Booking.find({ ride_id: { $in: rideIds } });

      res.status(200).json({ message: bookings });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const cancelBooking = async (req, res) => {
  const user = req.user;
  try {
    const cancel = await deleteBooking(req.params.id, user._id);

   if (cancel == true) {

     return res.status(200).json({ message: "Booking was canceled successsfully" }); 

   } else {

    return res.status(404).json({ message: "Booking not found" });

   }

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
};

export const getBookingsByRideId=async(req,res)=>{
  try{
    const user=req.user;
    const rideId=req.params.id
    if(user.role!=="driver"){
      return res.status(401).json({error:"unauthorized!"})
    }
    const ride = await Ride.findOne({ _id: rideId, driverId: user._id });

    if (!ride) {
      return res.status(401).json({ error: "Ride not found or unauthorized!" });
    }

    const bookings = await Booking.find({ ride_id: rideId });

    res.status(200).json({ bookings,ride:ride });
  }
  catch(error){

  }
}