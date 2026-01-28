// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import { AssessmentProvider } from "./context/AssessmentContext";
import { SettingsProvider } from "./context/SettingsContext";

import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NewAssessment from "./pages/NewAssessment";
import TranscriptReview from "./pages/TranscriptReview";
import ProcessingPage from "./pages/ProcessingPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PatientDashboard from "./patient/PatientDashboard";
import PatientProfile from "./patient/PatientProfile";
import PatientSetting from "./patient/PatientSetting";

function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <SettingsProvider>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/profile" element={<PatientProfile />} />
                <Route path="/patient/settings" element={<PatientSetting />} />
                <Route path="/assessments/new" element={<NewAssessment />} />
                <Route
                  path="/assessments/transcript"
                  element={<TranscriptReview />}
                />
                <Route
                  path="/assessments/processing"
                  element={<ProcessingPage />}
                />
                <Route path="/results/:id" element={<ResultsPage />} />
                <Route path="/history" element={<HistoryPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Toaster position="top-right" />
          </div>
        </SettingsProvider>
      </AssessmentProvider>
    </AuthProvider>
  );
}

export default App;
