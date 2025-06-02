"use client";
import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= breakpoint); // You can adjust the breakpoint
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
