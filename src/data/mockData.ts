import type { ClassItem, Student, LeaveApplication, UserData, LeaveBalance } from "../types"

export const userData: UserData = {
  name: "Sarah",
  greeting: "Have a great day at work.",
}

export const todaysClasses: ClassItem[] = [
  {
    id: "1",
    name: "Class 9 B",
    subject: "Physics",
    time: "10:00 - 11:00 AM",
    students: 30,
    status: "ongoing",
  },
  {
    id: "2",
    name: "Class 10 B",
    subject: "Mathematics",
    time: "11:00 AM - 12:00 PM",
    students: 32,
    status: "pending",
    nextTime: "11:30 AM",
  },
]

export const allClasses: ClassItem[] = [
  {
    id: "1",
    name: "MPC 2nd Sem",
    subject: "Mathematics",
    time: "09:00 AM - 10:00 AM",
    students: 30,
    status: "completed",
  },
  {
    id: "2",
    name: "MEC 4th Sem",
    subject: "Physics",
    time: "10:00 AM - 11:00 AM",
    students: 28,
    status: "pending",
  },
  {
    id: "3",
    name: "Class 10 B",
    subject: "Mathematics",
    time: "11:30 AM - 12:30 PM",
    students: 32,
    status: "pending",
  },
  {
    id: "4",
    name: "Class 8 A",
    subject: "Science",
    time: "02:00 PM - 03:00 PM",
    students: 25,
    status: "pending",
  },
]

export const students: Student[] = [
  { id: "1", name: "Aarav Patel", rollNo: "101", isPresent: true },
  { id: "2", name: "Saanvi Sharma", rollNo: "102", isPresent: false },
  { id: "3", name: "Vikram Joshi", rollNo: "103", isPresent: true },
  { id: "4", name: "Anaya Singh", rollNo: "104", isPresent: true },
  { id: "5", name: "Karan Verma", rollNo: "105", isPresent: true },
  { id: "6", name: "Meera Iyer", rollNo: "106", isPresent: true },
]

export const leaveBalances: LeaveBalance[] = [
  {
    id: "1",
    type: "Casual Leave",
    available: 4,
    total: 12,
    color: "#1E40AF",
    bgColor: "#DBEAFE",
  },
  {
    id: "2",
    type: "Sick Leave",
    available: 5,
    total: 10,
    color: "#991B1B",
    bgColor: "#FEE2E2",
  },
  {
    id: "3",
    type: "Comp-Offs",
    available: 1,
    total: 1,
    color: "#166534",
    bgColor: "#DCFCE7",
  },
  {
    id: "4",
    type: "Permissions",
    available: 2,
    total: 2,
    color: "#7C3AED",
    bgColor: "#F3E8FF",
  },
]

export const leaveApplications: LeaveApplication[] = [
  {
    id: "1",
    type: "Sick Leave",
    startDate: "Jan 02, 2026",
    endDate: "Jan 03",
    status: "approved",
    reason: "Viral Fever",
  },
  {
    id: "2",
    type: "Permission",
    startDate: "Jan 10",
    endDate: "Jan 10",
    status: "approved",
    reason: "Bank Work",
    duration: "2 hr",
    startTime: "3:30 pm",
    endTime: "5:30 pm",
  },
  {
    id: "3",
    type: "Casual Leave",
    startDate: "Jan 17, 2026",
    endDate: "Jan 18",
    status: "pending",
    reason: "Family Function",
  },
]
