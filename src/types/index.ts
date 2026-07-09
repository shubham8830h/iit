/**
 * TypeScript type definitions for the application.
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

export interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Login form
export interface LoginFormData {
  email: string;
  password: string;
}

// Navigation types
export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  TermsConditions: undefined;
};

export type DrawerParamList = {
  Dashboard: undefined;
  Courses: undefined;
  AIFaculty: { title?: string; subject?: string; chapter?: string } | undefined;
  RemedialLearning: undefined;
};

// Drawer menu item
export interface DrawerMenuItem {
  name: keyof DrawerParamList;
  label: string;
  icon: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Dashboard types
export interface DashboardStats {
  totalCourses: number;
  activeSessions: number;
  completedLessons: number;
  remedialProgress: number;
}

export interface DashboardCardData {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  color: string;
  subtitle?: string;
}
