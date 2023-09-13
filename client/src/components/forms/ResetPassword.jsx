import React, { useState } from "react";
import InputField from "../../helpers/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import resetSvg from "../../assets/reset.svg";
import { ResetSchema } from "../Actions/validations/inputValidation";
import { resetPassword } from "../Actions/service/AuthUser";
import { showSuccessMessage, showErrorMessage } from "../layouts/toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState([false, false]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ResetSchema) });
  const getTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("token");
  };
  const onSubmit = async (data) => {
    try {
      const { password1: password, password2: confirmPassword } = data;
      const token = getTokenFromURL();
      const response = await resetPassword({
        token,
        password,
        confirmPassword,
      });
      console.log("response", response)
      showSuccessMessage(response);
      navigate("/auth/login");
    } catch (error) {
      showErrorMessage(error?.data?.message);
    }
  };

  const handleClickShowPassword = (index) => {
    setShowPassword((prevShowPassword) => {
      const updatedShowPassword = [...prevShowPassword];
      updatedShowPassword[index] = !prevShowPassword[index];
      return updatedShowPassword;
    });
  };
  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <div className="w-[50vw] bg-[#5157E0] h-[92vh] flex items-center justify-center">
        <img className=" " src={resetSvg} alt="" />
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
                Reset Password
              </h1>
              <div className="h-[2px] w-full bg-[#eae4e4] rounded-xl flex justify-center ">
                <div className="h-full w-[49px] bg-[green]"></div>
              </div>
            </div>
            <div>
              <InputField
                placeholder="Enter password"
                type={showPassword[0] ? "text" : "password"}
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("password1")}
                error={errors?.password1}
              />
              <div className="ml-[90%] bottom-[57px] relative text-[#a4a3a3]" onClick={() => handleClickShowPassword(0)}>
                {showPassword[0] ? (
                  <AiOutlineEye  />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </div>
              <InputField
                placeholder="Confirm password"
                type={showPassword[1] ? "text" : "password"}
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("password2")}
                error={errors?.password2}
              />
              <div className="ml-[90%] bottom-[57px] relative text-[#a4a3a3]" onClick={() => handleClickShowPassword(1)}>
                {showPassword[1] ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </div>
            </div>
            <div></div>
            <button className="bg-[#5157E0] w-full text-white self-center py-[10px] rounded-lg text-[16px]">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
