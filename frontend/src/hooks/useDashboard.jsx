import { getDashboardStats } from "../services/applicationService";
import useAPI from "./useAPI";

function useDashboard() {
    const {data, loading, error} = useAPI(getDashboardStats, true);
    
    return {stats: data || null, loading, error}
}

export default useDashboard;