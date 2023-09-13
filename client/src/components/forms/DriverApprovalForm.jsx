import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  showSuccessMessage,
  showErrorMessage,
} from "../../components/layouts/toast";
import { driverApprovalSchema } from "../Actions/validations/inputValidation";
import illustrator from "../../assets/illustrator3.svg";
import logo from "../../assets/logo.svg";
import { Link, useParams } from "react-router-dom";
import { updateVerificationStatus } from "../Actions/service/AuthUser";
import Loader from "../layouts/Loader";

const DriverApprovalForm = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ resolver: yupResolver(driverApprovalSchema) });
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { verificationStatus } = data;
      const userId = id; 

      const response = await updateVerificationStatus(
        userId,
        verificationStatus
      );

      console.log("Verification status updated successfully:", response);
      showSuccessMessage("Verification status updated successfully");
    } 
    catch (error) {
      console.error("Error updating verification status:", error.message);
      showErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <div className="w-[50vw] bg-[#5157E0] h-[92vh] flex items-center justify-center">
        <img className=" " src={illustrator} alt="" />
      </div>
      <div className="h-[90vh] flex items-center flex-col pr-[10px]">
        <Link to="/" className="self-end ">
          <img src={logo} alt="" />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5  w-[30vw] p-[5px] rounded-md h-[60%] mr-[100px] flex flex-col gap-[10px] self-center m-auto"
        >
          <h1 className="text-[40px]">Provide the user a role</h1>
          <div className="w-[100%]">
            <label htmlFor="verification status" className="text-[gray]">
              Add Status
            </label>
            <select
              className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
              {...register("verificationStatus")}
              error={errors?.verificationStatus}
            >
              <option value="rejected">rejected</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
            </select>
          </div>
          <button
              type="submit"
              disabled={isLoading || errors.verificationStatus || !watch("verificationStatus")}
              className="bg-[#5157E0] w-full text-white self-center py-[10px]  rounded-lg text-[16px] flex items-center justify-center"
            >
              {isLoading && <Loader />} 
              {isLoading ? ' ' : 'Save'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default DriverApprovalForm;
