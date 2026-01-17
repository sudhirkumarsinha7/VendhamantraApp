import { Platform, StyleSheet } from "react-native";
import { Theme } from "../types";
import { fonts } from "../assets/localImage";
import { scale } from "../components/scale";

export const createComponentStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            marginVertical: theme.spacing.sm,
        },
        kpiInfos: {
            flexDirection: "row",
            alignItems: "center",
        },
        kpi: { flex: 1 },
        label: {
            fontSize: theme.fontSize.small,
            color: theme.colors.textSecondary,
            marginBottom: theme.spacing.xs,
            fontWeight: "300",
            fontFamily: fonts.MEDIUM
        },
        kpiCard: {
            padding: scale(12),
            marginHorizontal: scale(5),
            gap: scale(1),
        },
        kpiInfo: {
            paddingHorizontal: scale(8),
            marginBottom: scale(14),
        },
        kpiLabel: { fontSize: scale(13), color: theme.colors.text, fontFamily: fonts.MEDIUM },
        kpiValue: { fontSize: scale(16), color: theme.colors.text, fontFamily: fonts.MEDIUM },
        input: {
            flex: 1,
            paddingVertical: theme.spacing.md,
            fontSize: theme.fontSize.small,
            color: theme.colors.text,
            fontFamily: fonts.MEDIUM
        },
        icon: {
            marginHorizontal: theme.spacing.xs,
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: scale(8),
            backgroundColor: theme.colors.surface,
            paddingHorizontal: theme.spacing.md,
        },

        wrapper: {
            marginVertical: scale(2),
        },
        dropdownWrapper: {
            borderWidth: 1,
            borderRadius: scale(5),
            paddingHorizontal: theme.spacing?.md,
            paddingVertical: theme.spacing?.sm,
            position: "relative",
        },

        dropdownTouchable: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        selectedText: {
            fontSize: theme.fontSize?.small,
            fontFamily: fonts.MEDIUM,
            flex: 1,
        },
        dropdownContent: {
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: scale(5),
            marginTop: 5,
            backgroundColor: theme.colors.surface,
            maxHeight: 300,
        },
        searchInput: {
            fontSize: theme.fontSize?.medium,
            color: theme.colors.text,
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        optionItem: {
            paddingHorizontal: scale(10),
            paddingVertical: scale(16),
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        optionText: {
            fontSize: theme.fontSize?.medium,
            color: theme.colors.text,
        },
        noResultText: {
            padding: 10,
            textAlign: "center",
            color: theme.colors.textSecondary,
        },
        selectListContainer: {
            borderWidth: 1,

            borderRadius: scale(5),
            backgroundColor: theme.colors.surface,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
        },
        selectListInput: {
            color: theme.colors.text,
            fontSize: theme.fontSize.medium,
            fontFamily: fonts.REGULAR,
        },
        selectListDropdown: {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            borderRadius: scale(5),
            marginTop: theme.spacing.xs,
        },
        selectListOptionText: {
            color: theme.colors.text,
            fontSize: theme.fontSize.medium,
            fontFamily: fonts.REGULAR,
        },
        selectListPlaceholder: {
            color: theme.colors.textSecondary,
            fontSize: theme.fontSize.medium,
            fontFamily: fonts.REGULAR,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
        },

        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.md,
        },
        title: {
            fontSize: theme.fontSize.large,
            fontWeight: "bold",
            color: theme.colors.text,
            fontFamily: fonts.MEDIUM
        },
        button: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: scale(10),
            paddingHorizontal: scale(15),
            borderRadius: scale(10),
            marginBottom: scale(8),
        },
        LocationLabel: {
            fontSize: scale(16),
            fontWeight: "400",
            marginRight: scale(6),
            paddingLeft: scale(8),
        },
        valueText: {
            marginTop: scale(3),
            fontSize: scale(14),
        },
        uploadBox: {
            height: scale(50),
            borderWidth: scale(1),
            borderRadius: 8,
            paddingHorizontal: scale(15),
            backgroundColor: theme.colors.surface,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

        },
        YesNoContainer: {
            width: scale(70),
            height: scale(26),
            borderRadius: 20,
            justifyContent: "center",
            paddingHorizontal: scale(5),
        },
        leftLabel: {
            position: "absolute",
            left: scale(10),
            fontSize: scale(14),
            fontWeight: "400",
        },

        rightLabel: {
            position: "absolute",
            right: scale(15),
            fontSize: scale(14),
            fontWeight: "400",
        },
        thumb: {
            width: scale(26),
            height: scale(26),
            borderRadius: 20,
        },

        closeButton: {
            padding: theme.spacing.xs,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: theme.spacing.lg,
        },
        resetButton: {
            flex: 1,
            paddingVertical: theme.spacing.md,
            borderRadius: scale(5),
            backgroundColor: theme.colors.background,
            alignItems: "center",
            marginRight: theme.spacing.sm,
            borderWidth: 1,
            borderColor: theme.colors.border,
        },
        saveButton: {
            flex: 1,
            paddingVertical: theme.spacing.md,
            borderRadius: scale(5),
            backgroundColor: theme.colors.primary,
            alignItems: "center",
            marginLeft: theme.spacing.sm,
        },
        buttonText: {
            fontSize: theme.fontSize.medium,
            fontWeight: "bold",
            fontFamily: fonts.REGULAR
        },
        resetButtonText: {
            color: theme.colors.textSecondary,
        },
        saveButtonText: {
            color: theme.colors.surface,
        },

        dropdownButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            paddingHorizontal: theme.spacing.md,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: scale(5),
            backgroundColor: theme.colors.surface,
            justifyContent: 'space-between',
            width: 130,
        },
        buttonText1: {
            fontSize: theme.fontSize.medium,
            color: theme.colors.text,
            marginRight: theme.spacing.sm,
            fontWeight: '400',
            fontFamily: fonts.REGULAR
        },
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 90,
            backgroundColor: theme.colors.modalOverlay,
        },
        dropdownMenu: {
            backgroundColor: theme.colors.actionBackground,
            borderRadius: scale(5),
            paddingHorizontal: theme.spacing.md,
            elevation: 5,
            top: -210,
            width: 170,
        },
        menuItem: {
            paddingVertical: 10,
        },
        menuText: {
            fontSize: theme.fontSize.small,
            color: theme.colors.shadow,
            fontWeight: '400',
            fontFamily: fonts.REGULAR
        },

        inputBox: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1,
            borderRadius: scale(5),
            backgroundColor: theme.colors.surface,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.md,
        },
        inputText: {
            fontSize: theme.fontSize.small,

            fontFamily: fonts.REGULAR,
        },
        error: {
            fontSize: theme.fontSize.small,
            color: theme.colors.error,
            marginTop: theme.spacing.xs,
            fontFamily: fonts.REGULAR,
        },
        container1: {
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: scale(10),
        },
        whatsappBtn: {
            // flexDirection: "row",
            // alignItems: "center",
            borderWidth: 1,
            borderColor: theme.colors.whatsappBorder,
            backgroundColor: theme.colors.whatappBackground,
            borderRadius: 20,
            paddingVertical: scale(2),
            paddingHorizontal: scale(8),
        },
        callBtn: {
            // flexDirection: "row",
            // alignItems: "center",
            backgroundColor: theme.colors.callBackground,
            borderRadius: 20,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            paddingHorizontal: scale(5),
            marginLeft: scale(10)

        },
        punchContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
        punchButton: {
            width: scale(200),
            height: scale(200),
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: scale(0), height: scale(4) },
            shadowOpacity: 0.3,
            shadowRadius: scale(5),
        },
        punchButtonText: {
            marginTop: 10,
            fontSize: theme.fontSize.medium,
            fontFamily: fonts.MEDIUM,
        },
        locationStatus: {
            fontSize: theme.fontSize.small,
            marginTop: 30,
            textAlign: "center",
            fontFamily: fonts.REGULAR,
        },
        customEmptyContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 40,
        },
        message: {
            fontSize: theme.fontSize.medium,
            color: theme.colors.text,
            marginTop: 12,
            textAlign: 'center',
            fontFamily: fonts.MEDIUM,
        },
        image: {
            width: scale(100),
            height: scale(100),
        },
        base: {
            borderLeftWidth: 0,
            borderRadius: 8,
            paddingVertical: 12,
            minHeight: undefined,
            minWidth: '90%',
            alignSelf: "center",
        },
        content: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            margin: 10
        },
        successBackground: {
            backgroundColor: theme.colors.success,
        },
        errorBackground: {
            backgroundColor: theme.colors.error,
        },
        infoBackground: {
            backgroundColor: theme.colors.primary,
        },
        text: {
            fontSize: scale(12),
            fontWeight: "600",
            fontFamily: fonts.REGULAR,
            lineHeight: 22,
        },
        subText: {
            fontSize: scale(10),
            fontFamily: fonts.REGULAR,
            lineHeight: 20,
            marginTop: scale(5),
            fontWeight: "400",

        },
        whiteText: {
            color: theme.colors.surface,
        },
        modalContent: {
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: scale(5) * 2,
            borderTopRightRadius: scale(5) * 2,
            padding: theme.spacing.lg,
        },
        followUpItem: {
            flexDirection: "row",
            alignItems: "flex-start",
            paddingVertical: theme.spacing.sm,
        },
        followUpIconContainer: {
            width: scale(40),
            height: scale(40),
            borderRadius: scale(5),
            backgroundColor: theme.colors.background,
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.sm,
        },
        followUpTextContainer: {
            flex: 1,
        },
        followUpTitle: {
            fontSize: theme.fontSize.small,
            fontWeight: "400",
            color: theme.colors.text,
            fontFamily: fonts.MEDIUM
        },
        followUpCategory: {
            fontSize: theme.fontSize.small,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.xs / 2,
            fontFamily: fonts.REGULAR
        },
        followUpStatement: {
            fontSize: theme.fontSize.small,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.xs / 2,
            fontFamily: fonts.REGULAR
        },
        followUpDate: {
            fontSize: theme.fontSize.small,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.xs / 2,
            fontFamily: fonts.REGULAR
        },

















    });