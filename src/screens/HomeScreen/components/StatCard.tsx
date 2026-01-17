import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"

interface StatCardProps {
  icon: string
  label: string
  value: string | number
  subValue?: string
  bgColor?: string       // optional, fallback to theme.colors.card
  iconColor?: string     // optional, fallback to theme.colors.primary
  textColor?: string     // optional, fallback to theme.colors.text
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subValue,
  bgColor,
  iconColor,
  textColor,
}) => {
  const { state } = useAppContext()
  const { theme } = state

  // Use parent colors if provided, otherwise theme defaults
  const finalBgColor = bgColor || theme.colors.card
  const finalIconColor = iconColor || theme.colors.primary
  const finalTextColor = textColor || theme.colors.text

  const styles = createStyles(theme, finalBgColor, finalTextColor)

  return (
    <View style={styles.container}>
      <Icon name={icon} size={24} color={finalIconColor} />
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {subValue && <Text style={styles.subValue}>{subValue}</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const createStyles = (theme: Theme, bgColor: string, textColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: bgColor,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginRight: theme.spacing.md,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    valueRow: {
      flexDirection: "row",
      alignItems: "baseline",
      marginTop: theme.spacing.md,
    },
    value: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: textColor,
    },
    subValue: {
      fontSize: theme.fontSize.md,
      color: textColor,
      marginLeft: 2,
    },
    label: {
      fontSize: theme.fontSize.sm,
      color: textColor,
      marginTop: theme.spacing.xs,
    },
  })

export default StatCard
