"use client"

import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from "react-native"
import { Calendar } from "react-native-calendars"
import dayjs from "dayjs"
import { useAppContext } from "../../context/AppContext"
import { fonts } from "../../assets/localImage"
import { createGlobalStyles } from "../../styles/globalStyles"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
interface DateRange {
  start: string
  end: string
  label: string
}

interface DatePickerInputProps {
  label?: string
  value: DateRange | null
  onSelect: (date: DateRange) => void
  error?: string
  mandatory?: boolean
  required?: boolean
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onSelect,
  error,
  mandatory,
  required = false,
}) => {
  const { state } = useAppContext()
  const { theme } = state
  createGlobalStyles(theme)

  const today = dayjs().format("YYYY-MM-DD")
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(value?.start || today)

  useEffect(() => {
    if (!value) {
      const defaultDate: DateRange = {
        start: today,
        end: today,
        label: dayjs(today).format("DD MMM YYYY"),
      }
      setSelectedDate(today)
      onSelect(defaultDate)
    }
  }, [])

  const onDayPress = (day: { dateString: string }) => {
    const date = day.dateString
    setSelectedDate(date)
    onSelect({
      start: date,
      end: date,
      label: dayjs(date).format("DD MMM YYYY"),
    })
    setShowCalendarModal(false)
  }

  const styles = StyleSheet.create({
    wrapper: {
      marginVertical: theme.spacing.sm,
    },
    labelStyle: {
      fontSize: theme.fontSize.small,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
      fontFamily: fonts.MEDIUM,
    },
    dateButton: {
      borderWidth: 1,
      borderColor: mandatory && error ? theme.colors.error : theme.colors.border,
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dateText: {
      fontSize: theme.fontSize.medium,
      color: theme.colors.text,
      fontFamily: fonts.REGULAR,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.fontSize.small,
      marginTop: theme.spacing.xs,
      marginLeft: theme.spacing.xs,
      fontFamily: fonts.REGULAR,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius,
      padding: theme.spacing.md,
      width: "90%",
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: { elevation: 5 },
      }),
    },
    cancelButton: {
      marginTop: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignSelf: "center",
      width: 100,
    },
    cancelText: {
      color: theme.colors.textSecondary,
      textAlign: "center",
      fontFamily: fonts.REGULAR,
    },
  })

  // console.log("selectedDate", selectedDate);
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.labelStyle}>{label}</Text>}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendarModal(true)}>
        <MaterialIcons name="calendar-today" size={20} color={theme.colors.primary} />
        <Text style={styles.dateText}>
          {dayjs(value?.start).format("DD MMM YYYY")}
        </Text>
      </TouchableOpacity>
      {mandatory && error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showCalendarModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendarModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Calendar
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: theme.colors.primary,
                  selectedTextColor: "#fff",
                },
              }}
              onDayPress={onDayPress}
              maxDate={today}
              theme={{
                todayTextColor: theme.colors.primary,
                arrowColor: theme.colors.primary,
                textDayFontFamily: fonts.REGULAR,
                textMonthFontFamily: fonts.MEDIUM,
                textDayHeaderFontFamily: fonts.MEDIUM,
                backgroundColor: theme.colors.surface,
                calendarBackground: theme.colors.surface,
                dayTextColor: theme.colors.text,
                monthTextColor: theme.colors.text,
                textDisabledColor: theme.colors.textSecondary,
              }}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowCalendarModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
