import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface InfoBarProps {
  label: string
  value: string
  backgroundColor?: string
  valueColor?: string
  style?: object
}

const InfoBar: React.FC<InfoBarProps> = ({ label, value, backgroundColor, valueColor, style }) => {
 const { state } = useAppContext();
        const { theme } = state;
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, backgroundColor && { backgroundColor }, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueColor && { color: valueColor }]}>{value}</Text>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#FEF9C3",
      borderRadius: theme.borderRadius.lg,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    label: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
    },
    value: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
      color: "#CA8A04",
    },
  })

export default InfoBar
