import type { AppointmentDto } from '@/api/types';

const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Parses date string (YYYY-MM-DD or ISO) and time string (HH:mm:ss or HH:mm)
 * into a local Date object.
 */
export const parseSessionDateTime = (dateStr?: string, timeStr?: string): Date | null => {
  if (!dateStr) return null;
  try {
    let yyyy: number;
    let mm: number;
    let dd: number;

    if (dateStr.includes('T')) {
      const parsed = new Date(dateStr);
      if (isNaN(parsed.getTime())) return null;
      yyyy = parsed.getFullYear();
      mm = parsed.getMonth();
      dd = parsed.getDate();
    } else {
      const parts = dateStr.split('-').map(Number);
      if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
        return null;
      }
      yyyy = parts[0];
      mm = parts[1] - 1; // month is 0-indexed in JS Date
      dd = parts[2];
    }

    const safeTime = timeStr || '00:00:00';
    const timeParts = safeTime.split(':').map(Number);
    const hours = isNaN(timeParts[0]) ? 0 : timeParts[0];
    const minutes = isNaN(timeParts[1]) ? 0 : timeParts[1];
    const seconds = isNaN(timeParts[2]) ? 0 : timeParts[2];

    const date = new Date(yyyy, mm, dd, hours, minutes, seconds);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
};

/**
 * Determines whether a session should be rendered on the Sessions page.
 * Conditions:
 * 1. Status must NOT be CANCELLED or COMPLETED.
 * 2. Session must be in the future, OR if it has already started, no more than 1 hour (60 mins) has elapsed.
 */
export const isSessionUpcomingOrActive = (
  session: AppointmentDto,
  now: Date = new Date()
): boolean => {
  if (session.status === 'COMPLETED' || session.status === 'CANCELLED') {
    return false;
  }

  const sessionDateTime = parseSessionDateTime(session.appointmentDate, session.appointmentTime);
  if (!sessionDateTime) {
    // If date cannot be parsed, keep visible unless cancelled/completed
    return true;
  }

  const elapsedMs = now.getTime() - sessionDateTime.getTime();

  // If elapsedMs > 1 hour, session is past the 1-hour expiry threshold
  if (elapsedMs > ONE_HOUR_MS) {
    return false;
  }

  return true;
};

/**
 * Determines if a user can join the call (15 mins prior up to 60 mins into session).
 */
export const checkIsJoinable = (
  session: AppointmentDto,
  now: Date = new Date()
): boolean => {
  if (session.status === 'COMPLETED' || session.status === 'CANCELLED') return false;
  if (session.status === 'IN_PROGRESS') return true;

  const sessionDateObj = parseSessionDateTime(session.appointmentDate, session.appointmentTime);
  if (!sessionDateObj) return true;

  const diffMins = (sessionDateObj.getTime() - now.getTime()) / (1000 * 60);
  return diffMins <= 15 && diffMins >= -60;
};

/**
 * Sorts sessions chronologically (closest/earliest upcoming first).
 */
export const sortSessionsChronologically = (sessions: AppointmentDto[]): AppointmentDto[] => {
  return [...sessions].sort((a, b) => {
    const dateA = parseSessionDateTime(a.appointmentDate, a.appointmentTime);
    const dateB = parseSessionDateTime(b.appointmentDate, b.appointmentTime);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * Filters sessions by search query matching doctor name, mode, or date.
 */
export const filterSessionsBySearch = (
  sessions: AppointmentDto[],
  searchQuery: string
): AppointmentDto[] => {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return sessions;

  return sessions.filter((session) => {
    const doctorMatch = session.doctorName?.toLowerCase().includes(query) ?? false;
    const modeMatch = session.mode?.toLowerCase().includes(query) ?? false;
    const dateMatch = session.appointmentDate?.toLowerCase().includes(query) ?? false;

    return doctorMatch || modeMatch || dateMatch;
  });
};
