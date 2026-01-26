src/hooks/useAssessment.js
import { useContext } from "react";
import { AssessmentContext } from "../context/AssessmentContext";
export const useAssessment = () => useContext(AssessmentContext);
