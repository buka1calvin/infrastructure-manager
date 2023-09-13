import Ride from "../models/Ride"

export const createNewRide=async( rideInfo, driverId )=>{
    const {origin, destination, otherStations, seats, departureDate, price} = rideInfo;
    const newRide=await Ride.create(
        {
            origin,
            destination,
            otherStations,
            status: "Available", 
            seats, 
            driverId,
            departureDate,
            price
            
        }
    )
    return newRide
};

export const cancelRide = async( id, driverId )=>{

    const ride =await Ride.find({
        _id: id,
        driverId
    });

    console.log(ride);

    if (ride.length != 0){

        await Ride.deleteOne({
             _id: id,
             driverId
             });
             return true;
    } else {

        return false;
    }

};

export async function getAllRides(id) {
    const availableRides = await Ride.find({driverId: id});
    return availableRides;
 }
