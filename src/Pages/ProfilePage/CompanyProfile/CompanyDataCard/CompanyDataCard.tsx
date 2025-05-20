import type { CompanyDto } from "../../../../Models/Company";
import classes from "./company_data_card_styles.module.css";

import React from "react";

type Props = { company: CompanyDto; viewMode: string; queryKey: string };

const CompanyDataCard = (props: Props) => {
  const { company, viewMode, queryKey } = props;
  return (
    <div className={classes["company-data-card"]}>
      <div className={classes["company-data-card__data"]}>
        <p className={classes["company-data-card__info-item"]}>
          <b>Location:</b> {company.location}
        </p>
        <p className={classes["company-data-card__info-item"]}>
          <b>Self-description:</b> {company.selfDescription}
        </p>
        <p className={classes["company-data-card__info-item"]}>
          <b>Register date:</b> {company.registerDate.toString().split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default CompanyDataCard;
