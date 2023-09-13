import React, { useCallback, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../../helpers/InputField";
import { itemRegisterSchema } from "../Actions/validations/inputValidation";
import {
  getUserProfile,
  createUserItem,
} from "../Actions/service/AuthUser";
import { useDropzone } from "react-dropzone";
import clear from "../../assets/clear.png";
import { showErrorMessage, showSuccessMessage } from "../layouts/toast";
import Loader from "../layouts/Loader";
import { GridLoader } from "react-spinners";

const ItemRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(itemRegisterSchema) });

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImages((prevState) => [...prevState, ...acceptedFiles]);
    console.log("selectedImages:", selectedImages); // Add this line to check selectedImages
    console.log("acceptedFiles:", acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 4 });
  const styles = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {}),
    }),
    [isDragAccept, isDragReject]
  );

  const handleRemoveImage = (index) => {
    setSelectedImages((prevState) => prevState.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserProfile();
        console.log(response)
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
      formData.append("itemName", data.itemName);
      formData.append("serialNumber",data.serialNumber)
      selectedImages.forEach((image) => {
        formData.append(`itemPictures`, image);
      });
      // formData.append(`carPictures`, selectedImages[0]);
      console.log("item:", data);
      const createdItem = await createUserItem(formData);
      console.log("updated user:", createdItem);
      showSuccessMessage(createdItem.message);
    } catch (error) {
      console.log(error.message);
      showErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("selectedImages updated:", selectedImages);
  }, [selectedImages]);
  return (
    <div className="flex  items-center justify-between font-jost overflow-hidden w-full h-[100vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        // encType="multipart/form-data"
        className="flex flex-col w-full justify-center gap-5 pl-[10%] items-center"
      >
        <h1 className="text-2xl font-bold self-start ">add your item</h1>
        {loading ? ( // Render loader if loading is true
          <GridLoader color="#5157E0" />
        ) : (
          <div className="w-[70%] rounded-lg h-fit flex flex-col">
            <div className="w-2/2">
              <div className="flex justify-between">
                <div className="w-[48%]">
                <InputField
                  styles=" text-slate-500 mt-4 text-sm"
                  placeholder="Enter the item name"
                  type="text"
                  className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("itemName")}
                  error={errors?.itemName}
                />
                </div>
                <div className="w-[48%]">
                <InputField
                  styles=" text-slate-500 mt-4 text-sm"
                  placeholder="Enter item serial number"
                  type="text"
                  className=" w-full rounded-md px-2 py-3 placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EEF0F5]"
                  {...register("serialNumber")}
                  error={errors?.serialNumber}
                />
                </div>
              </div>
              <div className="inline-grid grid-cols-3 grid-rows-1 gap-[5px] mt-[-10] xs:static xs:mt-[10px] xs:p-2 laptop:static">
                {selectedImages.length < 4 && (
                  <div
                    className="border border-gray-200 ... w-[100px] h-[100px] text-5xl  text-slate-400 xs:w-[150px] bg-white xs:h-[150px] "
                    {...getRootProps({ styles })}
                  >
                    <input data-testid="dropzone" {...getInputProps()} />
                    {isDragActive ? (
                      <p className="mt-[70px] ml-[55px] text-2xl xs:mt-[45px] xs:ml-[25px]">
                        Drop it here...
                      </p>
                    ) : (
                      <p className="mt-[25px] ml-[35px] xs:mt-[45px] xs:ml-[55px]">
                        +
                      </p>
                    )}
                  </div>
                )}
                {selectedImages.length > 0 &&
                  selectedImages.map((image, index) => (
                    <div
                      className="col-span-1 border border-gray-200 ... w-[100px] h-[100px] text-5xl  text-slate-400 p-[5px] xs:w-[150px] bg-white xs:h-[180px] xs:p-[15px]"
                      key={index}
                    >
                      <img
                        src={`${URL.createObjectURL(image)}`}
                        alt=""
                        className="w-[100%] h-full object-cover hover:opacity-[0.6]"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="hidden hover:visible"
                      >
                        <img src={clear} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary text-[white] w-[100px] h-[40px] rounded-md flex items-center justify-center mt-[1rem]"
            >
              {loading ? <GridLoader /> : "Save"} {/* Show loader or text */}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ItemRegister;
