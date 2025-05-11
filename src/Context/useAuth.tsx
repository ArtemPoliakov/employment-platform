import React, { createContext, useEffect, useState } from "react";
import type { LoginUser, RegisterUser, UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (props: RegisterUser) => void;
  loginUser: (props: LoginUser) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (props: RegisterUser) => {
    try {
      const res = await registerAPI(props);

      if (res) {
        localStorage.setItem("token", res.data.token);
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
          role: res.data.role,
          phoneNumber: res.data.phoneNumber,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res.data.token);
        setUser(userObj);
        toast.success("Register Success!");
        navigate("/");
      }
    } catch (e) {
      toast.warning("Server error occurred during registration");
    }
  };

  const loginUser = async (props: LoginUser) => {
    await loginAPI(props)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
            phoneNumber: res?.data.phoneNumber,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/"); // consider later
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
