import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface StatusBadgeProps {
  status: "completed" | "ongoing" | "pending" | "approved" | "rejected"
  label?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const { state } = useAppContext();
      const { theme } = state; 
  

  const getStatusConfig = () => {
    switch (status) {
      case "completed":
      case "approved":
        return {
          bg: theme.colors.successLight,
          text: theme.colors.success,
          label: label || (status === "completed" ? "Completed" : "Approved"),
        }
      case "ongoing":
        return {
          bg: theme.colors.primaryLight,
          text: theme.colors.white,
          label: label || "Ongoing",
        }
      case "pending":
        return {
          bg: theme.colors.warningLight,
          text: theme.colors.warning,
          label: label || "Pending",
        }
      case "rejected":
        return {
          bg: theme.colors.errorLight,
          text: theme.colors.error,
          label: label || "Rejected",
        }
      default:
        return {
          bg: theme.colors.border,
          text: theme.colors.textSecondary,
          label: label || status,
        }
    }
  }

  const config = getStatusConfig()
  const styles = createStyles(theme, config.bg, config.text)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{config.label}</Text>
    </View>
  )
}

const createStyles = (theme: Theme, bgColor: string, textColor: string) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.borderRadius.sm,
      backgroundColor: bgColor,
    },
    text: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.medium,
      color: textColor,
    },
  })

export default StatusBadge
