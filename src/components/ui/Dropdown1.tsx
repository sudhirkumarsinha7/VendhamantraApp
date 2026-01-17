"use client"

import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useAppContext } from "../../context/AppContext"
import { scale } from "../scale"
import { fonts } from "../../assets/localImage"
import { createComponentStyles } from "../../styles/componentStyles"
import { createGlobalStyles } from "../../styles/globalStyles"

interface DropdownItem {
  label: string
  value: string | number
}

interface DropdownProps {
  options: DropdownItem[]
  valueKey?: string
  labelKey?: string
  label?: string
  rightLabel?: string
  onRightLabelPress?: () => void;
  disabledRightLabel?: boolean;
onValueChange?:()=>void;
  placeholderText?: string
  onSelect: (value: string | number, item?: DropdownItem) => void
  disabled?: boolean
  mandatory?: boolean
  error?: string
  value?: string | number
  containerStyle?: ViewStyle
  textStyle?: TextStyle

  // Controlled open/close
  isOpen?: boolean
  onToggle?: () => void

  // Controlled search
  searchText?: string
  onSearchTextChange?: (text: string) => void
  required?: boolean
}

export const Dropdown1: React.FC<DropdownProps> = ({
  options = [],
  valueKey = "value",
  labelKey = "label",
  label,
  onRightLabelPress,
  rightLabel,
  placeholderText = "Select an option",
  onSelect,
  disabled = false,
  mandatory = false,
  error,
  value,
  containerStyle,
  textStyle,
  isOpen,
  onToggle,
  searchText,
  onSearchTextChange,
  required = false,

}) => {
  const [internalIsFocus, setInternalIsFocus] = useState(false)
  const [internalSearchText, setInternalSearchText] = useState("")
  const { state } = useAppContext()
  const { theme } = state

  const isFocus = typeof isOpen === "boolean" ? isOpen : internalIsFocus
  const isControlledSearch = typeof searchText === "string"
  const currentSearchText = isControlledSearch ? searchText : internalSearchText

  const filteredData = isControlledSearch
    ? options // Parent filters
    : options.filter((item: any) => {
      const labelValue = (item[labelKey] ?? "").toString().toLowerCase()
      return labelValue.includes(currentSearchText.toLowerCase())
    })

  const selectedItem = options.find(
    (item: any) => item[valueKey]?.toString().trim() === value?.toString().trim()
  )

  const componentStyles = createComponentStyles(theme)

  const styles = StyleSheet.create({

    dropdownWrapper: {
      ...componentStyles.dropdownWrapper,
      borderColor: mandatory && error ? theme.colors.error : theme.colors.border,
      backgroundColor: disabled ? theme.colors.disabled : theme.colors.surface,
    },
    selectedText: {
      ...componentStyles.selectedText,
      color: value ? theme.colors.text : theme.colors.textSecondary,

    },

  })

  const globalStyles = createGlobalStyles(theme)

  const handleSelect = (selectedValue: string | number, item?: DropdownItem) => {
    onSelect(selectedValue, item)
    requestAnimationFrame(() => {
      if (onToggle) onToggle()
      else setInternalIsFocus(false)

      if (!isControlledSearch) setInternalSearchText("")
    })
  }

  const handleToggle = () => {
    if (disabled) return
    if (onToggle) onToggle()
    else setInternalIsFocus((prev) => !prev)
  }

  return (
    <View style={[componentStyles.wrapper, containerStyle]}>
      {label && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: scale(4) }}>
          <Text style={componentStyles.label}>
            {label}
            {mandatory && <Text style={{ color: theme.colors.error }}> *</Text>}
          </Text>
          {rightLabel ? (
            <TouchableOpacity onPress={onRightLabelPress}>
              <Text style={[componentStyles.label, { color: theme.colors.primary }]}>
                {rightLabel}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

      )}
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          onPress={handleToggle}
          disabled={disabled}
          style={componentStyles.dropdownTouchable}
        >
          <Text style={[styles.selectedText, textStyle]}>
            {value ? selectedItem?.[labelKey] : placeholderText}
          </Text>
          <MaterialCommunityIcons
            name={isFocus ? "chevron-up" : "chevron-down"}
            size={30}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      {isFocus && (
        <View style={componentStyles.dropdownContent}>
          <TextInput
            placeholder="Search..."
            value={currentSearchText}
            onChangeText={(text) => {
              console.log('onSearchTextChange text ', text)
              if (onSearchTextChange) onSearchTextChange(text)
              else setInternalSearchText(text)
            }}
            style={componentStyles.searchInput}
            placeholderTextColor={theme.colors.textSecondary}
          />

          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
            {filteredData?.length > 0 ? (
              filteredData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(item[valueKey], item)}
                  style={componentStyles.optionItem}
                >
                  <Text style={componentStyles.optionText}>{item[labelKey]}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={componentStyles.noResultText}>No users found</Text>
            )}
          </ScrollView>
        </View>
      )}

      {mandatory && error && <Text style={globalStyles.textError}>{error}</Text>}
    </View>
  )
}
