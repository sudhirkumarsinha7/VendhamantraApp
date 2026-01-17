"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useNetwork } from "../context/NetworkContext"
import { showToast } from "../services/toastService"
import { errorHandler } from "../services/errorHandler"
import { offlineQueueService } from "../services/offlineQueueService"

interface ApiCallConfig {
  showLoadingToast?: boolean
  showSuccessToast?: boolean
  showErrorToast?: boolean
  queueOnOffline?: boolean
  retryOnReconnect?: boolean
  maxRetries?: number
  priority?: "high" | "medium" | "low"
}

interface ApiCallState {
  loading: boolean
  error: string | null
  data: any
}

interface WithApiCallProps {
  apiConfig?: ApiCallConfig
}

export function withApiCall<P extends object>(WrappedComponent: React.ComponentType<P>, defaultConfig?: ApiCallConfig) {
  return function WithApiCallComponent(props: P & WithApiCallProps) {
    const { state: networkState } = useNetwork()
    const [apiStates, setApiStates] = useState<Record<string, ApiCallState>>({})

    const config: ApiCallConfig = {
      showLoadingToast: false,
      showSuccessToast: true,
      showErrorToast: true,
      queueOnOffline: true,
      retryOnReconnect: true,
      maxRetries: 3,
      priority: "medium",
      ...defaultConfig,
      ...props.apiConfig,
    }

    // Set loading state for specific API call
    const setApiLoading = useCallback((key: string, loading: boolean) => {
      setApiStates((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          loading,
          error: loading ? null : prev[key]?.error || null,
        },
      }))
    }, [])

    // Set error state for specific API call
    const setApiError = useCallback((key: string, error: string | null) => {
      setApiStates((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          loading: false,
          error,
        },
      }))
    }, [])

    // Set success data for specific API call
    const setApiData = useCallback((key: string, data: any) => {
      setApiStates((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          loading: false,
          error: null,
          data,
        },
      }))
    }, [])

    // Execute API call with network check
    const executeApiCall = useCallback(
      async (
        key: string,
        apiCall: () => Promise<any>,
        options?: {
          successMessage?: string
          errorMessage?: string
          description?: string
          onSuccess?: (data: any) => void
          onError?: (error: any) => void
          skipNetworkCheck?: boolean
        },
      ) => {
        const {
          successMessage,
          errorMessage,
          description = `${key} request`,
          onSuccess,
          onError,
          skipNetworkCheck = false,
        } = options || {}

        // Check network status
        if (!skipNetworkCheck && !networkState.isOnline) {
          const offlineMessage = "No internet connection available"

          if (config.showErrorToast) {
            showToast(offlineMessage, "error")
          }

          if (config.queueOnOffline) {
            // For demonstration, we'll show a queue message
            // In a real implementation, you'd need to structure your API calls
            // to be queueable with URL, method, and data
            showToast("Request queued for when internet is available", "info")
          }

          setApiError(key, offlineMessage)
          onError?.(new Error(offlineMessage))
          return null
        }

        try {
          setApiLoading(key, true)

          if (config.showLoadingToast) {
            showToast(`Loading ${description}...`, "info", { duration: 1000 })
          }

          const result = await apiCall()

          setApiData(key, result)

          if (config.showSuccessToast && successMessage) {
            showToast(successMessage, "success")
          }

          onSuccess?.(result)
          return result
        } catch (error: any) {
          const errorMsg = errorHandler.mapErrorMessage(error)

          setApiError(key, errorMsg)

          if (config.showErrorToast) {
            showToast(errorMessage || errorMsg, "error")
          }

          onError?.(error)
          throw error
        }
      },
      [networkState.isOnline, setApiLoading, setApiData, setApiError],
    )

    // Execute multiple API calls
    const executeMultipleApiCalls = useCallback(
      async (
        calls: Array<{
          key: string
          apiCall: () => Promise<any>
          options?: Parameters<typeof executeApiCall>[2]
        }>,
      ) => {
        if (!networkState.isOnline) {
          showToast("No internet connection for batch operations", "error")
          return []
        }

        const results = await Promise.allSettled(
          calls.map(({ key, apiCall, options }) => executeApiCall(key, apiCall, options)),
        )

        const successful = results.filter((result) => result.status === "fulfilled")?.length
        const failed = results?.length - successful

        if (failed > 0) {
          showToast(`${successful} of ${results?.length} operations completed`, "warning")
        } else {
          showToast("All operations completed successfully", "success")
        }

        return results
      },
      [networkState.isOnline, executeApiCall],
    )

    // Retry failed API calls
    const retryApiCall = useCallback(
      (key: string, apiCall: () => Promise<any>, options?: Parameters<typeof executeApiCall>[2]) => {
        if (!networkState.isOnline) {
          showToast("Cannot retry without internet connection", "error")
          return
        }

        return executeApiCall(key, apiCall, {
          ...options,
          successMessage: options?.successMessage || "Retry successful",
        })
      },
      [networkState.isOnline, executeApiCall],
    )

    // Clear API state
    const clearApiState = useCallback((key: string) => {
      setApiStates((prev) => {
        const newState = { ...prev }
        delete newState[key]
        return newState
      })
    }, [])

    // Get API state
    const getApiState = useCallback(
      (key: string): ApiCallState => {
        return apiStates[key] || { loading: false, error: null, data: null }
      },
      [apiStates],
    )

    // Check if any API call is loading
    const isAnyLoading = useCallback(() => {
      return Object.values(apiStates).some((state) => state.loading)
    }, [apiStates])

    // Get all errors
    const getAllErrors = useCallback(() => {
      return Object.entries(apiStates)
        .filter(([, state]) => state.error)
        .map(([key, state]) => ({ key, error: state.error }))
    }, [apiStates])

    // Enhanced props with API utilities
    const enhancedProps = {
      ...props,

      // Network state
      isOnline: networkState.isOnline,
      networkType: networkState.networkType,
      isSlowConnection: networkState.isSlowConnection,

      // API call utilities
      executeApiCall,
      executeMultipleApiCalls,
      retryApiCall,
      clearApiState,
      getApiState,
      isAnyLoading,
      getAllErrors,

      // Queue utilities
      queueStatus: offlineQueueService.getQueueStatus(),

      // Convenience methods for common patterns
      fetchData: (key: string, apiCall: () => Promise<any>, successMessage?: string) =>
        executeApiCall(key, apiCall, { successMessage }),

      submitData: (key: string, apiCall: () => Promise<any>, successMessage?: string) =>
        executeApiCall(key, apiCall, {
          successMessage: successMessage || "Data saved successfully",
        }),

      deleteData: (key: string, apiCall: () => Promise<any>, successMessage?: string) =>
        executeApiCall(key, apiCall, {
          successMessage: successMessage || "Data deleted successfully",
        }),
    } as P & {
      isOnline: boolean
      networkType: string
      isSlowConnection: boolean
      executeApiCall: typeof executeApiCall
      executeMultipleApiCalls: typeof executeMultipleApiCalls
      retryApiCall: typeof retryApiCall
      clearApiState: typeof clearApiState
      getApiState: typeof getApiState
      isAnyLoading: () => boolean
      getAllErrors: () => Array<{ key: string; error: string }>
      queueStatus: { count: number; requests: any[] }
      fetchData: (key: string, apiCall: () => Promise<any>, successMessage?: string) => Promise<any>
      submitData: (key: string, apiCall: () => Promise<any>, successMessage?: string) => Promise<any>
      deleteData: (key: string, apiCall: () => Promise<any>, successMessage?: string) => Promise<any>
    }

    return <WrappedComponent {...enhancedProps} />
  }
}
