import customAxios from "../app/customAxios";
import { showErrorMessage,showSuccessMessage } from "../../layouts/toast";

export const createUser=async(userData)=>{
    try{
        const response=await customAxios.post("/users/signUp",userData)
        return response.data
    }
    catch(error){
        if (error.response && error.response.data) {
            showErrorMessage(error.response.data.error)
            return error.response.data;
          } else {
            return error;
          }
    }
}
export const loginUser = async (userData) => {
    try {
      const response = await customAxios.post("/users/login", userData);
      const { token } = response.data;
      localStorage.setItem("token", token); 
    //   console.log("user:",response.data)
      return response.data;
    } catch (error) {

        if (error.response && error.response.data) {
            showErrorMessage(error.response.data.error)
            console.log(error.response.data);
            return error.response.data;
          } else {
            return error;
          }
    }
  };

  export const verifyOtp=async(token,otp)=>{
    try {
      const response = await customAxios.post(
        `/users/login/validate/${token}`,
        { otp }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return error.response.data;
    }
  }

  const token=localStorage.getItem('token') || '';

  export const getUserProfile = async () => {
    try {
      const response = await customAxios.get(`/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      // console.error('Error fetching user profile:', error);
      return error;
    }
  };

export const updateUserProfile = async (userData) => {
  try {
    const response = await customAxios.put("/users/profile", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const createUserItem = async (formData) => {
  try {
    const { data } = await customAxios.post("/users/addItem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data)
    return data;
  } catch (error) {
    if (error.response) {
      showErrorMessage(error.response.data.message);
      console.log(error.response.data.message);
    } else {
      showErrorMessage("An unexpected error occurred");
      console.log("Unexpected error:", error.message);
    }
    return error;
  }
};
export const updateVerificationStatus = async (id, verificationStatus) => {
  try {
    const response = await customAxios.patch(`/users/verification/${id}`, {
      verificationStatus,
    },{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update verification status");
  }
};


export const resetEmail = async(email) => {
  try{
    const response = await customAxios.post('/users/reset-password', {
      email
    })
    const {message} = response.data;
    return message;
  }catch(error){
    showErrorMessage(error)
  }
}

export const resetPassword =async({password, confirmPassword, token}) => {
   try{
      const response  = await customAxios.patch(`/users/reset-password/${token}`, {
        password,
        confirmPassword,
      })

      console.log(response);
      const {message} = response.data;

      return message
   }catch(error){
    return showErrorMessage(error)
   }
}

export const verifyEmail =async(token) => {
  try{
     const response  = await customAxios.get(`/users/verify-email/?token=${token}`)
     const {message} = response.data;
     return message
  }catch(error){
   return showErrorMessage(error)
  }
}

export const getSingleUser=async(id)=>{
  try{
    const {data}=await customAxios.get(`/users/${id}`
    // ,{
    //   headers:{
    //     Authorization:`Bearer ${token}`
    //   }
    // }
    )
    console.log("user===",data)
    return data;
  }
  catch(error){
    return error.response.data
  }
}