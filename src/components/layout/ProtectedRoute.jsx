import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "./Header";
import Footer from "./Footer";
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
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Header />

      <div className="flex flex-1 bg-white">
        <Sidebar />

        <main className="flex-1 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProtectedRoute;
