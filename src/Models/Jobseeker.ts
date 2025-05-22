import type { AppUserPublicDataDto } from "./User";

export type JobseekerDto = {
  userName: string;
  profession: string;
  experience: number;
  education: string;
  location: string;
  previousWorkplace: string;
  previousPosition: string;
  quitReason: string;
  familyConditions: string;
  livingConditions: string;
  preferences: string;
  selfDescription: string;
  isEmployed: boolean;
  registerDate: Date;
};

export type JobseekerFullPublicDataDto = {
  appUserPublicData: AppUserPublicDataDto;
  jobseekerData: JobseekerDto;
};

export type JobseekerEditDto = {
  profession: string;
  experience: number;
  education: DegreeType;
  location: string;
  previousWorkplace: string;
  previousPosition: string;
  quitReason: string;
  familyConditions: string;
  livingConditions: string;
  preferences: string;
  selfDescription: string;
  isEmployed: boolean;
};

export const degreeTypesArray = [
  "NONE",
  "PRIMARY",
  "SECONDARY",
  "HIGH_SCHOOL",
  "ASSOCIATE",
  "BACHELOR",
  "MASTER",
  "DOCTORATE",
  "PROFESSIONAL",
  "VOCATIONAL",
  "OTHER",
] as const;

export type DegreeType = (typeof degreeTypesArray)[number];

/* export type DegreeType =
  | "NONE"
  | "PRIMARY"
  | "SECONDARY"
  | "HIGH_SCHOOL"
  | "ASSOCIATE"
  | "BACHELOR"
  | "MASTER"
  | "DOCTORATE"
  | "PROFESSIONAL"
  | "VOCATIONAL"
  | "OTHER";
 */
