import React, { useState } from "react";
import InputField from "../../helpers/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import illustrator2 from "../../assets/illustrator2.svg";
import { twoAuthSchema } from "../Actions/validations/inputValidation";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/layouts/toast";
import { verifyOtp } from "../Actions/service/AuthUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../layouts/Spiner"
import Loader from "../layouts/Loader";

const OtpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ resolver: yupResolver(twoAuthSchema) });
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (data) => {
    setIsLoading(true);
    try {
      const response = await verifyOtp(token, data.otp);
      if (response.error) {
        showErrorMessage(response.error);
      } else if (response.message) {
        showSuccessMessage(response.message);
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <div className="w-[50vw] bg-[#5157E0] h-[100vh] flex items-center justify-center">
        <img className=" " src={illustrator2} alt="" />
      </div>
      <div className="h-[90vh] flex items-center">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="px-5  w-[30vw] p-[5px] rounded-md h-[60%] mr-[100px] "
        >
          <div className="flex flex-col -space-y-px rounded-md shadow-sm ">
            <div className="flex flex-col gap-8 p-[20px]">
              <h1 className="font-bold text-center text-[24px] ">
                Enter the CODE
              </h1>
              <div className="h-[2px] w-full bg-[#eae4e4] rounded-xl flex justify-center ">
                <div className="h-full w-[49px] bg-[green]"></div>
              </div>
            </div>
            <div>
              <InputField
                placeholder="enter the code******"
                type="text"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("otp")}
                error={errors?.otp}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || errors.otp || !watch('otp')}
              className="bg-[#5157E0] w-full text-white self-center py-[10px] rounded-lg text-[16px] flex items-center justify-center"
            >
              {isLoading && <Loader />} {/* Display loader when loading */}
              {isLoading ? ' ' : 'enter the Code'} {/* Hide text when loading */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
