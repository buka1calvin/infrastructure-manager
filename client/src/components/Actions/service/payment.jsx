import { showErrorMessage } from "../../layouts/toast";
import customAxios from "../app/customAxios";

export const payBook = async () => {
  try {
    const response = await customAxios.post("/users/payment");
    return response;
  } catch (error) {
    console.log(error);
  }
};
