import type React from "react"
import { View, Modal, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useAppContext } from "../../context/AppContext"
import { Theme } from "../../types"

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose, children }) => {
  const { state } = useAppContext();
      const { theme } = state;
  const styles = createStyles(theme)

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
          <View style={styles.content} onStartShouldSetResponder={() => true}>
            <View style={styles.handle} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    keyboardView: {
      flex: 1,
      justifyContent: "flex-end",
    },
    content: {
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      maxHeight: "85%",
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl,
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
      alignSelf: "center",
      marginVertical: theme.spacing.lg,
    },
    scrollContent: {
      paddingBottom: theme.spacing.lg,
    },
  })

export default BottomSheet
