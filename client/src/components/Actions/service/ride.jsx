import { data } from "../../data";
import customAxios from "../app/customAxios";

const token=localStorage.getItem('token') || '';

export const handleSearch = async ({ search }) => {
  try {
    const response = await customAxios.get("/rides/search", {
      params: search,
    });
    localStorage.setItem("searchParams", JSON.stringify(search));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRides = async () => {
  try {
    const response = await customAxios.get("/rides/passenger");
    return response.data.rides;
  } catch (error) {
    console.error(error);
  }
};

export const createRide = async (rideData) => {
  try {
    const { data } = await customAxios.post(`/rides`, rideData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
}

export const getDriverRides = async () => {
  try {
    const response = await customAxios.get("/rides");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getRideById = async (id) => {
  try {
    const { data } = await customAxios.get(`/rides/${id}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const cancelRide=async(id)=>{
  try{
      const {data}=await customAxios.delete(`/rides/${id}`,{

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
