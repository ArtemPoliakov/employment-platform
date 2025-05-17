import axios from "axios";
import type { Pagination, VacancyQuery } from "../Models/Queries";
import type { VacancyCompactDto, VacancyDto } from "../Models/Vacancy";
import config from "../config";
import { handleError } from "../Helpers/ErrorHandler";

export const getRecentVacanciesAPI = async (props: Pagination) => {
  try {
    const data = await axios.get<VacancyCompactDto[]>(
      config.API_BASE_URL + "vacancy/getRecent",
      {
        params: {
          ...props,
        },
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const searchVacanciesByQueryAPI = async (props: VacancyQuery) => {
  try {
    const data = await axios.get<VacancyCompactDto[]>(
      config.API_BASE_URL + "vacancy/search",
      {
        params: {
          ...props,
        },
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getVacancyByIdAPI = async (id: string) => {
  try {
    const data = await axios.get<VacancyDto>(
      config.API_BASE_URL + "vacancy/getWithStatus/" + id
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
