import { Theme, ThemeType } from "../types";

/**
 * Dark theme map style matching darkTheme colors
 */
export const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1C1C1E" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8E8E93" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#38383A" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#2C2C2E" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2C2C2E" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
];

/**
 * Blue theme map style matching blueTheme colors
 */
export const blueMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#E2E8F0" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#475569" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#CBD5E1" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#CBD5E1" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#E0E7FF" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#CBD5E1" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#CDE6FF" }],
  },
];

/**
 * Utility function to return map style based on active theme
 */

export const getMapStyle =  (theme: ThemeType) => {
  switch (theme) {
    case "dark":
      return darkMapStyle;
    case "blue":
      return blueMapStyle;
    case "light":
    default:
      return []; // default Google Maps style
  }
};
