import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppContext } from "../../context/AppContext";
import { createGlobalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabSwitcher } from "../../components/ui/TabSwitcher";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card3D } from "../../components/ui/Card3D";
import { TextButton } from "../../components/ui/TextButton";
import { LocalImage } from "../../assets/localImage";
import { scale } from "../../components/scale";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";
import { API_CONFIG, REACT_APP_API_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: any) {
  const { state } = useAppContext();
  const { theme } = state;
  const globalStyles = createGlobalStyles(theme);
  const [isStaff, setIsStaff] = useState(true);
  const [loading, setLoading] = useState(false);
const { login } = useAuth();

  const initialValues: LoginFormValues = {
    email: isStaff ? "dbraieatcollege@mailinator.com" : "student@college.edu",
    password: "collegeStaff@3210",
  };

const handleLogin = async (values: LoginFormValues, { setSubmitting }: any) => {
  setLoading(true);

  try {
    const role = isStaff ? "Staff" : "Student";

    const result = await login({
      email: values.email,
      password: values.password,
      role,
    });
console.log('result ',result)
    // if (result.success) {
    //   navigation.replace("Main"); // use navigation from component scope
    // } else {
    //   Alert.alert(
    //     "Login failed",
    //     "Please check your credentials or try again later."
    //   );
    // }
  } catch (error) {
    console.error("Login error:", error);
    Alert.alert("Login failed", "Something went wrong. Please try again.");
  } finally {
    setLoading(false);
    setSubmitting(false);
  }
};


  // const handleLogin = async (values: LoginFormValues, { setSubmitting }: any) => {
  //   setLoading(true);

  //   // Simulate login process
  //   setTimeout(() => {
  //     dispatch({
  //       type: "LOGIN",
  //       payload: {
  //         id: "1",
  //         name: isStaff ? "Sarah Johnson" : "John Student",
  //         email: values.email,
  //         department: isStaff ? "Computer Science" : "Engineering",
  //         staffId: isStaff ? "STF-2024-001" : "STU-2024-001",
  //         phone: "+1 (555) 123-4567",
  //         role: isStaff ? "staff" : "student",
  //       },
  //     });
  //     setLoading(false);
  //     setSubmitting(false);
  //     navigation.replace("Main");
  //   }, 1000);
  // };

  const handleTabChange = (tabId: string) => {
    if (tabId === "staff" || tabId === "student") {
      setIsStaff(tabId === "staff");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={[
            globalStyles.content,
            { justifyContent: "center", paddingHorizontal: 24 },
          ]}
        >
          <Card3D elevation={8} intensity={0.15}>
            <View style={globalStyles.cardContent}>
              <Image
                source={isStaff ? LocalImage.staff : LocalImage.student}
                style={{
                  width: scale(50),
                  height: scale(50),
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
              <Text style={globalStyles.headerCenter}>Welcome back</Text>

              <Text style={[globalStyles.textSecondary, globalStyles.mbXL]}>
                Enter your credentials to access the {isStaff ? "staff" : "student"} portal
              </Text>

              {/* Tab Switcher */}
              <View style={globalStyles.mbXL}>
                <TabSwitcher
                  tabs={[
                    { id: "staff", label: "Staff" },
                    { id: "student", label: "Student" },
                  ]}
                  activeTab={isStaff ? "staff" : "student"}
                  onTabChange={handleTabChange}
                />
              </View>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
                enableReinitialize
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <View>
                      <Input
                        label={`${isStaff ? "Staff" : "Student"} Email`}
                        placeholder={`${isStaff ? "staff" : "student"}@college.edu`}
                        value={values.email}
                        onChangeText={(text) => {
                          setFieldValue("email", text);
                        }}
                        onBlur={handleBlur("email")}
                        error={touched.email && errors.email ? errors.email : undefined}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        required
                      />

                      <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        error={touched.password && errors.password ? errors.password : undefined}
                        secureTextEntry
                        required
                      />

                    {/* Forgot Password */}
                    <View style={[globalStyles.rowEnd, globalStyles.mbXL]}>
                      <TextButton
                        title="Forgot password?"
                        onPress={() => console.log("Forgot Password Pressed")}

                        // onPress={() => navigation.navigate("ForgotPassword")}
                      />
                    </View>

                    {/* Login Button */}
                    <Button
                      title={`${isStaff ? "Staff" : "Student"} Login`}
                      onPress={handleSubmit}
                      loading={loading}

                      leftIcon={<Entypo name="login" size={scale(15)} color={theme.colors.white} style={{ marginRight: scale(10) }} />}
                    />

                    {/* Footer Info */}
                    <View style={[globalStyles.rowCenter, globalStyles.mtXL]}>
                      <Text style={[
                        globalStyles.textSecondary,
                        globalStyles.textSmall,
                        { textAlign: 'center' }
                      ]}>
                        Protected by secure {isStaff ? "staff" : "student"} authentication system
                      </Text>
                    </View>

                    <View style={[globalStyles.rowCenter, globalStyles.mtSM]}>
                      <Text style={[
                        globalStyles.textSecondary,
                        globalStyles.textSmall,
                        { textAlign: 'center' }
                      ]}>
                        Contact IT support for access issues.
                      </Text>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </Card3D>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}