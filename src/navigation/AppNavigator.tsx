import "react-native-gesture-handler";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ClassesScreen from "../screens/ClassesScreen";
import MyAttendanceScreen from "../screens/MyAttendanceScreen";
import LeavesScreen from "../screens/LeavesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AttendanceDetailScreen from "../screens/AttendanceDetailScreen";

import { AuthProvider, useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main bottom tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "help-outline";

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Classes":
              iconName = "people-outline";
              break;
            case "MyLog":
              iconName = "calendar-outline";
              break;
            case "Leaves":
              iconName = "document-text-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Classes" component={ClassesScreen} />
      <Tab.Screen name="MyLog" component={MyAttendanceScreen} />
      <Tab.Screen name="Leaves" component={LeavesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navigator with authentication guard
function Navigator() {
  const { state } = useAuth();
  const { isInitialized, isAuthenticated, role, isLoading } = state;

  // Show splash/loading while checking token
  if (!isInitialized || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            {/* Main bottom tabs */}
            <Stack.Screen name="Main" component={MainTabs} />

            {/* Additional screens */}
            <Stack.Screen
              name="AttendanceDetail"
              component={AttendanceDetailScreen}
            />
                      <Stack.Screen name="Login" component={LoginScreen} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap everything in AuthProvider
export default function AppNavigator() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
