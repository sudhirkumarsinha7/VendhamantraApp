import { timeUtils, stringUtils, formDataUtils, storageUtils, validationUtils } from "../index"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"

// Mock AsyncStorage methods for storageUtils tests
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
}))

// Mock jwtDecode for tokenUtils tests
jest.mock("jwt-decode", () => ({
  __esModule: true,
  default: jest.fn(),
}))


describe("timeUtils", () => {
  const validDate = "2022-01-01T12:00:00Z"
  const invalidDate = "invalid-date"

  test("formatDate with known formats", () => {
    expect(timeUtils.formatDate(validDate, "short")).toBe(moment(validDate).format("DD MMM YY"))
    expect(timeUtils.formatDate(validDate, "long")).toBe(moment(validDate).format("dddd, DD MMMM YYYY"))
    expect(timeUtils.formatDate(validDate, "time")).toBe(moment(validDate).format("hh:mm A"))
    expect(timeUtils.formatDate(validDate, "datetime")).toBe(moment(validDate).format("DD MMM YY hh:mm A"))
    expect(timeUtils.formatDate(validDate, "custom", "YYYY")).toBe(moment(validDate).format("YYYY"))
    expect(timeUtils.formatDate(invalidDate)).toBe(invalidDate)
  })

  test("formatDateDDMMYYYYTime returns formatted or raw string", () => {
    expect(timeUtils.formatDateDDMMYYYYTime(validDate)).toBe(moment(validDate).format("DD/MM/YYYY hh:mm A"))
    expect(timeUtils.formatDateDDMMYYYYTime(invalidDate)).toBe(invalidDate)
  })

  test("formatDDMMYYYYTime returns formatted or raw string", () => {
    expect(timeUtils.formatDDMMYYYYTime(validDate)).toBe(moment(validDate).format("DD MMM YY hh:mm A"))
    expect(timeUtils.formatDDMMYYYYTime(invalidDate)).toBe(invalidDate)
  })

  test("formatYYYYMMDD returns formatted or raw string", () => {
    expect(timeUtils.formatYYYYMMDD(validDate)).toBe(moment(validDate).format("YYYY-MM-DD"))
    expect(timeUtils.formatYYYYMMDD(invalidDate)).toBe(invalidDate)
  })

  test("formatDDMMYYYY returns formatted or raw string", () => {
    expect(timeUtils.formatDDMMYYYY(validDate)).toBe(moment(validDate).format("DD-MM-YYYY"))
    expect(timeUtils.formatDDMMYYYY(invalidDate)).toBe(invalidDate)
  })

  test("formatDDMMYY returns formatted or raw string", () => {
    expect(timeUtils.formatDDMMYY(validDate)).toBe(moment(validDate).format("DD MMM YYYY"))
    expect(timeUtils.formatDDMMYY(invalidDate)).toBe(invalidDate)
  })

  test("getRelativeTime returns relative or raw string", () => {
    expect(timeUtils.getRelativeTime(validDate)).toBe(moment(validDate).fromNow())
    expect(timeUtils.getRelativeTime(invalidDate)).toBe(invalidDate)
  })

  test("formatDuration formats durations correctly", () => {
    expect(timeUtils.formatDuration(3661, "hour")).toBe("01:01") // 1 hour, 1 min, 1 sec
    expect(timeUtils.formatDuration(59)).toBe("00:00")
    expect(timeUtils.formatDuration(0)).toBe("00:00")
  })

  test("isToday and isYesterday return correct boolean", () => {
    expect(timeUtils.isToday(new Date())).toBe(true)
    expect(timeUtils.isYesterday(moment().subtract(1, "day").toDate())).toBe(true)
    expect(timeUtils.isYesterday(new Date())).toBe(false)
  })

  test("getStartOfDay and getEndOfDay return correct dates", () => {
    const start = timeUtils.getStartOfDay(validDate)
    const end = timeUtils.getEndOfDay(validDate)
    expect(moment(start).isSame(moment(validDate).startOf("day"))).toBe(true)
    expect(moment(end).isSame(moment(validDate).endOf("day"))).toBe(true)
  })
})

