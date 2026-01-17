import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"

interface DatePickerProps {
  date: Date
  onPrevious: () => void
  onNext: () => void
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onPrevious, onNext }) => {
 const { state } = useAppContext();
    const { theme } = state;
  const styles = createStyles(theme)

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.arrowBtn}>
        <Icon name="chevron-back" size={20} color={theme.colors.text} />
      </TouchableOpacity>
      <View style={styles.dateContainer}>
        <Icon name="calendar-outline" size={18} color={theme.colors.textSecondary} />
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
      <TouchableOpacity onPress={onNext} style={styles.arrowBtn}>
        <Icon name="chevron-forward" size={20} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.full,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    arrowBtn: {
      padding: theme.spacing.xs,
    },
    dateContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    dateText: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.medium,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
  })

export default DatePicker
