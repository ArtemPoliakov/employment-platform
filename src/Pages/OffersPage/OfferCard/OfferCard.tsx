import type { OfferWithVacancyDto } from "../../../Models/Offer";
import classes from "./offer_card_styles.module.css";

import React from "react";
import OfferCardButtons from "./OfferCardButtons/OfferCardButtons";

type Props = { offer: OfferWithVacancyDto };

const OfferCard = (props: Props) => {
  const { offer } = props;
  return (
    <div className={classes["offer-card"]}>
      <p className={classes["card__title"]}>{offer.vacancyCompactDto.title}</p>
      <p className={classes["card__position"]}>
        {`Position: ${offer.vacancyCompactDto.position} (${offer.vacancyCompactDto.workMode})`}
      </p>
      <p className={classes["card__company-message"]}>
        <div>
          <i>Message:</i>
        </div>
        {`“${offer.companyMessage}”`}
      </p>
      <p className={classes["card__created-date"]}>
        Created on: {offer.creationDate.toString().split("T")[0]}
      </p>
      <p className={classes["card__company-name"]}>
        {offer.vacancyCompactDto.companyUserName}
      </p>
      <div className={classes["card__button-container"]}>
        <OfferCardButtons offer={offer} />
      </div>
    </div>
  );
};

export default OfferCard;
