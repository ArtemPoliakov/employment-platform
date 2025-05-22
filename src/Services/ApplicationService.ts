/**{
  "jobseekerUsername": "string",
  "vacancyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
} */

import axios from "axios";
import config from "../config";
import { handleError } from "../Helpers/ErrorHandler";
import type { ApplicationWithVacancyDto } from "../Models/Application";

export const applyToVacancyAPI = async (
  vacancyId: string,
  jobseekerUsername: string
) => {
  try {
    const data = await axios.post<string>(
      config.API_BASE_URL + "jobApplication/create",
      {
        vacancyId: vacancyId,
        jobseekerUsername: jobseekerUsername,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteApplicationAPI = async (
  vacancyId: string,
  jobseekerId: string
) => {
  try {
    const data = await axios.delete<string>(
      config.API_BASE_URL + `jobApplication/delete`,
      { params: { vacancyId: vacancyId, jobseekerId: jobseekerId } }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getApplicationsForJobseekerAPI = async (
  jobseekerUsername: string,
  page: number,
  pageSize: number
) => {
  try {
    const data = await axios
      .get<
        ApplicationWithVacancyDto[]
      >(config.API_BASE_URL + `jobApplication/getAllByJobseekerUserName`, { params: { jobseekerUsername, page, pageSize } })
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
