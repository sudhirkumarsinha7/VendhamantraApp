"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { MultiSelectDropdown } from "./MultiSelectDropdown"
import { DateRangePickerInput } from "./DateRangePickerInput"
import { Dropdown } from "./Dropdown"
import { masterDataApi } from "../../api/apiService"
import dayjs from "dayjs"
import { apiService } from "../../services/apiService"
import { useAuth } from "../../context/AuthContext"
import { fonts } from "../../assets/localImage"
import { createComponentStyles } from "../../styles/componentStyles"
import { hasPermission, hasPermissionnew } from "../../utils/permissionUtil"

// Assuming these are defined elsewhere in your project
// import { masterDataApi } from "../../api/apiService"
// import { useNetwork } from "../../context/NetworkContext"

interface FilterModalProps {
  visible: boolean
  onClose: () => void
  onApply: (filters: Record<string, any>) => void
  onReset: () => void
  initialFilters: Record<string, any>
  module_id: string,
}

const { height } = Dimensions.get("window")

export const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply, onReset, initialFilters, module_id }) => {
  const { state } = useAppContext()
  const { theme } = state
  const globalStyles = createGlobalStyles(theme)
  const componentStyles = createComponentStyles(theme)

  // Placeholder for networkState and masterDataApi (replace with actual imports)
  const networkState = { isOnline: true } // Mock for demonstration
  const { orgId, divisionId, state: authState } = useAuth()

  const [localFilters, setLocalFilters] = useState<Record<string, any>>(initialFilters)

  // State & District options and loading states
  const [states, setStates] = useState<{ label: string; value: string }[]>([])
  const [districts, setDistricts] = useState<{ label: string; value: string }[]>([])
  const [staffList, setStaffList] = useState<{ key: string; value: string }[]>([])
  const [campaignOptions, setCampaignList] = useState<{ key: string; value: string }[]>([]) // Changed to key/value for SelectList
  const [testRideStatusOptions, setTestRideStatusOptions] = useState<{ label: string; value: string }[]>([])

  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingDistricts, setLoadingDistricts] = useState(false)
  const [loadingStaff, setLoadingStaff] = useState(false)
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)
  const { clientAssets = {} } = authState
  const { module_operation_permissions = [] } = clientAssets
  useEffect(() => {
    setLocalFilters(initialFilters)
    if (!localFilters.duration || !initialFilters.duration) {
      const today = {
        label: "Today",
        start: dayjs().format("YYYY-MM-DD"),
        end: dayjs().format("YYYY-MM-DD"),
      }

      handleFilterChange("duration", today)
    }
  }, [initialFilters])

  // Fetch master data when modal opens
  useEffect(() => {
    if (visible) {
      fetchStates()
      fetchStaffList()
      fetchCampaignList()
      fetchStatusList()
    }
  }, [visible])

  // Fetch districts whenever state changes
  useEffect(() => {
    if (localFilters.state) {
      fetchDistricts("IN", localFilters.state)
    } else {
      setDistricts([])
      handleFilterChange("district", []) // Clear districts if state is cleared
    }
  }, [localFilters.state])

  const fetchStaffList = async () => {
    if (!networkState.isOnline) return
    setLoadingStaff(true)
    try {
      const response = await masterDataApi.getEnquiryStaff(orgId, divisionId, module_id)
      if (response.success && response?.data) {
        const options = response.data.map((staff: any) => ({
          key: staff?.staff_id,
          value: `${staff?.staff_f_name} (${staff?.staff_designation})`,
        }))
        setStaffList(options)
      }
    } catch (error: any) {
      console.log("Error fetching staff list:", error)
    } finally {
      setLoadingStaff(false)
    }
  }
  const fetchStatusList = async () => {
    if (!networkState.isOnline) return
    setLoadingStaff(true)
    try {
      const testRideStatusResponse = await apiService.getTestRideStatus(orgId, divisionId)
      // console.log("testRideStatusResponse", testRideStatusResponse)

      if (testRideStatusResponse.success && testRideStatusResponse?.data) {
        const list = testRideStatusResponse?.data?.concept_stages_list || []

        // Find the "Raised" stage (level 1)
        const raisedStage = list.find((stage: any) => stage.ch_stage_id === "raised")

        // Collect all relevant stages: Raised + its sub-stages (Completed, Cancelled)
        const allStages: any[] = []
        if (raisedStage) {
          allStages.push(raisedStage)
          if (Array.isArray(raisedStage.ch_sub)) {
            allStages.push(...raisedStage.ch_sub)
          }
        }

        // Map to dropdown options
        const options = allStages.map((stage: any) => ({
          label: stage.ch_stage_title,
          value: stage.ch_stage_id,
        }))

        setTestRideStatusOptions(options)
      }

    } catch (error: any) {
      console.log("Error fetching staff list:", error)
    } finally {
      setLoadingStaff(false)
    }
  }




  const fetchStates = async () => {
    if (!networkState.isOnline) return
    setLoadingStates(true)
    try {
      const response = await masterDataApi.getStates("IN")
      if (response.success && response?.data?.state) {
        const options = response.data.state.map((state: any) => ({
          label: state.state_name,
          value: state.state_code,
        }))
        setStates(options)
      }
    } catch (error: any) {
      console.log("Error fetching states:", error)
    } finally {
      setLoadingStates(false)
    }
  }

  const fetchCampaignList = async () => {
    if (!networkState.isOnline) return
    setLoadingCampaigns(true)
    try {
      const response = await masterDataApi.getConpaigns(orgId, divisionId)
      if (response.success && response.data) {
        const options = response.data.map((group: any) => ({
          key: group?.campaign_id,
          value: group?.campaign_title,
        }))
        setCampaignList(options)
      }
    } catch (error: any) {
      console.log("Error fetching campaign groups:", error)
    } finally {
      setLoadingCampaigns(false)
    }
  }

  const fetchDistricts = async (countryCode: string, stateCode: string) => {
    if (!networkState.isOnline || !stateCode) return
    setLoadingDistricts(true)
    setDistricts([]) // Clear previous districts
    try {
      const response = await masterDataApi.getDistricts(countryCode, stateCode)
      if (response.success && response?.data?.district) {
        const options = response.data.district.map((district: any) => ({
          label: district.district_name,
          value: district.district_name,
        }))
        setDistricts(options)
      }
    } catch (error: any) {
      console.log("Error fetching districts:", error)
    } finally {
      setLoadingDistricts(false)
    }
  }

  const handleFilterChange = (key: string, value: any, item?: any) => {
    // console.log('key ',key)
    //     console.log('item ',item)
    if (key === 'state') {
      setLocalFilters((prev) => ({ ...prev, stateName: item.label }))

    }
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }
  // console.log('localFilter ',localFilters)
  const handleApply = () => {
    onApply(localFilters)
    onClose()
  }

  const handleReset = () => {
    setLocalFilters({})
    onReset()
    onClose()
  }



  const interestLevelOptions = [
    { label: "Very High", value: "very-high" },
    { label: "High", value: "high" },
    { label: "Mid", value: "mid" },
    { label: "Low", value: "low" },
  ]

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
  const canViewTestRide = hasPermission(module_id, 'dashboard_testride', module_operation_permissions);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onClose}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={componentStyles.header}>
              <Text style={componentStyles.title}>Filters</Text>
              <TouchableOpacity onPress={onClose} style={componentStyles.closeButton}>
                <Icon name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <DateRangePickerInput
                label="Select Duration"
                value={localFilters.duration || null}
                onSelect={(dateRange) => handleFilterChange("duration", dateRange)}
              />
              {/* States dropdown */}
              {loadingStates ? (
                <ActivityIndicator
                  size="small"
                  color={theme.colors.primary}
                  style={{ marginVertical: theme.spacing.sm }}
                />
              ) : (
                <Dropdown
                  label="Choose state"
                  placeholderText="Select state"
                  options={states}
                  value={localFilters.state || ""}
                  onSelect={(value, item) => handleFilterChange("state", value, item)}
                />
              )}
              {/* Districts multi-select dropdown */}
              {loadingDistricts ? (
                <ActivityIndicator
                  size="small"
                  color={theme.colors.primary}
                  style={{ marginVertical: theme.spacing.sm }}
                />
              ) : (
                <MultiSelectDropdown
                  label="Choose district"
                  placeholderText="Select districts"
                  options={districts.map((d) => ({ key: d.value, value: d.label }))} // Map to {key, value} for MultiSelectDropdown
                  selectedValues={localFilters.district || []}
                  onSelect={(selectedValues) => handleFilterChange("district", selectedValues)}
                />
              )}
              {canViewTestRide && <MultiSelectDropdown
                label="Choose test ride status"
                placeholderText="Select status"
                options={testRideStatusOptions.map((d) => ({ key: d.value, value: d?.label }))}
                selectedValues={localFilters.testRideStatus || []}
                onSelect={(selectedValues) => handleFilterChange("testRideStatus", selectedValues)}

              />}
              <MultiSelectDropdown
                label="Choose campaign title"
                placeholderText="Select campaigns"
                options={campaignOptions}
                selectedValues={localFilters.campaignTitle || []}
                onSelect={(selectedKeys) => handleFilterChange("campaignTitle", selectedKeys)}
              />
              <MultiSelectDropdown
                label="Choose assigned to"
                placeholderText="Select assigned users"
                options={staffList}
                selectedValues={localFilters.assignedTo || []}
                onSelect={(selectedKeys) => handleFilterChange("assignedTo", selectedKeys)}
              />
              <Dropdown
                label="Choose interest level"
                placeholderText="Select interest"
                options={interestLevelOptions}
                value={localFilters.interestLevel || ""}
                onSelect={(value) => handleFilterChange("interestLevel", value)}
              />
            </ScrollView>
            <View style={componentStyles.buttonContainer}>
              <TouchableOpacity style={componentStyles.resetButton} onPress={handleReset}>
                <Text style={[componentStyles.buttonText, componentStyles.resetButtonText]}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={componentStyles.saveButton} onPress={handleApply}>
                <Text style={[componentStyles.buttonText, componentStyles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  )
}
