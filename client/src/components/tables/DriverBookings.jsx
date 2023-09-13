import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookings, getBookingsPRide } from "../Actions/service/bookings";
import { getSingleUser } from "../Actions/service/AuthUser";
import message from "../../assets/message-icon2.svg";
import clock from "../../assets/clock.svg"
import ChatContainer from "../../pages/ChatContainerPage";
import {  getRideById } from "../Actions/service/ride";

const DriverBookingsTable = () => {

  const [bookings, setBookings] = useState([]);
  const [moreInfo, setMoreInfo] = useState([])
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const { id } = useParams()

  const fetchData = async () =>  {
    try {
    
        const data = await getBookingsPRide(id);

        data?.bookings.forEach( async (element) => {

        const userData = await getSingleUser(element.user_id)
        const rideData = await getRideById(element.ride_id)
        setMoreInfo(current => [...current, {userId:element.user_id, userName:userData.user.lastname, rideDate: formatDepartureDate(rideData.ride.departureDate)}]);

      });

      setBookings(data.bookings);

    } catch (error) {

      console.error("Error fetching bookings:", error);

    }
  }

  useEffect(() => {

    fetchData();

  }, []);

  
  const formatDepartureDate = (dateString) => {
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    };
    const departureDate = new Date(dateString);
    return departureDate.toLocaleDateString('en-US', options);
};

const handleOpenChat = (driverId) => {
  setSelectedDriverId(driverId);
  setIsChatModalOpen(true);
};

const handleCloseChat = () => {
  setIsChatModalOpen(false);
};

console.log(bookings);
  return (
    <div className="container mx-auto p-4 font-jost pl-16">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <table className="w-full border-collapse ">
        <thead className="">
          <tr className="text-start">
            <th className="px-4 py-2 text-[#0C0B0B]"><p className="text-center">rideId</p></th>
            <th className="px-4 py-2 "><p className="text-center">passender&seats</p></th>
            <th className="px-4 py-2 "><p className="text-center">Date</p></th>
            <th className="px-4 py-2 "><p className="text-center">chats</p></th>
            <th className="px-4 py-2 "><p className="text-center">booking payment status</p></th>
          </tr>
        </thead>
        <tbody className=" p-[12px] rounded-2xl">
          {bookings.length != 0 ? (bookings.map((booking) => (
            <tr key={booking._id} className="border-b-[30px] border-[white]  bg-[#F5F5F7] font-bold ">
              <td className="px-4 py-2 text-center">
              <p className="text-[gray]">
                    #{booking.ride_id.slice(0, 10)}
                  </p>
              </td>
              <td className="px-4 py-2 text-center">
                  <p className="font-[500]">{booking.booked_seats} seats</p>
                  <p className="text-[gray]">
                   by {moreInfo.find((data) => data.userId == booking.user_id)?.userName}
                  </p>

              </td>
              <td className="px-4 py-2 text-start">
                <div className="flex items-center justify-center gap-2">
                <img src={clock} alt="" className="" />
                <p>{moreInfo.find((data) => data.userId == booking.user_id)?.rideDate}</p>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
              <button className="m-auto" onClick={() => handleOpenChat(booking.user_id)}>
                <img src={message} alt="" />
              </button>
              </td>
              <td
                className="px-4 py-2 text-center"
              >
                <p className={`${
                  booking.pay_status
                  === "pending"
                    ? "bg-[#E29F0B]" :
                     "bg-[#3CBC60]"
                }  w-fit text-[#fff] py-2 px-3 m-auto font-[700] rounded-2xl`}>
                {booking.pay_status}
                </p>
              </td>
            </tr>
          ))) : (<tr>
            <td className=" text-center text-slate-500  py-[100px] " colSpan="5">No Bookings for this ride.</td>
            </tr>)}
        </tbody>
        {isChatModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-[80vh]">
            <ChatContainer
              id={selectedDriverId}
              onClose={handleCloseChat}
            />
          </div>
        </div>
      )}
      </table>
    </div>
  );
};

export default DriverBookingsTable;
