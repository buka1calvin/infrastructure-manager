import React, { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai';
import location from "../assets/location1.svg"
import { getBookings } from '../components/Actions/service/bookings';
import dollar from "../assets/currency1.svg"
import { Link } from 'react-router-dom';
import { PropagateLoader } from "react-spinners";

const BookingsPerUser = () => {
    const [loading,setIsLoading]=useState(false)
    const [bookingData,setBookingDta]=useState(null)

    useEffect(()=>{
        const fetchBookings=async()=>{
        try{
        setIsLoading(true)
        const response=await getBookings();
        setBookingDta(response.filter(booking => booking.status === "approved" && booking.pay_status === "pending"
        ))
        console.log("bookings===",response.filter(booking => booking.status === "approved"))
        }
        catch(error){
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
        }
        fetchBookings()
    },[])
    let bookingApproved;
    const formatDepartureDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        const departureDate = new Date(dateString);
        return departureDate.toLocaleDateString('en-US', options);
    };
    
  return (
    <div className='h-screen w-[50vw] flex flex-col justify-center items-center gap-5 font-poppins'>
        {loading ? (
            <div className="w-screen flex justify-center items-center h-screen"> <PropagateLoader color="#5157E0" /></div>
        ) :(
            <>
        <h1 className='self-start ml-[15%] text-[24px] justify-self-start'>Bookings being paid</h1>
        <p className='self-start ml-[15%] text-[13px] text-[#97ADB6]'>Bookings</p>
        {bookingData?.map((booking)=>(
      <div className='w-[70%] h-[200px] shadow-lg border-[#f4f0f0] border-[1px] rounded-xl flex justify-between p-[20px]'>
        <div className='flex flex-col justify-between'>
        <div className='flex gap-2'>
            <img src={location} alt=""className='w-[23px]' />
            <div className='flex flex-col justify-between gap-5'>
                <p>{booking.rideData.origin}</p>
                <p className='text-[#97ADB6] text-[12px]'>{booking.rideData.destination}</p>
            </div>
        </div>
        <p className='flex items-center gap-1 text-[14px]'><img src={dollar} alt="" className='w-[23px]' /> {booking.total_price} rwf</p>
        <p className='flex items-center'><AiOutlineCalendar/>{formatDepartureDate(booking.rideData.departureDate)}</p>
        </div>
        <div className='flex flex-col justify-between items-end'>
        <p className={`${booking.status==="approved" ?"text-[#40B59F] border-[2px] border-[#40B59F] py-1 px-2 rounded-xl":"text-[#E29F0B] border-[2px] border-[#E29F0B] py-1 px-2 rounded-xl"} text-[14px]`}>{booking.status}</p>
        <button className='bg-[#5157E0] text-[#fff] py-[4px] px-[12px] rounded-md'><Link to={`/rides/${booking.ride_id}/booking`}>add Seats</Link></button>
        </div>
      </div>
))}
      </>
)}
    </div>
  )
}

export default BookingsPerUser
