import React from "react";
import type { VacancyQuery } from "../../../../../Models/Queries";
import classes from "./search_vacancies_form.module.css";
import clsx from "clsx";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { WorkMode } from "../../../../../Models/Vacancy";
import type { InferType } from "yup";
import reusableClasses from "./../../../../../global_styles/reusable.module.css";
type Props = {
  setQueryState: React.Dispatch<React.SetStateAction<VacancyQuery>>;
};
// BUGS !!!!!!
const validation = Yup.object().shape({
  position: Yup.string()
    .notRequired()
    .default("")
    .max(100, "Position cannot exceed 100 characters"),

  minSalary: Yup.number()
    .notRequired()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : Number(originalValue)
    )
    .default(1)
    .min(1, "Minimum salary must be at least 1")
    .max(100_000_000_000, "Minimum salary cannot exceed 100,000,000,000"),

  maxSalary: Yup.number()
    .notRequired()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : Number(originalValue)
    )
    .default(100_000_000_000)
    .min(1, "Maximum salary must be at least 1")
    .max(100_000_000_000, "Maximum salary cannot exceed 100,000,000,000"),

  workMode: Yup.mixed<WorkMode>()
    .notRequired()
    .default("NONE")
    .oneOf(["REMOTE", "OFFICE", "OTHER", "NONE"], "Invalid work mode"),

  generalDescription: Yup.string()
    .notRequired()
    .default("")
    .max(300, "General description cannot exceed 300 characters"),
});
type QueryFormInputs = Yup.InferType<typeof validation>;

const SearchVacanciesForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof validation>>({
    resolver: yupResolver(validation),
  });

  const handleSubmitQuery = (form: QueryFormInputs) => {
    const query = {
      position: form.position?.trim() ?? undefined,
      minSalary: form.minSalary ?? undefined,
      maxSalary: form.maxSalary ?? undefined,
      workMode: form.workMode ?? undefined,
      generalDescription: form.generalDescription?.trim() ?? undefined,
    };
    props.setQueryState((prev) => ({ ...prev, ...query }));
  };

  return (
    <section className={classes["form__container"]}>
      <h2 className={classes["form__heading"]}>Search vacancies</h2>
      <form
        onSubmit={handleSubmit(handleSubmitQuery)}
        className={classes["form"]}
      >
        <div className={classes["form__input-block"]}>
          <label htmlFor="position" className={classes["form__input-label"]}>
            Position
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="position"
            placeholder="Position"
            {...register("position")}
          />
          {errors.position ? (
            <p className={classes["form__format-warning-text"]}>
              {errors.position.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={classes["form__input-block"]}>
          <label htmlFor="minSalary" className={classes["form__input-label"]}>
            Min salary
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="number"
            id="minSalary"
            placeholder="Min salary"
            {...register("minSalary")}
          />
          {errors.minSalary ? (
            <p className={classes["form__format-warning-text"]}>
              {errors.minSalary.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={classes["form__input-block"]}>
          <label htmlFor="maxSalary" className={classes["form__input-label"]}>
            Max salary
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="number"
            id="maxSalary"
            placeholder="Max salary"
            {...register("maxSalary")}
          />
          {errors.maxSalary ? (
            <p className={classes["form__format-warning-text"]}>
              {errors.maxSalary.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={classes["form__input-block"]}>
          <label htmlFor="workMode" className={classes["form__input-label"]}>
            Work mode
          </label>
          <select
            id="workMode"
            className={reusableClasses["input-field"]}
            {...register("workMode")}
          >
            <option value="NONE"></option>
            <option value="OFFICE">Office</option>
            <option value="REMOTE">Remote</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.workMode ? (
            <p className={classes["form__format-warning-text"]}>
              {errors.workMode.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={classes["form__input-block"]}>
          <label htmlFor="description" className={classes["form__input-label"]}>
            Description
          </label>
          <textarea
            className={reusableClasses["dynamic-textarea-field"]}
            id="description"
            placeholder="Description"
            rows={5}
            {...register("generalDescription")}
          />
          {errors.generalDescription ? (
            <p className={classes["form__format-warning-text"]}>
              {errors.generalDescription.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          className={clsx(reusableClasses["btn"], classes["form__btn"])}
          type="submit"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchVacanciesForm;
