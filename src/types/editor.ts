export interface Track {
  id: string;
  type: "video" | "audio" | "text";
  name: string;
  clips: Clip[];
  muted?: boolean;
  volume?: number;
}

export interface Clip {
  id: string;
  startTime: number; // in frames
  endTime: number; // in frames
  source: {
    type: "video" | "audio" | "text";
    url?: string;
    content?: string;
  };
  trimStart?: number; // in frames
  trimEnd?: number; // in frames
}

export interface TimelineProps {
  tracks: Track[];
  currentTime: number;
  duration: number;
  onTimeUpdate: (time: number) => void;
  onTracksChange: (tracks: Track[]) => void;
}

export interface ControlsProps {
  currentTime: number;
  duration: number;
  onTimeUpdate: (time: number) => void;
}