describe("stringUtils", () => {
  test("normalize returns only lowercase letters", () => {
    expect(stringUtils.normalize("Abc 123!")).toBe("abc")
    expect(stringUtils.normalize(null)).toBe("")
    expect(stringUtils.normalize(undefined)).toBe("")
  })

  test("capitalize capitalizes first letter", () => {
    expect(stringUtils.capitalize("hello")).toBe("Hello")
    expect(stringUtils.capitalize("hELLO")).toBe("Hello")
  })

  test("toTitleCase capitalizes each word", () => {
    expect(stringUtils.toTitleCase("hello world")).toBe("Hello World")
  })

  test("camelCaseToReadable converts camelCase", () => {
    expect(stringUtils.camelCaseToReadable("camelCaseTest")).toBe("Camel Case Test")
  })

  test("getInitials returns correct initials", () => {
    expect(stringUtils.getInitials("John Doe")).toBe("JD")
    expect(stringUtils.getInitials("John Michael Doe", 3)).toBe("JMD")
  })

  test("truncate shortens string with suffix", () => {
    expect(stringUtils.truncate("Hello World", 8)).toBe("Hello...")
    expect(stringUtils.truncate("Short", 10)).toBe("Short")
  })

  test("removeSpecialChars removes special characters", () => {
    expect(stringUtils.removeSpecialChars("abc$#123!")).toBe("abc123")
  })

  test("generateSlug generates slugs", () => {
    expect(stringUtils.generateSlug("Hello World!")).toBe("hello-world")
  })

  test("isValidEmail validates emails", () => {
    expect(stringUtils.isValidEmail("test@example.com")).toBe(true)
    expect(stringUtils.isValidEmail("invalid-email")).toBe(false)
  })

  test("isValidPhone validates phone numbers", () => {
    expect(stringUtils.isValidPhone("+1234567890")).toBe(true)
    expect(stringUtils.isValidPhone("123456")).toBe(true) // no spaces, valid number
    expect(stringUtils.isValidPhone("0123456789")).toBe(false) // starts with 0
    expect(stringUtils.isValidPhone("123 456")).toBe(true) // spaces removed, valid number
    expect(stringUtils.isValidPhone("abc123")).toBe(false) // letters invalid
  })

  test("formatPhoneNumber formats phone numbers", () => {
    expect(stringUtils.formatPhoneNumber("1234567890")).toBe("(123) 456-7890")
    expect(stringUtils.formatPhoneNumber("12345")).toBe("12345")
  })

  test("generateRandomString generates correct length", () => {
    expect(stringUtils.generateRandomString(5)).toHaveLength(5)
  })
})

