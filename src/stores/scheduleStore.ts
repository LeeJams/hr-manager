import { create } from 'zustand';
import { Schedule } from '../types';

interface ScheduleState {
  schedules: Schedule[];
  selectedDate: Date;
  isLoading: boolean;
  error: string | null;
}

interface ScheduleActions {
  setSchedules: (schedules: Schedule[]) => void;
  addSchedule: (schedule: Schedule) => void;
  updateSchedule: (scheduleId: string, updates: Partial<Schedule>) => void;
  deleteSchedule: (scheduleId: string) => void;
  setSelectedDate: (date: Date) => void;
  getSchedulesForDate: (date: Date) => Schedule[];
  getSchedulesForWeek: (startDate: Date) => Schedule[];
  getSchedulesForMonth: (year: number, month: number) => Schedule[];
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type ScheduleStore = ScheduleState & ScheduleActions;

export const useScheduleStore = create<ScheduleStore>((set, get) => ({
  // Initial state
  schedules: [],
  selectedDate: new Date(),
  isLoading: false,
  error: null,

  // Actions
  setSchedules: (schedules) =>
    set({
      schedules,
    }),

  addSchedule: (schedule) =>
    set((state) => ({
      schedules: [...state.schedules, schedule],
    })),

  updateSchedule: (scheduleId, updates) =>
    set((state) => ({
      schedules: state.schedules.map((schedule) =>
        schedule.id === scheduleId ? { ...schedule, ...updates } : schedule
      ),
    })),

  deleteSchedule: (scheduleId) =>
    set((state) => ({
      schedules: state.schedules.filter((schedule) => schedule.id !== scheduleId),
    })),

  setSelectedDate: (date) =>
    set({
      selectedDate: date,
    }),

  getSchedulesForDate: (date) => {
    const { schedules } = get();
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date);
      scheduleDate.setHours(0, 0, 0, 0);
      return scheduleDate.getTime() === targetDate.getTime();
    });
  },

  getSchedulesForWeek: (startDate) => {
    const { schedules } = get();
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= start && scheduleDate <= end;
    });
  },

  getSchedulesForMonth: (year, month) => {
    const { schedules } = get();

    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month;
    });
  },

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setError: (error) =>
    set({
      error,
    }),

  clearError: () =>
    set({
      error: null,
    }),
}));