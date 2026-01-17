"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useNetwork } from "../context/NetworkContext"
import { useAppContext } from "../context/AppContext"
import { showToast } from "../services/toastService"
import { offlineQueueService } from "../services/offlineQueueService"
import { fonts } from "../assets/localImage"

interface NetworkCheckConfig {
  showOfflineMessage?: boolean
  allowOfflineQueue?: boolean
  queuePriority?: "high" | "medium" | "low"
  retryOnReconnect?: boolean
  customOfflineMessage?: string
}

interface WithNetworkCheckProps {
  networkConfig?: NetworkCheckConfig
}

export function withNetworkCheck<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultConfig?: NetworkCheckConfig,
) {
  return function WithNetworkCheckComponent(props: P & WithNetworkCheckProps) {
    const { state: appState } = useAppContext()
    const { theme } = appState
    const { state: networkState, refreshNetworkState } = useNetwork()
    const [showRetryButton, setShowRetryButton] = useState(false)

    const config: NetworkCheckConfig = {
      showOfflineMessage: true,
      allowOfflineQueue: true,
      queuePriority: "medium",
      retryOnReconnect: true,
      customOfflineMessage: "You're offline. Some features may not be available.",
      ...defaultConfig,
      ...props.networkConfig,
    }

    useEffect(() => {
      if (!networkState.isOnline && config.showOfflineMessage) {
        setShowRetryButton(true)
      } else {
        setShowRetryButton(false)
      }
    }, [networkState.isOnline, config.showOfflineMessage])

    const handleRetry = async () => {
      await refreshNetworkState()
      if (networkState.isOnline) {
        showToast("Connection restored", "success")
        setShowRetryButton(false)
      } else {
        showToast("Still no internet connection", "error")
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      offlineContainer: {
        backgroundColor: theme.colors.warning + "20",
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.warning,
      },
      offlineContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      offlineTextContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      },
      offlineText: {
        fontSize: theme.fontSize.small,
        color: theme.colors.text,
        marginLeft: theme.spacing.sm,
        flex: 1,
        fontFamily:fonts.REGULAR
      },
      retryButton: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius / 2,
      },
      retryButtonText: {
        color: "#FFFFFF",
        fontSize: theme.fontSize.small,
        fontWeight: "400",
        fontFamily:fonts.REGULAR
      },
      networkStatus: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: theme.spacing.sm,
      },
      networkStatusText: {
        fontSize: theme.fontSize.small,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
        fontFamily:fonts.REGULAR
      },
    })

    // Enhanced props with network utilities
    const enhancedProps = {
      ...props,
      networkState,
      isOnline: networkState.isOnline,
      networkType: networkState.networkType,
      isSlowConnection: networkState.isSlowConnection,

      // Network utility functions
      executeWithNetworkCheck: async (
        apiCall: () => Promise<any>,
        options?: {
          queueOnOffline?: boolean
          showOfflineToast?: boolean
          description?: string
        },
      ) => {
        const {
          queueOnOffline = config.allowOfflineQueue,
          showOfflineToast = true,
          description = "API request",
        } = options || {}

        if (!networkState.isOnline) {
          if (showOfflineToast) {
            showToast("No internet connection available", "error")
          }

          if (queueOnOffline) {
            // This would need to be implemented based on your API structure
            // For now, we'll just show a message
            showToast("Request will be processed when connection is restored", "info")
          }

          throw new Error("No internet connection")
        }

        try {
          return await apiCall()
        } catch (error:any) {
          // If it's a network error and we're now offline, handle accordingly
          if (!networkState.isOnline && queueOnOffline) {
            showToast("Connection lost. Request queued for retry.", "warning")
          }
          throw error
        }
      },

      // Queue request for offline processing
      queueRequest: async (
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        data?: any,
        description?: string,
      ) => {
        return offlineQueueService.addToQueue({
          url,
          method,
          data,
          maxRetries: 3,
          priority: config.queuePriority || "medium",
          description,
        })
      },

      // Check if request is already queued
      isRequestQueued: (url: string, method: string) => {
        return offlineQueueService.isRequestQueued(url, method)
      },

      // Get offline queue status
      getQueueStatus: () => {
        return offlineQueueService.getQueueStatus()
      },
    } as P & {
      networkState: typeof networkState
      isOnline: boolean
      networkType: string
      isSlowConnection: boolean
      executeWithNetworkCheck: (
        apiCall: () => Promise<any>,
        options?: {
          queueOnOffline?: boolean
          showOfflineToast?: boolean
          description?: string
        },
      ) => Promise<any>
      queueRequest: (
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        data?: any,
        description?: string,
      ) => Promise<string>
      isRequestQueued: (url: string, method: string) => boolean
      getQueueStatus: () => { count: number; requests: any[] }
    }

    return (
      <View style={styles.container}>
        {!networkState.isOnline && config.showOfflineMessage && (
          <View style={styles.offlineContainer}>
            <View style={styles.offlineContent}>
              <View style={styles.offlineTextContainer}>
                <Icon name="wifi-off" size={16} color={theme.colors.warning} />
                <Text style={styles.offlineText}>{config.customOfflineMessage}</Text>
              </View>

              <View style={styles.networkStatus}>
                <Icon name="signal-cellular-off" size={14} color={theme.colors.textSecondary} />
                <Text style={styles.networkStatusText}>{networkState.networkType}</Text>
              </View>

              {showRetryButton && (
                <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        <WrappedComponent {...enhancedProps} />
      </View>
    )
  }
}
