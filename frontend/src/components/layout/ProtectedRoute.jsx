import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div
        className="flex items-center justify-center h-screen
    "
      >
        Loading...
      </div>
    );

  return user ? <Outlet /> : <Navigate to="/login/" replace />;
}

export default ProtectedRoute;
