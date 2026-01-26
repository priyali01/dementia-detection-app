import { useState, useRef } from "react";
import PropTypes from "prop-types";

const AudioRecorder = ({ onRecordingComplete, maxDuration = 600 }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setDuration(0);

      timerRef.current = setInterval(() => {
        setDuration((prev) => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to record audio.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
    }
  };

  const discardRecording = () => {
    setAudioBlob(null);
    setDuration(0);
    setIsRecording(false);
    setIsPaused(false);
    clearInterval(timerRef.current);
  };

  const handleContinue = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const statusText = () => {
    if (isRecording && !isPaused) return "Recording… speak naturally.";
    if (isPaused) return "Recording paused.";
    if (audioBlob) return "Recording complete. You can listen or continue.";
    return "Tap the button below to start recording.";
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-6 rounded-2xl border border-emerald-900/40 bg-slate-900/70 p-5 text-slate-50 shadow-md">
      {/* Timer and status */}
      <div className="text-center">
        <div className="text-3xl font-semibold tracking-wide text-emerald-100 md:text-4xl">
          {formatTime(duration)} / {formatTime(maxDuration)}
        </div>
        <p className="mt-2 text-xs text-slate-300 md:text-sm">
          {statusText()}
        </p>
      </div>

      {/* Simple “waveform” */}
      <div className="h-20 w-full overflow-hidden rounded-xl bg-slate-900/90 px-3 py-2">
        <div className="flex h-full items-end justify-between gap-0.5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-emerald-500/70 ${
                isRecording && !isPaused ? "animate-pulse" : ""
              }`}
              style={{ height: `${20 + (i % 5) * 8}px` }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center">
        {!isRecording && !audioBlob && (
          <button
            onClick={startRecording}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white shadow-md transition-all duration-150 hover:scale-105 hover:bg-emerald-500 hover:shadow-lg"
          >
            ●
          </button>
        )}

        {isRecording && !isPaused && (
          <div className="flex flex-1 flex-wrap justify-center gap-3">
            <button
              onClick={pauseRecording}
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition-colors hover:bg-amber-400"
            >
              Pause
            </button>
            <button
              onClick={stopRecording}
              className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-500"
            >
              Stop
            </button>
          </div>
        )}

        {isPaused && (
          <div className="flex flex-1 flex-wrap justify-center gap-3">
            <button
              onClick={resumeRecording}
              className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
            >
              Resume
            </button>
            <button
              onClick={stopRecording}
              className="rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-500"
            >
              Stop
            </button>
          </div>
        )}

        {audioBlob && (
          <div className="flex w-full flex-col gap-3">
            <audio
              src={URL.createObjectURL(audioBlob)}
              controls
              className="w-full rounded-lg bg-slate-900/80"
            />
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
              <button
                onClick={discardRecording}
                className="flex-1 rounded-full border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-800"
              >
                Discard and record again
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-500 hover:shadow-md"
              >
                Continue to analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AudioRecorder.propTypes = {
  onRecordingComplete: PropTypes.func.isRequired,
  maxDuration: PropTypes.number,
};

export default AudioRecorder;
