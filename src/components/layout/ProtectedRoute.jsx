import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "./Sidebar";
import Loading from "../common/Loading";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen text="Checking your session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
