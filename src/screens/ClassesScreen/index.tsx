"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { Theme } from "../../types"
import { ClassListCard, DatePicker } from "./components"
import { allClasses } from "../../data/mockData"
import type { ClassItem } from "../../types"

const ClassesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
 const { state } = useAppContext();
    const { theme } = state;
      const globalStyles = createGlobalStyles(theme)
  const styles = createStyles(theme)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 1)
    setSelectedDate(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 1)
    setSelectedDate(newDate)
  }

  const completedCount = allClasses.filter((c) => c.status === "completed").length

  const renderClassItem = ({ item }: { item: ClassItem }) => (
    <ClassListCard item={item} onPress={() => navigation.navigate("AttendanceDetail", { classId: item.id })} />
  )

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[globalStyles.container, styles.container]}>
        <Text style={styles.title}>My Classes</Text>

        <DatePicker date={selectedDate} onPrevious={handlePreviousDay} onNext={handleNextDay} />

        <View style={styles.summaryRow}>
          <Text style={styles.doneText}>
            {completedCount}/{allClasses.length} Done
          </Text>
          <TouchableOpacity style={styles.viewTimetableBtn}>
            <Text style={styles.viewTimetableText}>View Timetable</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={allClasses}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    doneText: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.primary,
    },
    viewTimetableBtn: {
      flexDirection: "row",
      alignItems: "center",
    },
    viewTimetableText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      fontWeight: theme.fontWeight.medium,
    },
    listContent: {
      paddingBottom: theme.spacing.xxl,
    },
  })

export default ClassesScreen
