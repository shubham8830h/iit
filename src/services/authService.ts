/**
 * Authentication service layer.
 * Currently uses mock data — structured for easy API integration later.
 */

import type { LoginResponse, User } from '../types';

// Simulated delay to mimic network request
const simulateNetworkDelay = (ms: number = 1500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock user data
const MOCK_USER: User = {
  id: '1',
  email: 'rajeevan.r+10@vsynergize.com',
  name: 'Rajeevan R',
  role: 'Admin',
};

/**
 * Login with email and password.
 * Replace the mock implementation with actual API call when ready.
 */
export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  await simulateNetworkDelay();

  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (password.length < 6) {
    throw new Error('Invalid credentials');
  }

  // TODO: Replace with actual API call
  // const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.LOGIN}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });

  return {
    user: { ...MOCK_USER, email },
    token: 'mock-jwt-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
  };
};

/**
 * Logout the current user.
 */
export const logoutUser = async (): Promise<void> => {
  await simulateNetworkDelay(500);

  // TODO: Replace with actual API call
  // await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${token}` },
  // });
};

/**
 * Request password reset.
 */
export const forgotPassword = async (email: string): Promise<void> => {
  await simulateNetworkDelay();

  if (!email) {
    throw new Error('Email is required');
  }

  // TODO: Replace with actual API call
};
