import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import type { Pagination } from "../../Models/Queries";
import PaginationButtons from "../HomePage/components/JobseekerHomePage/PaginationButtons/PaginationButtons";
import JobseekerNavbar from "../HomePage/components/JobseekerNavbar";
import classes from "./offers_page_styles.module.css";

import React, { useEffect } from "react";
import { getOffersForJobseekerAPI } from "../../Services/OfferService";
import { useQuery } from "@tanstack/react-query";
import OfferCard from "./OfferCard/OfferCard";
import LoadingSpinner from "../../reusable_components/LoadingSpinner/LoadingSpinner";

type Props = {};

const OffersPage = (props: Props) => {
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    pageSize: 5,
  });
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/auth");
    }
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["offers", pagination],
    queryFn: async () =>
      await getOffersForJobseekerAPI(
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
      <div className={classes["offers__msg"]}>Internal server error</div>
    );
  } else if (data && data.length > 0) {
    content = (
      <>
        {data?.map((offer) => (
          <OfferCard
            key={
              offer.vacancyId +
              " " +
              offer.jobseekerId +
              " " +
              offer.creationDate.toString()
            }
            offer={offer}
          />
        ))}
      </>
    );
  } else {
    content = <div className={classes["offers__msg"]}>No offers found</div>;
  }
  return (
    <>
      <JobseekerNavbar />
      <div className={classes["offers__panel"]}>
        <h1 className={classes["offers__heading"]}>Your offers</h1>
        <div className={classes["offers__container"]}>{content}</div>
        <PaginationButtons
          query={pagination}
          setQueryState={setPagination}
          isLastPage={(data?.length || 0) < pagination.pageSize}
        />
      </div>
    </>
  );
};

export default OffersPage;
