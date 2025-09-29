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

// Navigation Types
export type AuthStackParamList = {
  Intro: undefined;
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Schedule: undefined;
  MyPage: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ProjectDetail: { projectId: string };
  TeamManagement: undefined;
};

export type MyPageStackParamList = {
  MyPageScreen: undefined;
  Profile: undefined;
  Career: undefined;
  ScheduleRegister: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Modal: { screen: string; params?: any };
};

// Project & Schedule Types
export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  teamMembers: TeamMember[];
  createdBy: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Schedule {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'project' | 'meeting' | 'personal' | 'vacation';
  projectId?: string;
  userId: string;
  isAvailable: boolean;
}

export interface TeamMember {
  id: string;
  userId: string;
  role: 'leader' | 'member';
  joinedAt: Date;
  permissions: string[];
}

export interface Team {
  id: string;
  name: string;
  leaderId: string;
  members: TeamMember[];
  parentTeamId?: string;
  children: Team[];
  level: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'project_invite' | 'schedule_update' | 'team_update' | 'general';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// Request Types
export interface ProjectRequest {
  id: string;
  projectId: string;
  fromUserId: string;
  toUserId: string;
  type: 'invite' | 'schedule_request';
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: Date;
}