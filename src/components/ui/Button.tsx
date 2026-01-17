import React from "react"
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  type TouchableOpacityProps,
} from "react-native"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "filled" | "outlined" | "text"
  size?: "small" | "medium" | "large"
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "filled",
  size = "medium",
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  onPress,
  style,
  ...props
}) => {
  const { state } = useAppContext()
  const styles = createGlobalStyles(state.theme)

  const buttonStyle = [
    styles.buttonBaseV2,
    size === "small"
      ? styles.buttonSmallV2
      : size === "large"
      ? styles.buttonLargeV2
      : styles.buttonMediumV2,
    variant === "filled" && styles.buttonFilledV2,
    variant === "outlined" && styles.buttonOutlinedV2,
    variant === "text" && styles.buttonTextV2,
    disabled && styles.buttonDisabledV2,
    style,
  ]

  const textStyle = [
    styles.buttonTextBaseV2,
    size === "small"
      ? styles.buttonTextSmallV2
      : size === "large"
      ? styles.buttonTextLargeV2
      : styles.buttonTextMediumV2,
    variant === "filled"
      ? styles.buttonTextFilledV2
      : styles.buttonTextOutlinedV2,
    disabled && styles.buttonTextDisabledV2,
  ]

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.7}
      disabled={disabled || loading}
      onPress={loading ? undefined : onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={state.theme.colors.surface} />
      ) : (
        <>
          {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}

          <Text style={textStyle}>{title}</Text>

          {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  )
}
