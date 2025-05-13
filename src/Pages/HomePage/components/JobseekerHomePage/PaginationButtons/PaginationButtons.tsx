import React, { useState } from "react";
import type { VacancyQuery } from "../../../../../Models/Queries";
import { set } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./pagination_buttons_styles.module.css";
import clsx from "clsx";

type Props = {
  query: VacancyQuery;
  setQueryState: React.Dispatch<React.SetStateAction<VacancyQuery>>;
};

const PaginationButtons = (props: Props) => {
  const onClickPrev = () => {
    if (props.query.page > 1) {
      props.setQueryState((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };
  const onClickNext = () => {
    if (props.query.page < 100) {
      props.setQueryState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className={classes["pagination-buttons__container"]}>
      <FontAwesomeIcon
        className={clsx(
          classes["pagination-buttons__button"],
          props.query.page > 1
            ? classes["pagination-buttons__button--active"]
            : classes["pagination-buttons__button--incative"]
        )}
        icon={faAngleLeft}
        onClick={onClickPrev}
      />
      <span>{props.query.page}</span>
      <FontAwesomeIcon
        className={
          (classes["pagination-buttons__button"],
          props.query.page < 100
            ? classes["pagination-buttons__button--active"]
            : classes["pagination-buttons__button--incative"])
        }
        icon={faAngleRight}
        onClick={onClickNext}
      />
    </div>
  );
};

export default PaginationButtons;
