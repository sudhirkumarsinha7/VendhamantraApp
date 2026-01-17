// components/ui/TextButton.tsx
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../context/AppContext"

interface TextButtonProps {
  title: string
  onPress: () => void
  disabled?: boolean
  textStyle?: object
  containerStyle?: object
}

export const TextButton: React.FC<TextButtonProps> = ({
  title,
  onPress,
  disabled = false,
  textStyle,
  containerStyle,
}) => {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[{ alignSelf: 'flex-start' }, containerStyle]}
    >
      <Text style={[
        styles.text,
        { 
          color: disabled ? theme.colors.textSecondary : theme.colors.primary,
          fontSize: theme.fontSize.medium,
        },
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'none',
    fontWeight: '400',
  }
})