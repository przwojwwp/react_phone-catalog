import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 639) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();

    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
};
