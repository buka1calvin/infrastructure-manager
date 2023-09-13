import React, { useState } from "react";
import InputField from "../helpers/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../components/Actions/validations/inputValidation";
import illustrator1 from "../assets/illustrator1.svg";
import { loginUser } from "../components/Actions/service/AuthUser";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../components/layouts/toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import GoogleLogin from "../components/GoogleLogin";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [pwdOpenEye, setPwdOpenEye] = useState(false);
  const navigate=useNavigate()
  const pwdToggle = () => {
    setPwdOpenEye(!pwdOpenEye);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });
  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data);
      console.log("user==",user)
      showSuccessMessage(user.message);
      if(user.user.role ==="admin") 
      {
        navigate("/dashboard/content")
      }
      else{
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      showErrorMessage(error.error);
    }
  };
  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-center font-jost">
      <div className=" h-[90vh] flex items-center flex-col justify-center">
        <form
          onSubmit={(event) => {
            handleSubmit(onSubmit)(event);
          }}
          className="px-5  w-[30vw] p-[5px] rounded-md h-[60%] mr-[100px] border border-[#ece9e9] shadow-lg  "
        >
          <div className="flex flex-col -space-y-px rounded-md shadow-sm ">
            <div className="flex flex-col gap-8 p-[20px]">
              <h1 className="font-bold text-center text-[24px] ">Sign In</h1>
              <div className="h-[2px] w-full bg-[#eae4e4] rounded-xl flex justify-center ">
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
            <div>
              <InputField
                placeholder="password"
                type={pwdOpenEye ? "text" : "password"}
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
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

            <div></div>

            <button className="bg-[#09B294] w-full text-white self-center py-[10px] rounded-lg text-[16px]">
              Sign Up
            </button>
            <p className="text-sm flex justify-center gap-1 p-4 text-[#656565]">
              don't you have an account?
              <Link to="/auth/signup" className="text-[#09B294]">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
