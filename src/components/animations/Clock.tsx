import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{format(currentTime, 'HH:mm:ss')}</p>
    </div>
  );
};

export default Clock;
