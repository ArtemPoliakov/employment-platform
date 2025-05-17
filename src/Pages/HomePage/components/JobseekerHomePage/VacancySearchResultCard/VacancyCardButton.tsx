import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import reusableClasses from "../../../../../global_styles/reusable.module.css";
import ManageApplyVacancyButton from "./ManageApplyOrCancelButton/ManageApplyOrCancelButton";
import type { VacancyCompactDto } from "../../../../../Models/Vacancy";
import type { ApplicationStatus } from "../../../../../Models/Application";
type Props = { type: "DETAILED" | "APPLY"; vacancyCompact: VacancyCompactDto };

const VacancyCardButton = (props: Props) => {
  const navigate = useNavigate();
  const detailedOnClick = () => {
    navigate(`/vacancy/${props.vacancyCompact.id}/${"jobseekerViewApply"}`);
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
        vacancyId={props.vacancyCompact.id}
        applicationStatus={
          props.vacancyCompact.applicationStatus as ApplicationStatus
        }
        queryKeys={["vacancies"]}
      />
    );
  } else {
    return <div>Unknown button</div>;
  }
};
export default VacancyCardButton;
