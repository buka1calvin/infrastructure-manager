import React, { useEffect, useState } from "react";
import trash from "../../assets/trash.svg";
import clock from "../../assets/clock.svg";
import { cancelRide, getDriverRides } from "../Actions/service/ride";
import { useNavigate } from "react-router-dom";
import { showSuccessMessage } from "../layouts/toast";

const RidesTable = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);

  const fetchData = async () =>  {
    try {
      const data = await getDriverRides();
      console.log(data);
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides:", error);
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

const handleCancelRide = async (id) => {
  try {
    const response = await cancelRide(id);
    showSuccessMessage(response.message)
    if (response.message === "Ride was canceled successsfully") {
      setRides((current) =>
        current.filter((info) => info._id !== id)
      );
    } else {
      console.error("Failed to cancel Ride");
    }
  } catch (error) {
    console.error("Something happened:", error);
  }
};

  return (
    <div className="container mx-auto p-4 font-jost pl-16">
      <h1 className="text-2xl font-bold mb-4">Rides</h1>
      <table className="w-full border-collapse ">
        <thead className="">
          <tr className="text-[#9c9696] text-start">
            <th className="px-4 py-2 text-[#0C0B0B]"><p className="text-center">ride Id</p></th>
            <th className="px-4 py-2 "><p className="text-center">seats</p></th>
            <th className="px-4 py-2 "><p className="text-center">Date</p></th>
            <th className="px-4 py-2 "><p className="text-center">origin</p></th>
            <th className="px-4 py-2 "><p className="text-center">destination</p></th>
            <th className="px-4 py-2 "><p className="text-center">Price</p></th>
            <th className="px-4 py-2 "><p className="text-center">cancel</p></th>
          </tr>
        </thead>
        <tbody className=" p-[12px] rounded-2xl">
          {rides.map((ride) => (
            <tr key={ride._id} className="border-b-[30px] border-[white]  bg-[#F5F5F7] font-bold " >
              <td className="px-4 py-2 text-center cursor-pointer " onClick={() => navigate(`/dashboard/driver-Bookings/${ride._id}`)}>
              <p className=" text-[#656565]">#{ride._id.slice(0, 10)}</p>
              </td>
              <td className="px-4 py-2 text-center">
                  <p>
                    {ride.seats}
                  </p>

              </td>
              <td className="px-4 py-2 text-start">
                <div className="flex items-center justify-center gap-2">
                <img src={clock} alt="" className="" />
                <p>{formatDepartureDate(ride.departureDate)}</p>
                </div>
              </td>
              <td className="px-4 py-2 text-start">
                <div className="flex items-center justify-center gap-2">
                <p>{ride.origin}</p>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <p>{ride.destination}</p>
                </div>
              </td>
              <td
                className="px-4 py-2 text-center"
              >
                <p>
                {ride.price}
                </p>
              </td>
              <td className="px-4 py-4 cursor-pointer" onClick={() => handleCancelRide(ride._id)}>
                <img src={trash} alt=""className="m-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RidesTable;
