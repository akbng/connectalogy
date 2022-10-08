import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const updateWindowSize = () =>
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    if (window) updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return windowSize;
};

export default useWindowSize;
