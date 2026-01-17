import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useAppContext } from "../../context/AppContext"
import { fonts } from "../../assets/localImage"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { createGlobalStyles } from "../../styles/globalStyles"
import { createComponentStyles } from "../../styles/componentStyles"
import { timeUtils } from "../../utils"

interface Props {
  label?: string
  value: Date | null
  onChange: (date: Date) => void
  mode?: "date" | "time" | "datetime"
  minimumDate?: Date
  maximumDate?: Date
  error?: string
  disabled?: boolean
  isRequired?: boolean
  defaultDate?: Date
  required?:boolean
}

export const CustomDatePicker: React.FC<Props> = ({
  label,
  value,
  onChange,
  mode = "date",
  minimumDate,
  maximumDate,
  error,
  isRequired,
  required,
  disabled = false,
  defaultDate
}) => {
  const { state } = useAppContext()
  const { theme } = state
  const [open, setOpen] = useState(false)
  const globalStyles = createGlobalStyles(theme)
  const componentStyles = createComponentStyles(theme)

  const styles = StyleSheet.create({
    inputBox: {
      ...componentStyles.inputBox,
      borderColor: error &&isRequired ? theme.colors.error : theme.colors.border,
    },
    inputText: {
      ...componentStyles.inputText,
      color: value
        ? disabled
          ? theme.colors.textSecondary
          : theme.colors.text
        : theme.colors.textSecondary,
    },
  })

  const showPicker = () => setOpen(true)
  const hidePicker = () => setOpen(false)

  const handleChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      hidePicker()
    }
    if (selectedDate) {
      onChange(selectedDate)
    }
  }

  return (
    <View style={componentStyles.container}>
      {label && (
        <Text style={componentStyles.label}>
          {label}
          {required && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}

      <TouchableOpacity onPress={showPicker} style={styles.inputBox} disabled={disabled}>
        <Text style={styles.inputText}>
          {value ? timeUtils.formatDDMMYY(value) : "Select date"}
        </Text>
        <MaterialIcons name="calendar-today" size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      {error &&isRequired&& <Text style={globalStyles.textError}>{error}</Text>}

      {open && (
        Platform.OS === "ios" ? (
          <Modal transparent={true} animationType="slide">
            <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#00000099" }}>
              <View style={{ backgroundColor: "white", margin: 20, borderRadius: 10, padding: 16 }}>
                <DateTimePicker
                  mode={mode}
                  display="spinner"
                  value={value || defaultDate || new Date()}
                  onChange={handleChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  themeVariant="light"
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                  <TouchableOpacity onPress={hidePicker}>
                    <Text style={{ color: theme.colors.textSecondary, fontFamily: fonts.MEDIUM }}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (!value) {
                        const defaultDate = minimumDate ? new Date(minimumDate) : new Date()
                        onChange(defaultDate)
                      }
                      hidePicker()
                    }}
                  >
                    <Text style={{ color: theme.colors.primary, fontFamily: fonts.MEDIUM }}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            mode={mode}
            value={value || defaultDate || new Date()}
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )
      )}
    </View>
  )
}
