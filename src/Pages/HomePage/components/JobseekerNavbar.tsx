import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./../styles/home_styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHouse,
  faTableList,
  faU,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import clsx from "clsx";
const JobseekerNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    if (window.history.length > 1 && location.pathname !== "/") navigate(-1);
  };
  return (
    <nav className={classes["home__navbar"]}>
      <ul className={classes["home__navbar-link-list"]}>
        <li
          className={
            (clsx(classes["home__navbar-link-li"]),
            classes["navbar-arrow-back"])
          }
        >
          <div
            className={
              (classes["home__navbar-link"],
              location.pathname == "/"
                ? classes["home__navbar-link-li--inactive"]
                : classes["home__navbar-link-li--active"])
            }
            onClick={handleBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </div>
        </li>
        <li className={classes["home__navbar-link-li"]}>
          <Link to="/" className={classes["home__navbar-link"]}>
            <FontAwesomeIcon icon={faHouse} size="2x" />
            Home
          </Link>
        </li>
        <li className={classes["home__navbar-link-li"]}>
          <Link to="/applications" className={classes["home__navbar-link"]}>
            <FontAwesomeIcon icon={faTableList} size="2x" />
            Applications
          </Link>
        </li>
        <li className={classes["home__navbar-link-li"]}>
          <Link to="/" className={classes["home__navbar-link"]}>
            <FontAwesomeIcon icon={faMessage} size="2x" />
            Offers
          </Link>
        </li>
        <li className={classes["home__navbar-link-li"]}>
          <Link to="/" className={classes["home__navbar-link"]}>
            <FontAwesomeIcon icon={faUser} size="2x" />
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default JobseekerNavbar;
