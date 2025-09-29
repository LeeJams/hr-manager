import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS, API_ENDPOINTS } from '../constants';
import { User, LoginCredentials, Employee, Attendance, Leave } from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL = 'http://localhost:3000/api'; // 개발 환경용

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          try {
            await this.refreshToken();
            // Retry original request
            return this.api.request(error.config);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            await this.clearAuthTokens();
            // You might want to emit an event or use navigation here
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${this.baseURL}${API_ENDPOINTS.REFRESH}`, {
      refreshToken,
    });

    const { token, user } = response.data;
    await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, token);
    await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  private async clearAuthTokens(): Promise<void> {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.USER);
  }

  // Auth methods
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string; refreshToken: string }> {
    const response = await this.api.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post(API_ENDPOINTS.LOGOUT);
    await this.clearAuthTokens();
  }

  async getProfile(): Promise<User> {
    const response = await this.api.get(API_ENDPOINTS.PROFILE);
    return response.data;
  }

  // Employee methods
  async getEmployees(): Promise<Employee[]> {
    const response = await this.api.get(API_ENDPOINTS.EMPLOYEES);
    return response.data;
  }

  async getEmployee(id: string): Promise<Employee> {
    const response = await this.api.get(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
    return response.data;
  }

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const response = await this.api.post(API_ENDPOINTS.EMPLOYEES, employee);
    return response.data;
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    const response = await this.api.put(`${API_ENDPOINTS.EMPLOYEES}/${id}`, employee);
    return response.data;
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.api.delete(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
  }

  // Attendance methods
  async getAttendance(employeeId?: string, date?: Date): Promise<Attendance[]> {
    const params = new URLSearchParams();
    if (employeeId) params.append('employeeId', employeeId);
    if (date) params.append('date', date.toISOString());

    const response = await this.api.get(`${API_ENDPOINTS.ATTENDANCE}?${params}`);
    return response.data;
  }

  async checkIn(employeeId: string): Promise<Attendance> {
    const response = await this.api.post(`${API_ENDPOINTS.ATTENDANCE}/checkin`, { employeeId });
    return response.data;
  }

  async checkOut(employeeId: string): Promise<Attendance> {
    const response = await this.api.post(`${API_ENDPOINTS.ATTENDANCE}/checkout`, { employeeId });
    return response.data;
  }

  // Leave methods
  async getLeaves(employeeId?: string): Promise<Leave[]> {
    const params = employeeId ? `?employeeId=${employeeId}` : '';
    const response = await this.api.get(`${API_ENDPOINTS.LEAVES}${params}`);
    return response.data;
  }

  async requestLeave(leave: Omit<Leave, 'id' | 'status'>): Promise<Leave> {
    const response = await this.api.post(API_ENDPOINTS.LEAVES, { ...leave, status: 'pending' });
    return response.data;
  }

  async approveLeave(id: string): Promise<Leave> {
    const response = await this.api.patch(`${API_ENDPOINTS.LEAVES}/${id}/approve`);
    return response.data;
  }

  async rejectLeave(id: string): Promise<Leave> {
    const response = await this.api.patch(`${API_ENDPOINTS.LEAVES}/${id}/reject`);
    return response.data;
  }
}

export const apiService = new ApiService();