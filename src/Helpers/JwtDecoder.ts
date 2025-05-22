import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role?: string;
}

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};
