import { useQuery } from "@tanstack/react-query";
import classes from "./company_profile_styles.module.css";

import React from "react";
import { getCompanyFullDataAPI } from "../../../Services/CompanyService";
import { useAuth } from "../../../Context/useAuth";
import AccountDataCard from "../AccountDataCard/AccountDataCard";
import CompanyDataCard from "./CompanyDataCard/CompanyDataCard";
import LoadingSpinner from "../../../reusable_components/LoadingSpinner/LoadingSpinner";

type Props = { viewMode: string; userName: string };

const CompanyProfile = (props: Props) => {
  const QUERY_KEY = "companyProfile";
  const { viewMode, userName } = props;
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY, userName],
    queryFn: async () => await getCompanyFullDataAPI(userName),
    staleTime: 60000,
    refetchOnMount: true,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={classes["company-profile__container"]}>
      <AccountDataCard
        accountData={data?.appUserPublicData}
        viewMode={viewMode}
        queryKey={QUERY_KEY}
      />
      <CompanyDataCard
        company={data?.companyData!}
        viewMode={viewMode}
        queryKey={QUERY_KEY}
      />
    </div>
  );
};

export default CompanyProfile;
