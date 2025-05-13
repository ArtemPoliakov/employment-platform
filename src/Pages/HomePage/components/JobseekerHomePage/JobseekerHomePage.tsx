import React, { useState } from "react";
import JobseekerNavbar from "../JobseekerNavbar";
import generalClasses from "./../../styles/home_styles.module.css";
import classes from "./jobseeker_home_page_styles.module.css";
import type { VacancyQuery } from "../../../../Models/Queries";
import SearchVacanciesForm from "./SearchVacanciesForm/SearchVacanciesForm";
import VacancySearchResultsPanel from "./VacancySearchResultsPanel/VacancySearchResultsPanel";

const JobseekerHomePage = () => {
  const [query, setQuery] = useState<VacancyQuery>({
    page: 1,
    pageSize: 10,
    position: undefined,
    minSalary: undefined,
    maxSalary: undefined,
    workMode: undefined,
    generalDescription: undefined,
  });
  return (
    <>
      <JobseekerNavbar />
      <div className={classes["jobseeker-home-page__search-area"]}>
        <SearchVacanciesForm setQueryState={setQuery} />
        <VacancySearchResultsPanel
          searchQuery={query}
          setQueryState={setQuery}
        />
      </div>
    </>
  );
};

export default JobseekerHomePage;
