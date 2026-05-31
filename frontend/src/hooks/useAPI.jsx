import { useEffect, useState, useCallback } from "react";

function useAPI(apiFunc) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async () => {
      setLoading(true);
      try {
        const res = await apiFunc();
        setData(res.data);
      } catch (err) {
        const errdata = err.response?.data;
        if (errdata) {
          const messages = Object.values(errdata).flat().join(" ");
          setError(messages);
        } else {
            setError('Something went wrong.')
        }
      } finally {
        setLoading(false);
      }
    }, [apiFunc])

    useEffect(()=> {
        execute();
    }, [execute])

    return { data, loading, error, refetch: execute };
}

export default useAPI;