import { createNewRide, cancelRide, getAllRides } from "../service/ride.service";
import Booking from "../models/Booking";
import Ride from "../models/Ride";
import Blacklist from "../models/BlackListModel";
import { verifyToken } from "../utils/generateToken";
import User from "../models/UserModel";
import { sendBookingEmail } from "../service/emailValidation.service";
import { parseISO, startOfDay, endOfDay } from "date-fns";

export const createRide = async (req, res) => {
  try {
    const user = req.user;
    const { origin, destination, otherStation, seats, departureDate, price } =
      req.body;
    const driverId = user._id;
    const rideInfo = {
      origin,
      destination,
      otherStation,
      seats,
      departureDate,
      price,
    };
    console.log(user);
    if (user.role == "driver") {
      const response = await createNewRide(rideInfo, driverId);
      return res.status(201).json({
        ride: response,
        message:"ride created successfully!"
      });
    }
    return res.status(401).json({
      error: "You are not authourized to perform this action",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "passenger") {
      return res.status(401).json({ message: "you are unauthorized!" });
    }
    const bookedSeats = req.body.booked_seats || 1;
    const rideId = req.params._id;

    const ride = await Ride.findById({ _id: rideId });
    const driverInfo=await User.findById(ride.driverId)
    console.log("user===",driverInfo.email)

    if (!ride) {
      return res.status(400).json({ error: "ride doesn't exist!" });
    }
    const bookings = await Booking.findOne({
      ride_id: rideId,
      user_id: user._id.toString(),
    });

    if (ride.seats < bookedSeats) {
      return res.status(400).json({error:"no enough seats!"});
    }
    const totalPrice = ride.price * bookedSeats;
    if (bookings) {
      const totalSeats = bookings.booked_seats + bookedSeats;
      if (ride.seats < totalSeats) {
        return res.status(400).json("not enough seats!");
      }
      bookings.booked_seats = totalSeats;
      bookings.total_price = ride.price * totalSeats;
      await bookings.save();
      return res
        .status(200)
        .json({ message: `Added ${bookedSeats} seats.`, newBooking: bookings });
    }
    if (!bookings) {
      const booking = new Booking({
        ride_id: rideId,
        user_id: user._id,
        booked_seats: bookedSeats,
        total_price: totalPrice,
      });
      const savedBooking = await booking.save();
      await sendBookingEmail(user,driverInfo,savedBooking)
      return res.status(201).json({booking:savedBooking,message:"booking created successfully wait for the driver approval!"});
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRide = async (req, res) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Please sign in" });
    }

    const token = req.header("Authorization").split(" ")[1];
    const isTokenExist = await Blacklist.findOne({ token });
    if (isTokenExist) {
      return res
        .status(200)
        .json({ message: "Your session has expired, please login!" });
    }
    const details = verifyToken(token);

    if (details.data.role === "admin") {
      const rides = await Ride.find();
      return res.status(200).send(rides);
    }

    if (details.data.role === "driver") {
      const rides = await Ride.find({
        driverId: details.data._id
      });
      return res.status(200).send(rides);
    }
    return res.status(403).json({ message: "Forbidden" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error });
  }
};

export const getRid = async (req, res) => {
  try {
    const rides = await Ride.find();

    const userIds = rides.map((ride) => ride.driverId);
    const users = await User.find({ _id: { $in: userIds } });

    const ridesWithUserInfo = rides.map((ride) => {
      const user = users.find((user) => user._id.equals(ride.driverId));
      return {
        ...ride.toObject(),
        driverInfo: user,
      };
    });

    res.status(200).json({ rides: ridesWithUserInfo });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


export const searchRide = async (req, res) => {
  const { origin, destination, date = new Date(), seats } = req.query;
  let startDate;

  try {
    startDate = parseISO(date);
  } catch (error) {
    console.error("Error parsing date:", error);
    return res.status(400).json({ message: "Invalid date format" });
  }

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  const filter = {
    origin,
    destination,
    departureDate: { $gte: startOfDay(startDate), $lt: endOfDay(endDate) },
  };

  if (seats) {
    filter.seats = { $gte: parseInt(seats) };
  }

  try {
    const rides = await Ride.find(filter).lean();

    if (rides.length === 0) {
      return res.status(404).json({ message: "Ride not available!" });
    }

    const userIds = rides.map((ride) => ride.driverId);
    const users = await User.find({ _id: { $in: userIds } }).lean();

    const ridesWithDriverInfo = rides.map((ride) => {
      const user = users.find((user) => user._id.equals(ride.driverId));
      return {
        ...ride,
        driverInfo: user,
      };
    });

    return res.status(200).json(ridesWithDriverInfo);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while searching for a ride!" });
  }
};


export const getRideById = async (req, res) => {
  try {
    const rideId = req.params._id;
    const ride = await Ride.findById(rideId).populate('driverId'); // Populate the driverId field
    
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    
    const driverId = ride.driverId;
    const driverInfo = await User.findById(driverId); // Get driver's information
    
    if (!driverInfo) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    
    const rideData = {
      _id: ride._id,
      origin: ride.origin,
      destination: ride.destination,
      otherStations: ride.otherStations,
      seats: ride.seats,
      status:ride.status,
      departureDate:ride.departureDate,
      price:ride.price,
      driver: {
        _id: driverInfo._id,
        firstname: driverInfo.firstname,
        lastname: driverInfo.lastname,
        profilePic: driverInfo.profilePic,
        bio:driverInfo.bio
      },

    };
    
    return res.status(200).json({ ride: rideData });
  } catch (error) {
    console.error('Error getting ride by ID:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

  export const cancelRides = async (req, res) => {
    const user = req.user;
    try {
      const cancel = await cancelRide(req.params.id, user._id);

     if (cancel == true) {

       return res.status(200).json({ message: "Ride was canceled successsfully" }); 

     } else {

      return res.status(400).json({ message: "Ride not found" });

     }

    } catch (error) {
      return res.status(500).json({
        
        message: "Server error",
        error: error,
      });
    }
  };

  export  const findRides = async (req , res) => {
    const user = req.user;
    const rides = await getAllRides(user._id);
    res.send({Rides: rides});
 }
  
  
  
