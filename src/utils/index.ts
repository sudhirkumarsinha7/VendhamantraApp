import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import moment from 'moment';



export const timeUtils = {
  /**
   * Format a date using moment with predefined styles.
   * @param date - A date string or object.
   * @param format - "short" | "long" | "time" | "datetime" | "custom"
   * @param customFormat - Optional custom moment format.
   */
  formatDate: (
    date: Date | string,
    format: "short" | "long" | "time" | "datetime" | "custom" = "short",
    customFormat?: string
  ): string => {
    if (!moment(date).isValid()) return String(date)

    const formatMap: Record<string, string> = {
      short: "DD MMM YY",
      long: "dddd, DD MMMM YYYY",
      time: "hh:mm A",
      datetime: "DD MMM YY hh:mm A",
      custom: customFormat || "DD/MM/YYYY",
    }

    return moment(date).format(formatMap[format])
  },

  /**
   * Format date to "DD/MM/YYYY hh:mm A" or return raw if invalid
   */
  formatDateDDMMYYYYTime: (date: Date | string): string =>
    moment(date).isValid()
      ? moment(date).format("DD/MM/YYYY hh:mm A")
      : String(date),

  /**
   * Format date to "DD MMM YY hh:mm A" or return raw if invalid
   */
  formatDDMMYYYYTime: (date: Date | string): string =>
    moment(date).isValid()
      ? moment(date).format("DD MMM YY hh:mm A")
      : String(date),
  formatDDMMMYYYY: (date: Date | string): string =>
    moment(date).isValid()
      ? moment(date).format("DD MMM YY")
      : String(date),

  /**
   * Format date to "YYYY-MM-DDD"
   */

    formatYYYYMMDD: (date: Date | string): string =>
    moment(date).isValid()
      ? moment(date).format("YYYY-MM-DD")
      : String(date),
    
formatDDMMYYYY: (date: Date | string): string =>
    moment(date).isValid()
      ? moment(date).format("DD-MM-YYYY")
      :  String(date),

  formatDDMMYY: (date: Date | string): string =>
    moment(date).isValid()
      ? moment(date).format("DD MMM YYYY")
      : String(date),

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  getRelativeTime: (date: Date | string): string => {
    return moment(date).isValid() ? moment(date).fromNow() : String(date)
  },

  /**
   * Format a duration in seconds to "HH:MM:SS" or "MM:SS"
   */
formatDuration: (seconds: number, format: "hour" | "min" = "min"): string => {
  // const duration = moment.duration(seconds, "seconds");
  // const hours = Math.floor(duration.asHours());
  // const minutes = duration.minutes();
  // const secs = duration.seconds();

  // if (format === "hour") {
  //   return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  // } else {
  //   const totalMinutes = Math.floor(duration.asMinutes());
  //   return `${totalMinutes}:${String(secs).padStart(2, "0")}`;
  // }
  const duration = moment.duration(seconds, "seconds");

  if (format === "hour") {
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  } else {
    // total minutes only, no seconds
    const totalMinutes = Math.floor(duration.asMinutes());
    return `${String(totalMinutes).padStart(2, "0")}:00`;
  }
},

  /**
   * Check if a given date is today
   */
  isToday: (date: Date | string): boolean => moment(date).isSame(moment(), "day"),

  /**
   * Check if a given date is yesterday
   */
  isYesterday: (date: Date | string): boolean =>
    moment(date).isSame(moment().subtract(1, "day"), "day"),

  /**
   * Get start of day
   */
  getStartOfDay: (date: Date | string = new Date()): Date =>
    moment(date).startOf("day").toDate(),

  /**
   * Get end of day
   */
  getEndOfDay: (date: Date | string = new Date()): Date =>
    moment(date).endOf("day").toDate(),
}


