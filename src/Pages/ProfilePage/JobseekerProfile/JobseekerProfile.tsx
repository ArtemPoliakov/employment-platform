import { useQuery } from "@tanstack/react-query";
import { getAllJobseekerPublicDataAPI } from "../../../Services/JobseekerService";
import JobseekerNavbar from "../../HomePage/components/JobseekerNavbar";
import classes from "./jobseeker_profile_styles.module.css";

import React from "react";
import AccountDataCard from "../AccountDataCard/AccountDataCard";
import JobseekerDataCard from "./JobseekerDataCard/JobseekerDataCard";
import config from "../../../config";
import LoadingSpinner from "../../../reusable_components/LoadingSpinner/LoadingSpinner";

type Props = { viewMode: string; userName: string };

const JobseekerProfile = (props: Props) => {
  const QUERY_KEY = "jobseekerProfile";
  const { viewMode, userName } = props;
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY, userName],
    queryFn: async () => await getAllJobseekerPublicDataAPI(userName),
    staleTime: 60000,
    refetchOnMount: true,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={classes["jobseeker-profile__container"]}>
      <AccountDataCard
        accountData={data?.appUserPublicData}
        viewMode={viewMode}
        queryKey={QUERY_KEY}
      />
      <JobseekerDataCard
        jobseeker={data?.jobseekerData}
        viewMode={viewMode}
        queryKey={QUERY_KEY}
      />
    </div>
  );
};

export default JobseekerProfile;
