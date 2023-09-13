import React, { useEffect, useState } from "react";
import { getBookings } from "../Actions/service/bookings";
import { getSingleUser } from "../Actions/service/AuthUser";
import carpool from "../../assets/carpool.svg";
import trash from "../../assets/trash.svg";
import message from "../../assets/message-icon2.svg";
import clock from "../../assets/clock.svg";
import ChatContainer from "../../pages/ChatContainerPage";
import { cancelbooking } from "../Actions/service/bookings";
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";

const PassengerBookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [driverInfo, setDriverInfo] = useState({});
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDriverInfo(driverId) {
      try {
        const driverData = await getSingleUser(driverId);
        setDriverInfo((prevDriverInfo) => ({
          ...prevDriverInfo,
          [driverId]: driverData,
        }));
        console.log("driver infos====", driverInfo);
      } catch (error) {
        showErrorMessage("Error fetching driver info:", error);
      }
    }

    bookings.forEach((booking) => {
      if (!driverInfo[booking.rideData.driverId]) {
        fetchDriverInfo(booking.rideData.driverId);
      }
    });
  }, [bookings, driverInfo]);

  const formatDepartureDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const departureDate = new Date(dateString);
    return departureDate.toLocaleDateString("en-US", options);
  };

  const handleOpenChat = (driverId) => {
    setSelectedDriverId(driverId);
    setIsChatModalOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false);
  };
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await cancelbooking(bookingId);
      showSuccessMessage(response.message);
      if (response.message === "Booking was canceled successsfully") {
        // Remove the canceled booking from the state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };
  return (
    <div className="container mx-auto p-4 font-jost pl-16">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <table className="w-full border-collapse ">
        <thead className="">
          <tr className="text-[#9c9696] text-start">
            <th className="px-4 py-2 text-[#0C0B0B]">
              <p className="text-center">cars</p>
            </th>
            <th className="px-4 py-2 ">
              <p className="text-center">drivers</p>
            </th>
            <th className="px-4 py-2 ">
              <p className="text-center">Date</p>
            </th>
            <th className="px-4 py-2 ">
              <p className="text-center">chats</p>
            </th>
            <th className="px-4 py-2 ">
              <p className="text-center">Bookings status</p>
            </th>
            <th className="px-4 py-2 ">
              <p className="text-center">cancel</p>
            </th>
          </tr>
        </thead>
        <tbody className=" p-[12px] rounded-2xl">
          {bookings.length === 0 ? ( // If there are no bookings
            <tr>
              <td colSpan="6" className="text-center text-gray-400 py-16">
                No bookings available.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b-[30px] border-[white]  bg-[#F5F5F7] "
              >
                <td className="px-4 py-2">
                  <img src={carpool} alt="" className="m-auto" />
                </td>
                <td className="px-4 py-2 text-center">
                  <p className="font-[500]">
                    {booking.rideData.origin} - {booking.rideData.destination}
                  </p>
                  <p className="text-[gray]">
                    {driverInfo[booking.rideData.driverId]?.user.firstname ||
                      ""}{" "}
                    {driverInfo[booking.rideData.driverId]?.user.lastname || ""}
                  </p>
                </td>
                <td className="px-4 py-2 text-start">
                  <div className="flex items-center justify-center gap-2">
                    <img src={clock} alt="" className="" />
                    <p>{formatDepartureDate(booking.rideData.departureDate)}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-center">
                <button className="m-auto" onClick={() => handleOpenChat(booking.rideData.driverId)}>
                <img src={message} alt="" />
              </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <p
                    className={`${
                      booking.status === "pending"
                        ? "bg-[#E29F0B]"
                        : booking.status === "approved"
                        ? "bg-[#3CBC60]"
                        : "bg-red-400"
                    }  w-fit text-[#fff] py-2 px-3 m-auto font-[700] rounded-2xl`}
                  >
                    {booking.status}
                  </p>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    className="m-auto"
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    <img src={trash} alt="" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        {isChatModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-[80vh]">
              <ChatContainer id={selectedDriverId} onClose={handleCloseChat} />
            </div>
          </div>
        )}
      </table>
    </div>
  );
};

export default PassengerBookingsTable;
