import { createContext, useContext, useState } from "react";
import type { User } from "~/db";



export type AuthState = {
  isAuthenticated: boolean;
  user: User | undefined;
}
export type AuthContextType = {
  handleAuth: (data:AuthState) => void
}

export const AuthContext = createContext({} as AuthState & AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function handleAuth(data:AuthState) {
    setIsAuthenticated(data.isAuthenticated);
    setUser(data.user);
  }

  return <AuthContext.Provider value={{isAuthenticated, user, handleAuth}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}