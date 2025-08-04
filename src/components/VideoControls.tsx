"use client";

import { ControlsProps } from "@/types/editor";
import { useCallback } from "react";

export default function VideoControls({
  currentTime,
  duration,
  onTimeUpdate,
}: ControlsProps) {
  const formatTime = useCallback((frames: number) => {
    const seconds = Math.floor(frames / 30);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const pad = (num: number) => num.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          onClick={() => {
            /* TODO: Implement play/pause */
          }}
        >
          Play
        </button>

        {/* Timeline scrubber */}
        <div className="flex-1 flex items-center gap-4">
          <span className="text-sm font-mono">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => onTimeUpdate(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-mono">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
