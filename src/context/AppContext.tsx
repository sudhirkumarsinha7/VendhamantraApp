import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "../styles/themes";

type ThemeType = "light" | "dark";
type Language = "en" | "es" | "fr";

interface AppState {
  themeType: ThemeType;
  theme: typeof themes.light;
  language: Language;
  isLoading: boolean; // shared loading state
}

const initialState: AppState = {
  themeType: "light",
  theme: themes.light,
  language: "en",
  isLoading: false,
};

type AppAction =
  | { type: "SET_THEME"; payload: ThemeType }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "SET_LOADING"; payload: boolean };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, themeType: action.payload, theme: themes[action.payload] };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadSettings = async () => {
      const theme = (await AsyncStorage.getItem("themeType")) as ThemeType;
      const language = (await AsyncStorage.getItem("language")) as Language;
      if (theme) dispatch({ type: "SET_THEME", payload: theme });
      if (language) dispatch({ type: "SET_LANGUAGE", payload: language });
    };
    loadSettings();
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
