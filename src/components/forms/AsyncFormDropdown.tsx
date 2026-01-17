"use client"

import React, { useEffect, useState } from "react"
import { useField } from "formik"
import { AsyncDropdown } from "../ui/AsyncDropdown"
import { API_CONFIG } from "../../config/api"
import { useAuth } from "../../context/AuthContext"
import { apiClient } from "../../api/apiClient"
import { stringUtils, timeUtils } from "../../utils"

interface FormDropdownProps {
  name: string
  label?: string
  rightLabel?: string
  onRightLabelPress?: (value: string | number) => void;
  placeholder?: string
  disabled?: boolean
  mandatory?: boolean
  onValueChange?: (value: string | number) => void;
    required?: boolean

}
export const stageMap: Record<string, string> = {
  resolved: "Closed",
  completed: "Done",
  inprogress: "In Progress",
};
export function getStageLabel(stage:string) {
 if (!stage) return "";

  const key = stage.toLowerCase();
  const translated = stageMap[key] || stage;

  return stringUtils.camelCaseToReadable(translated);
}
export const AsyncFormDropdown: React.FC<FormDropdownProps> = ({
  name,
  onValueChange,
  label,
  rightLabel,
  onRightLabelPress,
  placeholder,
  disabled,
  mandatory,
}) => {
  const [field, meta, helpers] = useField<any>(name)
  const { orgId, divisionId } = useAuth()
  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  // This runs when a value is already selected (e.g. editing an existing form)
  useEffect(() => {
    if (field.value && !selectedItem) {
      fetchInitialSelectedItem(field.value)
    }
  }, [field.value])

  const fetchInitialSelectedItem = async (trackingId: string) => {
    const timestamp = Date.now()
    const url = `${API_CONFIG.BASE_URL.app}${orgId}/${divisionId}${API_CONFIG.ENDPOINTS.FIELD_VISIT.ENQUIRES_LIST}${trackingId}?query=${trackingId}&_=${timestamp}`

    try {
      const response = await apiClient.get(url)
      const result = response.data
      const item = result?.data?.response_data?.enquiries_list?.[0]
console.log('Fetched initial selected item:', item)
      if (item) {
        const formattedItem = {
          label: `${item.e_name} - ${item.e_phone}`,
          value: item.e_tracking_id,
          item,
        }
        setSelectedItem(formattedItem)
      }
    } catch (error: any) {
      console.log("Error fetching selected item details:", error)
    }
  }

  const fetchOptions = async (query: string) => {
    const timestamp = Date.now()
    const url = `${API_CONFIG.BASE_URL.app}${orgId}/${divisionId}${API_CONFIG.ENDPOINTS.FIELD_VISIT.ENQUIRES_LIST}${query}?query=${query}&_=${timestamp}`

    try {
      const response = await apiClient.get(url)
      const result = response.data
console.log('fetchOptionsresult:', result)

      const options =
        result?.data?.response_data?.enquiries_list?.map((item: any) => ({
          label: `${item.e_name} - ${item.e_phone} - ${getStageLabel(item.stage)} - ${timeUtils.formatDDMMYY(item?.closed_on ||item?.created_on)}`,
          value: item.e_tracking_id,
          item,
        })) || []

      // If selected value is in options, set selectedItem so it's displayed
      const matched = options.find((opt: { value: any }) => opt.value === field.value)
      if (matched) {
        setSelectedItem(matched)
      }

      return options
    } catch (error: any) {
      console.log("Error fetching enquiries:", error)
      return []
    }
  }

  const handleSelect = (value: any, item?: any) => {
    helpers.setValue(value)
    setSelectedItem(item)
    if (onValueChange) onValueChange(value)
  }

  return (
    <AsyncDropdown
      label={label}
      onRightLabelPress={onRightLabelPress}
      rightLabel={rightLabel}
      placeholderText={placeholder}
      value={selectedItem?.value ?? field.value}
      onSelect={handleSelect}
      fetchOptions={fetchOptions}
      disabled={disabled}
      mandatory={mandatory}
      error={meta.error ? meta.error : undefined}
    />
  )
}
