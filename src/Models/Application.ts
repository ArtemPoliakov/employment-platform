import type { VacancyCompactDto } from "./Vacancy";

export type ApplicationStatus =
  | "PENDING"
  | "REJECTED"
  | "ACCEPTED"
  | "NONE"
  | undefined;

export type ApplicationWithVacancyDto = {
  vacancyCompactDto: VacancyCompactDto;
  jobseekerId: string;
  vacancyId: string;
  status: ApplicationStatus;
  companyResponse: string;
  creationDate: Date;
};
