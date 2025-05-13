import React from "react";
import type { VacancyCompactDto } from "../../../../../Models/Vacancy";
import classes from "./vacancy_search_result_card.module.css";
import VacancyCardButton from "./VacancyCardButton";

/*export type VacancyCompactDto = {
  companyUserName: string;
  title: string;
  description: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  workMode: string;
  id: string;
}; */

const VacancySearchResultCard = (vacancy: VacancyCompactDto) => {
  return (
    <div className={classes["vacancy-search-result-card"]}>
      <p className={classes["card__title"]}>{vacancy.title}</p>
      <p className={classes["card__position"]}>Position: {vacancy.position}</p>
      <p className={classes["card__work-mode"]}>
        Work mode: {vacancy.workMode}
      </p>
      <p className={classes["card__company-name"]}>{vacancy.companyUserName}</p>
      <div className={classes["card__button-container"]}>
        <VacancyCardButton type="DETAILED" vacancyId={vacancy.id} />
        <VacancyCardButton type="APPLY" vacancyId={vacancy.id} />
      </div>
    </div>
  );
};

export default VacancySearchResultCard;
