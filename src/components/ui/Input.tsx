"use client"

import type React from "react"
import { useState } from "react"
import { View, TextInput, Text, StyleSheet, TouchableOpacity, type TextInputProps } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { createComponentStyles } from "../../styles/componentStyles"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  leftIcon?: string
  rightIcon?: string
  onRightIconPress?: () => void
  containerStyle?: object
  inputStyle?: object
  maxLength?: number
  disabled?: boolean
  required?: boolean
  mandatory?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  secureTextEntry,
  maxLength = 100,
  required,
  disabled = false,
  mandatory = false,
  ...props

}) => {
  const { state } = useAppContext()
  const { theme } = state
  const componentStyles = createComponentStyles(theme)

  const [isSecure, setIsSecure] = useState(secureTextEntry)
  const [isFocused, setIsFocused] = useState(false)

  const styles = StyleSheet.create({

    inputContainer: {
      ...componentStyles.inputContainer,
      borderColor: error && required ? theme.colors.error : isFocused ? theme.colors.primary : theme.colors.border,

    },

  })

  const handleSecureToggle = () => {
    setIsSecure(!isSecure)
  }
  const globalStyles = createGlobalStyles(theme)

  return (
    <View style={[componentStyles.container, containerStyle]}>
      {label && <Text style={componentStyles.label}>{label}
        {mandatory && <Text style={{ color: theme.colors.error }}> *</Text>}
      </Text>}
      <View style={styles.inputContainer}>
        {leftIcon && <MaterialIcons name={leftIcon} size={20} color={theme.colors.textSecondary} style={componentStyles.icon} />}
        <TextInput
          style={[componentStyles.input, inputStyle, { color: disabled ? theme.colors.textSecondary : theme.colors.text }]}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.textSecondary}
          editable={!disabled}
          {...props}
          keyboardType={props.keyboardType || "default"}
          maxLength={maxLength || 100}
          placeholder={props.placeholder}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={handleSecureToggle} testID='eye-icon' style={componentStyles.icon}>
            <MaterialIcons name={isSecure ? "visibility-off" : "visibility"} size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity onPress={onRightIconPress} style={componentStyles.icon}>
            <MaterialIcons name={rightIcon} size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {required && error && <Text style={globalStyles.textError}>{error}</Text>}


    </View>
  )
}
