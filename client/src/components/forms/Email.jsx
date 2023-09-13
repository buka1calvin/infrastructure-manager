import React, { useState } from "react";
import InputField from "../../helpers/InputField";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ForgetPasswordSchema } from "../Actions/validations/inputValidation";
import Group11 from "../../assets/Group 11.svg";
import { resetEmail } from "../Actions/service/AuthUser";
import { showSuccessMessage, showErrorMessage } from "../layouts/toast";
export const Email = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { email: email } = data;
      const response = await resetEmail(email);
      console.log("response",response);
      showSuccessMessage(response)
    } catch (error) {
      showErrorMessage(error?.data?.message);
    }
  };

  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <div className="w-[50vw] bg-[#5157E0] h-screen flex items-center justify-center">
        <img className=" " src={Group11} alt="" />
      </div>
      <div className=" h-[90vh] flex items-center">
        <form
          onSubmit={(event) => {
            handleSubmit(onSubmit)(event);
          }}
          className="px-5  w-[30vw] p-[5px] rounded-md h-[60%] mr-[100px] "
        >
          <div className="flex flex-col ">
            <div className="flex flex-col gap-8 p-[20px]">
              <h1 className="font-bold text-center text-[24px] ">
                Enter Email
              </h1>
              <div className="h-[2px] w-full bg-[#eae4e4] rounded-xl flex justify-center ">
                <div className="h-full w-[49px] bg-[#2A4591]"></div>
              </div>
            </div>
            <div>
              <InputField
                placeholder="email"
                type="text"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("email")}
                error={errors?.email}
              />
            </div>
            <div></div>

            <button
              className="
            bg-[#5157E0] w-full text-white 
            self-center py-[10px] rounded-lg 
            text-[16px]"
            type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