describe("formDataUtils", () => {
  beforeEach(() => {
    global.FormData = class {
      _parts: Array<[string, any]> = []
      append(key: string, value: any) {
        this._parts.push([key, value])
      }
    } as any
  })

  test("jsonToFormData converts flat and nested objects", () => {
    const input = {
      name: "John",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Cityville",
      },
      hobbies: ["reading", "sports"],
    }

    const formData = formDataUtils.jsonToFormData(input)
    expect(formData._parts).toEqual(
      expect.arrayContaining([
      ["name", "John"],
      ["age", "30"],
      ["address", JSON.stringify({
        street: "123 Main St",
        city: "Cityville"
      })],
      ["hobbies[0]", "reading"],
      ["hobbies[1]", "sports"],
    ])
    )
  })

  describe("jsonToFormDataNew", () => {
    test("skips empty strings and empty objects", () => {
      const input = {
        name: "John",
        emptyString: "",
        emptyObject: {},
        validData: "test",
        nullValue: null,
        undefinedValue: undefined,
      }

      const formData = formDataUtils.jsonToFormDataNew(input)
      expect(formData._parts).toEqual(
        expect.arrayContaining([
          ["name", "John"],
          ["validData", "test"],
        ]),
      )
      expect(formData._parts).not.toEqual(
        expect.arrayContaining([
          ["emptyString", ""],
          ["nullValue", null],
          ["undefinedValue", undefined],
        ]),
      )
    })

    test("trims string values", () => {
      const input = {
        name: "  John  ",
        description: "  Test description  ",
      }

      const formData = formDataUtils.jsonToFormDataNew(input)
      expect(formData._parts).toEqual(
        expect.arrayContaining([
          ["name", "John"],
          ["description", "Test description"],
        ]),
      )
    })
  })

  describe("jsonToUrlEncoded", () => {
    test("converts flat object to URL encoded string", () => {
      const input = { name: "John", age: 30 }
      const result = formDataUtils.jsonToUrlEncoded(input)
      expect(result).toBe("name=John&age=30")
    })

    test("handles nested objects", () => {
      const input = {
        user: { name: "John", age: 30 },
        hobbies: ["reading", "sports"],
      }
      const result = formDataUtils.jsonToUrlEncoded(input)
      expect(result).toContain("user%5Bname%5D=John")
      expect(result).toContain("hobbies%5B0%5D=reading")
    })
  })

  describe("jsonToUrlEncodedNew", () => {
    test("skips empty values and trims strings", () => {
      const input = {
        name: "  John  ",
        emptyString: "",
        validData: "test",
        emptyObject: {},
      }
      const result = formDataUtils.jsonToUrlEncodedNew(input)
      expect(result).toBe("name=John&validData=test")
    })
  })

  describe("formDataToJson", () => {
    test("converts FormData back to JSON object", () => {
      const formData = new FormData() as any
      formData._parts = [
        ["name", "John"],
        ["age", "30"],
      ]

      const result = formDataUtils.formDataToJson(formData)
      expect(result).toEqual({ name: "John", age: "30" })
    })

    test("handles duplicate keys as arrays", () => {
      const formData = new FormData() as any
      formData._parts = [
        ["hobby", "reading"],
        ["hobby", "sports"],
      ]

      const result = formDataUtils.formDataToJson(formData)
      expect(result).toEqual({ hobby: ["reading", "sports"] })
    })
  })

  describe("capitalizeWords", () => {
    test("capitalizes each word correctly", () => {
      expect(formDataUtils.capitalizeWords("hello world")).toBe("Hello World")
      expect(formDataUtils.capitalizeWords("HELLO WORLD")).toBe("Hello World")
      expect(formDataUtils.capitalizeWords("hELLo WoRLd")).toBe("Hello World")
    })

    test("handles empty and null values", () => {
      expect(formDataUtils.capitalizeWords("")).toBe("")
      expect(formDataUtils.capitalizeWords(null)).toBe("")
      expect(formDataUtils.capitalizeWords(undefined)).toBe("")
    })

    test("handles single word", () => {
      expect(formDataUtils.capitalizeWords("hello")).toBe("Hello")
    })

    test("handles multiple spaces", () => {
      expect(formDataUtils.capitalizeWords("hello  world")).toBe("Hello  World")
    })
  })

  describe("toLowerCaseString", () => {
    test("converts string to lowercase", () => {
      expect(formDataUtils.toLowerCaseString("HELLO WORLD")).toBe("hello world")
      expect(formDataUtils.toLowerCaseString("Hello World")).toBe("hello world")
    })

    test("handles empty and null values", () => {
      expect(formDataUtils.toLowerCaseString("")).toBe("")
      expect(formDataUtils.toLowerCaseString(null)).toBe("")
      expect(formDataUtils.toLowerCaseString(undefined)).toBe("")
    })
  })
})

describe("storageUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("setItem calls AsyncStorage.setItem", async () => {
    await storageUtils.setItem("key", { a: 1 })
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("key", JSON.stringify({ a: 1 }))
  })

  test("getItem returns parsed value or null", async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify({ a: 1 }))
    const value = await storageUtils.getItem("key")
    expect(value).toEqual({ a: 1 })

    AsyncStorage.getItem.mockResolvedValueOnce(null)
    const valueNull = await storageUtils.getItem("nokey")
    expect(valueNull).toBeNull()
  })

  test("removeItem calls AsyncStorage.removeItem", async () => {
    await storageUtils.removeItem("key")
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("key")
  })

  test("clear calls AsyncStorage.clear", async () => {
    await storageUtils.clear()
    expect(AsyncStorage.clear).toHaveBeenCalled()
  })

  test("getAllKeys calls AsyncStorage.getAllKeys", async () => {
    AsyncStorage.getAllKeys.mockResolvedValue(["a", "b"])
    const keys = await storageUtils.getAllKeys()
    expect(keys).toEqual(["a", "b"])
  })

  test("getMultiple returns parsed key-values", async () => {
    AsyncStorage.multiGet.mockResolvedValue([
      ["a", JSON.stringify(1)],
      ["b", null],
    ])
    const result = await storageUtils.getMultiple(["a", "b"])
    expect(result).toEqual({ a: 1, b: null })
  })

  test("setMultiple calls AsyncStorage.multiSet", async () => {
    await storageUtils.setMultiple({ a: 1, b: 2 })
    expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
      ["a", JSON.stringify(1)],
      ["b", JSON.stringify(2)],
    ])
  })
})