// String conversion utilities
export const stringUtils = {

  normalize: (str?: string | null): string => {
    if (!str || typeof str !== "string") return ""
    return str.toLowerCase().replace(/[^a-z]/g, "")
  },
  // Capitalize first letter
  capitalize: (str?: string | null): string => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  // Convert to title case safely
  toTitleCase: (str?: string | null): string => {
    if (!str) return ''
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  },

  // Convert camelCase to readable format
  camelCaseToReadable: (str: string): string => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
  },

  // Generate initials from name
  getInitials: (name: string, maxLength = 2): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, maxLength)
      .join("")
  },

  // Truncate string with ellipsis
  truncate: (str: string, maxLength: number, suffix = "..."): string => {
    if (str.length <= maxLength) return str
    return str.substring(0, maxLength - suffix.length) + suffix
  },

  // Remove special characters
  removeSpecialChars: (str: string): string => {
    return str.replace(/[^a-zA-Z0-9\s]/g, "")
  },

  // Generate slug from string
  generateSlug: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  },

  // Validate email format
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Validate phone number
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  },

  // Format phone number
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return phone
  },

  // Generate random string
  generateRandomString: (length = 10): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },
}

// Form data conversion utilities
export const formDataUtils = {
  // Convert JSON to FormData
  jsonToFormData: (data: Record<string, any>): FormData => {
  const formData = new FormData();

  const appendToFormData = (key: string, value: any) => {
    if (value === null || value === undefined) return;

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((subKey) => {
            appendToFormData(`${key}[${index}][${subKey}]`, item[subKey]);
          });
        } else {
          appendToFormData(`${key}[${index}]`, typeof item === "string" ? item.trim() : item);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      // Keep full object, even if empty
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, typeof value === "string" ? value.trim() : String(value));
    }
  };

  Object.keys(data).forEach((key) => {
    appendToFormData(key, data[key]);
  });

  return formData;
},

jsonToFormDataNew: (data: Record<string, any>): FormData => {
    const formData = new FormData();

    const isEmptyObject = (obj: any) =>
      obj && typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length === 0;

    const appendToFormData = (key: string, value: any) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||        // skip empty strings
        isEmptyObject(value)   // skip empty objects
      ) return;

      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            Object.keys(item).forEach((subKey) => {
              appendToFormData(`${key}[${index}][${subKey}]`, item[subKey]);
            });
          } else {
            appendToFormData(`${key}[${index}]`, typeof item === "string" ? item.trim() : item);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        // Trim inner strings and exclude empty object values recursively
        // Object.keys(value).forEach((subKey) => {
        //   const subValue = value[subKey];
        //   if (
        //     subValue !== null &&
        //     subValue !== undefined &&
        //     subValue !== "" &&
        //     !(typeof subValue === "object" && !Array.isArray(subValue) && Object.keys(subValue).length === 0)
        //   ) {
        //     appendToFormData(`${key}[${subKey}]`, typeof subValue === "string" ? subValue.trim() : subValue);
        //   }
        // });
                formData.append(key, JSON.stringify(value));

      } else {
        formData.append(key, typeof value === "string" ? value.trim() : String(value));
      }
    };

    Object.keys(data).forEach((key) => {
      appendToFormData(key, data[key]);
    });

    return formData;
  },

  // Convert JSON to x-www-form-urlencoded
  jsonToUrlEncoded: (data: Record<string, any>): string => {
    const params = new URLSearchParams()

    const appendToParams = (key: string, value: any) => {
      if (value === null || value === undefined) {
        return
      }

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            Object.keys(item).forEach((subKey) => {
              appendToParams(`${key}[${index}][${subKey}]`, item[subKey])
            })
          } else {
            appendToParams(`${key}[${index}]`, item)
          }
        })
      } else if (typeof value === "object" && value !== null) {
        Object.keys(value).forEach((subKey) => {
          appendToParams(`${key}[${subKey}]`, value[subKey])
        })
      } else {
        params.append(key, String(value))
      }
    }

    Object.keys(data).forEach((key) => {
      appendToParams(key, data[key])
    })

    return params.toString()
  },

  
 jsonToUrlEncodedNew: (data: Record<string, any>): string => {
  const params = new URLSearchParams();

  const isEmptyObject = (obj: any) =>
    obj && typeof obj === "object" && !Array.isArray(obj) && Object.keys(obj).length === 0;

  const appendToParams = (key: string, value: any) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||        // skip empty strings
      isEmptyObject(value)   // skip empty objects
    ) return;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((subKey) => {
            appendToParams(`${key}[${index}][${subKey}]`, item[subKey]);
          });
        } else {
          appendToParams(`${key}[${index}]`, typeof item === "string" ? item.trim() : item);
        }
      });
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (
          subValue !== null &&
          subValue !== undefined &&
          subValue !== "" &&
          !(typeof subValue === "object" && !Array.isArray(subValue) && Object.keys(subValue).length === 0)
        ) {
          appendToParams(`${key}[${subKey}]`, typeof subValue === "string" ? subValue.trim() : subValue);
        }
      });
    } else {
      params.append(key, typeof value === "string" ? value.trim() : String(value));
    }
  };

  Object.keys(data).forEach((key) => {
    appendToParams(key, data[key]);
  });

  return params.toString();
},

  // Convert FormData to JSON
  formDataToJson: (formData: FormData): Record<string, any> => {
    const result: Record<string, any> = {}

    // Note: This is a simplified version as FormData iteration is limited in React Native
    // In a real implementation, you might need to track the original data structure
    // React Native FormData does not support forEach, so we use the private _parts array
    // This may not be stable across all environments
    // @ts-ignore
    if (Array.isArray((formData as any)._parts)) {
      // @ts-ignore
      (formData as any)._parts.forEach(([key, value]: [string, any]) => {
        if (result[key]) {
          if (Array.isArray(result[key])) {
            result[key].push(value)
          } else {
            result[key] = [result[key], value]
          }
        } else {
          result[key] = value
        }
      })
    }

    return result
  },

  capitalizeWords: (str?: string | null): string => {
  if (!str || typeof str !== 'string') return '';

  return str
    .split(' ')
    .map(word =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
    )
    .join(' ');
},
toLowerCaseString: (str?: string | null): string => {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase();
}
}

