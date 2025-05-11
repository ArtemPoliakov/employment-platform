import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import classes from "./../styles/auth_styles.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className={classes["auth__page-container"]}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <p onClick={toggleForm} className={classes["auth__toggle-form"]}>
        {isLogin
          ? "Need an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default AuthPage;
