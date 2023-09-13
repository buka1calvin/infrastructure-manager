import GetUsers from "../../dashboard/Admin/GetUsers";
import customAxios from "../app/customAxios";
import { showErrorMessage, showSuccessMessage } from "../../layouts/toast";

export const getUsers = async() => {
  try{
     const response = await customAxios.get('/users');
      console.log(response);
     return response.data;
  }catch(error){
    console.log(error)
  }
}

export const updateStatus = async(id) => {
   try{
    const token = localStorage.getItem('token');
    const response = await customAxios.patch(`users/${id}/status`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showSuccessMessage('User updated successfully \u{1F389}');
    return response;
   } catch(error)  {
    showErrorMessage('Something went wrong \u{1F625}');
    throw error;
   }
}