// AsyncStorage utilities
export const storageUtils = {
  // Store data
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (error:any) {
      console.log(`Error storing data for key ${key}:`, error)
      throw error
    }
  },

  // Get data
  getItem: async (key: string): Promise<any | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error:any) {
      console.log(`Error retrieving data for key ${key}:`, error)
      return null
    }
  },

  // Remove data
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error:any) {
      console.log(`Error removing data for key ${key}:`, error)
      throw error
    }
  },

  // Clear all data
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear()
    } catch (error:any) {
      console.log("Error clearing AsyncStorage:", error)
      throw error
    }
  },

  // Get all keys
  getAllKeys: async (): Promise<string[]> => {
    try {
      return [...(await AsyncStorage.getAllKeys())]
    } catch (error:any) {
      console.log("Error getting all keys:", error)
      return []
    }
  },

  // Get multiple items
  getMultiple: async (keys: string[]): Promise<Record<string, any | null>> => {
    try {
      const values = await AsyncStorage.multiGet(keys)
      const result: Record<string, any | null> = {}

      values.forEach(([key, value]) => {
        result[key] = value ? JSON.parse(value) : null
      })

      return result
    } catch (error:any) {
      console.log("Error getting multiple items:", error)
      return {}
    }
  },

  // Set multiple items
  setMultiple: async (items: Record<string, any>): Promise<void> => {
    try {
      const keyValuePairs: [string, string][] = Object.entries(items).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ])
      await AsyncStorage.multiSet(keyValuePairs)
    } catch (error:any) {
      console.log("Error setting multiple items:", error)
      throw error
    }
  },
}


// Validation utilities
export const validationUtils = {
  // Required field validation
 required: (value: any): string | undefined => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "This field is required"
  }
  return undefined
},


  // Email validation
  email: (value: string): string | undefined => {
    if (!stringUtils.isValidEmail(value)) {
      return "Please enter a valid email address"
    }
    return undefined
  },

  // Phone validation
  phone: (value: string): string | undefined => {
    if (!stringUtils.isValidPhone(value)) {
      return "Please enter a valid phone number"
    }
    return undefined
  },

  // Minimum length validation
  minLength:
    (min: number) =>
    (value: string): string | undefined => {
      if (value && value.length < min) {
        return `Must be at least ${min} characters long`
      }
      return undefined
    },

  // Maximum length validation
  maxLength:
    (max: number) =>
    (value: string): string | undefined => {
      if (value && value.length > max) {
        return `Must be no more than ${max} characters long`
      }
      return undefined
    },

  // Password strength validation
  passwordStrength: (value: string): string | undefined => {
    if (!value) return "Password is required"
    if (value.length < 8) return "Password must be at least 8 characters long"
    if (!/(?=.*[a-z])/.test(value)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number"
    if (!/(?=.*[@$!%*?&])/.test(value)) return "Password must contain at least one special character"
    return undefined
  },

  // Confirm password validation
  confirmPassword:
    (password: string) =>
    (value: string): string | undefined => {
      if (value !== password) {
        return "Passwords do not match"
      }
      return undefined
    },
}
// export const getTimeSlots = (slotPeriodInMinutes: number): { label: string; value: string }[] => {
//   const slots: { label: string; value: string }[] = []
//   const totalMinutes = 24 * 60

