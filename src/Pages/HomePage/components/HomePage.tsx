import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
