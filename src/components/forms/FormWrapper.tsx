"use client"

import React from "react"
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native"
import { Formik, FormikProps } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useAppContext } from "../../context/AppContext"
import { useHeaderHeight } from "@react-navigation/elements"
import type { FormikValues } from "formik"
import { scale } from "../scale"

interface FormWrapperProps<T extends FormikValues> {
  initialValues: T
  validationSchema: any
  onSubmit: (values: T) => void
  children: (formikProps: FormikProps<T>) => React.ReactNode
  scrollable?: boolean
}

export function FormWrapper<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  scrollable = true,
}: FormWrapperProps<T>) {
  const { state } = useAppContext()
  const { theme } = state
  const headerHeight = useHeaderHeight()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: theme.spacing.md,
    },
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 100}
        >
          {scrollable ? (
            <KeyboardAwareScrollView
              style={styles.container}
              contentContainerStyle={styles.content}
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              extraScrollHeight={scale(120)}
              keyboardShouldPersistTaps="handled"
              keyboardOpeningTime={0}
              contentInsetAdjustmentBehavior="always"
              automaticallyAdjustKeyboardInsets={true}
            >
              {children(formikProps)}
            </KeyboardAwareScrollView>
          ) : (
            <View style={[styles.container, styles.content]}>
              {children(formikProps)}
            </View>
          )}
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}
