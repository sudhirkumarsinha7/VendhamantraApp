// screens/MyAttendanceScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../../context/AppContext";
import { createGlobalStyles } from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import AttendanceCalendar from "./components/Calendar";
import { AttendanceDay } from "../../types";

// Sample dynamic attendance data generator
const generateAttendanceData = (): AttendanceDay[] => {
  const data: AttendanceDay[] = [];
  
  // Generate data for December 2025
  for (let day = 28; day <= 31; day++) {
    const date = `2025-12-${day.toString().padStart(2, '0')}`;
    const status = getRandomStatus();
    data.push({
      date,
      status,
      ...getCheckInOutTimes(status, day)
    });
  }
  
  // Generate data for January 2026
  for (let day = 1; day <= 31; day++) {
    const date = `2026-01-${day.toString().padStart(2, '0')}`;
    const status = getRandomStatus();
    data.push({
      date,
      status,
      ...getCheckInOutTimes(status, day)
    });
  }
  
  // Ensure January 12th has specific data as per design
  const jan12Index = data.findIndex(d => d.date === '2026-01-12');
  if (jan12Index !== -1) {
    data[jan12Index] = {
      date: '2026-01-12',
      status: 'present',
      checkIn: '09:00 AM',
      checkOut: '04:30 PM'
    };
  }
  
  return data;
};

const getRandomStatus = (): AttendanceDay['status'] => {
  const statuses: AttendanceDay['status'][] = ['present', 'absent', 'late', 'leave'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getCheckInOutTimes = (status: AttendanceDay['status'], day: number) => {
  if (status === 'present' || status === 'late') {
    const hour = status === 'late' ? 9 + Math.floor(Math.random() * 2) : 9;
    const minute = status === 'late' ? 15 + Math.floor(Math.random() * 45) : Math.floor(Math.random() * 15);
    const checkOutHour = 16 + Math.floor(Math.random() * 2);
    const checkOutMinute = Math.floor(Math.random() * 30);
    
    return {
      checkIn: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} AM`,
      checkOut: `${checkOutHour}:${checkOutMinute.toString().padStart(2, '0')} PM`
    };
  }
  return {};
};

export default function MyAttendanceScreen() {
  const { state } = useAppContext();
  const styles = createGlobalStyles(state.theme);
  
  const [selectedDate, setSelectedDate] = useState<string>('2026-01-12');
  const [attendanceData, setAttendanceData] = useState<AttendanceDay[]>([]);
  const [isPunchedIn, setIsPunchedIn] = useState<boolean>(false);

  useEffect(() => {
    // Load attendance data (in real app, this would be from API)
    const data = generateAttendanceData();
    setAttendanceData(data);
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handlePunchIn = () => {
    console.log("Punching in...");
    setIsPunchedIn(true);
    // Update attendance data with current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    
    const updatedData = attendanceData.map(day => {
      if (day.date === selectedDate) {
        return {
          ...day,
          status: 'present' as const,
          checkIn: formattedTime,
          checkOut: undefined // Will be set on punch out
        };
      }
      return day;
    });
    
    setAttendanceData(updatedData);
  };

  const handlePunchOut = () => {
    console.log("Punching out...");
    setIsPunchedIn(false);
    // Update attendance data with current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    
    const updatedData = attendanceData.map(day => {
      if (day.date === selectedDate) {
        return {
          ...day,
          checkOut: formattedTime
        };
      }
      return day;
    });
    
    setAttendanceData(updatedData);
  };

  const getSelectedAttendance = () => {
    return attendanceData.find(day => day.date === selectedDate);
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    
    return `${dayName}, ${monthName} ${day}${suffix}`;
  };

  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getStatusDisplay = (status: AttendanceDay['status']) => {
    switch (status) {
      case 'present': return { text: 'Present', color: state.theme.colors.success };
      case 'absent': return { text: 'Absent', color: state.theme.colors.error };
      case 'late': return { text: 'Late', color: state.theme.colors.warning };
      case 'leave': return { text: 'Leave', color: state.theme.colors.info };
      default: return { text: 'No Record', color: state.theme.colors.textSecondary };
    }
  };

  const selectedAttendance = getSelectedAttendance();
  const statusDisplay = selectedAttendance ? getStatusDisplay(selectedAttendance.status) : { text: 'No Record', color: state.theme.colors.textSecondary };

  // Check if selected date is today
  const isToday = () => {
    const today = new Date();
    const selected = new Date(selectedDate);
    return today.toDateString() === selected.toDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Main Header */}
        <View style={{ marginTop: 24, marginBottom: 16 }}>
          <Text style={styles.header}>My Attendance</Text>
        </View>
     {/* Punch In/Out Buttons for Today */}
          {isToday() && (
            <View style={[styles.card, { marginBottom: 16 }]}>
              {!isPunchedIn ? (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: state.theme.colors.primary }]}
                  onPress={handlePunchIn}
                >
                  <Text style={styles.buttonText}>Punch In</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: state.theme.colors.error }]}
                  onPress={handlePunchOut}
                >
                  <Text style={styles.buttonText}>Punch Out</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        {/* Attendance Calendar */}
        <AttendanceCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          theme={state.theme}
          showLegend={true}
          attendanceData={attendanceData}
        />

        {/* Divider */}
        <View style={{ 
          height: 1, 
          backgroundColor: state.theme.colors.border, 
          marginVertical: 24 
        }} />

        {/* Selected Date Details */}
        <View style={{ marginBottom: 24 }}>
          <Text style={[styles.subHeader, { 
            marginBottom: 16,
            fontSize: 18,
            fontWeight: '600' 
          }]}>
            {getFormattedDate(selectedDate)}
          </Text>
          
     

          {/* Attendance Details Card */}
          <View style={styles.card}>
            {selectedAttendance?.checkIn && (
              <View style={{ marginBottom: 16 }}>
                <Text style={[styles.textSecondary, { 
                  marginBottom: 4,
                  fontSize: 14,
                  color: state.theme.colors.textSecondary
                }]}>Check In</Text>
                <Text style={[styles.text, { 
                  fontWeight: '600',
                  fontSize: 16 
                }]}>{selectedAttendance.checkIn}</Text>
              </View>
            )}
            
            {selectedAttendance?.checkOut && (
              <View style={{ marginBottom: 16 }}>
                <Text style={[styles.textSecondary, { 
                  marginBottom: 4,
                  fontSize: 14,
                  color: state.theme.colors.textSecondary
                }]}>Check Out</Text>
                <Text style={[styles.text, { 
                  fontWeight: '600',
                  fontSize: 16 
                }]}>{selectedAttendance.checkOut}</Text>
              </View>
            )}
            
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ 
                width: 20, 
                height: 20, 
                borderRadius: 10, 
                backgroundColor: statusDisplay.color, 
                alignItems: "center", 
                justifyContent: "center", 
                marginRight: 12 
              }}>
                {selectedAttendance?.status === 'present' && (
                  <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "bold" }}>✓</Text>
                )}
              </View>
              <Text style={[styles.text, { 
                fontWeight: '600',
                fontSize: 16,
                color: statusDisplay.color
              }]}>{statusDisplay.text}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

     
    </SafeAreaView>
  );
}