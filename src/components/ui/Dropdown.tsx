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
  FlatList
} from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useAppContext } from "../../context/AppContext"
import { scale } from "../scale"
import { fonts } from "../../assets/localImage"
import { createGlobalStyles } from "../../styles/globalStyles"
import { createComponentStyles } from "../../styles/componentStyles"

interface DropdownItem {
  label: string
  value: string | number
  [key: string]: any
  item?: any
  required?: boolean
}

interface DropdownProps {
  options: DropdownItem[]
  valueKey?: string
  labelKey?: string
  label?: string
  placeholderText?: string
  onSelect: (value?: string | number, item?: DropdownItem) => void
  disabled?: boolean
  mandatory?: boolean
  error?: string
  value?: string | number
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  required?: boolean
  enableVirtualization?: boolean; // 👈 NEW
  searchable?: boolean;

  // Controlled open state props
  isOpen?: boolean
  onToggle?: () => void
}

export const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  valueKey = "value",
  labelKey = "label",
  label,
  placeholderText = "Select an option",
  onSelect,
  disabled = false,
  mandatory = false,
  error,
  value,
  containerStyle,
  textStyle,
  required = false,
  isOpen,
  onToggle,
  enableVirtualization = false,
  searchable = false,
}) => {
  const [internalIsFocus, setInternalIsFocus] = useState(false)
  const [searchText, setSearchText] = useState("")
  const { state } = useAppContext()
  const { theme } = state
  const globalStyles = createGlobalStyles(theme)
  const isFocus = typeof isOpen === "boolean" ? isOpen : internalIsFocus

  const filteredData = options.filter((item) => {
    const labelValue = (item[labelKey] ?? "").toString().toLowerCase()
    return labelValue.includes(searchText.toLowerCase())
  })

  const selectedItem = options.find(
    (item) => item[valueKey]?.toString().trim() === value?.toString().trim()
  );
  const componentStyles = createComponentStyles(theme)
  const shouldVirtualize = enableVirtualization || filteredData.length > 50;

  const styles = StyleSheet.create({

    dropdownWrapper: {
      ...componentStyles.dropdownWrapper,
      borderColor: required && error ? theme.colors.error : theme.colors.border,
      backgroundColor: disabled ? theme.colors.disabled : theme.colors.surface,
    },
    selectedText: {
      ...componentStyles.selectedText,
      color: value ? disabled ? theme.colors.textSecondary : theme.colors.text : theme.colors.textSecondary,

    },

  })

  const handleSelect = (selectedValue: string | number, item?: DropdownItem) => {
    onSelect(selectedValue, item)
    requestAnimationFrame(() => {
      if (onToggle) {
        onToggle()
      } else {
        setInternalIsFocus(false)
      }
      setSearchText("")
    })
  }

  const handleToggle = () => {
    if (disabled) return
    if (onToggle) {
      onToggle()
    } else {
      setInternalIsFocus((prev) => !prev)
    }
  }
  return (
    <View style={[componentStyles.wrapper, containerStyle]}>
      {label && (
        <Text style={componentStyles.label}>
          {label}
          {mandatory && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}


      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          accessibilityRole="combobox"
          onPress={handleToggle}
          disabled={disabled}
          style={componentStyles.dropdownTouchable}
          accessibilityLabel={
            value
              ? `${selectedItem?.[labelKey] ?? ""} is selected`
              : `Select ${placeholderText}`
          }
          testID={label}
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
            value={searchText}
            onChangeText={setSearchText}
            style={componentStyles.searchInput}
            placeholderTextColor={theme.colors.textSecondary}
            autoFocus={false}
            testID={"Search"}
          />

          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) =>
                item[valueKey]?.toString() ?? index.toString()
              }
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              initialNumToRender={15}
              maxToRenderPerBatch={15}
              windowSize={5}
              removeClippedSubviews
              showsVerticalScrollIndicator
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item[valueKey], item)}
                  style={componentStyles.optionItem}
                  testID={`option-${item[labelKey]}`}
                >
                  <Text style={componentStyles.optionText}>
                    {item[labelKey]}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={componentStyles.noResultText}>
              No results found
            </Text>
          )}
        </View>
      )}



      {required && error && <Text style={globalStyles.textError}>{error}</Text>}
    </View>
  )
}
