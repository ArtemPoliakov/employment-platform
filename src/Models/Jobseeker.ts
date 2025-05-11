export type CreateJobseekerDto = {
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

export type DegreeType =
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
