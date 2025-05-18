import React, { useEffect } from "react";
import classes from "./applications_page_styles.module.css";
import { useQuery } from "@tanstack/react-query";
import { getApplicationsForJobseekerAPI } from "../../Services/ApplicationService";
import { useAuth } from "../../Context/useAuth";
import { useNavigate } from "react-router-dom";
import JobseekerNavbar from "../HomePage/components/JobseekerNavbar";
import ApplicationCard from "./ApplicationCard/ApplicationCard";
import type { Pagination } from "../../Models/Queries";
import PaginationButtons from "../HomePage/components/JobseekerHomePage/PaginationButtons/PaginationButtons";
import LoadingSpinner from "../../reusable_components/LoadingSpinner/LoadingSpinner";
type Props = {};

const ApplicationsPage = (props: Props) => {
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    pageSize: 10,
  });
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["applications", pagination],
    queryFn: async () =>
      await getApplicationsForJobseekerAPI(
        user?.userName || "",
        pagination.page,
        pagination.pageSize
      ),
    staleTime: 20000,
    refetchOnMount: "always",
  });

  let content = null;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (error) {
    content = (
      <div className={classes["applications__msg"]}>Internal server error</div>
    );
  } else if (data && data.length > 0) {
    content = (
      <>
        {data?.map((application) => (
          <ApplicationCard
            key={application.vacancyId + " " + application.jobseekerId}
            application={application}
          />
        ))}
      </>
    );
  } else {
    content = (
      <div className={classes["applications__msg"]}>No applications found</div>
    );
  }
  return (
    <>
      <JobseekerNavbar />
      <div className={classes["applications__panel"]}>
        <h1 className={classes["applications__heading"]}>Your applications</h1>
        <div className={classes["applications__container"]}>{content}</div>
        <PaginationButtons
          query={pagination}
          setQueryState={setPagination}
          isLastPage={(data?.length || 0) < pagination.pageSize}
        />
      </div>
    </>
  );
};
export default ApplicationsPage;
