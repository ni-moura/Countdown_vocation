import { TimeLeft } from '../types';

export const calculateTimeLeft = (targetDateStr: string): TimeLeft => {
  const difference = +new Date(targetDateStr) - +new Date();
  
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalSeconds: Math.floor(difference / 1000),
    };
  }

  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  };
};

export const calculateProgress = (startDateStr: string, targetDateStr: string): number => {
  const start = +new Date(startDateStr);
  const target = +new Date(targetDateStr);
  const now = +new Date();

  if (now <= start) return 0;
  if (now >= target) return 1;

  const totalDuration = target - start;
  const elapsed = now - start;

  return elapsed / totalDuration;
};
