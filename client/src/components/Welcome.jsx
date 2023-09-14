import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showSuccessMessage, showErrorMessage } from "./layouts/toast";
import customAxios from "./Actions/app/customAxios";
import { PropagateLoader } from "react-spinners";

const GoogleWelcome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const googleQuery = location.search;
  //   const [loading, setLoading] = useState(true);
  let loading = true;
  //   useEffect(() => {
  const loginWithGoogle = async () => {
    try {
      const response = await customAxios.get(
        `/users/google/callback${googleQuery}`
      );
      const { data } = response;
      console.log("data:", data);
      localStorage.setItem("token", data.token);
      // setLoading(false);
      loading = false;
      showSuccessMessage(data.message);
      navigate("/");
    } catch (error) {
      showErrorMessage(error.message, " only google authenticated");
      if (error.message) {
        navigate("/auth/login");
      }
    }
  };

  loginWithGoogle();
  //   }, [googleQuery, navigate]);

  return <div className="w-screen flex justify-center items-center h-screen"> <PropagateLoader color="#5157E0" /></div>
};

export default GoogleWelcome;
