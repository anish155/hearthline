/* Quiet Luxury Editorial: saved homes behave like a concierge shortlist—persistent within the session, reversible, and acknowledged with gentle motion. */
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type SavedPropertiesContextValue = {
  saved: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const SavedPropertiesContext = createContext<SavedPropertiesContextValue | null>(null);

export function SavedPropertiesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(["azure-penthouse", "glasshouse-villa"]);

  const value = useMemo<SavedPropertiesContextValue>(
    () => ({
      saved,
      toggleSaved: (id) => setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id])),
      isSaved: (id) => saved.includes(id),
    }),
    [saved],
  );

  return <SavedPropertiesContext.Provider value={value}>{children}</SavedPropertiesContext.Provider>;
}

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (!context) throw new Error("useSavedProperties must be used inside SavedPropertiesProvider");
  return context;
}
