import customAxios from "../app/customAxios";

export const addMessage = async (sender, receiver, message) => {
    try {
      const response = await customAxios.post(`/messages`, {
        sender,
        receiver,
        message,
      });
  
      if (!response.status === 200) {
        throw new Error("Failed to add message");
      }
  
      const data = response.data;
      console.log("======++++++", data); // Handle the response data here
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  export const getMessages = async (sender, receiver) => {
    try {
      const response = await customAxios.post(`/messages/AllMessages`, {
        sender,
        receiver,
      });
  
      // if (!response.status === 200) {
      //   throw new Error("Failed to get messages");
      // }
  
      const data = response.data;
      console.log("++++++", data.messages); // Handle the response data here
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  export const chatBot=async(newMessage)=>{
    try{
      const {data}=await customAxios.post('/messages/bot',newMessage)
      console.log("data",data)
      return data;
    }
    catch(error){
      return response.data.error;
    }
  }