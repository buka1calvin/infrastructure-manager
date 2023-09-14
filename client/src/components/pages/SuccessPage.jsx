import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col h-screen">
        <AiOutlineCheckCircle
          style={{ width: "100px", height: "100px" }}
          className="text-[#2E9E8F]"
        />
        <h1 className="mt-10 text-3xl text-[#2E9E8F]">Thank You !</h1>
        <p>Payment done successfully</p>
        <p className="mt-6 opacity-60">click here to return to home page</p>

        <Link to="/">
          <button className="bg-[#2E9E8F] px-8 py-2 text-white mt-2 rounded-md hover:bg-[#448980]">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
