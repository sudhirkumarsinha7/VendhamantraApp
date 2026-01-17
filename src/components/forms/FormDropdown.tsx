"use client"

import React from "react"
import { useField } from "formik"
import { Dropdown } from "../ui/Dropdown"

interface FormDropdownProps {
  name: string
  options: any[]
  labelKey?: string
  valueKey?: string
  label?: string
  placeholder?: string
  containerStyle?: object
  disabled?: boolean
  mandatory?: boolean,
  onValueChange?: (value: any, item?: any) => void;
    required?: boolean

}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  name,
  onValueChange,
  options,
  labelKey,
  valueKey,
  ...props
}) => {
  const [field, meta, helpers] = useField<any>(name)

  const handleSelect = (value: any, item?: any) => {
    helpers.setValue(value)
    if (onValueChange) {
      onValueChange(value, item)
    }
  }

  return (
    <Dropdown
      placeholderText={props?.placeholder || "Select an option"}
      options={options}
      labelKey={labelKey}
      valueKey={valueKey}
      value={field.value}
      onSelect={handleSelect}
      label={props?.label}
      disabled={props?.disabled}
      // error={meta.touched && meta.error ? meta.error : undefined}
      error={meta.error ? meta.error : undefined}

      {...props} />
  )
}
