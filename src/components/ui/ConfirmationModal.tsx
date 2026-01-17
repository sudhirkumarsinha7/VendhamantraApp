import type React from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAppContext } from "../../context/AppContext"
import { fonts } from "../../assets/localImage"

interface ConfirmationModalProps {
  visible: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string,
  profile_id: string
}

const { width } = Dimensions.get("window")

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  profile_id
}) => {
  const { state } = useAppContext()
  const { theme } = state

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.lg,
    },
    modalContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius,
      padding: theme.spacing.xl,
      width: width * 0.85,
      maxWidth: 400,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    iconContainer: {
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.large,
      fontWeight: "600",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: theme.spacing.md,
      fontFamily: fonts.MEDIUM,
    },
    message: {
      fontSize: theme.fontSize.medium,
      color: theme.colors.textSecondary,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: theme.spacing.xl,
      fontFamily: fonts.REGULAR,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: theme.spacing.md,
    },
    button: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    confirmButton: {
      backgroundColor: theme.colors.primary,
    },
    cancelButtonText: {
      fontSize: theme.fontSize.medium,
      fontWeight: "500",
      color: theme.colors.text,
      fontFamily: fonts.REGULAR,
    },
    confirmButtonText: {
      fontSize: theme.fontSize.medium,
      fontWeight: "500",
      color: theme.colors.surface,
      fontFamily: fonts.REGULAR
    },
  })

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Icon name="help-outline" size={50} color={theme.colors.primary} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{'Your Emp ID: '+profile_id}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel} activeOpacity={0.7}>
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm} activeOpacity={0.7}>
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
