// src/services/audioService.js
import { api } from "./api";

// Helper to build FormData if you add a real endpoint later
const buildFormData = (file, extra = {}) => {
  const formData = new FormData();
  formData.append("file", file);
  Object.entries(extra).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

/**
 * Fake upload that you can later replace with:
 *   return api.post("/audio/upload", formData, { headers: { "Content-Type": undefined } })
 */
export async function uploadAudio(file, { onProgress } = {}) {
  if (!file) throw new Error("No audio file provided");

  // Simulated progress
  if (onProgress) {
    let p = 0;
    while (p < 100) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 80));
      p += 10;
      onProgress(p);
    }
  } else {
    await new Promise((r) => setTimeout(r, 800));
  }

  // Return a fake upload id
  return { uploadId: `demo-${Date.now()}` };
}

/**
 * Fake analysis – later: api.post("/audio/analyze", { uploadId })
 */
export async function analyzeAudio(uploadId) {
  if (!uploadId) throw new Error("Missing uploadId");

  await new Promise((r) => setTimeout(r, 1200));

  // Demo result payload; ResultsPage currently expects this shape
  return {
    id: uploadId,
    score: 62,
    confidence: 87,
    explanation:
      "This screening suggests a moderate risk of cognitive change. This is not a diagnosis and should be interpreted with a clinician.",
    breakdown: [
      { category: "Memory & recall", score: 58 },
      { category: "Language & fluency", score: 66 },
      { category: "Speech patterns", score: 71 },
      { category: "Processing speed", score: 54 },
    ],
    findings: [
      { type: "warning", text: "Increased pauses and hesitations detected." },
      {
        type: "info",
        text: "Word-finding pauses observed in several segments.",
      },
      {
        type: "positive",
        text: "Orientation and narrative structure remain preserved.",
      },
    ],
    recommendations: [
      "Discuss these results with a qualified clinician.",
      "Repeat this assessment in 4–6 weeks to track change.",
      "Maintain regular cognitive, social, and physical activity.",
    ],
  };
}

// Example of how a real implementation might look:
//
// export async function uploadAudio(file, { onProgress } = {}) {
//   const formData = buildFormData(file);
//   return api.post("/audio/upload", formData, {
//     headers: { "Content-Type": undefined },
//     onUploadProgress: (event) => {
//       if (onProgress && event.total) {
//         onProgress(Math.round((event.loaded * 100) / event.total));
//       }
//     },
//   });
// }
