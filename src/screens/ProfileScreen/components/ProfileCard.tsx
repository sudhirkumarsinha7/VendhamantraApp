// components/ProfileCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../../../types";

interface ProfileCardProps {
  title: string;
  value: string;
  theme: Theme;
  style?: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, value, theme, style }) => {
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    value: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      fontWeight: theme.fontWeight.semiBold,
    },
  });

export default ProfileCard;