"use client"

import React, { useState } from "react"
import { View, Text, Modal, StyleSheet, Platform, Alert, TouchableOpacity } from "react-native"
import { Calendar } from "react-native-calendars"
import dayjs, { Dayjs } from "dayjs"
import { useAppContext } from "../../context/AppContext"
import { SelectList } from "react-native-dropdown-select-list"
import { fonts } from "../../assets/localImage"
import { createGlobalStyles } from "../../styles/globalStyles"

interface DateRange {
  start: string
  end: string
  label: string
}

interface DateRangePickerInputProps {
  label?: string
  value: DateRange | null
  onSelect: (dateRange: DateRange) => void
  error?: string
  mandatory?: boolean
  required?: boolean
}

export const DateRangePickerInput: React.FC<DateRangePickerInputProps> = ({
  label,
  value,
  onSelect,
  error,
  mandatory,
  required = false,
}) => {
  const { state } = useAppContext()
  const { theme } = state
  const globalStyles = createGlobalStyles(theme)

  const [modalType, setModalType] = useState<false | "range" | "single">(false)
  const [tempStartDate, setTempStartDate] = useState<Dayjs | null>(value?.start ? dayjs(value.start) : null)
  const [tempEndDate, setTempEndDate] = useState<Dayjs | null>(value?.end ? dayjs(value.end) : null)
  const [calendarMarkedDates, setCalendarMarkedDates] = useState({})
  const [singleSelectedDate, setSingleSelectedDate] = useState(value?.start || dayjs().format("YYYY-MM-DD"))

  const today = dayjs().format("YYYY-MM-DD")

  const dateOptions: DateRange[] = [
    { label: "Today", start: today, end: today },
    { label: "Date", start: "", end: "" },     // Single date

    {
      label: "Yesterday",
      start: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
      end: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    },
    {
      label: "Last 7 days",
      start: dayjs().subtract(6, "day").format("YYYY-MM-DD"),
      end: today,
    },
    {
      label: "Last 30 days",
      start: dayjs().subtract(29, "day").format("YYYY-MM-DD"),
      end: today,
    },
    { label: "Calendar", start: "", end: "" }, // Range
  ]

  const selectData = dateOptions.map((opt, idx) => ({
    key: idx.toString(),
    value: opt.label,
  }))

  const handleSelect = (key: string) => {
    const index = Number.parseInt(key, 10)
    const selected = dateOptions[index]

    if (!selected) return

    if (selected.label === "Calendar") {
      setTempStartDate(null)
      setTempEndDate(null)
      setCalendarMarkedDates({})
      setModalType("range")
      return
    }

    if (selected.label === "Date") {
      setModalType("single")
      return
    }

    onSelect(selected)
  }

  const onRangeDayPress = (day: { dateString: string }) => {
    const sel = dayjs(day.dateString)

    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(sel)
      setTempEndDate(null)
      setCalendarMarkedDates({
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: theme.colors.primary,
          textColor: "#fff",
        },
      })
    } else {
      const start = tempStartDate
      const end = sel

      if (end.isBefore(start)) {
        setTempStartDate(end)
        setTempEndDate(null)
        setCalendarMarkedDates({
          [end.format("YYYY-MM-DD")]: {
            startingDay: true,
            endingDay: true,
            color: theme.colors.primary,
            textColor: "#fff",
          },
        })
        return
      }

      const range: any = {}
      let curr = start.clone()

      while (curr.isBefore(end) || curr.isSame(end)) {
        const d = curr.format("YYYY-MM-DD")
        range[d] = { color: theme.colors.primary, textColor: "#fff" }
        curr = curr.add(1, "day")
      }

      range[start.format("YYYY-MM-DD")].startingDay = true
      range[end.format("YYYY-MM-DD")].endingDay = true

      setTempStartDate(start)
      setTempEndDate(end)
      setCalendarMarkedDates(range)
    }
  }

  const applyRange = () => {
    if (!tempStartDate || !tempEndDate) {
      Alert.alert("Error", "Please select both start and end dates.")
      return
    }

    const start = tempStartDate.format("YYYY-MM-DD")
    const end = tempEndDate.format("YYYY-MM-DD")

    onSelect({ label: "Calendar", start, end })
    setModalType(false)
  }

  const onSingleDatePress = (day: { dateString: string }) => {
    const date = day.dateString
    setSingleSelectedDate(date)

    onSelect({
      start: date,
      end: date,
      label: dayjs(date).format("DD MMM YYYY"),
    })

    setModalType(false)
  }

  const styles = StyleSheet.create({
    wrapper: { marginVertical: theme.spacing.sm },
    labelStyle: {
      fontSize: theme.fontSize.small,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
      fontFamily: fonts.MEDIUM,
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
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Corrected to translucent black
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
    datePickerButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: theme.spacing.md,
    },
    datePickerButton: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.primary,
    },
    cancelBtn: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    datePickerButtonText: {
      color: theme.colors.surface,
      fontWeight: "bold",
    },
    cancelText: {
      color: theme.colors.textSecondary,
    },
  })

  return (
    <View style={styles.wrapper}>

      {/* LABEL WITH SMART DISPLAY */}
      <Text style={styles.labelStyle}>
        {label + " " + (value?.start === value?.end ? value?.start : `${value?.start} To ${value?.end}`)}
      </Text>

      <SelectList
        setSelected={handleSelect}
        data={selectData}
        placeholder="Select Duration"
        dropdownStyles={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
        boxStyles={{
          borderWidth: 1,
          borderColor: mandatory && error ? theme.colors.error : theme.colors.border,
          borderRadius: theme.borderRadius,
          backgroundColor: theme.colors.surface,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        }}
        inputStyles={{
          color: value?.label ? theme.colors.text : theme.colors.textSecondary, // Dynamic text color
          fontSize: theme.fontSize.medium,
          fontFamily: fonts.REGULAR, // Use regular font for input text
        }}
        search={false}
        // defaultOption={
        //   value?.label
        //     ? { key: dateOptions.findIndex((opt) => opt.label === value.label).toString(), value: value.label }
        //     : undefined
        // }

        defaultOption={
          value?.label && value.label !== "Calendar"
            ? {
              key: dateOptions.findIndex((opt) => opt.label === value.label).toString(),
              value: value.label,
            }
            : undefined
        }
        dropdownTextStyles={{
          color: theme.colors.text, // <-- This sets the dropdown option text color
          fontSize: theme.fontSize.medium,
          fontFamily: fonts.REGULAR,
        }}
      />

      {mandatory && error && <Text style={styles.errorText}>{error}</Text>}

      {/* Modal (Range + Single) */}
      <Modal visible={!!modalType} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            {/* Range Mode */}
            {modalType === "range" && (
              <>
                <Text style={{ fontFamily: fonts.MEDIUM, marginBottom: 10, fontSize: theme.fontSize.large }}>
                  Select Date Range
                </Text>

                <Calendar
                  markingType="period"
                  markedDates={calendarMarkedDates}
                  onDayPress={onRangeDayPress}
                  maxDate={today}
                />

                <View style={styles.datePickerButtons}>
                  <TouchableOpacity
                    style={[styles.datePickerButton, styles.cancelBtn]}
                    onPress={() => setModalType(false)}
                  >
                    <Text style={[styles.datePickerButtonText, styles.cancelText]}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.datePickerButton} onPress={applyRange}>
                    <Text style={styles.datePickerButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Single Date Mode */}
            {modalType === "single" && (
              <>
                <Text style={{ fontFamily: fonts.MEDIUM, marginBottom: 10, fontSize: theme.fontSize.large }}>
                  Select Date
                </Text>

                <Calendar
                  markedDates={{
                    [singleSelectedDate]: {
                      selected: true,
                      selectedColor: theme.colors.primary,
                      selectedTextColor: "#fff",
                    },
                  }}
                  onDayPress={onSingleDatePress}
                  maxDate={today}
                />

                <TouchableOpacity
                  style={[styles.datePickerButton, styles.cancelBtn, { marginTop: 10 }]}
                  onPress={() => setModalType(false)}
                >
                  <Text style={[styles.datePickerButtonText, styles.cancelText]}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}

          </View>
        </View>
      </Modal>
    </View>
  )
}
