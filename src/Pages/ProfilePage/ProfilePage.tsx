import { useParams } from "react-router-dom";
import classes from "./profile_page_styles.module.css";

import React from "react";
import CompanyProfile from "./CompanyProfile/CompanyProfile";
import JobseekerProfile from "./JobseekerProfile/JobseekerProfile";
import { useAuth } from "../../Context/useAuth";
import JobseekerNavbar from "../HomePage/components/JobseekerNavbar";

type Props = {};

const ProfilePage = (props: Props) => {
  const { profileRole, viewMode, userName } = useParams();
  const { user } = useAuth();

  let navbar;
  switch (user?.role.toLowerCase()) {
    case "jobseeker": {
      navbar = <JobseekerNavbar />;
      break;
    }
    case "company": {
      navbar = <div>CompanyNavbar</div>; //TODO: cahange to real navbar for company
      break;
    }
    default: {
      navbar = <h1>Unknown profile type</h1>;
    }
  }

  let pageContent;
  switch (profileRole?.toLowerCase()) {
    case "jobseeker": {
      pageContent = (
        <JobseekerProfile userName={userName!} viewMode={viewMode!} />
      );
      break;
    }
    case "company": {
      pageContent = (
        <CompanyProfile userName={userName!} viewMode={viewMode!} />
      );
      break;
    }
    default: {
      pageContent = <h1>Unknown profile type</h1>;
    }
  }
  return (
    <>
      {navbar}
      {pageContent}
    </>
  );
};

export default ProfilePage;
