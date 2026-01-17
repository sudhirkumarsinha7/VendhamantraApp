"use client"

import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAuth } from "../../context/AuthContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { Dropdown } from "./Dropdown"
import { masterDataApi } from "../../api/apiService"
import { useAppContext } from "../../context/AppContext"
import { createComponentStyles } from "../../styles/componentStyles"

interface FilterModalProps {
  visible: boolean
  onClose: () => void
  onApply: (filters: Record<string, any>) => void
  onReset: () => void
  initialFilters: Record<string, any>
}

const { height } = Dimensions.get("window")

export const DealersFilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  onReset,
  initialFilters,
}) => {
  const { state: authState, orgId, divisionId } = useAuth()
  const [localFilters, setLocalFilters] = useState<Record<string, any>>(initialFilters)
  const [states, setStates] = useState<{ label: string; value: string }[]>([])
  const [dealerTypes, setDealerTypes] = useState<{ label: string; value: string }[]>([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingTypes, setLoadingTypes] = useState(false)
  const { state } = useAppContext()

  const { theme } = state
  const globalStyles = createGlobalStyles(theme)
  const componentStyles = createComponentStyles(theme)

  // Fetch state list
const fetchStates = async () => {
  setLoadingStates(true)
  try {
    const response = await masterDataApi.getStates("IN")
    if (response?.success && response?.data?.state) {
      const statesList = response.data.state.map((s: any) => ({
        label: s?.state_name,
        value: s?.state_name,
      }))

      // Add "All" option at the beginning
      const allOption = { label: "All", value: "state" }
      const finalStates = [allOption, ...statesList]

      setStates(finalStates)

    }
  } catch (e) {
    console.log("Error fetching states:", e)
  } finally {
    setLoadingStates(false)
  }
}

  // Fetch dealer types
  const fetchDealerTypes = async () => {
    setLoadingTypes(true)
    try {
      const response = await masterDataApi.getDealersType(orgId, divisionId)
      const options = (response.data || []).map((d: any) => ({
        label: d.btt_title,
        value: d.btt_title_id,
      }))
      setDealerTypes([{ label: "All", value: "all" }, ...options])

    } catch (e) {
      console.log("Error fetching dealer types:", e)
    } finally {
      setLoadingTypes(false)
    }
  }

  useEffect(() => {
    if (visible) {
      fetchStates()
      fetchDealerTypes()
    }
  }, [visible])

  const handleFilterChange = (key: string, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    onApply(localFilters)
    onClose()
  }

  const handleReset = () => {
    setLocalFilters({})
    onReset()
    onClose()
  }

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      ...componentStyles.modalContent,
      maxHeight: height * 0.8,
      ...globalStyles.shadow,
    },

  })

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onClose}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={componentStyles.header}>
              <Text style={componentStyles.title}>Filters</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {loadingStates ? (
                <ActivityIndicator />
              ) : (
                <Dropdown
                  label="Select State"
                  placeholderText="Select state"
                  options={states}
                  value={localFilters.state || ""}
                  onSelect={val => handleFilterChange("state", val)}
                />
              )}
              {loadingTypes ? (
                <ActivityIndicator />
              ) : (
                <Dropdown
                  label="Dealer Type"
                  placeholderText="Select type"
                  options={dealerTypes}
                  value={localFilters.dealerType || ""}
                  onSelect={val => handleFilterChange("dealerType", val)}
                />
              )}
            </ScrollView>
            <View style={componentStyles.buttonContainer}>
              <TouchableOpacity style={componentStyles.resetButton} onPress={handleReset}>
                <Text style={[componentStyles.buttonText, componentStyles.resetButtonText]}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={componentStyles.saveButton} onPress={handleApply}>
                <Text style={[componentStyles.buttonText, componentStyles.saveButtonText]}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  )
}
