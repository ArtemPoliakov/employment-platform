import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import reusableClasses from "../../../../../global_styles/reusable.module.css";
type Props = { type: "DETAILED" | "APPLY"; vacancyId: string };

const VacancyCardButton = (props: Props) => {
  const navigate = useNavigate();
  const detailedOnClick = () => {
    navigate("/vacancy/" + props.vacancyId);
  };
  const applyOnClick = () => {
    toast.success("Applying (mock)");
  };

  if (props.type === "DETAILED") {
    return (
      <button className={reusableClasses["btn"]} onClick={detailedOnClick}>
        Detailed
      </button>
    );
  } else if (props.type === "APPLY") {
    return (
      <button className={reusableClasses["btn"]} onClick={applyOnClick}>
        Apply
      </button>
    );
  } else {
    return <div>Unknown button</div>;
  }
};
export default VacancyCardButton;
