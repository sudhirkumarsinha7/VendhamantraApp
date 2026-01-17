import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { NetworkStatus } from "../NetworkStatus"

const mockRefreshNetworkState = jest.fn().mockResolvedValue(undefined)

jest.mock("../../../context/AppContext", () => {
  const { lightTheme } = require("../../../styles/themes")
  return {
    useAppContext: () => ({
      state: {
        theme: lightTheme,
      },
    }),
  }
})

jest.mock("../../../context/NetworkContext", () => ({
  useNetwork: () => ({
    state: {
      isOnline: false,
      isConnected: false,
      isInternetReachable: false,
      isSlowConnection: false,
      type: "wifi",
      networkType: "wifi",
    },
    refreshNetworkState: mockRefreshNetworkState,
  }),
}))

jest.mock("../../../services/offlineQueueService", () => ({
  offlineQueueService: {
    getQueueStatus: jest.fn(() => ({ count: 2 })),
  },
}))

describe("NetworkStatus component", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("retry button calls refreshNetworkState and onRetry", async () => {
    const onRetryMock = jest.fn()
    const { getByText } = render(<NetworkStatus onRetry={onRetryMock} />)
    const retryButton = getByText("Retry")

    fireEvent.press(retryButton)

    // wait for async function to complete
    await waitFor(() => {
      expect(mockRefreshNetworkState).toHaveBeenCalled()
      expect(onRetryMock).toHaveBeenCalled()
    })
  })
})
