export type WorkMode = "REMOTE" | "OFFICE" | "OTHER";

export type VacancyCompactDto = {
  companyUserName: string;
  title: string;
  description: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  workMode: WorkMode;
  id: string;
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
};
