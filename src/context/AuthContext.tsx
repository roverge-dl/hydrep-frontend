import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User, UserData } from "../types/user";
import { Navigate, useNavigate } from "react-router-dom";

// 1. Define the User type (Adjust based on your backend)

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("cbt_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem("cbt_user", JSON.stringify(userData));
    const tokenString = userData?.token?.token;

    if (tokenString) {
      localStorage.setItem("cbt_token", tokenString);
      // Note: Better to store the raw string for tokens, not JSON.stringify
    }
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cbt_user");
    localStorage.removeItem("cbt_token");
    navigate("/login");
    console.log("Logged out");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
