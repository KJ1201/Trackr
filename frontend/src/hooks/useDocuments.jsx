import useAPI from "./useAPI";
import { getDocuments } from "@/services/documentService";

function useDocuments() {
  const { data, loading, error, refetch } = useAPI(getDocuments, true);

  return { documents: data || [], loading, error, refetch };
}

export default useDocuments;
