

export const REACT_APP_API_URL='https://stageapi.dbraei.edu.in/'

export const GOOGLE_API_KEY = REACT_APP_API_URL
export const SERVICES_API_URL = '=https://s3prodorg.atumanalytics.com/';
export const IMAGE_API_URL ='https://services.visaka.io/';
export const USER_GUIDE_URL = 'https://stageapi.dbraei.edu.in/';
// https://stageapi.dbraei.edu.in/api/v1/employees/login

export const orgId = 'visa_vil'
export const divisionId = 'atum'

export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URL: {
    app:REACT_APP_API_URL,
  },
  // API Endpoints
  ENDPOINTS: {
  
    // https://devapp.atumanalytics.com/auth
    AUTH: {
      LOGIN: "api/v1/employees/login",
      LOGOUT: "/auth/logout",
      REGISTER: "/auth/register",
      FORGOT_PASSWORD: "auth/reset/password",
      RESET_PASSWORD: "auth/reset/password/update",
      CHANGE_PASSWORD: "/staff/change/password/update",
      CHANGE_PASSWORD_NEW: "auth/change/default/password/update/",

    },
    MOCK: {
      STATES: "api/v2/geoservice/state",
      DISTRICTS: "api/v2/geoservice/district",
    },

    CAMPAIGN: {
      LIST: "/campaign/open/list",
      LISTS: "/campaigns/list/",
    },
    PRODUCT: {
      measurementlist: "/products/measurements/list/all/1/search",
      kpi_status_list: "/kpis/filters/status/list",

    },
    // User Management
    USER: {
      USER_ACTIVITY: "/staff/activity/list/1/search",
      PROFILE: "/user/profile",
      UPDATE_PROFILE: "/user/profile",
      UPLOAD_AVATAR: "/user/avatar",
      DELETE_ACCOUNT: "/user/delete",
      GET_PREFERENCES: "/user/preferences",
      UPDATE_PREFERENCES: "/user/preferences",
      CREATE_USER: '/customers/create',
      LIST: '/customers/list/'
    },

    // Enquiries
    ENQUIRIES: {
      LIST: "enquiries/list",
      COUNT: "enquiries/count",
      CUSTOMER_ENQUIRIES_LIST: "/enquiries/customer/all/search/",
      CREATE: "/enquiries/create",
      UPDATE: "/enquiries/update",
      ADD_FOLLOWUP: "/enquiries/follow-up",
      CLOSE_BLUK_ENQUIRIES: "/enquiries/bulk/closequery",
      CLOSE_ENQUIRIE: "/",
      PRODUCT_INFO: "/enquiries/share/product/info",
      STAFF_DETAILS: "/staff/details/no/permission/",
      REQUIREMENTS_DETAILS: "/requirements/list/",
      SALES_DETAILS: "/sales/details/",
      ACTION_LIST: "/actions/list/",
      ADDRESS: "/address/details/",
      UPDATE_ADDRESS: "/update/address",




      TESTRIDE_BLUK_BULKUPDATE: "/enquiries/testride/update/bulk",
      CONVERT_TO_LEAD: "/enquiries/convert/lead",
      MARKED_AS_WALKIN: "/enquiries/walkin",
      PLAN_OF_ACTION: "/enquiries/plan-of-action",


      CUSTOMER_GROUP: "/conceptHierarchy/list/customergroup",
      USERS_LIST: "/setting/users/list/",
      STAFF_LIST: "/staff/supportstafflist",
      // STAFF_LIST: "/staff/list/type",
      CLOSER_REASON_LIST: "/query/closure/reasons/list/enquiries",
      DEALER_LIST: "/setting/users/list/dealers/dealers/search/selectedId",
      CREATE_ITEM_REQUIREMNTS: "/conceptHierarchy/list/enquiryrequirements",
      CREATE_ITEM_LIST: "/atumanalytics/divisions/open/items/list/",
      CREATE_ITEM_CATEGORIES: "/atumanaltics/divisions/open/categories/list/",

      TEST_RIDE_STATUS: "/conceptHierarchy/list/testride",
      NEAREST_DEALER: "/dealers/network/list/all/state/all/search",
      DEALERS: "/staff/supportstafflist/dealers",
      // DEALERS: "/staff/list/type/dealers",

      WHATSAPP_TEMPLATE: "/communication/template/list/1/whatsapp/status/search",
      CALL_RECORDING: "/customers/call/recordings/",




    },


    // Leads
    LEADS: {
      LIST: "/leads/list",
      COUNT: "leads/count",
      CUSTOMER_ENQUIRIES_LIST: "/leads/customer/all/search/",
      CREATE: "/leads/create",
      UPDATE: "/leads/update",
      ADD_FOLLOWUP: "/leads/follow-up",
      CLOSE_BLUK_ENQUIRIES: "/leads/bulk/closequery",
      CLOSE_ENQUIRIE: "/",
      PRODUCT_INFO: "/enquiries/share/product/info",
      UPDATE_BUSSINESS_VALUE: "/leads/business/value/update",
      STAFF_DETAILS: "/staff/details/no/permission/",
      REQUIREMENTS_DETAILS: "/requirements/list/",
      SALES_DETAILS: "/sales/details/",

      TESTRIDE_BLUK_BULKUPDATE: "/leads/testride/update/bulk",
      CONVERT_TO_LEAD: "/enquiries/convert/lead",
      MARKED_AS_WALKIN: "/enquiries/walkin",
      PLAN_OF_ACTION: "/enquiries/plan-of-action",


      CUSTOMER_GROUP: "/conceptHierarchy/list/customergroup",
      USERS_LIST: "/setting/users/list/",
      STAFF_LIST: "/staff/supportstafflist",
      // STAFF_LIST: "/staff/list/type",
      CLOSER_REASON_LIST: "/query/closure/reasons/list/leads",
      DEALER_LIST: "/setting/users/list/dealers/dealers/search/selectedId",
      CREATE_ITEM_REQUIREMNTS: "/conceptHierarchy/list/enquiryrequirements",
      CREATE_ITEM_LIST: "/atumanalytics/divisions/open/items/list/",
      CREATE_ITEM_CATEGORIES: "/atumanaltics/divisions/open/categories/list/",

      TEST_RIDE_STATUS: "/conceptHierarchy/list/testride",
      NEAREST_DEALER: "/dealers/network/list/all/state/all/search",

      WHATSAPP_TEMPLATE: "/communication/template/list/1/whatsapp/status/search",
      CALL_RECORDING: "/customers/call/recordings/",



    },
    //Field Visit
    FIELD_VISIT: {
      LISTNEW: '/field-visits/list/',
      CREATE_NEW: '/field-visits/create',
      DELETE_NEW: '/field-visits/delete',
      UPDATE_NEW: '/field-visits/update',

      LIST: '/field/visits/list/',
      CREATE: '/field/visits/create',
      UPDATE: '/field/visits/update',
      DELETE: '/field/visits/delete',
      CREATE_FROM_ENQUIRY: '/create/field/visit',
      GET_DEPARTMENT_LIST: 'visa_vil/atumanalytics/staff/department/list',
      GET_PERFORMANCE_LIST: '/atumanalytics/staff/performance/reports/counts/overview/',

      ///field/visits/enquiries/list/777
      ENQUIRES_LIST: '/field/visits/enquiries/list/',

      FIELDS: '/conceptHierarchy/list/fieldvisits',

      USER_GROUP_LIST: '/users/groups/hierarchy/list/single_level',
      USER_LIST_BASED_ON_GROUP: '/users/groups/members/list/',
      NEW_LEAD_CREATE: '/leads/process/create',
      // USER_LIST_BASED_ON_GROUP: '/users/groups/members/list/all/sub_group_title_ids/user_id/search',

    },
    // Financial Targets
    TEAM_TARGET: {
      LIST: '/financial/targets/list/',
      UPDATESTATUS: '/financial/targets/status/update/2/1',
      CREATE: '/financial/targets/create',
      UPDATE: '/financial/targets/update',
    },
    // Dealers

    DEALERS: {
      CREATE: "/dealers/network/create",
      LIST: "/dealers/network/list/all/state/status/search/",
      LISTS: "/dealers/network/list/",
      TYPE: "/business/third-party/list",
      EDIT: "/dealers/network/edit",

    },
    // Dashboard
    OVERVIEW: {
      BUSINESS: "/current/business/overview",
      BOOKED: "/current/booked/count",
      ENQUIRY_COUNT: "/current/enquiries/bulk/overview/count",
      LEAD_COUNT: "/current/leads/bulk/overview/count",
      LOGIN_COUNT: "/current/staff/count",
    },
    // Attendance
    ATTENDANCE: {
      PUNCHIN: "/staff/attendance/punch/in",
      PUNCHOUT: "/staff/attendance/punch/out",
      DETAILS: "/staff/attendance/details/",
      SUMMARY: "/staff/attendance/summary/",
      PUNCH: "/staff/attendance/inandout/punch",
      MARK_ATTENDECE: "api/attendance/service/mark_attendance",

    },
    KPI_LIST: {
      EMPLOYEE_LIST: "/kpis/basic/input/info/employees",
      KPI_PERFORMANCE_LIST: "/kpis/performance/list",
    },
  },

  // Request timeouts
  TIMEOUT: {
    DEFAULT: 10000, // 10 seconds
    UPLOAD: 30000, // 30 seconds
    DOWNLOAD: 60000, // 60 seconds
  },


  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 1 second
    BACKOFF_FACTOR: 2,
  },

  // Cache configuration
  CACHE: {
    USER_PROFILE_TTL: 600000, // 10 minutes
    STATIC_DATA_TTL: 3600000, // 1 hour
  },
};



// API Response types
export interface ApiResponse<T = any> {
  response_data: any
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
  [key: string]: any
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
  code?: string
  statusCode?: number
  [key: string]: any
}

// Request/Response interceptor types
export interface RequestConfig {
  skipAuth?: boolean
  skipErrorHandling?: boolean
  timeout?: number
  retries?: number
  [key: string]: any
}
