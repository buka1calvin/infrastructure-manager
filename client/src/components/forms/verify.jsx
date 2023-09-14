import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import verifyImg from "../../assets/verify.svg";
import { verifyEmail } from "../Actions/service/AuthUser";
export const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const getTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("token");
  };
  const token = getTokenFromURL();

  useEffect(() => {
    verifyEmail(token)
      .then((message) => {
        setVerificationStatus(message);
      })
      .catch((error) => {
        setVerificationStatus("Verification Failed");
      });
  }, [token]);
  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <div className="w-[50vw] bg-[#5157E0] h-[100vh] flex items-center justify-center">
        <img className=" " src={verifyImg} alt="" />
      </div>
      <div className="flex flex-col rounded-md shadow-md p-10 mr-20 w-[400px]">
        <div className="flex flex-col gap-8 p-[20px]">
          <h1 className="font-bold text-center text-[24px] flex justify-center items-center">
            <span className="text-[#09B294]">{verificationStatus}</span>
            {verificationStatus === "Verifying..." ? (
            <div className="spinner">
              
            </div>
          ) : (
            <BsCheckCircleFill className="text-[#09B294]" />
          )}
          </h1>
          <div className="h-[2px] w-full bg-[#eae4e4] rounded-xl flex justify-center ">
            <div className="h-full w-[49px] bg-[#09B294]"></div>
          </div>
        </div>
        <div></div>
        <Link to="/">
          <button className="bg-[#5157E0] w-full text-white self-center py-[10px] rounded-lg text-[16px]">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};
