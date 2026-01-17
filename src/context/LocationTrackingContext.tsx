import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { AppState } from "react-native";
import dayjs from "dayjs";
import Geolocation from "react-native-geolocation-service";
import BackgroundFetch from "react-native-background-fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchTrackingData } from "../store/slices/trackingSlice";
import { insertTrackingData } from "../db/tracking.service";
import { useAuth } from "./AuthContext";
import { requestLocationWithBackgroundPermission } from "../utils/locationHelper";

// ===========================================
// CONFIG
// ===========================================
const TRACKING_DURATION_MINUTES = 9 * 60; // 9 hours
const TRACKING_INTERVAL_MS = 60 * 1000;

let intervalRef: NodeJS.Timeout | null = null;
let stopAtTime: number | null = null;

// ===========================================
// TYPES
// ===========================================
interface LocationTrackingContextType {
  todayRecord: any;
  punchInTime: string | null;
  isTrackingActive: boolean;
  hasPermission: boolean;
  startTracking: (durationMinutes: number) => Promise<void>;
  stopTracking: () => void;
  loadTodayData: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

export const LocationTrackingContext = createContext<LocationTrackingContextType | null>(null);

// ===========================================
// PROVIDER
// ===========================================
export const LocationTrackingProvider = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { state: authState, orgId, divisionId } = useAuth();
  const { profile_info = {} } = authState?.clientAssets ?? {};
  const staffId = profile_info?.staff_id ?? null;

  const [todayRecord, setTodayRecord] = useState<any>(null);
  const [punchInTime, setPunchInTime] = useState<string | null>(null);
  const [isTrackingActive, setIsTrackingActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const appState = useRef(AppState.currentState);

  // ===========================================
  // LOAD TODAY'S DATA
  // ===========================================
  const loadTodayData = async () => {
    if (!orgId || !divisionId || !staffId) return;

    const res: any = await dispatch(
      fetchTrackingData({
        orgId,
        divisionId,
        staffId,
        filters: {
          duration: "custom",
          startDate: dayjs().format("YYYY-MM-DD"),
          endDate: dayjs().format("YYYY-MM-DD"),
        },
      })
    );

    const record = res?.payload?.[0] ?? null;
    setTodayRecord(record);
    setPunchInTime(record?.in_time?.time ?? null);
  };

  // ===========================================
  // SAVE LOCATION
  // ===========================================
  const saveLocation = async (pos: any, isBackground = false) => {
    const { latitude, longitude } = pos.coords;
    await insertTrackingData(
      latitude,
      longitude,
      isBackground ? "Background" : "Foreground",
      new Date().toISOString()
    );
  };

  // ===========================================
  // FOREGROUND TRACKING
  // ===========================================
  const startForegroundTracking = () => {
    if (intervalRef) clearInterval(intervalRef);

    intervalRef = setInterval(() => {
      if (stopAtTime && Date.now() > stopAtTime) {
        stopTracking();
        return;
      }

      Geolocation.getCurrentPosition(
        (pos) => saveLocation(pos, false),
        (err) => console.log("FG error:", err),
        { enableHighAccuracy: true }
      );
    }, TRACKING_INTERVAL_MS);
  };

  // ===========================================
  // BACKGROUND FETCH
  // ===========================================
  const setupBackgroundFetch = () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // allow system to optimize
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
      },
      async (taskId) => {
        console.log("⬛ BG Task:", taskId);

        if (stopAtTime && Date.now() > stopAtTime) {
          return BackgroundFetch.finish(taskId);
        }

        Geolocation.getCurrentPosition(
          (pos) => {
            saveLocation(pos, true);
            BackgroundFetch.finish(taskId);
          },
          (err) => {
            console.log("BG error:", err);
            BackgroundFetch.finish(taskId);
          }
        );
      },
      (err) => console.log("BG Fetch Error:", err)
    );
  };

  // ===========================================
  // START TRACKING
  // ===========================================
  const startTracking = async (durationMinutes: number) => {
    if (isTrackingActive) return;

    setIsTrackingActive(true);
    stopAtTime = Date.now() + durationMinutes * 60 * 1000;

    // Save persistent state
    await AsyncStorage.mergeItem(
      "TRACKING_STATE",
      JSON.stringify({
        isTrackingActive: true,
        punchInTime: new Date().toISOString(),
        staffId,
        orgId,
        divisionId,
      })
    );

    startForegroundTracking();
    setupBackgroundFetch();

    setTimeout(stopTracking, durationMinutes * 60 * 1000);
  };

  // ===========================================
  // STOP TRACKING
  // ===========================================
  const stopTracking = async () => {
    if (intervalRef) clearInterval(intervalRef);

    stopAtTime = null;
    setIsTrackingActive(false);

    await AsyncStorage.mergeItem("TRACKING_STATE", JSON.stringify({ isTrackingActive: false }));
  };

  // ===========================================
  // RESTORE TRACKING ON APP OPEN
  // ===========================================
  useEffect(() => {
    const restore = async () => {
      const raw = await AsyncStorage.getItem("TRACKING_STATE");
      const saved = raw ? JSON.parse(raw) : {};

      if (saved.isTrackingActive && saved.punchInTime) {
        const diff = dayjs().diff(dayjs(saved.punchInTime), "minute");

        if (diff < TRACKING_DURATION_MINUTES) {
          const remaining = TRACKING_DURATION_MINUTES - diff;
          startTracking(remaining);
        }
      }
    };

    restore();
  }, []);

  // ===========================================
  // PERMISSION CHECK
  // ===========================================
  useEffect(() => {
    (async () => {
      const granted = await requestLocationWithBackgroundPermission();
      setHasPermission(granted);
    })();
  }, []);

  return (
    <LocationTrackingContext.Provider
      value={{
        todayRecord,
        punchInTime,
        isTrackingActive,
        hasPermission,
        startTracking,
        stopTracking,
        loadTodayData,
      }}
    >
      {children}
    </LocationTrackingContext.Provider>
  );
};

// Hook
export const useLocationTracking = () => {
  const ctx = useContext(LocationTrackingContext);
  if (!ctx) throw new Error("useLocationTracking must be used inside provider");
  return ctx;
};
