import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

interface NotificationActions {
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  updateUnreadCount: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type NotificationStore = NotificationState & NotificationActions;

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  // Initial state
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  // Actions
  setNotifications: (notifications) => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    set({
      notifications,
      unreadCount,
    });
  },

  addNotification: (notification) =>
    set((state) => {
      const newNotifications = [notification, ...state.notifications];
      const unreadCount = newNotifications.filter((n) => !n.isRead).length;
      return {
        notifications: newNotifications,
        unreadCount,
      };
    }),

  markAsRead: (notificationId) =>
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );
      const unreadCount = updatedNotifications.filter((n) => !n.isRead).length;
      return {
        notifications: updatedNotifications,
        unreadCount,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
      unreadCount: 0,
    })),

  deleteNotification: (notificationId) =>
    set((state) => {
      const updatedNotifications = state.notifications.filter(
        (notification) => notification.id !== notificationId
      );
      const unreadCount = updatedNotifications.filter((n) => !n.isRead).length;
      return {
        notifications: updatedNotifications,
        unreadCount,
      };
    }),

  clearAllNotifications: () =>
    set({
      notifications: [],
      unreadCount: 0,
    }),

  updateUnreadCount: () =>
    set((state) => ({
      unreadCount: state.notifications.filter((n) => !n.isRead).length,
    })),

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