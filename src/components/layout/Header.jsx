// src/components/layout/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/60 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between md:h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 md:h-10 md:w-10">
              <span className="text-lg font-bold text-white md:text-xl">
                D
              </span>
            </div>
            <span className="hidden text-base font-semibold text-emerald-50 sm:block md:text-lg">
              Dementia Detection
            </span>
            <span className="text-base font-semibold text-emerald-50 sm:hidden">
              DD
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
            <Link
              to="/dashboard"
              className="transition-colors hover:text-emerald-300"
            >
              Dashboard
            </Link>
            <Link
              to="/assessments/new"
              className="transition-colors hover:text-emerald-300"
            >
              New Assessment
            </Link>
            <Link
              to="/history"
              className="transition-colors hover:text-emerald-300"
            >
              History
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Notifications */}
            <button
              className="relative rounded-full p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-emerald-200"
              aria-label="Notifications"
            >
              <Bell size={20} className="md:h-5 md:w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-400" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-slate-800"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 md:h-9 md:w-9">
                  <User className="h-4 w-4 text-white md:h-5 md:w-5" />
                </div>
                <span className="hidden text-sm font-medium text-emerald-50 md:block">
                  {user?.firstName || "User"}
                </span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-emerald-900/60 bg-slate-900 py-2 text-sm text-slate-100 shadow-xl">
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-slate-800"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-rose-300 transition-colors hover:bg-rose-900/40"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="rounded-full p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-emerald-200 md:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-emerald-900/60 py-3 md:hidden">
            <nav className="flex flex-col gap-1 text-sm">
              <Link
                to="/dashboard"
                className="rounded-lg px-3 py-2 text-slate-100 transition-colors hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/assessments/new"
                className="rounded-lg px-3 py-2 text-slate-100 transition-colors hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Assessment
              </Link>
              <Link
                to="/history"
                className="rounded-lg px-3 py-2 text-slate-100 transition-colors hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                History
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
