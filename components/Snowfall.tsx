import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [flakes, setFlakes] = useState<number[]>([]);

  useEffect(() => {
    // Generate static number of flakes to avoid re-renders causing jumpiness
    setFlakes(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="snow">
      {flakes.map((i) => {
        const left = `${Math.random() * 100}%`;
        const duration = `${Math.random() * 3 + 5}s`; // 5-8s
        const delay = `${Math.random() * 5}s`;
        const size = `${Math.random() * 4 + 2}px`;
        
        return (
          <div
            key={i}
            className="snowflake"
            style={{
              left,
              animationDuration: duration,
              animationDelay: delay,
              width: size,
              height: size,
            }}
          />
        );
      })}
    </div>
  );
};

export default Snowfall;
