import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"
import { StatusBadge } from "../../../components/common"
import type { ClassItem } from "../../../types"

interface ClassListCardProps {
  item: ClassItem
  onPress?: () => void
}

const ClassListCard: React.FC<ClassListCardProps> = ({ item, onPress }) => {
 const { state } = useAppContext();
    const { theme } = state;
  const styles = createStyles(theme)

  const getBorderColor = () => {
    switch (item.status) {
      case "completed":
        return theme.colors.success
      case "ongoing":
        return theme.colors.primary
      default:
        return theme.colors.border
    }
  }

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: getBorderColor() }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.timeRow}>
        <Icon name="time-outline" size={14} color={theme.colors.textSecondary} />
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.contentRow}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subject}>{item.subject}</Text>
        </View>
        <View style={styles.rightSection}>
          <StatusBadge status={item.status} />
          <View style={styles.studentsRow}>
            <Icon name="people-outline" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.studentsText}>{item.students} Students</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      borderLeftWidth: 4,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    timeRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    timeText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    contentRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    subject: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
    },
    rightSection: {
      alignItems: "flex-end",
    },
    studentsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.spacing.sm,
    },
    studentsText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
  })

export default ClassListCard
