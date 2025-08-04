"use client";

import { TimelineProps, Track } from "@/types/editor";
import { useCallback } from "react";
import Draggable from "react-draggable";

const TRACK_HEIGHT = 64;
const TIME_SCALE = 5; // pixels per frame

export default function VideoTimeline({
  tracks,
  currentTime,
  duration,
  onTimeUpdate,
  onTracksChange,
}: TimelineProps) {
  // Calculate maximum track duration from clips
  const maxTrackDuration =
    tracks.length > 0
      ? Math.max(
          ...tracks.flatMap((track) => track.clips.map((clip) => clip.endTime)),
          duration,
        )
      : duration;

  // Timeline extends 5 seconds (150 frames at 30fps) beyond max track duration
  const timelineWidth = (maxTrackDuration + 150) * TIME_SCALE;
  const handleTrackAdd = useCallback(() => {
    const newTrack: Track = {
      id: `track-${tracks.length + 1}`,
      type: "video",
      name: `Track ${tracks.length + 1}`,
      clips: [],
    };
    onTracksChange([...tracks, newTrack]);
  }, [tracks, onTracksChange]);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-white">Timeline</h3>
        <button
          onClick={handleTrackAdd}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5"
        >
          + Add Track
        </button>
      </div>

      <div className="relative overflow-x-auto">
        {/* Timeline ruler - positioned over first track */}
        {tracks.length > 0 && (
          <div
            className="absolute top-0 z-20 pointer-events-none"
            style={{ left: 160, width: timelineWidth, height: TRACK_HEIGHT }}
          >
            {Array.from({
              length: Math.ceil((maxTrackDuration + 150) / 30) + 1,
            }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full flex items-start pt-1"
                style={{ left: i * 30 * TIME_SCALE }}
              >
                <div className="flex flex-col items-center opacity-40">
                  <span className="text-xs text-gray-200 font-mono bg-black/40 px-1 rounded backdrop-blur-sm">
                    {i}s
                  </span>
                  <div className="w-px h-6 bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tracks */}
        <div className="space-y-3">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="relative bg-slate-800 rounded-xl shadow-lg border border-slate-700/50 overflow-hidden"
              style={{ height: TRACK_HEIGHT }}
            >
              {/* Track header */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-slate-800 p-3 flex flex-col justify-center"
                style={{ width: 160 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      track.type === "video"
                        ? "bg-blue-400"
                        : track.type === "audio"
                          ? "bg-green-400"
                          : "bg-purple-400"
                    } shadow-lg`}
                  ></div>
                  <span className="text-sm font-semibold text-white truncate">
                    {track.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      track.type === "video"
                        ? "bg-blue-500/20 text-blue-300"
                        : track.type === "audio"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-purple-500/20 text-purple-300"
                    }`}
                  >
                    {track.type}
                  </span>
                </div>
              </div>

              {/* Clips container */}
              <div
                className="absolute left-40 top-0 bottom-0"
                style={{ width: timelineWidth }}
              >
                {track.clips.map((clip) => (
                  <Draggable
                    key={clip.id}
                    axis="x"
                    grid={[TIME_SCALE, TIME_SCALE]}
                    bounds="parent"
                  >
                    <div
                      className={`absolute top-0 bottom-0 rounded-lg cursor-move shadow-lg border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 ${
                        clip.source.type === "video"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400"
                          : clip.source.type === "audio"
                            ? "bg-gradient-to-r from-green-500 to-green-600 border-green-400"
                            : "bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400"
                      }`}
                      style={{
                        left: clip.startTime * TIME_SCALE,
                        width: (clip.endTime - clip.startTime) * TIME_SCALE,
                      }}
                    >
                      <div className="p-3 text-xs font-medium text-white truncate flex items-center h-full">
                        <span className="drop-shadow-sm">
                          {clip.source.url || clip.source.content}
                        </span>
                      </div>
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {tracks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2">No tracks yet</p>
            <p className="text-sm">Click "Add Track" to get started</p>
          </div>
        )}

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: currentTime * TIME_SCALE + 160 }}
        >
          <div className="w-px h-full bg-gradient-to-b from-red-400 to-red-600 shadow-lg"></div>
          <div className="absolute top-0 -left-2 w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-white"></div>
        </div>
      </div>
    </div>
  );
}
