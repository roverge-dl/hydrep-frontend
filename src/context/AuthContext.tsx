import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { UserData } from "../types/user";
import { useNavigate } from "react-router-dom";

// 1. Define the User type (Adjust based on your backend)

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserData) => void;
  updateUser: (newFields: Partial<UserData["user"]>) => void;
  logout: () => void;
}

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<UserData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check for existing session on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem("cbt_user");
//     const savedToken = localStorage.getItem("cbt_token");

//     if (savedUser) {
//       try {
//         const parsedUser = JSON.parse(savedUser);
//         setUser(parsedUser);
//       } catch (e) {
//         console.error("Failed to parse user", e);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userData: UserData) => {
//     setUser(userData);
//     console.log("Logged in", userData);
//     localStorage.setItem("cbt_user", JSON.stringify(userData));
//     const tokenString = userData?.token?.token;

//     if (tokenString) {
//       localStorage.setItem("cbt_token", tokenString);

//       // Note: Better to store the raw string for tokens, not JSON.stringify
//     }
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("cbt_user");
//     localStorage.removeItem("cbt_token");
//     navigate("/login");
//     console.log("Logged out");
//   };

//   const updateUser = (newFields: Partial<UserData["user"]>) => {
//     setUser((prev) => {
//       if (!prev) return null;

//       // Merge the existing data with the new fields
//       const updatedUser = {
//         ...prev,
//         user: {
//           ...prev.user,
//           ...newFields,
//         },
//       };

//       // Sync to localStorage so it persists on refresh
//       localStorage.setItem("cbt_user", JSON.stringify(updatedUser));

//       return updatedUser;
//     });
//   };

//   const token = user?.token?.token || null;

//   const value = {
//     user,
//     token,
//     isAuthenticated: !!user,
//     isLoading,
//     login,
//     updateUser,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!isLoading && children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook for easy access
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
// 1. Keep the context private (no export)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("cbt_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Auth Refresh Error:", e);
        localStorage.removeItem("cbt_user");
      }
    }
    setIsLoading(false);
  }, []);

  // IMPROVED TOKEN LOGIC:
  // Look in state first, fallback to localStorage for immediate availability
  const token = user?.token?.token || localStorage.getItem("cbt_token");

  const login = (userData: UserData) => {
    setUser(userData);
    console.log("Logged in", userData);
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

  const updateUser = (newFields: Partial<UserData["user"]>) => {
    setUser((prev) => {
      if (!prev) return null;

      // Merge the existing data with the new fields
      const updatedUser = {
        ...prev,
        user: {
          ...prev.user,
          ...newFields,
        },
      };

      // Sync to localStorage so it persists on refresh
      localStorage.setItem("cbt_user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const value = {
    user,
    token, // Now string | null
    isAuthenticated: !!token, // Use token as the source of truth
    isLoading,
    login,
    updateUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* We don't block the children here if we want the token to be 
         available immediately for the ProtectedRoute guard 
      */}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
