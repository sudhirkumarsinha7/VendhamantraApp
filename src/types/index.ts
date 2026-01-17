export type ThemeType = "light" | "dark";

export type Language = "en";

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  staffId: string;
  phone?: string;
      [key: string]: string | any;

}

export interface Class {
  id: string;
  name: string;
  code: string;
  time: string;
  attendance?: number;
  status: "completed" | "pending" | "ongoing";
  students: number;
  semester: string;
  section: string;
      [key: string]: string | any;

}

export interface AttendanceRecord {
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "present" | "absent" | "late" | "leave";
      [key: string]: string | any;

}

export interface Leave {
  type: "casual" | "sick" | "comp-off" | "permission";
  available: number;
  total: number;
  used?: number;
      [key: string]: string | any;

}

export interface Theme {
  colors: {
    disabled: any;
    surface: any;
    primary: string;
    secondary: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    [key: string]: string | any;

    
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
        [key: string]: string | any;

  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    xxlarge: number;
        [key: string]: string | any;

  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
        [key: string]: string | any;

  };
      [key: string]: string | any;

}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: Theme;
  themeType: ThemeType;
  language: Language;
  isLoading: boolean;
  classes: Class[];
  attendance: AttendanceRecord[];
  leaves: Leave[];
}

// Navigation types
export type RootStackParamList = {
  Login: undefined
  MainTabs: undefined
  AttendanceDetail: { classId: string }
  AllClasses: undefined
  AllLeaves: undefined
}

export type TabParamList = {
  Home: undefined
  Classes: undefined
  MyLog: undefined
  Leaves: undefined
  Profile: undefined
}

// Data types
export interface ClassItem {
  id: string
  name: string
  subject: string
  time: string
  students: number
  status: "completed" | "ongoing" | "pending"
  nextTime?: string
}

export interface Student {
  id: string
  name: string
  rollNo: string
  isPresent: boolean
}

export interface LeaveApplication {
  id: string
  type: string
  startDate: string
  endDate: string
  status: "approved" | "pending" | "rejected",
  [key: string]: string | any;
}

export interface UserData {
  name: string
  greeting: string
}
// types/calendar.ts
export interface AttendanceDay {
  date: string; // Format: 'YYYY-MM-DD'
  status: 'present' | 'absent' | 'late' | 'leave' | 'none';
  checkIn?: string;
  checkOut?: string;
}

export interface CalendarDayData {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}