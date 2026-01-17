import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import type { Theme } from "../../types"
import { createGlobalStyles } from "../../styles/globalStyles"
import { fonts } from "../../assets/localImage"

interface ProgressBarProps {
  progress: number
  theme: Theme
  height?: number
  showPercentage?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, theme, height = 8, showPercentage = false }) => {
  const globalStyles = createGlobalStyles(theme)
  const styles = createStyles(theme, height)

  return (
    <View style={styles.container}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      {showPercentage && <Text style={[globalStyles.textSecondary, styles.percentageText]}>{progress}%</Text>}
    </View>
  )
}

const createStyles = (theme: Theme, height: number) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    progressBackground: {
      flex: 1,
      height,
      backgroundColor: theme.colors.border,
      borderRadius: height / 2,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: height / 2,
    },
    percentageText: {
      marginLeft: theme.spacing.sm,
      fontSize: theme.fontSize.small,
      minWidth: 35,
      fontFamily: fonts.MEDIUM,
    },
  })
