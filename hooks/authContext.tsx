"use client"
import React, { useState, createContext, useContext, useEffect, ReactNode } from "react";

// Define the type for your user object
type User = {
  user_id: string;
  username: string;
  email: string;
  f_name: string;
  l_name: string;
  phone_number: string;
  address: string;
  roles: string[];
};

type AuthContextType = {
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      if (typeof window !== "undefined") {
        // Check if running on the client
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      }
      return null; // Return null for SSR
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Check if running on the client
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // Handle the error more gracefully, e.g., show a notification to the user
    }
  }, [user]);

  const login = (newUser: User) => setUser(newUser);
  const logout = () => {
    setUser(null);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // Handle the error more gracefully, e.g., show a notification to the user
    }
  };

  const contextValue: AuthContextType = {
    login,
    logout,
    user,
  };

  return (
    <React.StrictMode>
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    </React.StrictMode>
  )
};

