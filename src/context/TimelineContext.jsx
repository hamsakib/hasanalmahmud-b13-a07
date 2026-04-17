import { createContext, useContext, useState } from "react";

const TimelineContext = createContext(null);

export function useTimeline() {
  return useContext(TimelineContext);
}

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([]);

  function addEntry(friendName, type) {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
    const newEntry = {
      id: Date.now(),
      friendName,
      type,
      title: `${type} with ${friendName}`,
      date,
      timestamp: now.getTime(),
    };
    setEntries(prev => [newEntry, ...prev]);
  }

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}
