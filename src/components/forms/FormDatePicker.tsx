import React from "react"
import { useField, useFormikContext } from "formik"
import { CustomDatePicker } from "../ui/CustomDatePicker"

interface Props {
  name: string
  label?: string
  mode?: "date" | "time" | "datetime"
  minimumDate?: Date
  maximumDate?: Date
  disabled?: boolean
  isRequired?: boolean
  defaultDate?: Date
    required?: boolean
mandatory?: boolean,
}

export const FormDatePicker: React.FC<Props> = ({
  name,
  label,
  mode = "date",
  minimumDate,
  maximumDate,
  isRequired=true,
  disabled = false,
  defaultDate,
  required=false,
}) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  return (
    <CustomDatePicker
      label={label}
      value={field.value ? new Date(field.value) : null}
      onChange={(date) => setFieldValue(name, date.toISOString())}
      mode={mode}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      error={meta.error ? meta.error : ""}
      disabled={disabled}
      isRequired={isRequired}
      defaultDate={defaultDate}
      required={required}
    />
  )
}
export default FormDatePicker