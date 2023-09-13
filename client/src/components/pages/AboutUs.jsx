import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import education from "../../assets/education.svg"
const AboutUs = () => {
  return (
    <section className="gap-16  py-10 h-[50vh] md:pb-0 relative " id="aboutus">
      <div
        className="flex items-center 
    justify-between flex-row  w-[100%]
    xs:flex-col md:flex-row md:w-[100%] xs:w-[100%]   md:h-[70vh] py-10"
      >
        <div className=" p-10 ml-10 xs:w-full md:w-[50%] h-[300px]">
          <h1 className="text-[#263238] text-xl mb-4">ABOUT US</h1>
          <p className="mt-10 w-4/5 font-poppins  text-[#263238]  tracking-wide">
            Welcome to INES Ruhengeri where we provide students with all skills required to be able to job ready and provides them with more opportunities if you want to learn more click on the button below.
          </p>
          <div className="mt-10 flex">
            <button className="bg-primary  px-10 py-2 hover:bg-hover text-white">
              Read More
            </button>
          </div>
        </div>
        <img
          src={education}
          alt=""
          className="mt-[180px] md:h-[40vh] md:w-[50%] ms:w-[70%] absolute right-0 top-0"
        />
      </div>
      <Footer />
    </section>
  );
};

export default AboutUs;
