// src/components/layout/Navigation.jsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Mic, History, Settings } from "lucide-react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assessments/new", label: "New Assessment", icon: Mic },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Navigation = ({ orientation = "horizontal", onNavigate }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const baseClasses =
    "flex gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-gray-600 hover:bg-gray-100";

  const containerClasses =
    orientation === "vertical"
      ? "flex flex-col gap-1"
      : "flex items-center gap-2";

  return (
    <nav className={containerClasses}>
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
          onClick={onNavigate}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

Navigation.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  onNavigate: PropTypes.func,
};

export default Navigation;
