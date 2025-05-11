import axios from "axios";
import type { CompanyDto } from "../Models/Company";
import config from "../config";
import { handleError } from "../Helpers/ErrorHandler";

export const createDefaultCompanyAPI = async () => {
  const defaultCompany = {
    SelfDescription: "none",
    Location: "none",
  };
  try {
    const response = await axios.post<CompanyDto>(
      config.API_BASE_URL + "company/create",
      defaultCompany
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};
