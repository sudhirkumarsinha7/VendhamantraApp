"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface CalendarPickerProps {
  label?: string
  value: Date
  onChange: (date: Date) => void
  placeholder?: string
  style?: object
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select date",
  style,
}) => {
  const { state } = useAppContext();
  const { theme } = state;
  const styles = createStyles(theme)
  const [visible, setVisible] = useState(false)
  const [viewDate, setViewDate] = useState(value || new Date())

  const formatDate = (date: Date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  const handleSelectDate = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    onChange(newDate)
    setVisible(false)
  }

  const renderCalendar = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = value && value.getDate() === day && value.getMonth() === month && value.getFullYear() === year

      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, isSelected && styles.selectedDay]}
          onPress={() => handleSelectDate(day)}
        >
          <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
        </TouchableOpacity>,
      )
    }

    return days
  }

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)} activeOpacity={0.7}>
        <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
        <Text style={[styles.text, !value && styles.placeholder]}>{value ? formatDate(value) : placeholder}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            {/* Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
                <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles.monthYear}>
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </Text>
              <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
                <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {/* Day headers */}
            <View style={styles.daysHeader}>
              {DAYS.map((day) => (
                <View key={day} style={styles.dayHeaderCell}>
                  <Text style={styles.dayHeaderText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={styles.calendarGrid}>{renderCalendar()}</View>
          </View>
        </Pressable>
      </Modal>
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
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      minHeight: 48,
      gap: theme.spacing.sm,
    },
    text: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      flex: 1,
    },
    placeholder: {
      color: theme.colors.textSecondary,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: theme.spacing.lg,
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      width: "100%",
      maxWidth: 340,
    },
    calendarHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.lg,
    },
    navButton: {
      padding: theme.spacing.sm,
    },
    monthYear: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
    },
    daysHeader: {
      flexDirection: "row",
      marginBottom: theme.spacing.sm,
    },
    dayHeaderCell: {
      flex: 1,
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
    },
    dayHeaderText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      fontWeight: theme.fontWeight.medium,
    },
    calendarGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    dayCell: {
      width: "14.28%",
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    dayText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
    selectedDay: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.full,
    },
    selectedDayText: {
      color: theme.colors.white,
      fontWeight: theme.fontWeight.semiBold,
    },
  })

export default CalendarPicker
