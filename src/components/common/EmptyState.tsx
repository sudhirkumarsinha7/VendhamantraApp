import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAppContext } from "../../context/AppContext"
import { fonts } from "../../assets/localImage"

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  actionText?: string
  onActionPress?: () => void
  illustration?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "inbox",
  title,
  description,
  actionText,
  onActionPress,
  illustration,
}) => {
  const { state } = useAppContext()
  const { theme } = state

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.xl,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.large,
      fontWeight: "500",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: theme.spacing.sm,
      fontFamily:fonts.MEDIUM
    },
    description: {
      fontSize: theme.fontSize.medium,
      color: theme.colors.textSecondary,
      fontWeight:'400',
      textAlign: "center",
      lineHeight: 22,
      marginBottom: theme.spacing.xl,
      fontFamily:fonts.REGULAR
    },
    actionButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius,
    },
    actionText: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.medium,
      fontWeight: "600",
      fontFamily:fonts.REGULAR
    },
  })

  return (
    <View style={styles.container}>
      {illustration || (
        <View style={styles.iconContainer}>
          <Icon name={icon} size={40} color={theme.colors.textSecondary} />
        </View>
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionText && onActionPress && (
        <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
