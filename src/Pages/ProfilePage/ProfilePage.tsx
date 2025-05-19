import { useParams } from "react-router-dom";
import classes from "./profile_page_styles.module.css";

import React from "react";
import CompanyProfile from "./CompanyProfile/CompanyProfile";
import JobseekerProfile from "./JobseekerProfile/JobseekerProfile";

type Props = {};

const ProfilePage = (props: Props) => {
  const { profileRole, viewMode, userName } = useParams();

  switch (profileRole) {
    case "jobseeker": {
      return <JobseekerProfile userName={userName!} viewMode={viewMode!} />;
    }
    case "company": {
      return <CompanyProfile userName={userName!} viewMode={viewMode!} />;
    }
    default: {
      return <h1>Unknown profile type</h1>;
    }
  }
};

export default ProfilePage;
