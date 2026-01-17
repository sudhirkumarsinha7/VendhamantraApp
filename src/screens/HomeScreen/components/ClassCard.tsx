import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"
import { StatusBadge } from "../../../components/common"
import type { ClassItem } from "../../../types"
import { Card3D } from "../../../components/ui/Card3D"
import { scale } from "../../../components/scale"

interface ClassCardProps {
  item: ClassItem
  variant?: "primary" | "secondary"
  onPress?: () => void
}

const ClassCard: React.FC<ClassCardProps> = ({ item, variant = "secondary", onPress }) => {
  const { state } = useAppContext();
     const { theme } = state;
  const isPrimary = variant === "primary"
  const styles = createStyles(theme, isPrimary)

  return (
    <TouchableOpacity
      style={[styles.container, isPrimary && styles.primaryContainer]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isPrimary ? (
        <>
          <View style={styles.header}>
            <StatusBadge status="ongoing" label="Ongoing" />
            <Icon name="time-outline" size={20} color={theme.colors.white} />
          </View>
          <Text style={styles.primaryName}>{item.name}</Text>
          <Text style={styles.primarySubject}>
            {item.subject} • {item.time}
          </Text>
          <TouchableOpacity style={styles.takeAttendanceBtn}>
            <Text style={styles.takeAttendanceText}>Take Attendance</Text>
            <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </>
      ) : (
         <>
          <View style={styles.header}>
            <View style={styles.nextTimeBadge}>
              <Text style={styles.nextTimeText}>Next: {item.nextTime}</Text>
            </View>
          </View>
          <Text style={styles.secondaryName}>{item.name}</Text>
          <Text style={styles.secondarySubject}>{item.subject}</Text>
          <Text style={styles.secondaryTime}>{item.time}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

const createStyles = (theme: Theme, isPrimary: boolean) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginRight: theme.spacing.xs,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.white,
      borderWidth: 1,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: Platform.OS === 'android' ? 5 : undefined,

    },
    primaryContainer: {
      backgroundColor: theme.colors.primary,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },
    primaryName: {
      fontSize: theme.fontSize.xl,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.white,
      marginBottom: theme.spacing.xs,
    },
    primarySubject: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.white,
      opacity: 0.9,
      marginBottom: theme.spacing.md,
    },
    takeAttendanceBtn: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    takeAttendanceText: {
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.primary,
      marginRight: theme.spacing.xs,
    },
    nextTimeBadge: {
      backgroundColor: theme.colors.warningLight,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    nextTimeText: {
      fontSize: theme.fontSize.xs,
      fontWeight: theme.fontWeight.medium,
      color: theme.colors.warning,
    },
    secondaryName: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    secondarySubject: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    secondaryTime: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
    },
  })

export default ClassCard
