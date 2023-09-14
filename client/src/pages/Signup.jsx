import React, { useState } from "react";
import InputField from "../helpers/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { registerSchema } from "../components/Actions/validations/inputValidation";
import { createUser } from "../components/Actions/service/AuthUser";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../components/layouts/toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
  const [pwdOpenEye, setPwdOpenEye] = useState(false);
  const pwdToggle = () => {
    setPwdOpenEye(!pwdOpenEye);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });
  const onSubmit = async (data) => {
    try {
      const response = await createUser(data);
      showSuccessMessage(response.message);
      navigate("/auth/login")
      
      // reset();
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <div className="flex  items-center  m-[0] justify-center font-jost overflow-hidden">
      <div className=" h-[100vh] flex items-center  justify-center flex-col">
        <form
          onSubmit={(event) => {
            handleSubmit(onSubmit)(event);
          }}
          className="px-5 w-[35vw] p-[5px] rounded-md mt-10 border border-[#f4f2f2] shadow-lg relative"
        >
          <div className="flex flex-col -space-y-px rounded-md shadow-sm ">
            <div className="flex flex-col gap-1 p-[20px]">
              <h1 className="font-bold text-center text-[24px] ">
                Register Now
              </h1>
              <div className="h-[2px] w-full bg-[#eae4e4] rounded-xl flex justify-center ">
              </div>
            </div>
            <div>
              <InputField
                placeholder="firstname"
                type="text"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-1 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("firstname")}
                error={errors.firstname}
              />
            </div>
            <div>
              <InputField
                placeholder="lastname"
                type="text"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("lastname")}
                error={errors?.lastname}
              />
            </div>
            <div>
              <InputField
                placeholder="example@gmail.com"
                type="email"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("email")}
                error={errors?.email}
              />
            </div>
            <div>
              <InputField
                placeholder="telephone"
                type="tel"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("phoneNumber")}
                error={errors?.phoneNumber}
              />
            </div>
            <div className="w-[100%]">
            <select
              className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
              {...register("role")}
              error={errors?.role}
            >
              <option value="visitor">visitor</option>
              <option value="student">student</option>
            </select>
          </div>
            <div className=" relative">
              <InputField
                placeholder="Password"
                type={pwdOpenEye ? "text" : "password"}
                className=" w-full rounded-md px-2 py-3  placeholder:text-gray-400 sm:text-[13px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("password")}
                error={errors?.password}
              />
              <div className="ml-[90%] bottom-[57px] relative text-[#a4a3a3]">
                {pwdOpenEye ? (
                  <AiOutlineEye onClick={pwdToggle} />
                ) : (
                  <AiOutlineEyeInvisible onClick={pwdToggle} />
                )}
              </div>
            </div>
            <div className="flex">
              <label className="flex items-center gap-2 text-[#656565] p-[10px] font-[200]">
                <input type="checkbox" className="rounded border-inherit" />I
                agree to the terms and conditions
              </label>
            </div>
            <div></div>

            <button className="bg-[#09B294] w-full text-white self-center py-[10px] rounded-lg text-[16px]">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
