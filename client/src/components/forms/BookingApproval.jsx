import React, { useState } from 'react'
import illustrator from "../../assets/illustrator4.svg"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loader from "../layouts/Loader";
import { bookingApprovalSchema } from '../Actions/validations/inputValidation'
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";
import { Link, useParams } from 'react-router-dom';
import { approveBooking } from '../Actions/service/bookings';
import logo from "../../assets/logo.svg"

const BookingApproval = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {id}=useParams()
    console.log(id)
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
    } = useForm({ resolver: yupResolver(bookingApprovalSchema) });

    const onSubmit=async(data)=>{
        try{
            setIsLoading(true)
        const {status}=data
        const bookingId=id
        console.log("id",bookingId)
        const bookingResponse=await approveBooking(bookingId,status);
        console.log("booking",bookingResponse)
        showSuccessMessage(bookingResponse.message)
        }
        catch(error){
            showErrorMessage(error.message)
        }
        finally{
            setIsLoading(false)
            reset()
        }
    }
  return (
    <div className="flex overflow-hidden items-center  m-[0] justify-between font-jost">
      <div className="w-[50vw] bg-[#5157E0] h-screen flex items-center justify-center">
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
            <label htmlFor="status" className="text-[gray]">
              Approve the booking
            </label>
            <select
              className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
              {...register("status")}
              error={errors?.status}
            >
              <option value="rejected">rejected</option>
              <option value="pending">pending</option>
              <option value="approved">approved</option>
            </select>
          </div>
          <button
              type="submit"
              disabled={isLoading || errors?.status || !watch("status")}
              className="bg-[#5157E0] w-full text-white self-center py-[10px]  rounded-lg text-[16px] flex items-center justify-center"
            >
              {isLoading && <Loader />} 
              {isLoading ? ' ' : 'Update Booking'}
            </button>
        </form>
      </div>
    </div>
  )
}

export default BookingApproval
