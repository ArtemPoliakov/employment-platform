import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVacancyByIdAPI } from "../../Services/VacancyService";
import classes from "./vacancy_page_styles.module.css";
import reusableClasses from "./../../global_styles/reusable.module.css";
import JobseekerNavbar from "../HomePage/components/JobseekerNavbar";
import ManageApplyVacancyButton from "../HomePage/components/JobseekerHomePage/VacancySearchResultCard/ManageApplyOrCancelButton/ManageApplyOrCancelButton";
import type { ApplicationStatus } from "../../Models/Application";
import { useAuth } from "../../Context/useAuth";
import LoadingSpinner from "../../reusable_components/LoadingSpinner/LoadingSpinner";
import clsx from "clsx";
type Props = {};

const VacancyPage = (props: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  }, []);

  const { vacancyId, viewMode } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["vacancy", vacancyId],
    queryFn: async () =>
      await getVacancyByIdAPI(vacancyId!).then((res) => res?.data),
    staleTime: 20000,
    refetchOnMount: "always",
  });
  if (isLoading) return <LoadingSpinner />;

  const redirectToCompanyProfile = () => {
    navigate(`/profile/company/view/${data?.companyUserName}`);
  };
  return (
    <>
      <JobseekerNavbar />
      <div className={classes["vacancy"]}>
        <h1 className={classes["vacancy__title"]}>{data?.title}</h1>
        <h2 className={classes["vacancy__companyName"]}>
          {data?.companyUserName}
        </h2>
        <div className={classes["vacancy__info-container"]}>
          <p className={classes["vacancy__info-paragraph"]}>
            <b>Position:</b> {data?.position}
          </p>
          <p className={classes["vacancy__info-paragraph"]}>
            <b>Salary range:</b> {`$${data?.salaryMin} - $${data?.salaryMax}`}
          </p>
          <p className={classes["vacancy__info-paragraph"]}>
            <b>Work mode:</b> {data?.workMode}
          </p>
          <p className={classes["vacancy__info-paragraph"]}>
            <b>Living conditions:</b> <br /> {data?.livingConditions}
          </p>
          <p className={classes["vacancy__info-paragraph"]}>
            <b>Description:</b> <br /> {data?.description}
          </p>
          <p className={classes["vacancy__info-paragraph"]}>
            <b>Candidate description:</b> <br />
            {data?.candidateDescription}
          </p>
          <div className={classes["vacancy__info-bottom-container"]}>
            <p className={classes["vacancy__info-paragraph"]}>
              <b>Publish date:</b> {data?.publishDate.toString().split("T")[0]}
            </p>
            <div className={classes["vacancy__btn-container"]}>
              <button
                className={clsx(
                  reusableClasses["btn"],
                  classes["vacancy-page__btn"]
                )}
                onClick={redirectToCompanyProfile}
              >
                Company profile
              </button>
              {viewMode == "jobseekerViewApply" && (
                <ManageApplyVacancyButton
                  vacancyId={vacancyId!}
                  applicationStatus={
                    data?.applicationStatus as ApplicationStatus
                  }
                  size="1.2rem"
                  queryKeys={["vacancy", vacancyId!]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VacancyPage;
