import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"

interface LeaveBalanceCardProps {
  type: string
  available: number
  total: number
  color: string
  bgColor: string
}

const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ type, available, total, color, bgColor }) => {
  const { state } = useAppContext();
     const { theme } = state;
  const styles = createStyles(theme)

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={[styles.type, { color }]}>{type}</Text>
      <View style={styles.countRow}>
        <Text style={[styles.available, { color }]}>{available}</Text>
        <Text style={[styles.total, { color }]}>/{total}</Text>
      </View>
      <Text style={[styles.label, { color }]}>Available</Text>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginRight: theme.spacing.sm,
      minWidth: 100,
    },
    type: {
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.medium,
      marginBottom: theme.spacing.sm,
    },
    countRow: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    available: {
      fontSize: theme.fontSize.xxxl,
      fontWeight: theme.fontWeight.bold,
    },
    total: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.regular,
    },
    label: {
      fontSize: theme.fontSize.sm,
      marginTop: theme.spacing.xs,
    },
  })

export default LeaveBalanceCard