describe("validationUtils", () => {
  describe("required", () => {
    it("returns error if value is empty string, null, or undefined", () => {
      expect(validationUtils.required("")).toBe("This field is required")
      expect(validationUtils.required("   ")).toBe("This field is required")
      expect(validationUtils.required(null)).toBe("This field is required")
      expect(validationUtils.required(undefined)).toBe("This field is required")
    })
    it("returns undefined if value is valid", () => {
      expect(validationUtils.required("Hello")).toBeUndefined()
      expect(validationUtils.required(0)).toBeUndefined()
      expect(validationUtils.required(false)).toBeUndefined()
    })
  })

  describe("email", () => {
    beforeAll(() => {
      jest.spyOn(stringUtils, "isValidEmail").mockImplementation((email) => email.includes("@"))
    })
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it("returns error if email invalid", () => {
      expect(validationUtils.email("invalid")).toBe("Please enter a valid email address")
    })
    it("returns undefined if email valid", () => {
      expect(validationUtils.email("test@example.com")).toBeUndefined()
    })
  })

  describe("phone", () => {
    beforeAll(() => {
      jest.spyOn(stringUtils, "isValidPhone").mockImplementation((phone) => phone.startsWith("+"))
    })
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it("returns error if phone invalid", () => {
      expect(validationUtils.phone("123456")).toBe("Please enter a valid phone number")
    })
    it("returns undefined if phone valid", () => {
      expect(validationUtils.phone("+123456")).toBeUndefined()
    })
  })

  describe("minLength", () => {
    const min3 = validationUtils.minLength(3)

    it("returns error if string shorter than min", () => {
      expect(min3("ab")).toBe("Must be at least 3 characters long")
    })
    it("returns undefined if string meets min", () => {
      expect(min3("abc")).toBeUndefined()
      expect(min3("abcd")).toBeUndefined()
    })
    it("returns undefined if empty value", () => {
      expect(min3("")).toBeUndefined()
      expect(min3(undefined as any)).toBeUndefined()
    })
  })

  describe("maxLength", () => {
    const max5 = validationUtils.maxLength(5)

    it("returns error if string longer than max", () => {
      expect(max5("abcdef")).toBe("Must be no more than 5 characters long")
    })
    it("returns undefined if string shorter or equal to max", () => {
      expect(max5("abc")).toBeUndefined()
      expect(max5("abcde")).toBeUndefined()
    })
    it("returns undefined if empty value", () => {
      expect(max5("")).toBeUndefined()
      expect(max5(undefined as any)).toBeUndefined()
    })
  })

  describe("passwordStrength", () => {
    it("returns required error if empty", () => {
      expect(validationUtils.passwordStrength("")).toBe("Password is required")
      expect(validationUtils.passwordStrength(undefined as any)).toBe("Password is required")
    })

    it("validates length >=8", () => {
      expect(validationUtils.passwordStrength("aA1@")).toBe("Password must be at least 8 characters long")
    })

    it("validates lowercase letter", () => {
      expect(validationUtils.passwordStrength("AAAAAAAA1@")).toBe("Password must contain at least one lowercase letter")
    })

    it("validates uppercase letter", () => {
      expect(validationUtils.passwordStrength("aaaaaaaa1@")).toBe("Password must contain at least one uppercase letter")
    })

    it("validates number", () => {
      expect(validationUtils.passwordStrength("aaaaAAA@")).toBe("Password must contain at least one number")
    })

    it("validates special character", () => {
      expect(validationUtils.passwordStrength("aaaaAAA11")).toBe("Password must contain at least one special character")
    })

    it("returns undefined if password strong", () => {
      expect(validationUtils.passwordStrength("Aa1@aaaa")).toBeUndefined()
    })
  })

  describe("confirmPassword", () => {
    const password = "MyPass123!"
    const validateConfirm = validationUtils.confirmPassword(password)

    it("returns error if passwords do not match", () => {
      expect(validateConfirm("wrong")).toBe("Passwords do not match")
    })

    it("returns undefined if passwords match", () => {
      expect(validateConfirm(password)).toBeUndefined()
    })
  })
})
