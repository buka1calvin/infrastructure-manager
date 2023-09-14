import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loader from "../layouts/Loader";
import InputField from "../../helpers/InputField";
import { bookingSchema } from "../Actions/validations/inputValidation";
import { createBooking } from "../Actions/service/bookings";
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";
import { Link } from "react-router-dom";


const BookingForm = ({id}) => {

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ resolver: yupResolver(bookingSchema) });
  const onSubmit=async(data)=>{
    try{
        setIsLoading(true)
        const response=await createBooking(id,data)
        showSuccessMessage(response.message)
    }
    catch(error){
        showErrorMessage(error)
    }
    finally{
        setIsLoading(false)
        reset()
    }
  }
  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <div className="h-fit flex items-center flex-col pr-[10px]">
        <form
            onSubmit={handleSubmit(onSubmit)}
          className="px-5  w-[30vw] p-[5px] rounded-md h-[60%] mr-[100px] flex flex-col gap-[10px] self-center m-auto"
        >
          <div>
            <label htmlFor="seats" className="text-[gray]"> enter number seats</label>
            <InputField
              placeholder="booked-seats"
              type="number"
              className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
              {...register("booked_seats")}
              error={errors?.booked_seats}
            />
          </div>
          <div className="w-[60%]  flex justify-between">
          <button onClick={()=>reset()} className="bg-[white] w-[100px] h-[40px] text-[#5157E0] border-[#5157E0] rounded-md border-[1px]">
               <Link to="/"> Cancel</Link>
              </button>
          <button
            type="submit"
            disabled={
              isLoading ||
              errors.booked_seats ||
              !watch("booked_seats")
            }
            className="bg-[#5157E0] text-[white] w-[100px] h-[40px] rounded-md flex items-center justify-center"
          >
            {isLoading && <Loader />}
            {isLoading ? " " : "Book a ride"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
