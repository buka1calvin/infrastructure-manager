import customAxios from "../app/customAxios";
import { showErrorMessage,showSuccessMessage } from "../../layouts/toast";
const token=localStorage.getItem('token') || '';

export const getItems = async () => {
    try {
      const { data } = await customAxios.get(`/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
  export const updateItemStatus = async (id, itemStatus) => {
    try {
      const { data } = await customAxios.patch(
        `users/item/${id}`,
        { itemStatus }, // Include itemStatus in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccessMessage(data.message);
      console.log("itemUpdate", data);
      return data;
    } catch (error) {
      showErrorMessage(error.data);
      throw error;
    }
  };
