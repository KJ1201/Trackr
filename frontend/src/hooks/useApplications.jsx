import { useState, useEffect } from "react";
import { getApplications } from "../services/applicationService";
import useAPI from "./useAPI";

function useApplications() {
  const { data, loading, error, refetch } = useAPI(getApplications, true);

  return { applications: data || [], loading, error, refetch };
}

export default useApplications;