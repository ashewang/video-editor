"use client";

import { TimelineProps, Track } from "@/types/editor";
import { useCallback } from "react";
import Draggable from "react-draggable";

const TRACK_HEIGHT = 80;
const TIME_SCALE = 5; // pixels per frame

export default function VideoTimeline({
  tracks,
  currentTime,
  duration,
  onTimeUpdate,
  onTracksChange,
}: TimelineProps) {
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
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Timeline</h3>
        <button
          onClick={handleTrackAdd}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Add Track
        </button>
      </div>

      <div className="relative">
        {/* Timeline ruler */}
        <div className="h-8 border-b border-gray-600 mb-2">
          {Array.from({ length: Math.ceil(duration / 30) }).map((_, i) => (
            <div
              key={i}
              className="absolute h-full flex items-end pb-1"
              style={{ left: i * 30 * TIME_SCALE }}
            >
              <span className="text-xs text-gray-400">{i}s</span>
            </div>
          ))}
        </div>

        {/* Tracks */}
        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="h-20 bg-gray-700 rounded relative"
              style={{ height: TRACK_HEIGHT }}
            >
              {/* Track header */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gray-600 p-2 flex flex-col justify-between">
                <span className="text-sm font-medium">{track.name}</span>
                <div className="flex items-center gap-2">
                  <button className="text-xs bg-gray-500 px-2 py-1 rounded">
                    {track.type}
                  </button>
                </div>
              </div>

              {/* Clips container */}
              <div className="absolute left-32 right-0 top-0 bottom-0">
                {track.clips.map((clip) => (
                  <Draggable
                    key={clip.id}
                    axis="x"
                    grid={[TIME_SCALE, TIME_SCALE]}
                    bounds="parent"
                  >
                    <div
                      className="absolute top-0 h-full bg-blue-500 rounded cursor-move"
                      style={{
                        left: clip.startTime * TIME_SCALE,
                        width: (clip.endTime - clip.startTime) * TIME_SCALE,
                      }}
                    >
                      <div className="p-2 text-xs truncate">
                        {clip.source.url || clip.source.content}
                      </div>
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-px bg-red-500"
          style={{ left: currentTime * TIME_SCALE + 128 }}
        />
      </div>
    </div>
  );
}
