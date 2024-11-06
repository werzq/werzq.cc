import { useState, useEffect } from 'react';

export default function useRandomizedName() {
  const [randomizedName, setRandomizedName] = useState('&@#$%*_');

  useEffect(() => {
    const shuffleName = () => {
      setRandomizedName((prev) => prev.split('').sort(() => 0.5 - Math.random()).join(''));
    };

    const interval = setInterval(shuffleName, 100);
    return () => clearInterval(interval);
  }, []);

  return randomizedName;
}
