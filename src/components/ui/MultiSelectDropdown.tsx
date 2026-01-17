"use client"

import type React from "react"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { MultipleSelectList } from "react-native-dropdown-select-list"
import { useAppContext } from "../../context/AppContext"
import { fonts } from "../../assets/localImage"
import { createGlobalStyles } from "../../styles/globalStyles" // Ensure this is imported
import { useState } from "react"
import { createComponentStyles } from "../../styles/componentStyles"

interface MultiSelectDropdownProps {
  label?: string
  placeholderText?: string
  options: { key: string; value: string }[]
  selectedValues: string[]
  onSelect: (selectedKeys: string[]) => void
  disabled?: boolean
  mandatory?: boolean
  error?: string
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  required?: boolean
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  placeholderText = "Select options",
  options,
  selectedValues,
  onSelect,
  disabled = false,
  mandatory = false,
  error,
  containerStyle,
  textStyle,
    required = false,
}) => {
  const { state } = useAppContext()
  const { theme } = state
  const globalStyles = createGlobalStyles(theme)
  const componentStyles = createComponentStyles(theme)

  const styles = StyleSheet.create({

    selectListContainer: {
      ...createGlobalStyles,
      borderColor: mandatory && error ? theme.colors.error : theme.colors.border,

    },

  })
  const [selected, setSelected] = useState([]);

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]
  return (
    <View style={[componentStyles.wrapper, containerStyle]}>
      {label && <Text style={componentStyles.label}>{label}
        {mandatory && <Text style={{ color: theme.colors.error }}> *</Text>}
      </Text>}
      <MultipleSelectList
        setSelected={(val: any) => {
          setSelected(val);
        }}
        onSelect={() => onSelect(selected)}
        data={options}
        boxStyles={styles.selectListContainer}
        inputStyles={componentStyles.selectListInput}
        dropdownStyles={componentStyles.selectListDropdown}
        dropdownTextStyles={componentStyles.selectListOptionText}
        placeholder={placeholderText}
        searchPlaceholder="Search..."
        maxHeight={200}
        fontFamily={fonts.MEDIUM}
        disabledTextStyles={componentStyles.selectListPlaceholder}
        disabledItemStyles={{ backgroundColor: theme.colors.background }}
        // disabled={disabled}
        search={true}

      />
      {mandatory && error && <Text style={globalStyles.textError}>{error}</Text>}
    </View>
  )
}
