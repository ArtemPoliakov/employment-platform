import classes from "./jobseeker_data_edit_form_styles.module.css";
import reusableClasses from "./../../../global_styles/reusable.module.css";
import formClasses from "./../../../global_styles/reusable_form_styles.module.css";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  degreeTypesArray,
  type DegreeType,
  type JobseekerDto,
  type JobseekerEditDto,
} from "../../../Models/Jobseeker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserAPI } from "../../../Services/AuthService";
import { editJobseekerAPI } from "../../../Services/JobseekerService";
import { useDialogContext } from "../../../Context/DialogWindowContext";
import clsx from "clsx";

type Props = { jobseeker: JobseekerDto };

const validation = Yup.object().shape({
  profession: Yup.string()
    .required("Profession is required")
    .min(3, "Profession must be at least 3 characters")
    .max(40, "Profession cannot exceed 40 characters"),

  experience: Yup.number()
    .required("Experience is required")
    .min(0, "Experience cannot be less than 0")
    .max(100, "Experience cannot exceed 100"),

  education: Yup.mixed<DegreeType>().required("Education is required"),

  location: Yup.string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters")
    .max(60, "Location cannot exceed 60 characters"),

  previousWorkplace: Yup.string()
    .required("Previous Workplace is required")
    .min(3, "Previous Workplace must be at least 3 characters")
    .max(100, "Previous Workplace cannot exceed 100 characters"),

  previousPosition: Yup.string()
    .required("Previous Position is required")
    .min(3, "Previous Position must be at least 3 characters")
    .max(60, "Previous Position cannot exceed 60 characters"),

  quitReason: Yup.string()
    .required("Quit Reason is required")
    .min(3, "Quit Reason must be at least 3 characters")
    .max(200, "Quit Reason cannot exceed 200 characters"),

  familyConditions: Yup.string()
    .required("Family Conditions is required")
    .min(3, "Family Conditions must be at least 3 characters")
    .max(100, "Family Conditions cannot exceed 100 characters"),

  livingConditions: Yup.string()
    .required("Living Conditions is required")
    .min(3, "Living Conditions must be at least 3 characters")
    .max(200, "Living Conditions cannot exceed 200 characters"),

  preferences: Yup.string()
    .required("Preferences is required")
    .min(3, "Preferences must be at least 3 characters")
    .max(300, "Preferences cannot exceed 300 characters"),

  selfDescription: Yup.string()
    .required("Self Description is required")
    .min(3, "Self Description must be at least 3 characters")
    .max(600, "Self Description cannot exceed 600 characters"),

  isEmployed: Yup.boolean().required("Is Employed is required"),
});

