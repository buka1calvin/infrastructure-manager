import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loader from "../layouts/Loader";
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";
import InputField from "../../helpers/InputField";
import { createRideschema } from "../Actions/validations/inputValidation";
import { createRide } from "../Actions/service/ride";

const CreateRideForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
    } = useForm({ resolver: yupResolver(createRideschema) });
    const onSubmit=async(data)=>{
        try{
            setIsLoading(true)
            const response=await createRide(data)
            showSuccessMessage(response.message)
        }
        catch(error){
            showErrorMessage(error)
        }
        finally{
            reset()
            setIsLoading(false)
        }
    }
  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <form
        className=" flex flex-col w-full justify-center pl-[10%]"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h1 className="text-[40px] font-bold">Create  a Ride</h1>
        <div className="w-[73%] rounded-lg  p-[20px]">
        <div className="flex justify-between">
              <div className="w-[43%]">
                <InputField
                  type="text"
                  placeholder="Departure location"
                  className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("origin")}
                  error={errors?.origin}
                />
              </div>
              <div className="w-[43%]">
                <InputField
                  type="text"
                  placeholder="Destination"
                  className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("destination")}
                  error={errors?.destination}
                />
              </div>
            </div>
            <div>
              <InputField
                type="text"
                placeholder="Other station"
                className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("otherStations")}
                error={errors?.otherStations}
              />
            </div>
            <div>
              <InputField
                type="number"
                placeholder="enter number of seats"
                className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("seats")}
                error={errors?.seats}
              />
            </div>
            <div className="flex w-full justify-between">
            <div className="w-[43%]">
                <InputField
                  type="date"
                  placeholder="Departure date"
                  className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("departureDate")}
                  error={errors?.departureDate}
                />
              </div>
              <div className="w-[43%]">
              <InputField
                type="text"
                placeholder="enter the price"
                className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("price")}
                error={errors?.price}
              />
            </div>
            </div>
            <div className="w-[40%]  flex justify-between">
              <button
                onClick={() => reset()}
                type="button"
                className="bg-[white] w-[100px] h-[40px] text-[#5157E0] border-[#5157E0] rounded-md border-[1px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#5157E0] text-[white] w-[100px] h-[40px] rounded-md flex items-center justify-center "
              >
                 {isLoading ?<Loader/> :"Save"}
              </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRideForm;
