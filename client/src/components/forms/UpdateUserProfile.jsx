import React, { useEffect, useState } from "react";
import InputField from "../../helpers/InputField";
import Avatar from "../../assets/avatar1.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UpdateUserSchema } from "../Actions/validations/inputValidation";
import { getUserProfile, updateUserProfile } from "../Actions/service/AuthUser";
import Dropzone from "react-dropzone";
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";
import Loader from "../layouts/Loader";
import { CircleLoader } from "react-spinners";
// import {ImSpinner}

const UpdateUserProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [loading1, setIsLoading1] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(UpdateUserSchema) });

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const updatedUser = await updateUserProfile(formData);
        console.log("User profile updated successfully:", updatedUser);

        // If the update is successful, set the selected image in the state
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          setSelectedImage(imageData);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log("Error updating user profile:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile();
        console.log("user:", response);
        const userProfile = response.userDetails;
        console.log("userProfile:", userProfile);
        const dateObj = userProfile.DOB ? new Date(userProfile.DOB) : null;
        const formattedDate = dateObj
          ? `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${dateObj
              .getDate()
              .toString()
              .padStart(2, "0")}`
          : "";
        if (userProfile) {
          setValue("profilePic", userProfile?.profilePic);
          setValue("preferredLanguage", userProfile?.preferredLanguage);
          setValue("preferredCurrency", userProfile?.preferredCurrency);
          setValue("phoneNumber", userProfile?.phoneNumber);
          setValue("bio", userProfile?.bio);
          setValue("userId", userProfile?.userId);
          setValue("gender", userProfile?.gender);
          setValue("DOB", formattedDate);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };
    fetchUserInfo();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setIsLoading1(true)
      const formData = new FormData();
      if (selectedImage) {
        formData.append("profilePic", selectedImage);
      }

      // Append other form fields to formData
      formData.append("preferredLanguage", data.preferredLanguage);
      formData.append("preferredCurrency", data.preferredCurrency);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("bio", data.bio);
      formData.append("userId", data.userId);
      formData.append("gender", data.gender);
      formData.append("DOB", data.DOB);
      const updatedUser = await updateUserProfile(formData);
      showSuccessMessage(updatedUser.message);
    } catch (error) {
      showErrorMessage(error.error);
    }
    finally{
      setIsLoading1(false)
    }
  };
  return (
    <div className="flex  font-jost mt-[48px]">
      <form
        className=" flex flex-col w-full justify-center pl-[10%]"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {loading ? ( 
          <div className="flex justify-center items-center w-full h-[60vh]">
        <CircleLoader color="#5157E0" />
        </div>
        ) : (
          <div className="w-[73%] rounded-lg border-[1px] p-[20px] border-[#f4f0f0]">
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  className="relative w-[60px] h-[60px] mb-4 ml-auto border-[1px] border-[#5157E0] rounded-full"
                  {...getRootProps()}
                >
                  <img
                    src={selectedImage || watch("profilePic") || Avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <input {...getInputProps()} />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 28 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.6665 1.33333C8.6665 0.597333 9.21717 0 9.89717 0H18.1025C18.7825 0 19.3332 0.597333 19.3332 1.33333C19.3332 2.06933 18.7825 2.66667 18.1025 2.66667H9.89717C9.21717 2.66667 8.6665 2.06933 8.6665 1.33333ZM11.0372 24H16.9625C21.1238 24 23.2052 24 24.6998 23.0373C25.3429 22.6239 25.8983 22.0879 26.3345 21.46C27.3332 20.02 27.3332 18.0133 27.3332 14C27.3332 9.98667 27.3332 7.98133 26.3332 6.54C25.8975 5.91215 25.3425 5.37619 24.6998 4.96267C23.2052 4 21.1238 4 16.9625 4H11.0372C6.87584 4 4.7945 4 3.29984 4.96267C2.6572 5.37622 2.10222 5.91218 1.6665 6.54C0.666504 7.98 0.666504 9.98667 0.666504 13.9973V14C0.666504 18.0133 0.666504 20.0187 1.66517 21.46C2.09717 22.084 2.65184 22.62 3.29984 23.0373C4.7945 24 6.87584 24 11.0372 24ZM8.44384 14C8.44384 11.04 10.9318 8.64267 13.9998 8.64267C17.0678 8.64267 19.5558 11.0413 19.5558 14C19.5558 16.9587 17.0665 19.3573 13.9998 19.3573C10.9318 19.3573 8.44384 16.9573 8.44384 14ZM10.6665 14C10.6665 12.224 12.1598 10.7867 13.9998 10.7867C15.8398 10.7867 17.3332 12.2253 17.3332 14C17.3332 15.7747 15.8398 17.2133 13.9998 17.2133C12.1598 17.2133 10.6665 15.7747 10.6665 14ZM22.1478 8.64267C21.5345 8.64267 21.0372 9.12267 21.0372 9.71467C21.0372 10.3053 21.5345 10.7853 22.1478 10.7853H22.8892C23.5025 10.7853 23.9998 10.3053 23.9998 9.71467C23.9998 9.12267 23.5025 8.64267 22.8892 8.64267H22.1478Z"
                        fill="#242760"
                        fillOpacity="0.81"
                      />
                    </svg>
                  </label>
                </div>
              )}
            </Dropzone>
            <div className="flex justify-between">
              <div className="w-[43%]">
                <InputField
                  type="text"
                  placeholder="Preferred Language"
                  className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("preferredLanguage")}
                  error={errors?.preferredLanguage}
                />
              </div>
              <div className="w-[43%]">
                <InputField
                  type="text"
                  placeholder="Preferred Currency"
                  className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("preferredCurrency")}
                  error={errors?.preferredCurrency}
                />
              </div>
            </div>
            <div>
              <InputField
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("phoneNumber")}
                error={errors?.phoneNumber}
              />
            </div>
            <div>
              <textarea
                type="text"
                placeholder=" enter your Bio here"
                className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("bio")}
                error={errors?.bio}
              />
            </div>
            <div>
              <InputField
                type="text"
                placeholder="enter your ID number"
                className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                {...register("userId")}
                error={errors?.userId}
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="w-[43%]">
                <select
                  id="gender"
                  name="gender"
                  className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("gender")}
                  error={errors?.gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="w-[43%]">
                <InputField
                  type="date"
                  placeholder="Date of Birth"
                  className="w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("DOB")}
                  error={errors?.DOB}
                />
              </div>
            </div>
            <div className="w-[40%]  flex justify-between">
              <button
                onClick={() => reset()}
                type="button"
                className="bg-[white] w-[100px] h-[40px] text-[#5157E0] border-[#5157E0] rounded-md border-[1px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#5157E0] text-[white] w-[100px] h-[40px] rounded-md flex items-center justify-center "
              >
                {loading1 ? <Loader /> : "Save"} {/* Show loader or text */}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateUserProfile;
