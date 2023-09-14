import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdDepartureBoard } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { getRideById } from "../Actions/service/ride";
import { motion } from "framer-motion";
import previous from "../../assets/previous.svg";
import { Link } from "react-router-dom";

const RetriveRideInfo = ({ id }) => {
  const [rideData, setRideData] = useState(null);

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        const data = await getRideById(id);
        console.log("ride==", data);
        setRideData(data.ride);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRideData();
  }, [id]);
  const formatDepartureDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const departureDate = new Date(dateString);
    return departureDate.toLocaleDateString("en-US", options);
  };
  return (
    <div className="h-fit w-[50%] flex justify-center flex-col items-center font-poppins gap-5">
      <Link to="/" className="self-start ml-[10%] mt-[-20px] hover:text-[#a69f9f]">
        <img
          src={previous}
          alt=""
          className="w-[45px] h-[40px] self-start ml-[10%] mt-[-20px] hover:shadow hover:w-[40px]"
        />
      </Link>
      <h1 className="self-start pl-[100px] text-[36px] tracking-wide">
        Travel with our trusted drivers
      </h1>
      <motion.div
        whileHover={{ padding: "-10px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mx-auto w-[100%]  font-poppins bg-white m-5 rounded-lg p-2 cursor-pointer"
      >
        <div
          className="w-[70%] h-[320px] bg-[#fff] p-8 text-[16px] rounded-md"
          style={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {rideData && (
            <div>
              <div className="flex justify-between items-center">
                <p className="font-[600]">Ride Info:</p>
                <img
                  className="w-[60px] h-[60px] rounded-full object-cover  border-[2px] border-[#5157E0]"
                  src={rideData?.driver?.profilePic}
                  alt=""
                />
              </div>
              <div className="font-[300] flex flex-col gap-3 text-[gray]">
                <p className="font-[600]">
                  {rideData.driver.firstname} {rideData?.driver?.lastname}
                </p>
                <p className="flex items-center gap-3">
                  <CiLocationOn /> {rideData?.origin}
                </p>
                <p className="flex items-center gap-3">
                  <CiLocationOn />
                  {rideData?.destination}
                </p>
                <p className="flex items-center gap-3 text-[14px]">
                  <MdDepartureBoard />
                  {formatDepartureDate(rideData?.departureDate)}
                </p>
                <p>price: {rideData?.price} rwf</p>
                <div className="bg-[#09B294] rounded-lg w-fit text-[13px] px-[10px] py-[5px] self-end font-[400] text-[#fff]">
                  <p>{rideData?.status}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RetriveRideInfo;
