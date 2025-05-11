export type CreateCompanyDto = {
  SelfDescription: string;
  Location: string;
};

export type CompanyDto = {
  userName: string;
  selfDescription: string;
  location: string;
  registerDate: Date;
  appUserId: string;
};
