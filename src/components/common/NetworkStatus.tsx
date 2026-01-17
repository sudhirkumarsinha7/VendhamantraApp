"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { useState, useEffect, useRef } from "react"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNetwork } from "../../context/NetworkContext"
import { useAppContext } from "../../context/AppContext"
import { offlineQueueService } from "../../services/offlineQueueService"
import { fonts } from "../../assets/localImage"
import { themes } from "../../styles/themes"

interface NetworkStatusProps {
  showDetails?: boolean
  showQueueStatus?: boolean
  position?: "top" | "bottom"
  onRetry?: () => void
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({
  showDetails = true,
  showQueueStatus = true,
  position = "top",
  onRetry,
}) => {
  const { state: appState } = useAppContext()
  const { theme } = appState
  const { state: networkState, refreshNetworkState } = useNetwork()
  const [queueCount, setQueueCount] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Update queue count
    const updateQueueCount = () => {
      const status = offlineQueueService.getQueueStatus()
      setQueueCount(status.count)
    }

    updateQueueCount()
    const interval = setInterval(updateQueueCount, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate slide in/out
    Animated.timing(slideAnim, {
      toValue: !networkState.isOnline ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [networkState.isOnline, slideAnim])

  const handleRetry = async () => {

    await refreshNetworkState();
    onRetry?.()
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const getStatusColor = () => {
    if (!networkState.isConnected) return theme.colors.error
    if (!networkState.isInternetReachable) return theme.colors.warning
    if (networkState.isSlowConnection) return theme.colors.warning
    return theme.colors.success
  }

  const getStatusIcon = () => {
    if (!networkState.isConnected) return "wifi-off"
    if (!networkState.isInternetReachable) return "signal-wifi-connected-no-internet-4"
    if (networkState.type === "wifi") return "wifi"
    if (networkState.type === "cellular") return "signal-cellular-4-bar"
    return "device-unknown"
  }

  const getStatusText = () => {
    if (!networkState.isConnected) return "No Connection"
    if (!networkState.isInternetReachable) return "No Internet"
    return networkState.networkType
  }

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      right: 0,
      [position]: 0,
      zIndex: 1000,
      transform: [
        {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: position === "top" ? [-100, 0] : [100, 0],
          }),
        },
      ],
    },
    statusBar: {
      backgroundColor: getStatusColor(),
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statusContent: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    statusText: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.small,
      fontWeight: "600",
      marginLeft: theme.spacing.sm,
      fontFamily:fonts.REGULAR
    },
    statusDetails: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.small,
      opacity: 0.8,
      marginLeft: theme.spacing.sm,
      fontFamily:fonts.REGULAR
    },
    actionContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    queueBadge: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 10,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      marginRight: theme.spacing.sm,
    },
    queueText: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.small,
      fontWeight: "600",
      fontFamily:fonts.REGULAR
    },
    retryButton: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: theme.borderRadius / 2,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      marginLeft: theme.spacing.sm,
    },
    retryText: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.small,
      fontWeight: "600",
      fontFamily:fonts.REGULAR
    },
    expandButton: {
      padding: theme.spacing.xs,
    },
    detailsContainer: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 2,
    },
    detailLabel: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.small,
      opacity: 0.8,
      fontFamily:fonts.REGULAR
    },
    detailValue: {
      color: theme.colors.surface,
      fontSize: theme.fontSize.small,
      fontWeight: "600",
      fontFamily:fonts.REGULAR
    },
  })

  if (networkState.isOnline && queueCount === 0) {
    return null
  }

  return (
    <Animated.View style={styles.container}>
      <View style={styles.statusBar}>
        <View style={styles.statusContent}>
          <Icon name={getStatusIcon()} size={16} color="#FFFFFF" />
          <Text style={styles.statusText}>{getStatusText()}</Text>

          {networkState.isSlowConnection && <Text style={styles.statusDetails}>(Slow)</Text>}
        </View>

        <View style={styles.actionContainer}>
          {showQueueStatus && queueCount > 0 && (
            <View style={styles.queueBadge}>
              <Text style={styles.queueText}>{queueCount} queued</Text>
            </View>
          )}

          {!networkState.isOnline && (
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          )}

          {showDetails && (
            <TouchableOpacity style={styles.expandButton} onPress={toggleExpanded}>
              <Icon name={isExpanded ? "expand-less" : "expand-more"} size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isExpanded && showDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Connection Type:</Text>
            <Text style={styles.detailValue}>{networkState.type}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Internet Reachable:</Text>
            <Text style={styles.detailValue}>
              {networkState.isInternetReachable === null ? "Unknown" : networkState.isInternetReachable ? "Yes" : "No"}
            </Text>
          </View>

          {queueCount > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Queued Requests:</Text>
              <Text style={styles.detailValue}>{queueCount}</Text>
            </View>
          )}
        </View>
      )}
    </Animated.View>
  )
}
