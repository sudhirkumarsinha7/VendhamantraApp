import type React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { useAppContext } from "../../context/AppContext"
import { fonts } from "../../assets/localImage"

interface RadioButtonProps {
  label?: string
  selected: boolean
  onPress: () => void
  disabled?: boolean
  containerStyle?: object
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
  disabled = false,
  containerStyle,
}) => {
  const { state } = useAppContext()
  const { theme } = state

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: theme.spacing.sm,
    },
    radio: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: selected ? theme.colors.primary : theme.colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginRight: theme.spacing.sm,
    },
    radioInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: theme.colors.primary,
    },
    label: {
      fontSize: theme.fontSize.medium,
      color: disabled ? theme.colors.textSecondary : theme.colors.text,
      flex: 1,
      fontFamily: fonts.MEDIUM
    },
  })

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.radio}>{selected && <View style={styles.radioInner} />}</View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  )
}
