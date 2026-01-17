import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAppContext } from "../../../context/AppContext"
import { Theme } from "../../../types"
import { Avatar, StatusBadge } from "../../../components/common"
import type { LeaveApplication } from "../../../types"

interface LeaveCardProps {
  item: LeaveApplication
}

const LeaveCard: React.FC<LeaveCardProps> = ({ item }) => {
  const { state } = useAppContext();
     const { theme } = state;
  const styles = createStyles(theme)

  const getAvatarColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "sick leave":
        return theme.colors.errorLight
      case "permission":
        return theme.colors.primaryLight
      case "casual leave":
        return theme.colors.warningLight
      default:
        return theme.colors.primaryLight
    }
  }

  const getTextColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "sick leave":
        return theme.colors.error
      case "permission":
        return theme.colors.primary
      case "casual leave":
        return theme.colors.warning
      default:
        return theme.colors.primary
    }
  }

  return (
    <View style={styles.container}>
      <Avatar
        name={item.type}
        size={40}
        backgroundColor={getAvatarColor(item.type)}
        textColor={getTextColor(item.type)}
      />
      <View style={styles.content}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.date}>
          {item.startDate} - {item.endDate}
        </Text>
      </View>
      <StatusBadge status={item.status} />
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    content: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    type: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
    },
    date: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
  })

export default LeaveCard
