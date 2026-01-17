import type { Theme } from "../types";
import { Platform } from "react-native";
import { scale } from "../components/scale";

export const lightTheme: Theme = {
  colors: {
    primary: "#155DFC",
    secondary: "#5856D6",
    surface: "#F2F2F7",
    card: "#FFFFFF",
    text: "#000000",
    textSecondary: "#8E8E93",
    border: "#C6C6C8",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
    info: "#5AC8FA",
     disabled: 'gray',
    background: '#FFFFFF',
    white: "#FFFFFF",

  },
  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(20),
    xxl: scale(24),
  },
  fontSize: {
    small: scale(12),
    medium: scale(14),
    large: scale(16),
    xlarge: scale(18),
    xxlarge: scale(24),
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 28,
    
  },
  borderRadius: {
    sm: scale(4),
    md: scale(8),
    lg: scale(12),
    xl: scale(16),
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: "#155DFC",
    secondary: "#5E5CE6",
    background: "#000000",
    card: "#1C1C1E",
    text: "#FFFFFF",
    textSecondary: "#8E8E93",
    border: "#38383A",
    success: "#30D158",
    warning: "#FF9F0A",
    error: "#FF453A",
    info: "#64D2FF",
     disabled: 'gray',
    surface: '#FFFFFF',
    white: "#FFFFFF",

  },
  spacing: { ...lightTheme.spacing },
  fontSize: { ...lightTheme.fontSize },
  borderRadius: { ...lightTheme.borderRadius },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};