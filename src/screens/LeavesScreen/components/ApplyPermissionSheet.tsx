"use client"

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as Yup from "yup"
import { useAppContext } from "../../../context/AppContext"
import BottomSheet from "../../../components/ui/BottomSheet"
import { Dropdown } from "../../../components/ui/Dropdown"
import CalendarPicker from "../../../components/ui/CalendarPicker"
import TextArea from "../../../components/ui/TextArea"
import InfoBar from "../../../components/ui/InfoBar"
import { Button } from "../../../components/ui/Button"
import TimePicker from "../../../components/ui/TimePicker"
import { Theme } from "../../../types"

interface ApplyPermissionSheetProps {
  visible: boolean
  onClose: () => void
  permissionsAvailable: number
}

interface FormValues {
  permission: string
  fromDate: Date
  fromTime: string
  toTime: string
  reason: string
}

const ApplyPermissionSheet: React.FC<ApplyPermissionSheetProps> = ({
  visible,
  onClose,
  permissionsAvailable,
}) => {
  const { state } = useAppContext()
  const { theme } = state
  const styles = createStyles(theme)

  const permissionOptions = [
    { label: `1 of ${permissionsAvailable} Available`, value: "1" },
  ]

  const validationSchema = Yup.object().shape({
    permission: Yup.string().required("Please select a permission"),
    fromDate: Yup.date().required("Start date is required"),
    fromTime: Yup.string().required("From time is required"),
    toTime: Yup.string()
      .required("To time is required")
      .test(
        "is-after-from",
        "To time must be after From time",
        function (value) {
          const { fromTime } = this.parent
          if (!fromTime || !value) return true
          const [fromH, fromM] = fromTime.split(" : ").map(Number)
          const [toH, toM] = value.split(" : ").map(Number)
          return toH > fromH || (toH === fromH && toM > fromM)
        }
      ),
    reason: Yup.string()
      .required("Reason is required")
      .min(10, "Reason must be at least 10 characters"),
  })

  const calculateHours = (fromTime: string, toTime: string) => {
    const [fromH, fromM] = fromTime.split(" : ").map(Number)
    const [toH, toM] = toTime.split(" : ").map(Number)
    const diffH = toH - fromH
    const diffM = toM - fromM
    const totalHours = diffH + diffM / 60
    return totalHours > 0 ? `${totalHours} Hr` : "0 Hr"
  }

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.title}>Apply for Permission</Text>
      <Text style={styles.subtitle}>Fill in the details below</Text>

      <Formik
        initialValues={{
          permission: "",
          fromDate: new Date(),
          fromTime: "15 : 30",
          toTime: "17 : 30",
          reason: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Permission application submitted:", values)
          onClose()
        }}
      >
        {({ values, setFieldValue, handleSubmit, errors, touched }) => (
          <>
            <Dropdown
              label="Available Permissions"
              options={permissionOptions}
              value={values.permission}
              onSelect={(val) => setFieldValue("permission", val)}
            />
            {touched.permission && errors.permission && (
              <Text style={styles.error}>{errors.permission}</Text>
            )}

            <CalendarPicker
              label="From Date"
              value={values.fromDate}
              onChange={(date) => setFieldValue("fromDate", date)}
            />
            {/* {touched.fromDate && errors.fromDate && (
              <Text style={styles.error}>{errors.fromDate}</Text>
            )} */}

            <View style={styles.row}>
              <View style={styles.flex1}>
                <TimePicker
                  label="From Time"
                  value={values.fromTime}
                  onChange={(time) => setFieldValue("fromTime", time)}
                />
                {touched.fromTime && errors.fromTime && (
                  <Text style={styles.error}>{errors.fromTime}</Text>
                )}
              </View>
              <View style={styles.flex1}>
                <TimePicker
                  label="To Time"
                  value={values.toTime}
                  onChange={(time) => setFieldValue("toTime", time)}
                />
                {touched.toTime && errors.toTime && (
                  <Text style={styles.error}>{errors.toTime}</Text>
                )}
              </View>
            </View>

            <InfoBar
              label="Selected Time"
              value={calculateHours(values.fromTime, values.toTime)}
              backgroundColor="#DBEAFE"
              valueColor="#2563EB"
            />

            <TextArea
              label="Reason"
              value={values.reason}
              onChangeText={(text) => setFieldValue("reason", text)}
              placeholder="Please mention the reason..."
            />
            {touched.reason && errors.reason && (
              <Text style={styles.error}>{errors.reason}</Text>
            )}

            <Button title="Submit Application" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </BottomSheet>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xl,
    },
    row: {
      flexDirection: "row",
      gap: theme.spacing.md,
    },
    flex1: {
      flex: 1,
    },
    error: {
      color: theme.colors.danger,
      marginTop: theme.spacing.xs,
    },
  })

export default ApplyPermissionSheet
