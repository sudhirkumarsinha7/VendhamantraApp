import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../../context/AppContext";
import { createGlobalStyles } from "../../styles/globalStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../../components/scale";

export default function ClassesScreen() {
  const { state } = useAppContext();
  const styles = createGlobalStyles(state.theme);

  const classes = [
    {
      id: "001",
      name: "Physics",
      time: "9:00 am - 9:50 am",
      attendance: 86,
      status: "completed" as const,
      semester: "2nd sem, A Sec",
      code: "MPC",
    },
    {
      id: "002",
      name: "Chemistry",
      time: "10:00 am - 10:50 am",
      attendance: "Pending",
      status: "pending" as const,
      semester: "4th sem, B Sec",
      code: "LAB 1",
    },
    {
      id: "003",
      name: "Mathematics",
      time: "11:00 am - 11:50 am",
      status: "ongoing" as const,
      semester: "2nd sem, C Sec",
      code: "MPEC",
    },
    {
      id: "004",
      name: "Biology",
      time: "12:00 pm - 12:50 pm",
      status: "pending" as const,
      semester: "6th sem, D Sec",
      code: "MCC",
    },
    {
      id: "005",
      name: "History",
      time: "1:00 pm - 1:50 pm",
      status: "pending" as const,
      semester: "3rd sem, E Sec",
      code: "HIS",
    },
  ];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={{ marginVertical: state.theme.spacing.xl }}>
          <Text style={styles.header}>Classes</Text>
          <Text style={styles.textSecondary}>Today - {currentDate}</Text>
        </View>

        {classes.map((classItem) => (
          <View key={classItem.id} style={[styles.card, { marginBottom: state.theme.spacing.md }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: state.theme.spacing.sm }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.subHeader, { marginBottom: scale(2), color: state.theme.colors.primary }]}>
                  {classItem.name} - #{classItem.id}
                </Text>
                <Text style={[styles.text, { marginBottom: state.theme.spacing.xs }]}>{classItem.time}</Text>
                <Text style={styles.textSecondary}>{classItem.code} ● {classItem.semester}</Text>
              </View>
              {classItem.attendance && (
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={[styles.text, { fontWeight: "600" }]}>Attendance</Text>
                  <Text style={[styles.text, { color: typeof classItem.attendance === "number" ? state.theme.colors.success : state.theme.colors.warning }]}>
                    {typeof classItem.attendance === "number" ? `${classItem.attendance}%` : classItem.attendance}
                  </Text>
                </View>
              )}
            </View>

            {classItem.status === "ongoing" && (
              <TouchableOpacity
                style={[
                  styles.button,
                  { paddingVertical: state.theme.spacing.sm, marginTop: state.theme.spacing.sm },
                ]}
              >
                <Text style={styles.buttonText}>Mark Attendance</Text>
              </TouchableOpacity>
            )}

            {classItem.status === "completed" && (
              <View style={[styles.attendanceBadge, { backgroundColor: state.theme.colors.success + "20" }]}>
                <Text style={[styles.text, { color: state.theme.colors.success, fontSize: state.theme.fontSize.small }]}>
                  Completed
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}