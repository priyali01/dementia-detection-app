// src/pages/SettingsPage.jsx
import { useState } from "react";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import ProfileForm from "../components/settings/ProfileForm.jsx";
import SecuritySettings from "../components/settings/SecuritySettings.jsx";
import NotificationSettings from "../components/settings/NotificationSettings.jsx";
import AccessibilitySettings from "../components/settings/AccessibilitySettings.jsx";
import { SettingsContext } from "../context/SettingsContext.jsx";
import { useContext } from "react";

const tabs = ["Profile", "Security", "Notifications", "Accessibility"];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const { updateNotifications, updateAccessibility } = useContext(SettingsContext);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header />

      <div className="flex flex-1">
        <aside className="hidden w-60 border-r border-emerald-900/60 bg-slate-950/80 lg:block">
          <Sidebar />
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <header>
              <h1 className="text-2xl font-semibold text-emerald-50 md:text-3xl">
                Settings
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage your account details, security, notifications, and accessibility.
              </p>
            </header>

            {/* Tabs */}
            <div className="border-b border-emerald-900/60">
              <nav className="-mb-px flex flex-wrap gap-3 text-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`border-b-2 px-3 py-2 font-medium transition-colors ${
                      activeTab === tab
                        ? "border-emerald-400 text-emerald-200"
                        : "border-transparent text-slate-400 hover:text-emerald-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Panels */}
            <div>
              {activeTab === "Profile" && <ProfileForm />}
              {activeTab === "Security" && <SecuritySettings />}
              {activeTab === "Notifications" && (
                <NotificationSettings onChange={updateNotifications} />
              )}
              {activeTab === "Accessibility" && (
                <AccessibilitySettings onChange={updateAccessibility} />
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SettingsPage;
