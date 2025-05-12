import React from "react";
import { Link } from "react-router-dom";
import classes from "./../styles/home_styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTableList, faU } from "@fortawesome/free-solid-svg-icons";
import { faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
const JobseekerNavbar = () => {
  return (
    <nav className={classes["home__navbar"]}>
      <ul className={classes["home__navbar-link-list"]}>
        <li className={classes["home__navbar-link-li"]}>
          <Link to="/" className={classes["home__navbar-link"]}>
            <FontAwesomeIcon icon={faHouse} size="2x" />
            Home
          </Link>
        </li>
        <li className={classes["home__navbar-link-li"]}>
          <Link to="/" className={classes["home__navbar-link"]}>
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
