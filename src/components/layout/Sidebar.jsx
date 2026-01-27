import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, History, Settings, HelpCircle, Brain, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/patient/dashboard" },
    { icon: User, label: "Profile", path: "/patient/profile" },
    { icon: FileText, label: "New Assessment", path: "/assessments/new" },
    { icon: History, label: "History", path: "/history" },
    { icon: Settings, label: "Settings", path: "/patient/settings" },
    { icon: HelpCircle, label: "Help", path: "/help" },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r-2 border-emerald-100 bg-gradient-to-b from-white to-emerald-50/30 shadow-lg">
      {/* Logo and Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b-2 border-emerald-100 bg-gradient-to-r from-emerald-600 to-emerald-700 p-6"
      >
        <Link to="/patient/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Brain className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">CogniCare</h1>
            <p className="text-sm text-emerald-100">Dementia Detection</p>
          </div>
        </Link>
      </motion.div>



      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2 p-4 pt-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`
                  flex items-center gap-4 rounded-2xl px-5 py-4 text-base font-semibold
                  transition-all duration-300
                  ${isActive
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                    : "text-emerald-900 hover:bg-emerald-100 hover:scale-102 hover:shadow-md"
                  }
                `}
              >
                <Icon size={22} className={isActive ? "text-white" : "text-emerald-600"} />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="border-t-2 border-emerald-100 p-4"
      >
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-2xl bg-red-50 px-5 py-4 text-base font-semibold text-red-700 transition-all duration-300 hover:bg-red-100 hover:shadow-md hover:scale-102 border-2 border-red-200"
        >
          <LogOut size={22} className="text-red-600" />
          <span>Logout</span>
        </button>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
