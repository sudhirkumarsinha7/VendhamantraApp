import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../../context/AppContext"
import { StatusBadge } from "../../../components/common"
import { Theme } from "../../../types"
import type { LeaveApplication } from "../../../types"

interface LeaveApplicationCardProps {
  application: LeaveApplication,
}

const LeaveApplicationCard: React.FC<LeaveApplicationCardProps> = ({ application }) => {
 const { state } = useAppContext();
    const { theme } = state;
  const styles = createStyles(theme)

  const isPermission = application.type.toLowerCase() === "permission"

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.type}>
            {application.type}
            {isPermission && application.duration && <Text style={styles.duration}> ({application.duration})</Text>}
          </Text>
          <StatusBadge status={application.status} />
        </View>
        <Text style={styles.date}>
          {isPermission && application.startTime && application.endTime
            ? `${application.startDate}, ${application.startTime} - ${application.endTime}`
            : `${application.startDate} - ${application.endDate}`}
        </Text>
        {application.reason && <Text style={styles.reason}>"{application.reason}"</Text>}
      </View>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    content: {},
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.sm,
    },
    type: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
    },
    duration: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.regular,
      color: theme.colors.textSecondary,
    },
    date: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    reason: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textLight,
      fontStyle: "italic",
    },
  })

export default LeaveApplicationCard
