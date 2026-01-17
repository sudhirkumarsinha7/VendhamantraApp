"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"
import { scale } from "../scale"

interface DropdownOption {
  label: string
  value: string
}

interface DropdownButtonProps {
  label: string
  options: DropdownOption[]
  onSelect: (value: string) => void
  style?: object
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, options, onSelect, style }) => {
 const { state } = useAppContext();
       const { theme } = state;
  const styles = createStyles(theme)
  const [visible, setVisible] = useState(false)

  const handleSelect = (value: string) => {
    setVisible(false)
    onSelect(value)
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(!visible)} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{label}</Text>
        <Ionicons name="chevron-down" size={18} color={theme.colors.white} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={option.value}
                style={[styles.option, index < options.length - 1 && styles.optionBorder]}
                onPress={() => handleSelect(option.value)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      borderRadius: scale(15),
      paddingVertical: theme.spacing.sm + 2,
      paddingHorizontal: theme.spacing.lg,
      gap: theme.spacing.sm,

    },
    buttonText: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.medium,
      color: theme.colors.white,
    },
    overlay: {
      flex: 1,
      backgroundColor: "transparent",
    },
    dropdown: {
      position: "absolute",
      top: 110,
      right: theme.spacing.lg,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      minWidth: 160,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
    option: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    optionBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    optionText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
  })

export default DropdownButton
