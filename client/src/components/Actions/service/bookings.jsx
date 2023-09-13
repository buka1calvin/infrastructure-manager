import customAxios from "../app/customAxios";
import { showErrorMessage } from "../../layouts/toast";
const token=localStorage.getItem('token') || '';

export const createBooking=async(id,bookData)=>{
    try{
    const {data}=await customAxios.post(`/rides/${id}/bookings`,bookData,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return data;
}
catch(error){
    showErrorMessage(error.response.data);
    return error.response.data;
}
}

export const approveBooking=async(id,status)=>{
    try{
        const {data}=await customAxios.patch(`/bookings/${id}/approve`,{status},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    }
    catch(error){
        console.log(error)
        return error.response.data
    }
}

export const getBookings=async()=>{
    try{
        const {data}=await customAxios.get(`/bookings`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return data
    }
    catch(error){
        return error.response.data
    }
}

export const cancelbooking=async(bookingId)=>{
    try{
        const {data}=await customAxios.delete(`/bookings/${bookingId}`,{

            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return data
    }
    catch(error){
        return error.response.data
    }
}

export const getBookingsPRide=async(id)=>{
    try{
        const {data}=await customAxios.get(`/bookings/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        return data
    }
    catch(error){
        return error.response.data
    }
}