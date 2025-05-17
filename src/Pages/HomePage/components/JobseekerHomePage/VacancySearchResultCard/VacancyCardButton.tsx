import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import reusableClasses from "../../../../../global_styles/reusable.module.css";
import ManageApplyVacancyButton from "./ManageApplyOrCancelButton";
type Props = { type: "DETAILED" | "APPLY"; vacancyId: string };

const VacancyCardButton = (props: Props) => {
  const navigate = useNavigate();
  const detailedOnClick = () => {
    navigate(`/vacancy/${props.vacancyId}/${"jobseekerViewApply"}`);
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
      <ManageApplyVacancyButton
        size="1rem"
        vacancyId={props.vacancyId}
        applicationStatus={undefined}
        queryKeys={["vacancies"]}
      />
    );
  } else {
    return <div>Unknown button</div>;
  }
};
export default VacancyCardButton;
