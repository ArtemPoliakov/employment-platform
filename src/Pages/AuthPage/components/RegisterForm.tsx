import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import type { LoginUser, RegisterUser } from "../../../Models/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../Context/useAuth";
import classes from "./../styles/auth_styles.module.css";
import reusableClasses from "./../../../global_styles/reusable.module.css";
import clsx from "clsx";

const validation = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required")
    .min(3, "Username should be at least 3 characters long"),

  email: Yup.string().required("Email is required").email("Invalid email"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+\d{10,15}$/, "Invalid phone number"),

  safeRole: Yup.string()
    .oneOf(["JOBSEEKER", "COMPANY"])
    .required("Role is required"),

  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

const RegisterForm = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({ resolver: yupResolver(validation) });

  const handleRegister = (form: RegisterUser) => {
    registerUser(form);
  };

  return (
    <section className={classes["auth__form-container"]}>
      <h1 className={classes["auth__heading"]}>Register an account</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className={classes["auth__form"]}
      >
        <div className={classes["auth__input-block"]}>
          <label htmlFor="username" className={classes["auth__input-label"]}>
            Username
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="username"
            placeholder="Username"
            {...register("userName")}
          />
          {errors.userName ? (
            <p className={classes["auth__format-warning-text"]}>
              {errors.userName.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={classes["auth__input-block"]}>
          <label htmlFor="email" className={classes["auth__input-label"]}>
            Email
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors.email ? (
            <p className={classes["auth__format-warning-text"]}>
              {errors.email.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={classes["auth__input-block"]}>
          <label htmlFor="phoneNumber" className={classes["auth__input-label"]}>
            Phone Number
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="text"
            id="phoneNumber"
            placeholder="+xxxxxxxxxxxx"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber ? (
            <p className={classes["auth__format-warning-text"]}>
              {errors.phoneNumber.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={classes["auth__input-block"]}>
          <label htmlFor="role" className={classes["auth__input-label"]}>
            Role
          </label>
          <select
            id="role"
            className={reusableClasses["input-field"]}
            {...register("safeRole")}
          >
            <option value="JOBSEEKER">Jobseeker</option>
            <option value="COMPANY">Company</option>
          </select>
          {errors.safeRole ? (
            <p className={classes["auth__format-warning-text"]}>
              {errors.safeRole.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={classes["auth__input-block"]}>
          <label htmlFor="password" className={classes["auth__input-label"]}>
            Password
          </label>
          <input
            className={reusableClasses["input-field"]}
            type="password"
            id="password"
            placeholder="●●●●●●●●●●●●"
            {...register("password")}
          />
          {errors.password ? (
            <p className={classes["auth__format-warning-text"]}>
              {errors.password.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          className={clsx(reusableClasses["btn"], classes["auth__btn"])}
          type="submit"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
