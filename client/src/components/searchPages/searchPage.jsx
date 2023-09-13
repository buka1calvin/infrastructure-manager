import React, { useEffect, useState } from "react";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdDepartureBoard } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { SearchForm } from "./SearchForm";
import { motion } from "framer-motion";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";
import previous from "../../assets/previous.svg";

export const SearchPage = () => {
  const [searchData, setSearchData] = useState([]);

  const searchResult = localStorage.getItem("searchData");

  useEffect(() => {
    if (searchResult != "undefined") {
      setSearchData(JSON.parse(searchResult));
    }
  }, [searchResult]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(searchData.length / itemsPerPage);
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
  const currentRides = searchData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <Link
        to="/"
        className="self-start ml-[30%] mt-[150px] hover:text-[#a69f9f]"
      >
        <img
          src={previous}
          alt=""
          className="w-[45px] h-[40px] self-start ml-[10%] mt-[-20px] hover:shadow hover:w-[40px]"
        />
      </Link>
      {searchData.length === 0 ? (
        <div>
          <div className="py-20">
            <div className="py-20 w-full bg-[#2233ce18] "></div>
          </div>
          <div className="flex items-center justify-between w-5/6 mx-auto">
            <p className="w-[30%] text-3xl">
              There are no rides yet for today between these cities
            </p>
            <div>
              <img src="/Shrug-bro 1.svg" />
            </div>
          </div>
          <div className="absolute w-full top-40"></div>
        </div>
      ) : (
        <div
          key={8}
          className="grid grid-cols-2 xs:grid-cols-1 xs:mt-80 gap-4 md:grid-row md:w-5/6 mx-auto py-40    w-5/6"
        >
          {currentRides.map((item) => (
            <Link to={`/rides/${item._id}/booking`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={`item.id-index`}
                className="flex items-center justify-center mx-auto w-[100%] shadow font-poppins bg-gray m-5 rounded-lg p-2 cursor-pointer"
              >
                <img
                  src={item.driverInfo.carPictures[0]}
                  className="w-[50%]  p-8 rounded-md"
                  key={item.id}
                />
                <div
                  className="w-[100%]  flex flex-col bg-white rounded-lg"
                  key={item.id}
                >
                  <h1 className="font-semibold">{item.driverInfo.lastname}</h1>
                  <p className="mt-5 text-gray-600 flex searchData-center">
                    <CiLocationOn />
                    <span className="ml-2">From: {item.origin}</span>
                  </p>
                  <p className="mt-5 text-gray-600 flex searchData-center">
                    <CiLocationOn />
                    <span className="ml-2">To: {item.destination}</span>
                  </p>
                  <div className="flex justify-between mt-4">
                    <div className="flex searchData-center">
                      <MdDepartureBoard className="mr-2" />
                      12:30
                    </div>
                    <div className="flex searchData-center">
                      <AiOutlineCalendar className="mr-2" />
                      1:40
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}

      {searchData.length > 4 && (
        <div className="p-5 flex items-center justify-center mx-auto ">
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

      <Footer />
    </div>
  );
};
