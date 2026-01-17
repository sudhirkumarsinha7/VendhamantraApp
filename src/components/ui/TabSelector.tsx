import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { createGlobalStyles } from '../../styles/globalStyles';
import { useAppContext } from '../../context/AppContext';

interface TabSelectorProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabPress: (tab: string) => void;
  counts?: { [key: string]: number }; // Optional counts for each tab
}

export const TabSelector: React.FC<TabSelectorProps> = ({ tabs, activeTab, onTabPress,counts={} }) => {
  const { state } = useAppContext();
  const { theme } = state;
  const globalStyles = createGlobalStyles(theme);

  return (
    <View style={globalStyles.tabContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={globalStyles.tabScrollContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              globalStyles.tab,
              activeTab === tab.key && globalStyles.activeTab,
            ]}
            onPress={() => onTabPress(tab.key)}
          >
            <Text
              style={[
                globalStyles.tabText,
                activeTab === tab.key && globalStyles.activeTabText,
              ]}
            >
              {tab.label}{counts[tab.key] !== undefined ? ` (${counts[tab.key]})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
