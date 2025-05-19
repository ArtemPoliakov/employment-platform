export type RegisterUser = {
  userName: string;
  email: string;
  phoneNumber: string;
  safeRole: "JOBSEEKER" | "COMPANY";
  password: string;
};

export type LoginUser = {
  userName: string;
  password: string;
};

export type UserProfileToken = {
  userName: string;
  email: string;
  phoneNumber: string;
  role: "JOBSEEKER" | "COMPANY";
  accountDataId: string;
  token: string;
};

export type UserProfile = {
  userName: string;
  email: string;
  phoneNumber: string;
  role: "JOBSEEKER" | "COMPANY";
  accountDataId: string;
};

export type AppUserPublicDataDto = {
  userName: string;
  email: string;
  phoneNumber: string;
  role: string;
  id: string;
};
