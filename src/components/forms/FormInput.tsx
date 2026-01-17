import type React from "react"
import { useField } from "formik"
import { Input } from "../ui/Input"

interface FormInputProps {
  name: string
  label?: string
  placeholder?: string
  secureTextEntry?: boolean
  multiline?: boolean
  numberOfLines?: number
  containerStyle?: object
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
  inputStyle?: object
  maxLength?: number
  disabled?: boolean
  required?: boolean
  onChangeText?: (text: string) => void // Optional handler
 mandatory?: boolean,
}

export const FormInput: React.FC<FormInputProps> = ({ name, onChangeText, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const handleChange = (text: string) => {
    let sanitized = text

    if (props.keyboardType === "phone-pad") {
      sanitized = text.replace(/[^0-9]/g, "") // Remove non-digit characters
    }

    helpers.setValue(sanitized)

    if (onChangeText) {
      onChangeText(sanitized)
    }
  }
  return (
    <Input
      value={field.value}
      onChangeText={handleChange}
      // error={meta.touched && meta.error ? meta.error : undefined}
        error={meta.error ? meta.error : undefined}

      {...props}
    />
  )
}
