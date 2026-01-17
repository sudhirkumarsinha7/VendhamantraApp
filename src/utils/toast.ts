// src/utils/toast.ts
import Toast from "react-native-toast-message";

export const showToast = (
  title: string,
  message?: string,
  type: "success" | "error" | "info" = "success"
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 5000,
  });
};
