export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export interface CountdownProps {
  targetDate: string; // ISO string
}

export interface TreeProps {
  progress: number; // 0 to 1
}
