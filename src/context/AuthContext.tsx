"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { API_CONFIG } from "../config/api";
import { useAppContext } from "./AppContext";

// -------------------- Types --------------------
interface User {
  id: string;
  name: string;
  email: string;
  [key :string]:any,
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  role: string | null;
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isInitialized: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  role: null,
  user: null,
  isAuthenticated: false,
  error: null,
  isInitialized: false,
  isLoading: false,
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { token: string; role: string; user: User } }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "RESTORE_SESSION"; payload: { token: string; role: string; user: User } }
  | { type: "SET_INITIALIZED"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean };

// -------------------- Auth Context --------------------
const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: { email: string; password: string; role: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  login: async () => false,
  logout: async () => {},
  dispatch: () => {},
});

// -------------------- Auth Provider --------------------
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer((state: AuthState, action: AuthAction) => {
    switch (action.type) {
      case "SET_LOADING":
        return { ...state, isLoading: action.payload };
      case "LOGIN_SUCCESS":
        return { ...state, ...action.payload, isAuthenticated: true, error: null, isLoading: false };
      case "LOGIN_ERROR":
        return { ...state, error: action.payload, isLoading: false };
      case "LOGOUT":
        return { ...initialState };
      case "RESTORE_SESSION":
        return { ...state, ...action.payload, isAuthenticated: true, isLoading: false };
      case "SET_INITIALIZED":
        return { ...state, isInitialized: action.payload };
      default:
        return state;
    }
  }, initialState);

  // Access AppContext to update shared loading state
  const { dispatch: appDispatch } = useAppContext();

  // Helper to update both AuthState and AppContext isLoading
  const setLoading = (value: boolean) => {
    dispatch({ type: "SET_LOADING", payload: value });
    appDispatch({ type: "SET_LOADING", payload: value });
  };

  // -------------------- Restore session --------------------
  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("authToken");
        const role = await AsyncStorage.getItem("role");
        const userString = await AsyncStorage.getItem("user");

        if (token && role && userString) {
          const decoded: DecodedToken = jwtDecode(token);
          const now = Math.floor(Date.now() / 1000);

          if (!decoded.exp || decoded.exp <= now) {
            await clearStorage();
            dispatch({ type: "LOGOUT" });
          } else {
            const user: User = JSON.parse(userString);
            dispatch({ type: "RESTORE_SESSION", payload: { token, role, user } });
          }
        }
      } catch (err) {
        console.log("Restore session error", err);
        dispatch({ type: "LOGOUT" });
      } finally {
        dispatch({ type: "SET_INITIALIZED", payload: true });
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const clearStorage = async () => {
    await AsyncStorage.multiRemove(["authToken", "role", "user"]);
  };

  // -------------------- Login --------------------
  const login = async ({ email, password, role }: { email: string; password: string; role: string }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_CONFIG.BASE_URL.app}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        email,
        password,
        role,
      });
      const data = res.data?.data;
      if (!data || !data.token) throw new Error("Invalid response");

      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("role", role);
      await AsyncStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: "LOGIN_SUCCESS", payload: { token: data.token, role, user: data } });
      return true;
    } catch (err: any) {
      dispatch({ type: "LOGIN_ERROR", payload: err.response?.data?.message || err.message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Logout --------------------
  const logout = async () => {
    setLoading(true);
    await clearStorage();
    dispatch({ type: "LOGOUT" });
    setLoading(false);
  };

  return <AuthContext.Provider value={{ state, login, logout,dispatch }}>{children}</AuthContext.Provider>;
};

// -------------------- Hook --------------------
export const useAuth = () => useContext(AuthContext);