//   for (let start = 0; start + slotPeriodInMinutes <= totalMinutes; start += slotPeriodInMinutes) {
//     const startHour = Math.floor(start / 60)
//     const startMin = start % 60
//     const end = start + slotPeriodInMinutes
//     const endHour = Math.floor(end / 60)
//     const endMin = end % 60

//     const formatTime = (h: number, m: number) =>
//       new Date(0, 0, 0, h, m).toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       })

//     const label = `${formatTime(startHour, startMin)} - ${formatTime(endHour, endMin)}`
//     slots.push({ label, value: label })
//   }

//   return slots
// }
export const getTimeSlots = (slotPeriodInMinutes: number): { label: string; value: string }[] => {
  const slots: { label: string; value: string }[] = []
  const totalMinutes = 24 * 60 // 1440 minutes in a day

  const formatTime = (hour: number, minute: number): string => {
    const suffix = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 === 0 ? 12 : hour % 12
    const minStr = minute.toString().padStart(2, "0")
    return `${hour12}:${minStr} ${suffix}`
  }

  for (let start = 0; start + slotPeriodInMinutes <= totalMinutes; start += slotPeriodInMinutes) {
    const startHour = Math.floor(start / 60)
    const startMin = start % 60
    const end = start + slotPeriodInMinutes
    const endHour = Math.floor(end / 60)
    const endMin = end % 60

    const label = `${formatTime(startHour, startMin)} - ${formatTime(endHour, endMin)}`
    slots.push({ label, value: label })
  }

  return slots
}

// Export all utilities
export default {
  timeUtils,
  stringUtils,
  formDataUtils,
  storageUtils,
  validationUtils,
}
export function getErrorMessage(error: any): string {
  try {
    if (!error) return "Unknown error";
    const msg = error?.response?.message || error?.message || error;

    // ✅ If msg is a string and not empty
    if (typeof msg === "string" && msg.trim() !== "") return msg.trim();

    // ✅ If msg is an array, join into a string
    if (Array.isArray(msg) && msg.length > 0) return msg.join(", ");

    // ✅ If msg is an object, safely stringify
    if (msg && typeof msg === "object") {
      try {
        return JSON.stringify(msg);
      } catch {
        return "Unexpected error format";
      }
    }

    // ✅ Fallback to something readable
    return "Unknown error";
  } catch (err) {
    // ✅ In case something weird happens
    return "Unexpected error";
  }
}

export const formatErrorsForAlert = (errors: any): string => {
  if (!errors) return "";

  const flatten = (obj: any) =>
    Object.values(obj)
      .map((v: any) => (typeof v === "string" ? v : Object.values(v)))
      .flat();

  const messages = flatten(errors);

  return messages.map((msg: any) => `• ${msg}`).join("\n");
};


export const monthDropdownOptions = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const getDaysInMonth = (month: number, year: number): { label: string; value: string }[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));
  return daysArray;
};

export const getYearsDropdownOptions = (startYear: number, endYear: number): { label: string; value: string }[] => {
  const years: { label: string; value: string }[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
};

export const getLastNYears = (n: number): { label: string; value: string }[] => {
  const currentYear = new Date().getFullYear();
  const years: { label: string; value: string }[] = [];
  for (let i = 0; i < n; i++) {
    const year = currentYear - i;
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
};

export const getNextNYears = (n: number): { label: string; value: string }[] => {
  const currentYear = new Date().getFullYear();
  const years: { label: string; value: string }[] = [];
  for (let i = 0; i < n; i++) {
    const year = currentYear + i;
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
};
