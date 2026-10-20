"use client";

import { createContext, useContext, useState } from "react";
import { demoMatches } from "@/data/padel";

const PadelContext = createContext(null);

export function PadelProvider({ children }) {
  // Keep preview results when moving between the overview and player profiles.
  const [matches, setMatches] = useState(demoMatches);

  function addMatch(match) {
    setMatches((current) => [match, ...current].sort((a, b) => b.date.localeCompare(a.date)));
  }

  return <PadelContext.Provider value={{ matches, addMatch }}>{children}</PadelContext.Provider>;
}

export function usePadel() {
  return useContext(PadelContext);
}
