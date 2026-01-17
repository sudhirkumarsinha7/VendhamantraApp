// screens/ProfileScreen.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAppContext } from "../../context/AppContext";
import { createGlobalStyles } from "../../styles/globalStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../../components/scale";
import ProfileCard from "./components/ProfileCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen({ navigation }: any) {
  const { state,dispatch } = useAppContext();
  const styles = createGlobalStyles(state.theme);
const {state :userState} = useAuth()
const {user} =userState
console.log('user '+JSON.stringify(user))
 const handleLogout = async () => {
  try {
    // Clear user token and data from AsyncStorage
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");

    // Update context
    dispatch({ type: "LOGOUT" });

    // Navigate to login screen
    navigation.replace("Login");
  } catch (error) {
    console.error("Logout error:", error);
    Alert.alert("Logout failed", "Please try again.");
  }
};

  const handleDateSelect = (date: number) => {
    console.log("Selected profile date:", date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={[styles.profileSection, { marginTop: state.theme.spacing.xl }]}>
          <View style={{ 
            width: 80, 
            height: 80, 
            borderRadius: 40, 
            backgroundColor: state.theme.colors.primary + "20", 
            alignItems: "center", 
            justifyContent: "center", 
            marginBottom: state.theme.spacing.md 
          }}>
            <Text style={[styles.header, { 
              fontSize: 32, 
              color: state.theme.colors.primary, 
              marginBottom: 0 
            }]}>
              {user?.first_name?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={[styles.header, { marginBottom: scale(2) }]}>{user?.first_name || 'User Name'}</Text>
          <Text style={styles.textSecondary}>{user?.department || 'Department'}</Text>
          <Text style={[styles.textSecondary, { 
            fontSize: state.theme.fontSize.small, 
            marginTop: state.theme.spacing.xs 
          }]}>
            {user?.id || 'STF-XXXX-XXX'}
          </Text>
        </View>

        {/* Personal Information Section */}
        <View style={{ marginBottom: state.theme.spacing.xl }}>
          <Text style={[styles.subHeader, { marginBottom: state.theme.spacing.lg }]}>
            Personal Information
          </Text>
          
          <ProfileCard 
            title="Email"
            value={user?.professional_email || "sarah.johnson@college.edu"}
            theme={state.theme}
          />
          
          <ProfileCard 
            title="Phone"
            value={user?.first_name || "+1 (555) 123-4567"}
            theme={state.theme}
          />
            
          <ProfileCard 
            title="Phone"
            value={user?.phone_number || "+1 (555) 123-4567"}
            theme={state.theme}
          />
        </View>

        {/* Settings Section */}
        <View style={{ marginBottom: state.theme.spacing.xl }}>
          <Text style={[styles.subHeader, { marginBottom: state.theme.spacing.lg }]}>
            Settings
          </Text>
          
          {["Edit Profile", "Privacy & Security", "App Settings"].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.card, 
                { 
                  marginBottom: state.theme.spacing.sm,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: state.theme.spacing.lg
                }
              ]}
              onPress={() => console.log(item)}
            >
              <Text style={styles.text}>{item}</Text>
              <Ionicons name="chevron-forward" size={20} color={state.theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

    

        {/* Sign Out Button */}
        <TouchableOpacity
          style={[styles.button, { 
            backgroundColor: state.theme.colors.error,
            marginBottom: state.theme.spacing.xl
          }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}