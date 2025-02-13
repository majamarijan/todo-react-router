import { createContext, useContext, useEffect, useState } from "react";
type ThemeCtx = {
  theme: 'dark' | 'light',
  toggleTheme: (val: 'dark' | 'light') => void,
}


export const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  toggleTheme: (val: 'dark' | 'light') => {},
});



export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark'| 'light'>('dark');
  
  function handleTheme(val:'dark'|'light') {
    setTheme(val);
  }
  return <ThemeContext.Provider value={{theme:theme, toggleTheme:handleTheme}}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}