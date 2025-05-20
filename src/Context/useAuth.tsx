import React, { createContext, useEffect, useState } from "react";
import type {
  ChangePassword,
  EditUser,
  LoginUser,
  RegisterUser,
  UserProfile,
} from "../Models/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  changePasswordAPI,
  editUserAPI,
  loginAPI,
  registerAPI,
} from "../Services/AuthService";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (props: RegisterUser) => void;
  loginUser: (props: LoginUser) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  editUser: (props: EditUser) => Promise<boolean>;
  changePassword: (props: ChangePassword) => Promise<boolean>;
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
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res?.data.token;
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
          role: res.data.role,
          phoneNumber: res.data.phoneNumber,
          accountDataId: res.data.accountDataId,
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
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res?.data.token;
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
            phoneNumber: res?.data.phoneNumber,
            accountDataId: res?.data.accountDataId,
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
    navigate("/");
  };

  const editUser = async (props: EditUser): Promise<boolean> => {
    const newUserData = await editUserAPI(props);
    if (newUserData) {
      const userObj = {
        userName: newUserData.userName,
        email: newUserData.email,
        role: newUserData.role,
        phoneNumber: newUserData.phoneNumber,
        accountDataId: newUserData.accountDataId,
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj!);

      localStorage.setItem("token", newUserData.token);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + newUserData?.token;
      setToken(newUserData?.token!);

      toast.success("Edit Success!");
      return true;
    }
    return false;
  };

  const changePassword = async (props: ChangePassword): Promise<boolean> => {
    const res = await changePasswordAPI(props);
    if (res) {
      localStorage.setItem("token", res.token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + res?.token;
      setToken(res?.token!);
      toast.success("Password changed successfully");
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        registerUser,
        editUser,
        changePassword,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
