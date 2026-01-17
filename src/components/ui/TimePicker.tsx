"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, ScrollView } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface TimePickerProps {
  label?: string
  value: string
  onChange: (time: string) => void
  placeholder?: string
  style?: object
}

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange, placeholder = "Select time", style }) => {
 const { state } = useAppContext();
        const { theme } = state;
  const styles = createStyles(theme)
  const [visible, setVisible] = useState(false)
  const [hours, setHours] = useState("12")
  const [minutes, setMinutes] = useState("00")

  const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
  const minuteOptions = ["00", "15", "30", "45"]

  const handleConfirm = () => {
    onChange(`${hours} : ${minutes}`)
    setVisible(false)
  }

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)} activeOpacity={0.7}>
        <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
        <Text style={[styles.text, !value && styles.placeholder]}>{value || placeholder}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.title}>Select Time</Text>
            <View style={styles.pickerRow}>
              <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                {hourOptions.map((h) => (
                  <TouchableOpacity
                    key={h}
                    style={[styles.pickerItem, hours === h && styles.pickerItemSelected]}
                    onPress={() => setHours(h)}
                  >
                    <Text style={[styles.pickerText, hours === h && styles.pickerTextSelected]}>{h}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Text style={styles.separator}>:</Text>
              <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                {minuteOptions.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.pickerItem, minutes === m && styles.pickerItemSelected]}
                    onPress={() => setMinutes(m)}
                  >
                    <Text style={[styles.pickerText, minutes === m && styles.pickerTextSelected]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
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
    },
    modalContent: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.xl,
      width: 280,
    },
    title: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: theme.spacing.lg,
    },
    pickerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 150,
    },
    picker: {
      width: 60,
      height: 150,
    },
    pickerItem: {
      paddingVertical: theme.spacing.md,
      alignItems: "center",
    },
    pickerItemSelected: {
      backgroundColor: theme.colors.primaryLight,
      borderRadius: theme.borderRadius.md,
    },
    pickerText: {
      fontSize: theme.fontSize.xl,
      color: theme.colors.text,
    },
    pickerTextSelected: {
      color: theme.colors.primary,
      fontWeight: theme.fontWeight.semiBold,
    },
    separator: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginHorizontal: theme.spacing.lg,
    },
    confirmButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: theme.spacing.md,
      marginTop: theme.spacing.lg,
      alignItems: "center",
    },
    confirmText: {
      color: theme.colors.white,
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
    },
  })

export default TimePicker
