export type WorkMode = "REMOTE" | "OFFICE" | "OTHER" | "NONE";

export type VacancyCompactDto = {
  companyUserName: string;
  title: string;
  description: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  workMode: WorkMode;
  id: string;
  applicationStatus: string;
  offerStatus: string;
};

export type VacancyDto = {
  companyUserName: string;
  id: string;
  title: string;
  description: string;
  candidateDescription: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  workMode: WorkMode;
  livingConditions: string;
  editDate: Date;
  publishDate: Date;
  applicationStatus: string;
  offerStatus: string;
};
