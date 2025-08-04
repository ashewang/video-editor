"use client";

import Link from "next/link";
import { Player } from "@remotion/player";
import { useState } from "react";
import VideoTimeline from "@/components/VideoTimeline";
import VideoControls from "@/components/VideoControls";
import { Track } from "@/types/editor";

const EmptyComposition = () => {
  return <div style={{ width: "100%", height: "100%", background: "black" }} />;
};

export default function EditPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30 * 30); // 30 seconds at 30fps
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Video Editor</h1>
          <Link href="/">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Video Preview Section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <Player
                component={EmptyComposition}
                durationInFrames={duration}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                initialFrame={currentTime}
                autoPlay={isPlaying}
                loop
              />
            </div>
          </div>

          {/* Video Controls */}
          <VideoControls
            currentTime={currentTime}
            duration={duration}
            onTimeUpdate={handleTimeUpdate}
          />

          {/* Timeline Section */}
          <VideoTimeline
            tracks={tracks}
            currentTime={currentTime}
            duration={duration}
            onTimeUpdate={handleTimeUpdate}
            onTracksChange={setTracks}
          />
        </div>
      </div>
    </div>
  );
}
