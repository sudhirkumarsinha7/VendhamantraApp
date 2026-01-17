import React from "react";
import { View, ViewProps,Platform } from "react-native";
import { useAppContext } from "../../context/AppContext";

interface Card3DProps extends ViewProps {
  children: React.ReactNode;
  elevation?: number;
  intensity?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  elevation = 4,
  intensity = 0.1,
  style,
  ...props
}) => {
  const { state } = useAppContext();
  const { colors, borderRadius } = state.theme;

  // Calculate shadow based on elevation
  const shadowOpacity = intensity;
  const shadowRadius = elevation * 0.5;
  const shadowOffset = { width: 0, height: elevation * 0.5 };

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          borderRadius: borderRadius.lg,
          borderWidth: 1,
          borderColor: colors.background,
          shadowColor: colors.shadow,
          shadowOpacity,
          shadowRadius,
          shadowOffset,
          elevation: Platform.OS === 'android' ? elevation : undefined,
          padding: state.theme.spacing.sm,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};