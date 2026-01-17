import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"

interface AttendanceSummaryProps {
  present: number
  absent: number
  total: number
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ present, absent, total }) => {
  const { state } = useAppContext();
      const { theme } = state;
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <View style={[styles.statBox, styles.presentBox]}>
        <Text style={styles.presentLabel}>Present</Text>
        <Text style={[styles.statValue, styles.presentValue]}>{present}</Text>
      </View>
      <View style={[styles.statBox, styles.absentBox]}>
        <Text style={styles.absentLabel}>Absent</Text>
        <Text style={[styles.statValue, styles.absentValue]}>{absent}</Text>
      </View>
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{total}</Text>
      </View>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      marginBottom: theme.spacing.lg,
    },
    statBox: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginRight: theme.spacing.sm,
    },
    presentBox: {
      backgroundColor: theme.colors.successLight,
    },
    absentBox: {
      backgroundColor: theme.colors.errorLight,
    },
    totalBox: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      alignItems: "center",
    },
    presentLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.success,
      fontWeight: theme.fontWeight.medium,
    },
    absentLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.error,
      fontWeight: theme.fontWeight.medium,
    },
    totalLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      fontWeight: theme.fontWeight.medium,
    },
    statValue: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      marginTop: theme.spacing.xs,
    },
    presentValue: {
      color: theme.colors.success,
    },
    absentValue: {
      color: theme.colors.error,
    },
    totalValue: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginTop: theme.spacing.xs,
    },
  })

export default AttendanceSummary
