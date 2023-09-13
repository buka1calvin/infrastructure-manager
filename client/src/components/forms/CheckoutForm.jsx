import React from "react";
import text from "../../assets/card.svg";
import dollar from "../../assets/currency2.svg";
import { payBook } from "../Actions/service/payment";
import { useLocation } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";

const CheckoutForm = () => {
  const location = useLocation();
  const handleCheckout = async () => {
    try {
      const response = await payBook();
      window.location.href = `${response.data.url}`;
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <div className="h-screen w-[50vw] flex flex-col justify-around items-center gap-5 font-poppins">
      <div className="w-[80%] h-fit bg-white flex flex-col items-center justify-center gap-9">
        <h1 className="justify-self-start self-center text-[28px] text-[#263238]">
          make payment to proceed
        </h1>
        <div className="flex  border-[1px] border-[#40B59F] h-[35%] justify-center flex-col items-center gap-6 rounded-[24px] p-[23px] shadow-xl ">
          <img src={text} alt="" className="h-[37px]" />
          <div className="border-[1px] w-[65%] border-[#40B59F]"></div>
        </div>
        <button
          className="bg-[#40B59F] flex justify-center items-center py-[10px] w-[60%] text-[28px] text-[#fff] rounded-lg "
          onClick={handleCheckout}
        >
          <p>Checkout</p>{" "}
          <img src={dollar} alt="" className="relative left-16" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
