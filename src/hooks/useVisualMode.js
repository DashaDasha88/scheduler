import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  //to transition to a new mode
  const transition = (newMode, replace) => {
    if (!replace) {
      setHistory([...history, newMode])
    }
    setMode(newMode)
  };

  //to return to previous mode
  const back = () => {
    let newHistory = [...history];
    newHistory.pop(mode);
    setHistory((prev) => newHistory);
    if (history.length > 1) {
      setMode((prev) => newHistory[(newHistory.length - 1)]);
    }
  };

  return {
    mode,
    transition,
    back
  }
}