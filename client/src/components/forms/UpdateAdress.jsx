import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../../helpers/InputField";
import { getUserProfile, updateUserProfile } from "../Actions/service/AuthUser";
import { updateAdressSchema } from "../Actions/validations/inputValidation";
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";
import Loader from "../layouts/Loader";

const UpdateAdress = () => {
  const [loading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(updateAdressSchema) });
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {

        const response = await getUserProfile();
        console.log("user:", response);
        const userAdress = response.userDetails.billingAddress;
        console.log("userProfile:", userAdress);
        if (userAdress) {
          setValue("province", userAdress?.province);
          setValue("email", userAdress?.email);
          setValue("street", userAdress?.street);
          setValue("district", userAdress?.district);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserInfo();
  }, [setValue]);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("province", data.province);
      formData.append("district", data.district);
      formData.append("street", data.street);
      const updatedUser = await updateUserProfile(formData);
      showSuccessMessage(updatedUser.message);
    } catch (error) {
      showErrorMessage(error);
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <div className="flex  items-center justify-between font-jost overflow-hidden mt-[54px]">
      <form
        onSubmit={(event) => {
          handleSubmit(onSubmit)(event);
        }}
        className="flex flex-col w-full justify-center pl-[10%]"
      >
          <div className="w-[75%] rounded-lg p-[20px] shadow-lg border-[1px] border-[#f4f0f0]">
            <div>
              <InputField
                placeholder="email"
                type="email"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("email")}
                error={errors?.email}
              />
            </div>
            <div>
              <InputField
                placeholder="District"
                type="text"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("district")}
                error={errors?.district}
              />
            </div>
            <div>
              <InputField
                placeholder="Street"
                type="text"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("street")}
                error={errors?.street}
              />
            </div>
            <div>
              <InputField
                placeholder="Province"
                type="text"
                className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("province")}
                error={errors?.province}
              />
            </div>
            <div className="w-[30%]  flex justify-between gap-6">
              <button className="bg-[white] w-[100px] h-[40px] text-[#5157E0] border-[#5157E0] rounded-md border-[1px]">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#5157E0] text-[white] w-[100px] h-[40px] rounded-md flex items-center justify-center"
              >
                {loading ? <Loader /> : "Save"} {/* Show loader or text */}
              </button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default UpdateAdress;
