import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/useAuth";
import { decodeJwt } from "../../../Helpers/JwtDecoder";
import JobseekerHomePage from "./JobseekerHomePage/JobseekerHomePage";
import CompanyHomePage from "./CompanyHomePage";
import classes from "./../styles/home_styles.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  }, []);

  const tokenData = decodeJwt(localStorage.getItem("token") || "");

  if (tokenData?.role === "JOBSEEKER") {
    return <JobseekerHomePage />;
  } else if (tokenData?.role === "COMPANY") {
    return <CompanyHomePage />;
  } else {
    return <div>UNAUTHORIZED</div>;
  }
};

export default HomePage;
