import axios from "axios";
import config from "../config";
import type { CompanyFullDataDto } from "../Models/Company";
import { handleError } from "../Helpers/ErrorHandler";

export const getCompanyFullDataAPI = async (userName: string) => {
  try {
    const data = await axios
      .get<CompanyFullDataDto>(
        config.API_BASE_URL + `company/getAllData/${userName}`
      )
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
