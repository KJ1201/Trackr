import { useState, useEffect } from "react";
import { getApplications } from "../services/applicationService";

function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const res = await getApplications();
      setApplications(res.data);
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        const messages = Object.values(data).flat().join(" ");
        setError(messages);
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => setTrigger((t) => t + 1);

  useEffect(() => {
    fetchApplication();
  }, [trigger]);

  return { applications, loading, error, refetch };
}

export default useApplications;