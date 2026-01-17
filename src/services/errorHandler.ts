import { Alert } from "react-native"
import { showToast } from "./toastService"

// Error types
export interface ApiError {
  code?: string
  message: string
  statusCode?: number
  field?: string
  details?: any
  [key: string]: any

}

// Error code mappings
export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: "Please check your internet connection",
  TIMEOUT_ERROR: "Request timed out. Please try again",
  CONNECTION_ERROR: "Unable to connect to server",

  // Authentication errors
  INVALID_CREDENTIALS: "Invalid username or password",
  TOKEN_EXPIRED: "Your session has expired. Please login again",
  UNAUTHORIZED: "You are not authorized to perform this action",
  ACCOUNT_LOCKED: "Your account has been locked. Please contact support",
  ACCOUNT_DISABLED: "Your account has been disabled",

  // Validation errors
  VALIDATION_ERROR: "Please check your input and try again",
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  PASSWORD_TOO_WEAK: "Password must be at least 8 characters with uppercase, lowercase, and numbers",

  // Server errors
  SERVER_ERROR: "Something went wrong on our end. Please try again",
  SERVICE_UNAVAILABLE: "Service is temporarily unavailable",
  MAINTENANCE_MODE: "System is under maintenance. Please try again later",

  // Business logic errors
  DUPLICATE_ENTRY: "This record already exists",
  RECORD_NOT_FOUND: "Record not found",
  INSUFFICIENT_PERMISSIONS: "You don't have permission to perform this action",
  QUOTA_EXCEEDED: "You have exceeded your quota limit",

  // File upload errors
  FILE_TOO_LARGE: "File size is too large. Maximum size is 10MB",
  INVALID_FILE_TYPE: "Invalid file type. Please upload a valid file",
  UPLOAD_FAILED: "File upload failed. Please try again",

  // Default fallback
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again",
  BAD_REQUEST: "Bad request. Please check your input",
}

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  LOGOUT_SUCCESS: "You have been logged out successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  PASSWORD_CHANGED: "Password changed successfully",
  ENQUIRY_CREATED: "Enquiry created successfully",
  ENQUIRY_UPDATED: "Enquiry updated successfully",
  ENQUIRY_DELETED: "Enquiry deleted successfully",
  FOLLOW_UP_ADDED: "Follow-up added successfully",
  PRODUCT_SHARED: "Product information shared successfully",
  FILE_UPLOADED: "File uploaded successfully",
  DATA_EXPORTED: "Data exported successfully",
  SETTINGS_SAVED: "Settings saved successfully",
  FIRST_TIME_LOGIN: "You are required to change your password on your first login.",
}

class ErrorHandler {
  // Map API error to user-friendly message
mapErrorMessage(error: any): string {
  console.log("Mapping error message for:", error?.response);

  // 1. Handle completely missing, non-object, or string errors
  if (!error) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  if (typeof error === 'string') {
    return error; // Direct string error
  }

  if (typeof error !== 'object') {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  // 2. Handle network errors (no response)
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return ERROR_MESSAGES.TIMEOUT_ERROR;
    }
    if (error.message === "Network Error") {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // If error itself has a message
    if (typeof error.message === 'string' && error.message.trim()) {
      return error.message;
    }

    // If error has a nested error string
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    return ERROR_MESSAGES.CONNECTION_ERROR;
  }

  // 3. Handle server-side errors with a response
  const { status, data } = error.response;

  switch (status) {
    case 400:
      return this.handleBadRequest?.(data) || ERROR_MESSAGES.BAD_REQUEST;
    case 401:
      return this.handleUnauthorized?.(data) || ERROR_MESSAGES.UNAUTHORIZED;
    // case 403:
    //   return ERROR_MESSAGES.INSUFFICIENT_PERMISSIONS;
    case 404:
      return ERROR_MESSAGES.RECORD_NOT_FOUND;
    case 409:
      return ERROR_MESSAGES.DUPLICATE_ENTRY;
    case 422:
      return this.handleValidationError?.(data) || ERROR_MESSAGES.VALIDATION_ERROR;
    case 429:
      return ERROR_MESSAGES.QUOTA_EXCEEDED;
    case 500:
      return ERROR_MESSAGES.SERVER_ERROR;
    case 502:
    case 503:
      return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
    default:
      // Try custom error handler
      const customMessage = this.handleCustomError?.(data);
      if (customMessage) {
        return customMessage;
      }

      // Try standard message properties
      if (typeof error.message === 'string' && error.message.trim()) {
        return error.message;
      }

      if (typeof data === 'string' && data.trim()) {
        return data;
      }

      if (typeof data?.message === 'string' && data.message.trim()) {
        return data.message;
      }

      if (typeof data?.error === 'string' && data.error.trim()) {
        return data.error;
      }

      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}


  private handleBadRequest(data: any): string {
    if (data?.message) {
      return data.message
    }
    return ERROR_MESSAGES.VALIDATION_ERROR
  }

  private handleUnauthorized(data: any): string {
    if (data?.code === "TOKEN_EXPIRED") {
      return ERROR_MESSAGES.TOKEN_EXPIRED
    }
    if (data?.code === "INVALID_CREDENTIALS") {
      return ERROR_MESSAGES.INVALID_CREDENTIALS
    }
    if (data?.code === "ACCOUNT_LOCKED") {
      return ERROR_MESSAGES.ACCOUNT_LOCKED
    }
    return ERROR_MESSAGES.UNAUTHORIZED
  }

  private handleValidationError(data: any): string {
    if (data?.errors && typeof data.errors === "object") {
      // Get first validation error
      const firstError = Object.values(data.errors)[0]
      if (Array.isArray(firstError) && firstError?.length > 0) {
        return firstError[0] as string
      }
    }
    if (data?.message) {
      return data.message
    }
    return ERROR_MESSAGES.VALIDATION_ERROR
  }

  private handleCustomError(data: any): string | null {
    // Handle custom error codes from your API
    if (data?.code && ERROR_MESSAGES[data.code as keyof typeof ERROR_MESSAGES]) {
      return ERROR_MESSAGES[data.code as keyof typeof ERROR_MESSAGES]
    }
    if (data?.message) {
      return data.message
    }
    return null
  }

  // Handle API error with toast
  handleApiError(error: any, showToastMessage = false): string {
    const message = this.mapErrorMessage(error)

    if (showToastMessage) {
      showToast(message, "error")
    }

    // Log error for debugging
    // console.log("API Error:", {
    //   message,
    //   status: error.response?.status,
    //   data: error.response?.data,
    //   url: error.config?.url,
    //   method: error.config?.method,
    // })

    return message
  }

  // Handle API success with toast
  handleApiSuccess(message: string, data?: any, showToastMessage = true): void {
    if (showToastMessage) {
      showToast(message, "success")
    }

    // Log success for debugging
    // console.log("API Success:", { message, data })
  }

  // Show alert dialog for critical errors
  showErrorAlert(title: string, message: string, onPress?: () => void): void {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: onPress,
        },
      ],
      { cancelable: false },
    )
  }

  // Show confirmation dialog
  showConfirmDialog(title: string, message: string, onConfirm: () => void, onCancel?: () => void): void {
    Alert.alert(title, message, [
      {
        text: "Cancel",
        style: "cancel",
        onPress: onCancel,
      },
      {
        text: "OK",
        onPress: onConfirm,
      },
    ])
  }
}

export const errorHandler = new ErrorHandler()
