import customAxios from "../app/customAxios";

export const AdminStatistic = async () => {
  try {
    const response = await customAxios.get("/users/stats");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
