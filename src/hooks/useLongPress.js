"use client";
import { useRef } from "react";

function useLongPress({ onClick, onLongPress, duration = 500 }) {
  const timeoutRef = useRef();
  const longPressTriggeredRef = useRef(false);

  function handleStart(event) {
    // Reset the long press flag on new interaction
    longPressTriggeredRef.current = false;
    timeoutRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      if (typeof onLongPress === "function") {
        onLongPress(event);
      }
    }, duration);
  }

  function handleEnd() {
    clearTimeout(timeoutRef.current);
  }

  function handleClick() {
    if (longPressTriggeredRef.current) {
      // Reset the flag and prevent click action
      longPressTriggeredRef.current = false;
      return;
    }
    if (typeof onClick === "function") {
      onClick();
    }
  }
  return {
    handlers: {
      onMouseDown: handleStart,
      onMouseUp: handleEnd,
      onTouchStart: handleStart,
      onTouchEnd: handleEnd,
      onClick: handleClick,
      onContextMenu: (e) => e.preventDefault(),
    },
    refs: {
      timeoutRef,
      longPressTriggeredRef,
    },
  };
}

export default useLongPress;
