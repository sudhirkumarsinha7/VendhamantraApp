"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as Yup from "yup"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"
import BottomSheet from "../../../components/ui/BottomSheet"
import { Dropdown } from "../../../components/ui/Dropdown"
import CalendarPicker from "../../../components/ui/CalendarPicker"
import TextArea from "../../../components/ui/TextArea"
import InfoBar from "../../../components/ui/InfoBar"
import { Button } from "../../../components/ui/Button"

interface LeaveBalance {
  type: string
  available: number
  total: number
}

interface ApplyLeaveSheetProps {
  visible: boolean
  onClose: () => void
  leaveBalances: LeaveBalance[]
}

interface FormValues {
  leaveType: string
  fromDate: Date
  toDate: Date
  fromSession: string
  toSession: string
  reason: string
}

const ApplyLeaveSheet: React.FC<ApplyLeaveSheetProps> = ({ visible, onClose, leaveBalances }) => {
  const { state } = useAppContext()
  const { theme } = state
  const styles = createStyles(theme)

  const leaveOptions = leaveBalances
    .filter((b) => b.type !== "Permissions")
    .map((b) => ({
      label: b.type,
      value: b.type.toLowerCase().replace(" ", "_"),
      subLabel: `(${b.available} left)`,
    }))

  const sessionOptions = [
    { label: "Full Day", value: "full" },
    { label: "First Half", value: "first" },
    { label: "Second Half", value: "second" },
  ]

  const validationSchema = Yup.object().shape({
    leaveType: Yup.string().required("Please select leave type"),
    fromDate: Yup.date().required("Start date is required"),
    toDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("fromDate"), "End date cannot be before start date"),
    fromSession: Yup.string().required("Select session"),
    toSession: Yup.string().required("Select session"),
    reason: Yup.string()
      .required("Reason is required")
      .min(10, "Reason must be at least 10 characters"),
  })

  const calculateDays = (fromDate: Date, toDate: Date, fromSession: string, toSession: string) => {
    let diffTime = toDate.getTime() - fromDate.getTime()
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1

    // Handle half-day logic
    if (fromDate.getTime() === toDate.getTime()) {
      // Same day
      if (fromSession !== "full" || toSession !== "full") diffDays = 0.5
    } else {
      // Multiple days
      if (fromSession !== "full") diffDays -= 0.5
      if (toSession !== "full") diffDays -= 0.5
    }

    return diffDays
  }

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Text style={styles.title}>Apply for Leave</Text>
      <Text style={styles.subtitle}>Fill in the details below</Text>

      <Formik
        initialValues={{
          leaveType: "",
          fromDate: new Date(),
          toDate: new Date(),
          fromSession: "full",
          toSession: "full",
          reason: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Leave application submitted", values)
          onClose()
        }}
      >
        {({ values, setFieldValue, handleSubmit, errors, touched }) => (
          <>
            <Dropdown
              label="Leave Type"
              options={leaveOptions}
              value={values.leaveType}
              onSelect={(val) => setFieldValue("leaveType", val)}
            />
            {touched.leaveType && errors.leaveType && <Text style={styles.error}>{errors.leaveType}</Text>}

            <View style={styles.row}>
              <View style={styles.flex1}>
                <CalendarPicker
                  label="From Date"
                  value={values.fromDate}
                  onChange={(date) => setFieldValue("fromDate", date)}
                />
                {/* {touched.fromDate && errors.fromDate && <Text style={styles.error}>{errors.fromDate}</Text>} */}
              </View>
              <View style={styles.flex1}>
                <Dropdown
                  label="Session"
                  options={sessionOptions}
                  value={values.fromSession}
                  onSelect={(val) => setFieldValue("fromSession", val)}
                />
                {touched.fromSession && errors.fromSession && (
                  <Text style={styles.error}>{errors.fromSession}</Text>
                )}
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.flex1}>
                <CalendarPicker
                  label="To Date"
                  value={values.toDate}
                  onChange={(date) => setFieldValue("toDate", date)}
                />
                {/* {touched.toDate && errors.toDate && <Text style={styles.error}>{errors.toDate}</Text>} */}
              </View>
              <View style={styles.flex1}>
                <Dropdown
                  label="Session"
                  options={sessionOptions}
                  value={values.toSession}
                  onSelect={(val) => setFieldValue("toSession", val)}
                />
                {/* {touched.toSession && errors.toSession && <Text style={styles.error}>{errors.toSession}</Text>} */}
              </View>
            </View>

            <InfoBar
              label="Total Days Selected"
              value={`${calculateDays(values.fromDate, values.toDate, values.fromSession, values.toSession)} Day${
                calculateDays(values.fromDate, values.toDate, values.fromSession, values.toSession) > 1 ? "s" : ""
              }`}
            />

            <TextArea
              label="Reason"
              value={values.reason}
              onChangeText={(text) => setFieldValue("reason", text)}
              placeholder="Please mention the reason..."
            />
            {touched.reason && errors.reason && <Text style={styles.error}>{errors.reason}</Text>}

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

export default ApplyLeaveSheet
