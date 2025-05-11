import axios from "axios";
import config from "../config";
import type { LoginUser, RegisterUser, UserProfileToken } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";

export const registerAPI = async (props: RegisterUser) => {
  try {
    const data = await axios.post<UserProfileToken>(
      config.API_BASE_URL + "auth/register",
      props
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginAPI = async (props: LoginUser) => {
  try {
    const data = await axios.post<UserProfileToken>(
      config.API_BASE_URL + "auth/login",
      props
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
