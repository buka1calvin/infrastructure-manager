import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdDepartureBoard } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { getRides } from "../Actions/service/ride";
import { Link } from "react-router-dom";
import seat from "../../assets/seats.svg"


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Carpool = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRides();
        console.log("all rides",data)
        const filterData = data.filter(item =>  item.status === "Available")
        setRides(filterData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(rides.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : 1));
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : totalPages));
  };

  const canShowPrevious = currentPage > 1;
  const canShowNext = currentPage < totalPages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItem = rides.slice(startIndex, startIndex + itemsPerPage);
  if (loading) {
    return (
      <div className="bg-[#FCF9F9] w-full font-poppins" id="Contact">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FCF9F9] w-full  font-poppins" id="Contact">
      <div className="w-full py-10">
        <p className="text-center text-gray-600">GET A RIDE</p>
        <h1 className="text-center text-2xl">Available cars</h1>
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-1 xs:mt-80 gap-4 md:grid-row md:w-5/6 md:[100%]  mx-auto   w-5/6">
        {currentItem.map((item) => (
          <motion.div
            whileHover={{ paddingBottom: "24px" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={item._id}
            className="flex items-center justify-center mx-auto w-[100%]  font-poppins bg-white m-5 rounded-lg p-2 cursor-pointer"
          >
            <img
              src={item.driverInfo.carPictures[0]}
              className="w-[50%] h-fit  p-8 rounded-md"
            />
            <div className="w-[100%]  flex flex-col bg-white rounded-lg">
              <Link  to={`/rides/${item._id}/booking`}>
              <h1 className="font-semibold">
                {item.driverInfo.firstname} {item.driverInfo.lastname}
              </h1>
              </Link>
              <p
                className="mt-5 text-gray-600 flex items-center"
                key={`from-${item.id}`}
              >
                <CiLocationOn />
                <span className="ml-2">From: {item.origin}</span>
              </p>
              <p
                className="mt-5 text-gray-600 flex items-center"
                key={`to-${item.id}`}
              >
                <CiLocationOn />
                <span className="ml-2">To: {item.destination}</span>
              </p>
              <div className="flex justify-between mt-4">
                <div className="flex items-center">
                  {/* <MdDepartureBoard className="mr-2" /> */}
                  <img src={seat} alt=""className="mr-2 w-[17px] h[17px]" />
                  {item.seats}
                </div>
                <div className="flex items-center">
                  <AiOutlineCalendar className="mr-2" />
                  {formatDate(item.departureDate)}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {rides.length > 4 && (
        <div className="p-10 flex items-center justify-center mx-auto w-full">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ width: "34px", height: "34px" }}
            onClick={handlePrevious}
            className={`cursor-pointer ${canShowPrevious ? "" : "opacity-50"}`}
          >
            <BsChevronDoubleLeft />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ width: "34px", height: "34px" }}
            onClick={handleNext}
            className={`cursor-pointer ${canShowNext ? "" : "opacity-50"}`}
          >
            <BsChevronDoubleRight />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Carpool;
