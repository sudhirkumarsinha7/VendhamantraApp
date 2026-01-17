"use client"

import React, { useState, useEffect } from "react"
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
import { scale } from "../scale"
import { fonts } from "../../assets/localImage"
import { useAppContext } from "../../context/AppContext"
import { createComponentStyles } from "../../styles/componentStyles"
import { createGlobalStyles } from "../../styles/globalStyles"

interface DropdownItem {
  label: string
  rightLabel?: string
  value: string | number
  item?: any
}

interface AsyncDropdownProps {
  value?: string | number
  onSelect: (value: string | number, item?: DropdownItem) => void
  placeholderText?: string
  label?: string
  rightLabel?: string
  onRightLabelPress?: (value:string | number) => void;
  disabled?: boolean
  mandatory?: boolean
  error?: string
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  fetchOptions: (query: string) => Promise<DropdownItem[]>
  minimumSearchLength?: number
  required?: boolean
}

export const AsyncDropdown: React.FC<AsyncDropdownProps> = ({
  value,
  onSelect,
  placeholderText = "Search and select",
  label,
  rightLabel,
  onRightLabelPress,
  disabled = false,
  mandatory = false,
  error,
  containerStyle,
  textStyle,
  fetchOptions,
  minimumSearchLength = 2,
  required = false,
}) => {
  const { state } = useAppContext()
  const { theme } = state

  const [isFocus, setIsFocus] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [options, setOptions] = useState<DropdownItem[]>([])
  const [loading, setLoading] = useState(false)

  // Find selected item from options
  const selectedItem = options.find((item) => item.value == value)

  // Fetch new options when searchText changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText?.length >= minimumSearchLength) {
        setLoading(true)
        fetchOptions(searchText)
          .then((res) => setOptions(res))
          .catch(() => setOptions([]))
          .finally(() => setLoading(false))
      } else {
        // Only clear options if no selected value exists
        if (!value) {
          setOptions([])
        }
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchText])

  // Preload selected item into options if not already present
  useEffect(() => {
    if (value && !options.find((item) => item.value == value)) {
      const selected = {
        label: "Loading...",
        value: value,
      }
      setOptions((prev) => [selected, ...prev])
    }
  }, [value])

  const handleSelect = (val: string | number, item?: DropdownItem) => {
    onSelect(val, item)
    setSearchText("")
    setIsFocus(false)
  }
  const componentStyles = createComponentStyles(theme)
  const globalStyles = createGlobalStyles(theme)
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
  return (
    <View style={[componentStyles.wrapper, containerStyle]}>
      {label && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: scale(4) }}>
          <Text style={componentStyles.label}>
            {label}
          </Text>
          {rightLabel ? (
            <TouchableOpacity onPress={() => onRightLabelPress?.(value!)}>
              <Text style={[componentStyles.label, { color: theme.colors.primary }]}>
                {rightLabel}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

      )}

      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          accessibilityRole="combobox"
          onPress={() => !disabled && setIsFocus(!isFocus)}
          disabled={disabled}
          style={componentStyles.dropdownTouchable}
          accessibilityLabel={
            value
              ? `${selectedItem?.label ?? ""} is selected`
              : `Select ${placeholderText}`
          }
        >
          <Text style={[styles.selectedText, textStyle]}>
            {value ? selectedItem?.label || "Loading..." : placeholderText}
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
            placeholder="Search by mobile..."
            value={searchText}
            onChangeText={setSearchText}
            style={componentStyles.searchInput}
            placeholderTextColor={theme.colors.textSecondary}
            autoFocus
          />

          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
            {loading ? (
              <Text style={componentStyles.noResultText}>Loading...</Text>
            ) : options?.length > 0 ? (
              options.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(item.value, item)}
                  style={componentStyles.optionItem}
                >
                  <Text style={componentStyles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={componentStyles.noResultText}>No results found</Text>
            )}
          </ScrollView>
        </View>
      )}

      {mandatory && error && <Text style={globalStyles.textError}>{error}</Text>}
    </View>
  )
}
