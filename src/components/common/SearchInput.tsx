import type React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface SearchInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText, placeholder = "Search..." }) => {
  const { state } = useAppContext();
      const { theme } = state; 
        const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={20} color={theme.colors.textLight} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textLight}
      />
    </View>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    input: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      marginLeft: theme.spacing.sm,
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
  })

export default SearchInput
