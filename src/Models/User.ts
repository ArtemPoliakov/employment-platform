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
  token: string;
};

export type UserProfile = {
  userName: string;
  email: string;
  phoneNumber: string;
  role: "JOBSEEKER" | "COMPANY";
};
