import { useQuery } from "@tanstack/react-query";
import { getAllJobseekerPublicDataAPI } from "../../../Services/JobseekerService";
import JobseekerNavbar from "../../HomePage/components/JobseekerNavbar";
import classes from "./jobseeker_profile_styles.module.css";

import React from "react";
import AccountDataCard from "../AccountDataCard/AccountDataCard";
import JobseekerDataCard from "./JobseekerDataCard/JobseekerDataCard";

type Props = { viewMode: string; userName: string };

const JobseekerProfile = (props: Props) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["jobseekerProfile", props.userName],
    queryFn: async () => await getAllJobseekerPublicDataAPI(props.userName),
    staleTime: 60000,
    refetchOnMount: true,
  });
  return (
    <>
      <JobseekerNavbar />
      <div className={classes["jobseeker-profile__container"]}>
        <AccountDataCard accountData={data?.appUserPublicData} />
        <JobseekerDataCard jobseeker={data?.jobseekerData} />
      </div>
    </>
  );
};

export default JobseekerProfile;
