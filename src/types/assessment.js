/**
 * @typedef {Object} AssessmentResultBreakdown
 * @property {string} category
 * @property {number} score
 */

/**
 * @typedef {Object} AssessmentResultFinding
 * @property {"positive"|"warning"|"info"} type
 * @property {string} text
 */

/**
 * @typedef {Object} AssessmentResult
 * @property {string} id
 * @property {string} date ISO timestamp
 * @property {number} score 0–100
 * @property {number} confidence 0–100
 * @property {string} explanation
 * @property {AssessmentResultBreakdown[]} breakdown
 * @property {AssessmentResultFinding[]} findings
 * @property {string[]} recommendations
 */

/**
 * @typedef {Object} Assessment
 * @property {string} id
 * @property {string} createdAt
 * @property {string} [completedAt]
 * @property {string} [patientName]
 * @property {AssessmentResult} [result]
 */

/** @type {Assessment} */
export const assessmentExample = {
  id: "demo-1",
  createdAt: new Date().toISOString(),
  completedAt: new Date().toISOString(),
  patientName: "Demo Patient",
  result: {
    id: "demo-1",
    date: new Date().toISOString(),
    score: 62,
    confidence: 87,
    explanation: "Demo assessment result.",
    breakdown: [
      { category: "Memory & recall", score: 58 },
      { category: "Language & fluency", score: 66 },
    ],
    findings: [
      { type: "warning", text: "Demo warning finding." },
      { type: "positive", text: "Demo positive finding." },
    ],
    recommendations: ["Demo recommendation."],
  },
};
