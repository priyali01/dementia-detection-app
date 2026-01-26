import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { AssessmentProvider } from './context/AssessmentContext'
import { SettingsProvider } from './context/SettingsContext'

// Pages
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import NewAssessment from './pages/NewAssessment'
import TranscriptReview from './pages/TranscriptReview'
import ProcessingPage from './pages/ProcessingPage'
import ResultsPage from './pages/ResultsPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

// Layout
import ProtectedRoute from './components/layout/ProtectedRoute'

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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assessment/new" element={<NewAssessment />} />
                <Route path="/assessment/transcript" element={<TranscriptReview />} />
                <Route path="/assessment/processing" element={<ProcessingPage />} />
                <Route path="/results/:id" element={<ResultsPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              
              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            
            {/* Global Toast Notifications */}
            <Toaster position="top-right" />
          </div>
        </SettingsProvider>
      </AssessmentProvider>
    </AuthProvider>
  )
}

export default App