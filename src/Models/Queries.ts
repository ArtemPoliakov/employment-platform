import type { WorkMode } from "./Vacancy";

export type VacancyQuery = {
  page: number; // Validation: 1 <= page
  pageSize: number; // Validation: 1 <= pageSize <= 100
  position?: string | undefined; // Validation: 1 <= position.length <= 100
  minSalary?: number | undefined; // Validation: 1 <= minSalary <= 100_000_000_000
  maxSalary?: number | undefined; // Validation: 1 <= maxSalary <= 100_000_000_000
  workMode?: WorkMode | undefined;
  generalDescription?: string; // Validation: 1 <= generalDescription.length <= 300
};

export type Pagination = {
  page: number;
  pageSize: number;
};
