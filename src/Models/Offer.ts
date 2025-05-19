import type { VacancyCompactDto } from "./Vacancy";

export type OfferStatus =
  | "PENDING"
  | "REJECTED"
  | "ACCEPTED"
  | "NONE"
  | undefined;

export type OfferWithVacancyDto = {
  vacancyCompactDto: VacancyCompactDto;
  jobseekerId: string;
  vacancyId: string;
  status: OfferStatus;
  companyMessage: string;
  jobseekerResponse: string;
  creationDate: Date;
};
