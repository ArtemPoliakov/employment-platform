import React from "react";
import type { VacancyQuery } from "../../../../../Models/Queries";
import {
  getRecentVacanciesAPI,
  searchVacanciesByQueryAPI,
} from "../../../../../Services/VacancyService";
import type { VacancyCompactDto } from "../../../../../Models/Vacancy";
import { useQuery } from "@tanstack/react-query";
import VacancySearchResultCard from "../VacancySearchResultCard/VacancySearchResultCard";
import classes from "./vacancy_search_result_panel_styles.module.css";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type Props = {
  searchQuery: VacancyQuery;
  setQueryState: React.Dispatch<React.SetStateAction<VacancyQuery>>;
};

const VacancySearchResultsPanel = (props: Props) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["vacancies", props.searchQuery],
    queryFn: () => searchVacancies(props.searchQuery),
    staleTime: 20000,
    refetchOnMount: "always",
  });

  let result;
  let vacancies = [];
  if (isLoading) {
    result = (
      <div className={classes["vacancy-search-results__loading-msg"]}>
        <FontAwesomeIcon
          className={classes["vacancy-search-results__loading-spinner"]}
          icon={faSpinner}
          size="2x"
        />
        <div className={classes["vacancy-search-results__msg"]}>Loading...</div>
      </div>
    );
  } else if (error) {
    result = (
      <div className={classes["vacancy-search-results__msg"]}>
        Internal server error
      </div>
    );
  } else if (!data) {
    result = (
      <div className={classes["vacancy-search-results__msg"]}>No data</div>
    );
  } else {
    vacancies = data;
    result =
      vacancies.length > 0 ? (
        vacancies.map((v: VacancyCompactDto) => (
          <VacancySearchResultCard key={v.id} {...v} />
        ))
      ) : (
        <div className={classes["vacancy-search-results__msg"]}>
          No results found
        </div>
      );
  }
  return (
    <div className={classes["vacancy-search-results__panel"]}>
      <h1 className={classes["vacancy-search-results__heading"]}>
        {isOnlyPagePropsSet(props.searchQuery)
          ? "Recent vacancies"
          : "Search results"}
      </h1>
      <div className={classes["vacancy-search-results__container"]}>
        {result}
      </div>
      <PaginationButtons
        query={props.searchQuery}
        setQueryState={props.setQueryState}
        isLastPage={vacancies.length < props.searchQuery.pageSize}
      />
    </div>
  );
};

const searchVacancies = async (query: VacancyQuery) => {
  if (isOnlyPagePropsSet(query)) {
    return await getRecentVacanciesAPI({
      page: query.page,
      pageSize: query.pageSize,
    }).then((res) => res?.data);
  } else {
    return await searchVacanciesByQueryAPI(query).then((res) => res?.data);
  }
};
const isOnlyPagePropsSet = (query: Record<string, any>) => {
  const allowed = new Set(["page", "pageSize"]);

  return Object.entries(query).every(([key, value]) => {
    return (
      allowed.has(key) ||
      value == undefined ||
      (key === "workMode" && value === "NONE")
    );
  });
};

export default VacancySearchResultsPanel;
