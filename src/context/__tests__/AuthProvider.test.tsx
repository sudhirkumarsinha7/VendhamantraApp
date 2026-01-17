import React from "react"
import { render, waitFor, act } from "@testing-library/react-native"
import { Text } from "react-native"
import { AuthProvider, useAuth } from "../../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { apiClient } from "../../api/apiClient"
import { errorHandler, SUCCESS_MESSAGES } from "../../services/errorHandler"

jest.mock("react-native-config", () => ({
  REACT_APP_API_URL: "https://mock-api-url.com",
}))

// --- MOCKS ---
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  multiRemove: jest.fn(),
  clear: jest.fn(),
}))

jest.mock("jwt-decode", () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock("../../api/apiClient", () => ({
  apiClient: {
    setAuthToken: jest.fn(),
  },
}))

jest.mock("../../services/errorHandler", () => ({
  errorHandler: {
    handleApiError: jest.fn(),
    handleApiSuccess: jest.fn(),
  },
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: "Login success",
    LOGOUT_SUCCESS: "Logout success",
    FIRST_TIME_LOGIN: "First time login",
  },
  ERROR_MESSAGES: {
    TOKEN_EXPIRED: "Token expired",
    UNAUTHORIZED_STAFF: "Unauthorized staff status",
    GENERIC_ERROR: "Something went wrong",
  },
}))

// --- TEST COMPONENT ---
const TestComponent = () => {
  const { state, orgId, divisionId, divisionImage } = useAuth()

  return (
    <>
      <Text testID="auth-status">
        {state.isAuthenticated ? "Logged In" : "Logged Out"}
      </Text>
      <Text testID="client-name">
        {state.clientAssets?.name ?? "No Client"}
      </Text>
      <Text testID="token-status">
        {state.token ? "Has Token" : "No Token"}
      </Text>
      <Text testID="org-id">{orgId}</Text>
      <Text testID="division-id">{divisionId}</Text>
      <Text testID="division-image">
        {divisionImage || "No Image"}
      </Text>
    </>
  )
}

const renderWithProvider = () =>
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )

// --- TESTS ---
describe("AuthProvider", () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test("initial state is unauthenticated", async () => {
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(null)

    const { getByTestId } = renderWithProvider()

    await waitFor(() => {
      expect(getByTestId("auth-status").props.children).toBe("Logged Out")
      expect(getByTestId("client-name").props.children).toBe("No Client")
      expect(getByTestId("token-status").props.children).toBe("No Token")
    })
  })

  test("login failure with API error", async () => {
    const loginErrorResponse = {
      status: 401,
      json: async () => ({
        status: 401,
        message: "Invalid credentials",
      }),
    }

    global.fetch = jest.fn().mockResolvedValueOnce(loginErrorResponse as any)

    let loginFn: any
    const LoginCaller = () => {
      const { login } = useAuth()
      React.useEffect(() => {
        loginFn = login
      }, [login])
      return null
    }

    render(
      <AuthProvider>
        <LoginCaller />
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      const result = await loginFn({
        username: "fail",
        password: "bad",
        org_title_id: "org",
      })
      expect(result.success).toBe(false)
    })

    await waitFor(() => {
      expect(errorHandler.handleApiError).toHaveBeenCalled()
    })
  })

  test("logout clears storage and resets state", async () => {
    let logoutFn: any
    const LogoutCaller = () => {
      const { logout } = useAuth()
      React.useEffect(() => {
        logoutFn = logout
      }, [logout])
      return null
    }

    const { getByTestId } = render(
      <AuthProvider>
        <LogoutCaller />
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      await logoutFn()
    })

    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
      "authToken",
      "client_assets",
    ])
    expect(AsyncStorage.clear).toHaveBeenCalled()
    expect(apiClient.setAuthToken).toHaveBeenCalledWith(null)
    expect(errorHandler.handleApiSuccess).toHaveBeenCalledWith(
      SUCCESS_MESSAGES.LOGOUT_SUCCESS
    )
    expect(getByTestId("auth-status").props.children).toBe("Logged Out")
  })

  test("default orgId and divisionId are set", async () => {
    const { getByTestId } = renderWithProvider()

    await waitFor(() => {
      expect(getByTestId("org-id").props.children).toBe("visa_vil")
      expect(getByTestId("division-id").props.children).toBe("")
    })
  })
})
