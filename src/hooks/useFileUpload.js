// src/hooks/useFileUpload.js
import { useState } from "react";

export const useFileUpload = ({ maxSize, allowedTypes } = {}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFile = (f) => {
    if (!f) return "No file selected.";
    if (maxSize && f.size > maxSize) {
      return `File must be smaller than ${Math.round(maxSize / (1024 * 1024))} MB.`;
    }
    if (allowedTypes && allowedTypes.length && !allowedTypes.includes(f.type)) {
      return "Unsupported file type.";
    }
    return null;
  };

  const handleSelect = (f) => {
    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  };

  const reset = () => {
    setFile(null);
    setError("");
    setUploading(false);
    setProgress(0);
  };

  // Dummy client-side “upload” to simulate progress.
  // Replace body with real API call (e.g., Axios with onUploadProgress).
  const upload = async (uploadFn) => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setError("");
    setUploading(true);
    setProgress(0);

    try {
      if (uploadFn) {
        await uploadFn(file, setProgress);
      } else {
        // Fake progress if no uploadFn is passed
        await new Promise((resolve) => {
          let p = 0;
          const timer = setInterval(() => {
            p += 10;
            setProgress(p);
            if (p >= 100) {
              clearInterval(timer);
              resolve();
            }
          }, 80);
        });
      }
    } catch (err) {
      setError(err?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return {
    file,
    error,
    uploading,
    progress,
    handleSelect,
    upload,
    reset,
  };
};

export default useFileUpload;
