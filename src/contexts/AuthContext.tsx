import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthState, User } from '../types';
import { STORAGE_KEYS } from '../constants';
import { useAuthStore } from '../stores';

interface AuthContextType extends AuthState {
  login: (user: User, token: string, refreshToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authStore = useAuthStore();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    authStore.setLoading(true);
    try {
      const token = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
      const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER);

      if (token && userData) {
        const user = JSON.parse(userData);
        authStore.restoreAuth(user, token, refreshToken || '');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      authStore.setLoading(false);
    }
  };

  const login = async (user: User, token: string, refreshToken?: string) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(user));
      if (refreshToken) {
        await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }

      authStore.setUser(user);
      authStore.setTokens(token, refreshToken || '');
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);
      authStore.clearAuth();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (user: User) => {
    authStore.setUser(user);
    SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(user));
  };

  const value: AuthContextType = {
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};