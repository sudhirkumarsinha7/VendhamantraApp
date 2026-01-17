import React from "react"
import { useField } from "formik"
import { Dropdown1 } from "../ui/Dropdown1"

interface FormDropdownProps {
  name: string
  label?: string
  rightLabel?: string
  onRightLabelPress?: () => void;
  disabledRightLabel?: boolean;

  placeholder?: string
  disabled?: boolean
  mandatory?: boolean
  labelKey?: string
  valueKey?: string

  options: Array<{ label: string; value: string | number }>
  searchText: string
  onSearchTextChange: (text: string) => void
  onValueChange?: (value: any, item?: any) => void;
  required?: boolean

}

export const FormDropdown1: React.FC<FormDropdownProps> = ({
  name,
  label,
  rightLabel,
  onRightLabelPress,
  placeholder,
  disabled,
  mandatory,
  labelKey,
  valueKey,
  options,
  searchText,
  onSearchTextChange,
  onValueChange,

}) => {
  const [field, meta, helpers] = useField<any>(name)

  const handleSelect = (value: any, item?: any) => {
    helpers.setValue(value)
    if (onValueChange) {
      onValueChange(value, item)
    }
  }

  return (
    <Dropdown1
      label={label}
      rightLabel={rightLabel}
      onRightLabelPress={onRightLabelPress}
      placeholderText={placeholder}
      options={options}
      value={field.value}
      onSelect={handleSelect}
      disabled={disabled}
      mandatory={mandatory}
      error={meta.touched && meta.error ? meta.error : undefined}
      labelKey={labelKey}
      valueKey={valueKey}
      searchText={searchText}
      onSearchTextChange={onSearchTextChange}
    />
  )
}
