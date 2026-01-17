"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { leaveBalances, leaveApplications } from "../../data/mockData"
import { TabSwitcher } from "../../components/ui/TabSwitcher"
import DropdownButton  from "../../components/ui/DropdownButton"

import { LeaveBalanceCard, LeaveApplicationCard, ApplyLeaveSheet, ApplyPermissionSheet } from "./components"
import type { LeaveApplication } from "../../types"
import { Theme } from "../../types"
import { SafeAreaView } from "react-native-safe-area-context"

const LeavesScreen: React.FC = () => {
  const { state } = useAppContext();
     const { theme } = state;
  const globalStyles = createGlobalStyles(theme)
  const styles = createStyles(theme)

  const [activeTab, setActiveTab] = useState("history")
  const [showLeaveSheet, setShowLeaveSheet] = useState(false)
  const [showPermissionSheet, setShowPermissionSheet] = useState(false)

  const handleApplySelect = (value: string) => {
    if (value === "leave") {
      setShowLeaveSheet(true)
    } else if (value === "permission") {
      setShowPermissionSheet(true)
    }
  }

  const filteredApplications = leaveApplications.filter((app) => {
    if (activeTab === "history") {
      return app.status === "approved" || app.status === "rejected"
    }
    return app.status === "pending"
  })

  const renderApplication = ({ item }: { item: LeaveApplication }) => <LeaveApplicationCard application={item} />

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[globalStyles.container, styles.container]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Leaves</Text>
          <DropdownButton
            label="Apply"
            options={[
              { label: "Apply Leave", value: "leave" },
              { label: "Apply Permission", value: "permission" },
            ]}
            onSelect={handleApplySelect}
          />
        </View>

        {/* Leave Balance Cards */}
        <View style={{marginBottom:10}}>
        <FlatList
  data={leaveBalances}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.balanceContainer}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <LeaveBalanceCard
      type={item.type}
      available={item.available}
      total={item.total}
      color={item.color}
      bgColor={item.bgColor}
    />
  )}
/>
</View>
        {/* Tab Switcher */}
        <TabSwitcher
          tabs={[
            { id: "history", label: "History" },
            { id: "upcoming", label: "Upcoming" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          // style={styles.tabs}
        />

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeTab === "history" ? "Past Applications" : "Upcoming Applications"}
          </Text>
          <View style={styles.filterButton}>
            <Ionicons name="filter-outline" size={18} color={theme.colors.primary} />
            <Text style={styles.filterText}>Filter</Text>
          </View>
        </View>

        {/* Applications List */}
        <FlatList
          data={filteredApplications}
          renderItem={renderApplication}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        {/* Bottom Sheets */}
        <ApplyLeaveSheet
          visible={showLeaveSheet}
          onClose={() => setShowLeaveSheet(false)}
          leaveBalances={leaveBalances}
        />

        <ApplyPermissionSheet
          visible={showPermissionSheet}
          onClose={() => setShowPermissionSheet(false)}
          permissionsAvailable={2}
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
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
    },
    balanceScroll: {
      marginBottom: theme.spacing.lg,
    },
    balanceContainer: {
      paddingRight: theme.spacing.lg,
    },
    tabs: {
      marginBottom: theme.spacing.lg,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: theme.spacing.md,

    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    filterText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.primary,
      fontWeight: theme.fontWeight.medium,
    },
    listContent: {
      paddingBottom: theme.spacing.xxl,
    },
  })

export default LeavesScreen
