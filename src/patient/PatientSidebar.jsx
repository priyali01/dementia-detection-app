import { Link, useLocation } from "react-router-dom";
import { Home, FileText, History, Settings, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/patient/dashboard" },
    { icon: FileText, label: "New Assessment", path: "/assessment/new" },
    { icon: History, label: "History", path: "/history" },
    { icon: Settings, label: "Settings", path: "/patient/settings" },
    { icon: HelpCircle, label: "Help", path: "/help" },
  ];

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="hidden min-h-screen w-60 border-r border-emerald-100 bg-gradient-to-b from-white to-emerald-50/30 lg:block"
    >
      <nav className="space-y-1 px-3 py-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              variants={itemVariants}
              custom={index}
            >
              <Link
                to={item.path}
                className={`
                  flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium
                  transition-all duration-200 ease-out group relative overflow-hidden
                  ${isActive
                    ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200 shadow-sm"
                    : "text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-700 border-2 border-transparent"
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 rounded-r-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon with hover animation */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: isActive ? 0 : 5 }}
                  transition={{ duration: 0.2 }}
                  className={`${isActive ? "text-emerald-600" : "text-gray-600 group-hover:text-emerald-600"} transition-colors duration-200`}
                >
                  <Icon size={16} />
                </motion.div>

                {/* Label */}
                <span className="relative z-10">{item.label}</span>

                {/* Hover background effect */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-100 rounded-xl opacity-0 group-hover:opacity-100 -z-10"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;