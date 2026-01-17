import type React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface TextAreaProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  numberOfLines?: number
  style?: object
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "Enter text...",
  numberOfLines = 4,
  style,
}) => {
  const { state } = useAppContext();
         const { theme } = state;
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.medium,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      minHeight: 100,
    },
  })

export default TextArea
