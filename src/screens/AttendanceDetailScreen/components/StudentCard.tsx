import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../../context/AppContext"
import { Avatar } from "../../../components/common"
import type { Student } from "../../../types"
import { Theme } from "../../../types"

interface StudentCardProps {
  item: Student
  onToggle: () => void
}

const StudentCard: React.FC<StudentCardProps> = ({ item, onToggle }) => {
  const { state } = useAppContext();
      const { theme } = state;
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Avatar name={item.name} size={44} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rollNo}>Roll No: {item.rollNo}</Text>
      </View>
      <TouchableOpacity onPress={onToggle} style={styles.toggleBtn}>
        {item.isPresent ? (
          <View style={styles.presentIcon}>
            <Icon name="checkmark" size={20} color={theme.colors.white} />
          </View>
        ) : (
          <View style={styles.absentIcon}>
            <Icon name="close" size={20} color={theme.colors.error} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 1, height: 5 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 5,
      
    },
    info: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    name: {
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
    },
    rollNo: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
    toggleBtn: {
      padding: theme.spacing.xs,
    },
    presentIcon: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.success,
      alignItems: "center",
      justifyContent: "center",
    },
    absentIcon: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.errorLight,
      alignItems: "center",
      justifyContent: "center",
    },
  })

export default StudentCard
