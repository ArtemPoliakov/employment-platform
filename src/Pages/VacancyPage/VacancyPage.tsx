import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const VacancyPage = (props: Props) => {
  const { vacancyId } = useParams();
  return <div>VacancyPage {vacancyId}</div>;
};

export default VacancyPage;
