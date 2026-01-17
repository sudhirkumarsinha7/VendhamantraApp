import React from "react";
import { View, Text } from "react-native";
import { useAppContext } from "../../context/AppContext";
import { createGlobalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
  const { state } = useAppContext();
  const { theme } = state;
  const globalStyles = createGlobalStyles(theme);

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={[globalStyles.card]}>
        <Text style={[globalStyles.textPrimary, { fontSize: 20 }]}>
          Welcome to the Home Screen!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
