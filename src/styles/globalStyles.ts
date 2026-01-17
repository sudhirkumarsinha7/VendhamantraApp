import { Platform, StyleSheet } from "react-native"
import type { Theme } from "../types"
import { scale } from "../components/scale"
import { fonts } from "../assets/localImage"

export const createGlobalStyles = (theme: Theme) =>
  StyleSheet.create({
    /* ================= Layout ================= */
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
 safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },

    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginVertical: theme.spacing.sm,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },

    cardContent: {
      padding: theme.spacing.lg,
    },

    /* ================= Typography ================= */
    header: {
      fontSize: theme.fontSize.xxlarge,
      fontFamily: fonts.BOLD,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },

    headerCenter: {
      fontSize: theme.fontSize.xxlarge,
      fontFamily: fonts.BOLD,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      textAlign: "center",
    },

    subHeader: {
      fontSize: theme.fontSize.large,
      fontFamily: fonts.MEDIUM,
      fontWeight: "500",
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },

    text: {
      fontSize: theme.fontSize.medium,
      fontFamily: fonts.REGULAR,
      fontWeight: "400",
      color: theme.colors.text,
    },

    textSecondary: {
      fontSize: theme.fontSize.medium,
      fontFamily: fonts.REGULAR,
      fontWeight: "400",
      color: theme.colors.textSecondary,
    },

    textSmall: {
      fontSize: theme.fontSize.small,
      fontFamily: fonts.REGULAR,
      fontWeight: "400",
      color: theme.colors.text,
    },

    textError: {
      fontSize: theme.fontSize.small,
      fontFamily: fonts.MEDIUM,
      fontWeight: "500",
      color: theme.colors.error,
    },

    /* ================= Inputs ================= */
    input: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      fontSize: theme.fontSize.medium,
      fontFamily: fonts.REGULAR,
      fontWeight: "400",
      color: theme.colors.text,
      marginVertical: theme.spacing.sm,
    },

    /* ================= Profile ================= */
    profileSection: {
      alignItems: "center",
      marginBottom: theme.spacing.xl,
      paddingBottom: theme.spacing.lg,
      borderBottomWidth: scale(1),
      borderBottomColor: theme.colors.border,
    },

    /* ================= Tabs ================= */
    tabBar: {
      flexDirection: "row",
      backgroundColor: theme.colors.card,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingVertical: theme.spacing.sm,
    },

    tabItem: {
      flex: 1,
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
    },

    tabContainer: {
      flexDirection: "row",
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
    },

    tab: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },

    tabFirst: {
      borderTopLeftRadius: theme.borderRadius.md - 1,
      borderBottomLeftRadius: theme.borderRadius.md - 1,
    },

    tabLast: {
      borderTopRightRadius: theme.borderRadius.md - 1,
      borderBottomRightRadius: theme.borderRadius.md - 1,
    },

    tabActive: {
      backgroundColor: theme.colors.primary,
    },

    tabText: {
      fontSize: theme.fontSize.medium,
      fontFamily: fonts.MEDIUM,
      fontWeight: "500",
      color: theme.colors.text,
    },

    tabTextActive: {
      fontFamily: fonts.BOLD,
      fontWeight: "700",
      color: theme.colors.background,
    },

    /* ================= Buttons (EXISTING – UNCHANGED) ================= */
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
    },

    buttonText: {
      fontSize: theme.fontSize.medium,
      fontFamily: fonts.BOLD,
      fontWeight: "700",
      color: theme.colors.background,
    },

    /* ================= Buttons (NEW – V2) ================= */
    buttonBaseV2: {
      borderRadius: theme.borderRadius.md,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    buttonSmallV2: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },

    buttonMediumV2: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },

    buttonLargeV2: {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
    },

    buttonFilledV2: {
      backgroundColor: theme.colors.primary,
    },

    buttonOutlinedV2: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },

    buttonTextV2: {
      backgroundColor: "transparent",
    },

    buttonDisabledV2: {
      backgroundColor: theme.colors.border,
      borderColor: theme.colors.border,
    },

    buttonTextBaseV2: {
      fontFamily: fonts.BOLD,
      fontWeight: "600",
      textAlign: "center",
    },

    buttonTextSmallV2: {
      fontSize: theme.fontSize.small,
    },

    buttonTextMediumV2: {
      fontSize: theme.fontSize.medium,
    },

    buttonTextLargeV2: {
      fontSize: theme.fontSize.large,
    },

    buttonTextFilledV2: {
      color: theme.colors.surface,
    },

    buttonTextOutlinedV2: {
      color: theme.colors.primary,
    },

    buttonTextDisabledV2: {
      color: theme.colors.textSecondary,
    },

    /* ================= Badges ================= */
    attendanceBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: scale(2),
      borderRadius: theme.borderRadius.sm,
      alignSelf: "flex-start",
    },
 statusBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: scale(2),
      borderRadius: theme.borderRadius.sm,
      alignSelf: "flex-start",
    },
   /* ================= Flex Utils ================= */
    row: {
      flexDirection: "row",
      alignItems: "center",
    },

    rowCenter: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    rowEnd: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },

    /* ================= Spacing Utils ================= */
    mbSM: { marginBottom: theme.spacing.sm },
    mbMD: { marginBottom: theme.spacing.md },
    mbLG: { marginBottom: theme.spacing.lg },
    mbXL: { marginBottom: theme.spacing.xl },
    mbXXL: { marginBottom: theme.spacing.xxl },

    mtSM: { marginTop: theme.spacing.sm },
    mtMD: { marginTop: theme.spacing.md },
    mtLG: { marginTop: theme.spacing.lg },
    mtXL: { marginTop: theme.spacing.xl },
  })
