import Booking from "../models/Booking";


export const deleteBooking = async( id, userId )=>{

    const booking =await Booking.find({
        _id: id,
        user_id: userId
    });

    if (booking.length != 0){

        await Booking.deleteOne({
             _id: id,
             user_id: userId
             });
             return true;
    } else {

        return false;
    }

};
