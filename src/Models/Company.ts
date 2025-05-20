import type { AppUserPublicDataDto } from "./User";

export type CompanyDto = {
  userName: string;
  selfDescription: string;
  location: string;
  registerDate: Date;
  appUserId: string;
};

export type CompanyFullDataDto = {
  appUserPublicData: AppUserPublicDataDto;
  companyData: CompanyDto;
};
