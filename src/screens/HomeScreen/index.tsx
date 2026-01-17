import type React from "react"
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { SectionHeader } from "../../components/common"
import { ClassCard, StatCard, AttendanceStatusCard, LeaveCard } from "./components"
import { todaysClasses, leaveApplications, userData } from "../../data/mockData"
import type { ClassItem, LeaveApplication, Theme } from "../../types"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../context/AuthContext"

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { state } = useAppContext();
  const { theme } = state;
  const globalStyles = createGlobalStyles(theme)
  const styles = createStyles(theme)
  const { state: userState } = useAuth()
  const { user = {} } = userState
  const renderClassCard = ({ item, index }: { item: ClassItem; index: number }) => (
    <ClassCard
      item={item}
      variant={index === 0 ? "primary" : "secondary"}
      onPress={() => navigation.navigate("AttendanceDetail", { classId: item.id })}
    />
  )

  const renderLeaveCard = ({ item }: { item: LeaveApplication }) => <LeaveCard item={item} />

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.first_name || userData?.name}!</Text>
            <Text style={styles.subGreeting}>{userData.greeting}</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Icon name="notifications-outline" size={24} color={theme.colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Today's Classes */}
        <SectionHeader title="Today's Classes" showViewAll onViewAll={() => navigation.navigate("Classes")} />
        <FlatList
          data={todaysClasses}
          renderItem={renderClassCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.classList}
        />

        {/* Leaves & Permissions */}
        <SectionHeader title="Leaves & Permissions" />
        <View style={styles.statsRow}>
          <StatCard
            icon="calendar-outline"
            iconColor={theme.colors.primary}
            value="9"
            subValue="/12"
            label="Available Leaves"
            bgColor="#EFF6FF"
            textColor="#1447E6"
          />
          <StatCard
            icon="time-outline"
            iconColor="#8200DB"
            value="2"
            label="Used this month"
            bgColor="#FAF5FF"
            textColor="#8200DB"
          />
        </View>

        {/* Today's Attendance */}
        <View style={styles.section}>
          <AttendanceStatusCard status="present" checkInTime="09:02 AM" />
        </View>

        {/* Recent Applications */}
        <SectionHeader title="Recent Applications" showViewAll onViewAll={() => navigation.navigate("Leaves")} />
        <FlatList
          data={leaveApplications}
          renderItem={renderLeaveCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: theme.spacing.xl,
      marginTop: theme.spacing.md,
    },
    greeting: {
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
    },
    subGreeting: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    notificationBtn: {
      position: "relative",
      padding: theme.spacing.sm,
    },
    notificationBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.error,
    },
    classList: {
      marginBottom: theme.spacing.xl,
    },
    statsRow: {
      flexDirection: "row",
      marginBottom: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
  })

export default HomeScreen
