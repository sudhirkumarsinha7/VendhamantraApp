import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Theme, AttendanceDay } from "../../../types";

interface AttendanceCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onDateSelect: (date: string) => void;
  theme: Theme;
  showLegend?: boolean;
  attendanceData?: AttendanceDay[];
  style?: any;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  selectedDate,
  onDateSelect,
  theme,
  showLegend = true,
  attendanceData = [],
  style,
}) => {
  const styles = createStyles(theme);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date(selectedDate);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
  });

  /* ---------------------------------- */
  /* Helpers                            */
  /* ---------------------------------- */

  const getStatusColor = (status: AttendanceDay["status"]) => {
    switch (status) {
      case "present":
        return theme.colors.success;
      case "absent":
        return theme.colors.error;
      case "late":
        return theme.colors.warning;
      case "leave":
        return theme.colors.info;
      default:
        return "transparent";
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};

    attendanceData.forEach((day) => {
      marked[day.date] = {
        selected: day.date === selectedDate,
        selectedColor: theme.colors.primary,
        selectedTextColor: "#FFFFFF",
      };
    });

    if (!marked[selectedDate]) {
      marked[selectedDate] = {
        selected: true,
        selectedColor: theme.colors.primary,
        selectedTextColor: "#FFFFFF",
      };
    }

    return marked;
  };

  const getCalendarHeaderText = () => {
    const date = new Date(currentMonth);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  /* ---------------------------------- */
  /* Render                             */
  /* ---------------------------------- */

  return (
    <View style={[styles.container, style]}>
      <View style={styles.calendarCard}>
        <Calendar
          current={currentMonth}
          minDate="2024-01-01"
          maxDate={new Date().toISOString().split("T")[0]}
          markedDates={getMarkedDates()}
          enableSwipeMonths
          hideExtraDays={false}
          firstDay={0}
          onMonthChange={(month) => {
            setCurrentMonth(
              `${month.year}-${String(month.month).padStart(2, "0")}-01`
            );
          }}
          theme={{
            calendarBackground: theme.colors.card,
            textSectionTitleColor: theme.colors.textSecondary,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: "#FFFFFF",
            todayTextColor: theme.colors.primary,
            dayTextColor: theme.colors.text,
            textDisabledColor: `${theme.colors.textSecondary}80`,
            arrowColor: theme.colors.primary,
            monthTextColor: "transparent",
            textMonthFontSize: 0,
          }}
          renderHeader={() => (
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarHeaderText}>
                {getCalendarHeaderText()}
              </Text>
            </View>
          )}
          dayComponent={({ date, state }: any) => {
            const isSelected = date.dateString === selectedDate;
            const isToday =
              date.dateString ===
              new Date().toISOString().split("T")[0];

            const attendance = attendanceData.find(
              (a) => a.date === date.dateString
            );

            return (
              <TouchableOpacity
                disabled={state === "disabled"}
                onPress={() => onDateSelect(date.dateString)}
                style={styles.dayContainer}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.dayWrapper,
                    isSelected && styles.selectedDayWrapper,
                    isToday && !isSelected && styles.todayWrapper,
                    state === "disabled" && styles.disabledDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                      isToday && !isSelected && styles.todayText,
                      state === "disabled" && styles.disabledDayText,
                    ]}
                  >
                    {date.day}
                  </Text>
                </View>

                {attendance && attendance.status !== "none" && (
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor: getStatusColor(attendance.status),
                      },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {showLegend && (
        <View style={styles.legendContainer}>
          {[
            { label: "Present", color: theme.colors.success },
            { label: "Absent", color: theme.colors.error },
            { label: "Late", color: theme.colors.warning },
            { label: "Leave", color: theme.colors.info },
          ].map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default AttendanceCalendar;

/* ---------------------------------- */
/* Styles                             */
/* ---------------------------------- */

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 16,
    },
    calendarCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
    },
    calendarHeader: {
      paddingVertical: 12,
      alignItems: "center",
    },
    calendarHeaderText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },
    dayContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      position: "relative",
    },
    dayWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedDayWrapper: {
      backgroundColor: theme.colors.primary,
    },
    todayWrapper: {
      backgroundColor: `${theme.colors.primary}20`,
    },
    disabledDay: {
      opacity: 0.3,
    },
    dayText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    selectedDayText: {
      color: "#FFFFFF",
      fontWeight: "600",
    },
    todayText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
    disabledDayText: {
      color: theme.colors.textSecondary,
    },
    statusDot: {
      position: "absolute",
      bottom: 4,
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    legendContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 24,
      gap: 20,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    legendText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
  });
