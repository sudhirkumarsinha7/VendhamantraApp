"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { networkService, type NetworkState } from "../services/networkService"

interface NetworkContextState extends NetworkState {
  isOnline: boolean
  networkType: string
  isSlowConnection: boolean
}

type NetworkAction = { type: "UPDATE_NETWORK_STATE"; payload: NetworkState } | { type: "SET_ONLINE"; payload: boolean }

const initialState: NetworkContextState = {
  isConnected: false,
  isInternetReachable: null,
  type: "unknown",
  isOnline: false,
  networkType: "No Connection",
  isSlowConnection: false,
}

const NetworkContext = createContext<{
  state: NetworkContextState
  dispatch: React.Dispatch<NetworkAction>
  refreshNetworkState: () => Promise<void>

}>({
  state: initialState,
  dispatch: () => null,
  refreshNetworkState: async () => {},

})

const networkReducer = (state: NetworkContextState, action: NetworkAction): NetworkContextState => {
  switch (action.type) {
    case "UPDATE_NETWORK_STATE":
      const { isConnected, isInternetReachable, type } = action.payload
      const isOnline = isConnected && isInternetReachable !== false

      return {
        ...state,
        ...action.payload,
        isOnline,
        networkType: networkService.getNetworkTypeDescription(),
        isSlowConnection: networkService.isSlowConnection(),
      }
    case "SET_ONLINE":
      return {
        ...state,
        isOnline: action.payload,
      }
    default:
      return state
  }
}

export const NetworkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(networkReducer, initialState)

  useEffect(() => {
    // Initialize with current network state
    const currentState = networkService.getNetworkState()
    dispatch({ type: "UPDATE_NETWORK_STATE", payload: currentState })

    // Subscribe to network changes
    const unsubscribe = networkService.subscribe((networkState) => {
      dispatch({ type: "UPDATE_NETWORK_STATE", payload: networkState })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const refreshNetworkState = async () => {
    const networkState = await networkService.refresh()
    dispatch({ type: "UPDATE_NETWORK_STATE", payload: networkState })
  }

  return (
    <NetworkContext.Provider
      value={{
        state,
        dispatch,
        refreshNetworkState,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

export const useNetwork = () => {
  const context = useContext(NetworkContext)
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider")
  }
  return context
}
