import { Platform } from "react-native"
import Toast from "react-native-toast-message"

export type ToastType = "success" | "error" | "warning" | "info"

interface ToastConfig {
  duration?: number
  position?: "top" | "bottom" | "center"
}

class ToastService {
  private defaultConfig: ToastConfig = {
    duration: 5000,
    position: "top",
  }

  show(message: string, type: ToastType = "info", config?: ToastConfig): void {
    const finalConfig = { ...this.defaultConfig, ...config }

    if (Platform.OS === "web") {
      // Keep your simple console fallback for web
      this.showWebToast(message, type, finalConfig)
    } else {
      // Use react-native-toast-message for mobile platforms
      this.showNativeToast(message, type, finalConfig)
    }
  }

  private showWebToast(message: string, type: ToastType, config: ToastConfig): void {
    console.log(`${type.toUpperCase()}: ${message}`)
  }

  private showNativeToast(message: string, type: ToastType, config: ToastConfig): void {
    Toast.show({
      type,
      text1: message,
      position: config.position,
      visibilityTime: config.duration,
    })
  }

  success(message: string, config?: ToastConfig): void {
    this.show(message, "success", config)
  }

  error(message: string, config?: ToastConfig): void {
    this.show(message, "error", config)
  }

  warning(message: string, config?: ToastConfig): void {
    this.show(message, "warning", config)
  }

  info(message: string, config?: ToastConfig): void {
    this.show(message, "info", config)
  }
}

export const showToast = (message: string, type: ToastType = "info", config?: ToastConfig) => {
  const toastService = new ToastService()
  toastService.show(message, type, config)
}

export const toastService = new ToastService()
