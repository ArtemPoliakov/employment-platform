import axios from "axios";
import config from "../config";
import { handleError } from "../Helpers/ErrorHandler";
import type {
  CreateJobseekerDto,
  DegreeType,
  JobseekerDto,
} from "../Models/Jobseeker";

export const createDefaultJobseekerAPI = async () => {
  const defaultJobseeker: CreateJobseekerDto = {
    profession: "none",
    experience: 0,
    education: "NONE" as DegreeType,
    location: "none",
    previousWorkplace: "none",
    previousPosition: "none",
    quitReason: "none",
    familyConditions: "none",
    livingConditions: "none",
    preferences: "none",
    selfDescription: "none",
    isEmployed: false,
  };
  try {
    const response = await axios.post<JobseekerDto>(
      config.API_BASE_URL + "jobseeker/create",
      defaultJobseeker
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};