const JobseekerDataEditForm = (props: Props) => {
  const { jobseeker } = props;
  const { onSubmit } = useDialogContext();
  const [showEmployedTick, setShowEmployedTick] = useState(
    jobseeker.isEmployed
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobseekerEditDto>({
    resolver: yupResolver(validation),
    defaultValues: {
      profession: jobseeker.profession,
      experience: jobseeker.experience,
      education: jobseeker.education as DegreeType,
      location: jobseeker.location,
      previousWorkplace: jobseeker.previousWorkplace,
      previousPosition: jobseeker.previousPosition,
      quitReason: jobseeker.quitReason,
      familyConditions: jobseeker.familyConditions,
      livingConditions: jobseeker.livingConditions,
      preferences: jobseeker.preferences,
      selfDescription: jobseeker.selfDescription,
      isEmployed: jobseeker.isEmployed,
    },
  });

  const handleEditJobseeker = async (form: JobseekerEditDto) => {
    await editJobseekerAPI(form);
    onSubmit();
  };

  return (
    <section className={formClasses["form-container"]}>
      <h1 className={formClasses["form__heading"]}>Edit your info</h1>
      <form
        onSubmit={handleSubmit(handleEditJobseeker)}
        className={formClasses["form"]}
      >
        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="profession"
            className={formClasses["form__input-label"]}
          >
            Profession
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="profession"
            placeholder="profession"
            {...register("profession")}
          />
          {errors.profession ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.profession.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="experience"
            className={formClasses["form__input-label"]}
          >
            Experience
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="number"
            id="experience"
            placeholder="experience"
            {...register("experience")}
          />
          {errors.experience ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.experience.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="education"
            className={formClasses["form__input-label"]}
          >
            Education
          </label>
          <select
            className={reusableClasses["input-field"]}
            id="education"
            {...register("education")}
          >
            {degreeTypesArray.map((degreeType) => (
              <option value={degreeType}>
                {degreeType.toLowerCase().replace("_", " ")}
              </option>
            ))}
          </select>
          {errors.education ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.education.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="location"
            className={formClasses["form__input-label"]}
          >
            Location
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="location"
            placeholder="location"
            {...register("location")}
          />
          {errors.location ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.location.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="previousWorkplace"
            className={formClasses["form__input-label"]}
          >
            Previous workplace
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="previousWorkplace"
            placeholder="previousWorkplace"
            {...register("previousWorkplace")}
          />
          {errors.previousWorkplace ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.previousWorkplace.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="previousPosition"
            className={formClasses["form__input-label"]}
          >
            Previous position
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="previousPosition"
            placeholder="previousPosition"
            {...register("previousPosition")}
          />
          {errors.previousPosition ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.previousPosition.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="quitReason"
            className={formClasses["form__input-label"]}
          >
            Quit reason
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="quitReason"
            placeholder="quitReason"
            {...register("quitReason")}
          />
          {errors.quitReason ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.quitReason.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="familyConditions"
            className={formClasses["form__input-label"]}
          >
            Family conditions
          </label>
          <textarea
            className={reusableClasses["dynamic-textarea-field"]}
            id="familyConditions"
            placeholder="familyConditions"
            rows={3}
            {...register("familyConditions")}
          />
          {errors.familyConditions ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.familyConditions.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="livingConditions"
            className={formClasses["form__input-label"]}
          >
            Living conditions
          </label>
          <textarea
            className={reusableClasses["dynamic-textarea-field"]}
            id="livingConditions"
            placeholder="livingConditions"
            rows={3}
            {...register("livingConditions")}
          />
          {errors.livingConditions ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.livingConditions.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="preferences"
            className={formClasses["form__input-label"]}
          >
            Preferences
          </label>
          <textarea
            className={reusableClasses["dynamic-textarea-field"]}
            id="preferences"
            placeholder="preferences"
            rows={4}
            {...register("preferences")}
          />
          {errors.preferences ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.preferences.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className={formClasses["form__input-block"]}>
          <label
            htmlFor="selfDescription"
            className={formClasses["form__input-label"]}
          >
            Self description
          </label>
          <textarea
            className={reusableClasses["dynamic-textarea-field"]}
            id="selfDescription"
            placeholder="selfDescription"
            rows={6}
            {...register("selfDescription")}
          />
          {errors.selfDescription ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.selfDescription.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <div
          className={clsx(
            formClasses["form__input-block"],
            classes["checkbox-container"]
          )}
        >
          <label
            htmlFor="isEmployed"
            className={formClasses["form__input-label"]}
          >
            Is employed
          </label>
          <div className={classes["checkbox-wrapper"]}>
            <input
              onClick={() => setShowEmployedTick((prev) => !prev)}
              className={classes["jobseeker-data-edit-form__checkbox"]}
              type="checkbox"
              id="isEmployed"
              placeholder="isEmployed"
              {...register("isEmployed")}
            />
            <span
              className={classes["checkmark"]}
              style={{ display: showEmployedTick ? "block" : "none" }}
            >
              &#10004;
            </span>
          </div>
          {errors.isEmployed ? (
            <p className={formClasses["form__format-warning-text"]}>
              {errors.isEmployed.message}
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          className={clsx(reusableClasses["btn"], classes["submit-btn"])}
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default JobseekerDataEditForm;
