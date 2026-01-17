import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface AvatarProps {
  name: string
  size?: number
  backgroundColor?: string
  textColor?: string
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 40, backgroundColor, textColor }) => {
  const { state } = useAppContext();
      const { theme } = state; 
  const styles = createStyles(theme, size, backgroundColor, textColor)

  const getInitials = (name: string): string => {
    const names = name.trim().split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getInitials(name)}</Text>
    </View>
  )
}

const createStyles = (theme: Theme, size: number, bgColor?: string, txtColor?: string) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: bgColor || theme.colors.primaryLight,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: size * 0.4,
      fontWeight: theme.fontWeight.semiBold,
      color: txtColor || theme.colors.primary,
    },
  })

export default Avatar
