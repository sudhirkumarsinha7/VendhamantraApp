import type React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAppContext } from "../../context/AppContext"
import { fonts } from "../../assets/localImage"

interface CheckboxProps {
  label?: string
  checked: boolean
  onPress: () => void
  disabled?: boolean
  containerStyle?: object
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onPress, disabled = false, containerStyle }) => {
  const { state } = useAppContext()
  const { theme } = state

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: theme.spacing.sm,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: checked ? theme.colors.primary : theme.colors.border,
      backgroundColor: checked ? theme.colors.primary : "transparent",
      alignItems: "center",
      justifyContent: "center",
      marginRight: theme.spacing.sm,
    },
    label: {
      fontSize: theme.fontSize.medium,
      color: disabled ? theme.colors.textSecondary : theme.colors.text,
      flex: 1,
      fontFamily: fonts.MEDIUM,
    },
  })

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>{checked && <Icon name="check" size={16} color="#FFFFFF" />}</View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  )
}
