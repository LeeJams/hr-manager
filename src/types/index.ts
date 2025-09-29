export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  provider: 'kakao' | 'apple' | 'email';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  hireDate: Date;
  salary: number;
  status: 'active' | 'inactive' | 'terminated';
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: 'present' | 'absent' | 'late' | 'early';
  notes?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Profile: undefined;
  Employees: undefined;
  Attendance: undefined;
  Leaves: undefined;
};