import { Link, useLocation } from "react-router-dom";
import { Home, FileText, History, Settings, HelpCircle } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: FileText, label: "New Assessment", path: "/assessment/new" },
    { icon: History, label: "History", path: "/history" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help", path: "/help" },
  ];

  return (
    <aside className="hidden min-h-screen w-60 border-r border-gray-200 bg-white lg:block">
      <nav className="space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                transition-colors duration-150
                ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
                }
              `}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
