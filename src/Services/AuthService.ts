import axios from "axios";
import config from "../config";
import type {
  ChangePassword,
  EditUser,
  LoginUser,
  RegisterUser,
  UserProfileToken,
} from "../Models/User";
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

export const editUserAPI = async (props: EditUser) => {
  try {
    const data = await axios
      .put<UserProfileToken>(config.API_BASE_URL + "auth/edit", props)
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const changePasswordAPI = async (props: ChangePassword) => {
  try {
    const data = await axios
      .put<UserProfileToken>(config.API_BASE_URL + "auth/changePassword", props)
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
