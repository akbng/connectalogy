import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);

  const updateWindowSize = () =>
    setWindowSize([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    if (window) updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return windowSize;
};

export default useWindowSize;
