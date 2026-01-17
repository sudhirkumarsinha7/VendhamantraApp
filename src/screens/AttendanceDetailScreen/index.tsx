"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { SearchInput } from "../../components/common"
import { StudentCard, AttendanceSummary } from "./components"
import { students as initialStudents } from "../../data/mockData"
import type { Student } from "../../types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Theme } from "../../types"

const AttendanceDetailScreen: React.FC<{ navigation: any; route: any }> = ({ navigation }) => {
 const { state } = useAppContext();
     const { theme } = state;
  const globalStyles = createGlobalStyles(theme)
  const styles = createStyles(theme)

  const [studentList, setStudentList] = useState<Student[]>(initialStudents)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = studentList.filter(
    (student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.rollNo.includes(searchQuery),
  )

  const presentCount = studentList.filter((s) => s.isPresent).length
  const absentCount = studentList.length - presentCount

  const toggleAttendance = (id: string) => {
    setStudentList((prev) =>
      prev.map((student) => (student.id === id ? { ...student, isPresent: !student.isPresent } : student)),
    )
  }

  const markAllPresent = () => {
    setStudentList((prev) => prev.map((student) => ({ ...student, isPresent: true })))
  }

  const renderStudentItem = ({ item }: { item: Student }) => (
    <StudentCard item={item} onToggle={() => toggleAttendance(item.id)} />
  )

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[globalStyles.container, styles.container]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.className}>Class 9 B</Text>
            <Text style={styles.classSubject}>Physics • 10:00 AM</Text>
          </View>
        </View>

        {/* Attendance Summary */}
        <AttendanceSummary present={presentCount} absent={absentCount} total={studentList.length} />

        {/* Search */}
        <SearchInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search student..." />

        {/* Student List */}
        <FlatList
          data={filteredStudents}
          renderItem={renderStudentItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          style={styles.list}
        />

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.markAllBtn} onPress={markAllPresent}>
            <Text style={styles.markAllText}>Mark All Present</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.lg,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    backBtn: {
      padding: theme.spacing.sm,
      marginRight: theme.spacing.sm,
    },
    headerInfo: {
      flex: 1,
    },
    className: {
      fontSize: theme.fontSize.xl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
    },
    classSubject: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    list: {
      flex: 1,
      marginTop: theme.spacing.lg,
    },
    listContent: {
      paddingBottom: theme.spacing.lg,
    },
    bottomButtons: {
      flexDirection: "row",
      paddingVertical: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    markAllBtn: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: "center",
      marginRight: theme.spacing.md,
    },
    markAllText: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
    },
    submitBtn: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
    },
    submitText: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.white,
    },
  })

export default AttendanceDetailScreen
