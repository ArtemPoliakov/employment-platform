import React from "react";
import type { VacancyQuery } from "../../../../../Models/Queries";
import { searchVacanciesByQueryAPI } from "../../../../../Services/VacancyService";
import type { VacancyCompactDto } from "../../../../../Models/Vacancy";
import { useQuery } from "@tanstack/react-query";
import VacancySearchResultCard from "../VacancySearchResultCard/VacancySearchResultCard";
import classes from "./vacancy_search_result_panel_styles.module.css";
import PaginationButtons from "../PaginationButtons/PaginationButtons";

type Props = {
  searchQuery: VacancyQuery;
  setQueryState: React.Dispatch<React.SetStateAction<VacancyQuery>>;
};

const VacancySearchResultsPanel = (props: Props) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["vacancies", props.searchQuery],
    queryFn: () => searchVacancies(props.searchQuery),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>No data</div>;

  const vacancies = data;
  return (
    <div className={classes["vacancy-search-results__panel"]}>
      <h1 className={classes["vacancy-search-results__heading"]}>
        {isOnlyPagePropsSet(props.searchQuery)
          ? "Recent vacancies"
          : "Search results"}
      </h1>
      <div className={classes["vacancy-search-results__container"]}>
        {vacancies.length > 0 ? (
          vacancies.map((v: VacancyCompactDto) => (
            <VacancySearchResultCard key={v.id} {...v} />
          ))
        ) : (
          <div className={classes["vacancy-search-results__no-results-msg"]}>
            No results found
          </div>
        )}
      </div>
      <PaginationButtons
        query={props.searchQuery}
        setQueryState={props.setQueryState}
      />
    </div>
  );
};

const searchVacancies = async (query: VacancyQuery) => {
  if (isOnlyPagePropsSet(query)) {
    return await searchVacanciesByQueryAPI({
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
    return allowed.has(key) || value == undefined;
  });
};

export default VacancySearchResultsPanel;
