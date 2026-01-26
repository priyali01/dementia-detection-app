import { createContext, useState } from "react";

export const AssessmentContext = createContext({
  currentAssessment: null,
  transcript: "",
  status: "idle", // idle | recording | uploading | processing | done | error
  results: null,
  setCurrentAssessment: () => {},
  setTranscript: () => {},
  setStatus: () => {},
  setResults: () => {},
  resetAssessment: () => {},
});

export const AssessmentProvider = ({ children }) => {
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState(null);

  const resetAssessment = () => {
    setCurrentAssessment(null);
    setTranscript("");
    setStatus("idle");
    setResults(null);
  };

  const value = {
    currentAssessment,
    transcript,
    status,
    results,
    setCurrentAssessment,
    setTranscript,
    setStatus,
    setResults,
    resetAssessment,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};
