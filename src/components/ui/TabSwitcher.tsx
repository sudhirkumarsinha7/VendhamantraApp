import React from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { useAppContext } from "../../context/AppContext";

interface Tab {
  id: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const { state } = useAppContext();
  const { colors, spacing, borderRadius } = state.theme;

  return (
    <View style={{
      flexDirection: "row",
      backgroundColor: colors.surface || "#E8E8E8", // Gray background
      borderRadius: borderRadius.xl,
      padding: 4,
      // Inset/embossed container effect
      borderColor: "rgba(0,0,0,0.1)",
      borderTopColor: "rgba(255,255,255,0.6)",
      borderLeftColor: "rgba(255,255,255,0.6)",
      borderRightColor: "rgba(0,0,0,0.1)",
      borderBottomColor: "rgba(0,0,0,0.2)",
    }}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={{
              flex: 1,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.lg,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isActive ? colors.background : "transparent",
              borderRadius: borderRadius.md,
              // 3D pressed/raised effect
              ...(isActive ? {
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                borderColor: "rgba(0,0,0,0.05)",
                borderTopColor: "rgba(255,255,255,0.9)",
                borderLeftColor: "rgba(255,255,255,0.9)",
              } : {
                // Inactive tabs have inset effect
                borderColor: "transparent",
                borderTopColor: "rgba(0,0,0,0.1)",
                borderLeftColor: "rgba(0,0,0,0.1)",
                borderRightColor: "rgba(255,255,255,0.6)",
                borderBottomColor: "rgba(255,255,255,0.6)",
              }),
            }}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: isActive ? "600" : "400",
                color: isActive ? colors.primary : colors.textSecondary,
                textShadowColor: isActive ? "rgba(0,0,0,0.1)" : "transparent",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: isActive ? 1 : 0,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};