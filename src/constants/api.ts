/**
 * API configuration for future backend integration.
 * Replace BASE_URL with the actual server URL when integrating.
 */

export const API_CONFIG = {
  BASE_URL: 'https://iitpk.aifaculty.ai/api',
  TIMEOUT: 30000,
  VERSION: 'v1',
} as const;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  USER: {
    PROFILE: '/user/profile',
    STATS: '/user/stats',
    STREAK: '/user/streak',
  },
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    QUESTS: '/dashboard/quests',
    CALENDAR: '/dashboard/calendar',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
  },
  AI_FACULTY: {
    SESSIONS: '/ai-faculty/sessions',
    CHAT: '/ai-faculty/chat',
  },
} as const;
