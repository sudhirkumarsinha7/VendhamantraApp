import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import VersionNumber from "react-native-version-number";
import VersionCheck from "react-native-version-check";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.visaka.atumanalytics";

const APP_STORE_URL =
  "https://apps.apple.com/in/app/atum-analytics/id6749880368";

export const ForceUpdateWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skippedUpdate, setSkippedUpdate] = useState(false);

  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    try {
      const provider = Platform.OS === "ios" ? "appStore" : "playStore";
      const storeVersion = await VersionCheck.getLatestVersion({ provider });

      console.log("Store version:", storeVersion);

      const localVersion = VersionNumber.appVersion;
      console.log("Local version:", localVersion);

      if (storeVersion && isVersionLower(localVersion, storeVersion)) {
        setShowUpdateModal(true);
      }
    } catch (error:any) {
      console.log("Failed to fetch store version", error);
    } finally {
      setLoading(false);
    }
  };

  const isVersionLower = (local: string, store: string): boolean => {
    const localParts = local.split(".").map(Number);
    const storeParts = store.split(".").map(Number);

    for (let i = 0; i < storeParts?.length; i++) {
      if ((localParts[i] || 0) < storeParts[i]) return true;
      if ((localParts[i] || 0) > storeParts[i]) return false;
    }
    return false;
  };

  const openStore = () => {
    const url = Platform.OS === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    Linking.openURL(url);
  };

  const skipUpdate = () => {
    setShowUpdateModal(false);
    setSkippedUpdate(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (showUpdateModal && !skippedUpdate) {
    return (
      <Modal visible transparent animationType="fade">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Update Required</Text>
            <Text style={styles.message}>
              A new version of the app is available. Please update to continue.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={openStore}>
                <Text style={styles.buttonText}>Update Now</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={[styles.button, styles.skipButton]}
                onPress={skipUpdate}
              >
                <Text style={styles.buttonText}>Maybe Later</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  title: {
    color: "#000",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  message: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#ff6f00",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  skipButton: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
