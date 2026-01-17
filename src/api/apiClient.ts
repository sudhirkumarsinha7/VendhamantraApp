import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  type RequestConfig,
  type ApiResponse,
} from "../config/api"
import { User } from "../types"

// Extend Axios types
declare module "axios" {
  export interface AxiosRequestConfig {
    metadata?: any
  }
}

class ApiClient {
  private authTokenOverride: string | null = null

  /**
   * Normalize headers to plain key-value strings
   */
  private async buildHeaders(
    inputHeaders?: AxiosRequestConfig["headers"],
    contentType: string = "application/json"
  ): Promise<Record<string, string>> {
    const token =
      this.authTokenOverride || (await AsyncStorage.getItem("authToken"))

    const normalized: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": contentType,
    }

    if (inputHeaders && typeof inputHeaders === "object") {
      if (inputHeaders instanceof axios.AxiosHeaders) {
        inputHeaders.forEach((val: string, key: string) => {
          if (key.toLowerCase() !== "authorization") {
            normalized[key] = val
          }
        })
      } else {
        for (const [key, val] of Object.entries(inputHeaders)) {
          if (
            key.toLowerCase() !== "authorization" &&
            typeof val === "string"
          ) {
            normalized[key] = val
          }
        }
      }
    }

    if (token) {
      normalized["Authorization"] = token
    }

    return normalized
  }

  // ---------------- HTTP Methods ----------------

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(config?.headers)
    return axios.get<ApiResponse<T>>(url, {
      ...config,
      headers,
      metadata: config,
    })
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(config?.headers)
    return axios.post<ApiResponse<T>>(url, data, {
      ...config,
      headers,
      metadata: config,
    })
  }

  async put<T = any>(
    url: string,
    data?: Partial<User>,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(config?.headers)
    return axios.put<ApiResponse<T>>(url, data, {
      ...config,
      headers,
      metadata: config,
    })
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(config?.headers)
    return axios.patch<ApiResponse<T>>(url, data, {
      ...config,
      headers,
      metadata: config,
    })
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(config?.headers)
    return axios.delete<ApiResponse<T>>(url, {
      ...config,
      headers,
      metadata: config,
    })
  }

  async uploadFile<T = any>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(
      config?.headers,
      "multipart/form-data"
    )
    return axios.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers,
      metadata: config,
    })
  }

  async postForm<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(
      config?.headers,
      "application/x-www-form-urlencoded"
    )
    return axios.post<ApiResponse<T>>(url, data, {
      ...config,
      headers,
      metadata: config,
    })
  }

  async putForm<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig & RequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    const headers = await this.buildHeaders(
      config?.headers,
      "application/x-www-form-urlencoded"
    )
    return axios.put<ApiResponse<T>>(url, data, {
      ...config,
      headers,
      metadata: config,
    })
  }

  /**
   * Manually override token (e.g., for testing)
   */
  setAuthToken(token: string | null) {
    this.authTokenOverride = token
    if (token) {
      axios.defaults.headers.common["Authorization"] = token
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }
}

export const apiClient = new ApiClient()
