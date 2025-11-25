import React from 'react';
import { TimeLeft } from '../types';

interface CountdownTimerProps {
  timeLeft: TimeLeft;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-4xl mx-auto p-4 z-20 relative">
      <TimerBlock value={timeLeft.days} label="Days" />
      <TimerBlock value={timeLeft.hours} label="Hours" />
      <TimerBlock value={timeLeft.minutes} label="Minutes" />
      <TimerBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

const TimerBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  // Pad with zero if needed
  const displayValue = value < 10 ? `0${value}` : value;

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="absolute inset-0 bg-tennis-yellow blur opacity-20 group-hover:opacity-40 transition-opacity rounded-lg"></div>
        <div className="relative bg-slate-800/80 backdrop-blur-md border border-tennis-green/50 rounded-lg p-4 sm:p-6 min-w-[80px] sm:min-w-[100px] text-center shadow-xl">
          <span className="block text-4xl sm:text-6xl font-mono font-bold text-white tracking-widest">
            {displayValue}
          </span>
        </div>
      </div>
      <span className="mt-2 text-tennis-yellow font-festive text-xl sm:text-2xl tracking-wider">
        {label}
      </span>
    </div>
  );
};

export default CountdownTimer;
