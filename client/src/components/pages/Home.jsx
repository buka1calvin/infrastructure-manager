import React, { useEffect } from "react";
import AboutUs from "./AboutUs";
import Carpool from "./Carpool";
import { motion } from "framer-motion";
import { SearchForm } from "../searchPages/SearchForm";
import { Link } from "react-router-dom";
import getUserInfo from "../../utils/getUserInfo";
import ChatBot from "../forms/ChatBot";

const Home = ({ setSelectedPage }) => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserInfo();
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <>
      <section className="gap-16 py-10 h-screen md:pb-0 font-jost  flex items-center justify-center border-b-[1px]" id="home">
        <div
          className="flex w-full items-center justify-center "
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="gap-4 p-10 xs:w-full md:w-full h-[300px] flex flex-col items-center"
          >
            <h1 className="text-3xl w-2/2 tracking-wide ">
            Welcome to  INES Ruhengeri Register your device below
            </h1>
            <button className="bg-[#09B294] p-3 rounded-lg text-white">
              register item +
            </button>

          </motion.div>
        </div>
      </section>
      {/* <Carpool /> */}
      <AboutUs />
      {/* <div className="fixed top-[40%] w-full">
        <ChatBot/>
      </div> */}
    </>
  );
};

export default Home;
