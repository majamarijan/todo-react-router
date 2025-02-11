import { createContext, useContext, useState } from "react";
type ThemeCtx = {
  theme: 'dark' | 'light',
  toggleTheme: () => void,
}


export const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark'| 'light'>('dark');
  function handleTheme() {
    if(theme === 'dark') {
      setTheme('light');
    }else {
      setTheme('dark');
    }
  }
  return <ThemeContext.Provider value={{theme:theme, toggleTheme:handleTheme}}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}