import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"
import LinearGradient from "react-native-linear-gradient"

interface AttendanceStatusCardProps {
  status: "present" | "absent"
  checkInTime: string
}

const AttendanceStatusCard: React.FC<AttendanceStatusCardProps> = ({ status, checkInTime }) => {
 const { state } = useAppContext();
    const { theme } = state;
  const styles = createStyles(theme)
  const isPresent = status === "present"

  return (
    <LinearGradient
  colors={['#155DFC', '#4F39F6']} 
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{ borderRadius: theme.borderRadius.lg }}
>
     <View style={styles.container}>
      <Text style={styles.title}>Today's Attendance</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.status}>{isPresent ? "Present" : "Absent"}</Text>
          <Text style={styles.checkIn}>Check-in: {checkInTime}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name={isPresent ? "checkmark-circle" : "close-circle"} size={32} color={theme.colors.white} />
        </View>
      </View>
    </View>
    </LinearGradient>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      // backgroundColor: theme.colors.primary,
      // borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.white,
      opacity: 0.9,
      marginBottom: theme.spacing.sm,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    status: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.white,
    },
    checkIn: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.white,
      opacity: 0.9,
      marginTop: theme.spacing.xs,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "rgba(255,255,255,0.2)",
      alignItems: "center",
      justifyContent: "center",
    },
  })

export default AttendanceStatusCard
