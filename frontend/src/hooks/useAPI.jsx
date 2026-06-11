import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

function useAPI(apiFunc, fetchOnMount=false) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
      setLoading(true);
      try {
        const res = await apiFunc(...args);
        setData(res.data);
        return true
      } catch (err) {
        const errdata = err.response?.data;
        if (errdata) {
          const messages = Object.values(errdata).flat().join(" ");
          toast.error(messages);
        } else {
            toast.error('Something went wrong.')
        }
      } finally {
        setLoading(false);
      }
    }, [apiFunc])

    useEffect(()=> {
      if (fetchOnMount) {
        execute();
      }
      }, [execute])

    return { data, loading, error, refetch: execute };
}

export default useAPI;