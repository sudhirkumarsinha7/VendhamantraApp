import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useAppContext } from "../context/AppContext"
import { fonts } from "../assets/localImage"

interface TabItem {
  key: string
  label: string
  count?: number
}

interface WithTabNavigationProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}

export function withTabNavigation<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithTabNavigationComponent(props: P & WithTabNavigationProps) {
    const { state } = useAppContext()
    const { theme } = state
    const { tabs, activeTab, onTabChange, children, ...restProps } = props

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      tabContainer: {
        flexDirection: "row",
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderRadius: theme.borderRadius,
        padding: 4,
      },
      tab: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        alignItems: "center",
        borderRadius: theme.borderRadius - 2,
        flexDirection: "row",
        justifyContent: "center",
      },
      activeTab: {
        backgroundColor: theme.colors.primary,
      },
      tabText: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.textSecondary,
        fontWeight: "500",
        fontFamily:fonts.REGULAR,
      },
      activeTabText: {
        color: theme.colors.surface,
        fontWeight: "600",
      },
      tabCount: {
        marginLeft: theme.spacing.xs,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        minWidth: 20,
        alignItems: "center",
      },
      tabCountText: {
        fontSize: theme.fontSize.small,
        color: theme.colors.surface,
        fontWeight: "600",
        fontFamily:fonts.REGULAR
      },
      content: {
        flex: 1,
      },
    })

    return (
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => onTabChange(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
              {tab.count !== undefined && activeTab === tab.key && (
                <View style={styles.tabCount}>
                  <Text style={styles.tabCountText}>{tab.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.content}>
          <WrappedComponent {...(restProps as P)} />
        </View>
      </View>
    )
  }
}
