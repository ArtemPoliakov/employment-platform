import axios from "axios";
import type {
  JobseekerDto,
  JobseekerEditDto,
  JobseekerFullPublicDataDto,
} from "../Models/Jobseeker";
import config from "../config";
import { handleError } from "../Helpers/ErrorHandler";

export const getAllJobseekerPublicDataAPI = async (username: string) => {
  try {
    const data = await axios
      .get<JobseekerFullPublicDataDto>(
        config.API_BASE_URL + `jobseeker/getAllData/${username}`
      )
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const editJobseekerAPI = async (props: JobseekerEditDto) => {
  try {
    const data = await axios
      .put<JobseekerDto>(config.API_BASE_URL + "jobseeker/edit", props)
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
