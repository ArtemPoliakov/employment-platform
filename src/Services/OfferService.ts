import axios from "axios";
import type { OfferStatus, OfferWithVacancyDto } from "../Models/Offer";
import config from "../config";
import { handleError } from "../Helpers/ErrorHandler";

export const setJobseekerReactionToOfferAPI = async (
  jobseekerId: string,
  vacancyId: string,
  status: OfferStatus,
  jobseekerResponse: string
) => {
  try {
    const data = await axios
      .put<string>(config.API_BASE_URL + `offer/setJobseekerReaction`, {
        jobseekerId,
        vacancyId,
        status,
        jobseekerResponse,
      })
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getOffersForJobseekerAPI = async (
  jobseekerUsername: string,
  page: number,
  pageSize: number
) => {
  try {
    const data = await axios
      .get<
        OfferWithVacancyDto[]
      >(config.API_BASE_URL + `offer/getAllByJobseekerUserName`, { params: { jobseekerUsername, page, pageSize } })
      .then((res) => res.data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
