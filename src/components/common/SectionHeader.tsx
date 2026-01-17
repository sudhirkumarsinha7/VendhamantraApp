import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface SectionHeaderProps {
  title: string
  showViewAll?: boolean
  onViewAll?: () => void
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, showViewAll = false, onViewAll }) => {
const { state } = useAppContext();
    const { theme } = state;  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity style={styles.viewAllBtn} onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <Icon name="chevron-forward" size={16} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: theme.fontWeight.semiBold,
      color: theme.colors.text,
    },
    viewAllBtn: {
      flexDirection: "row",
      alignItems: "center",
    },
    viewAllText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.primary,
      fontWeight: theme.fontWeight.medium,
    },
  })

export default SectionHeader
