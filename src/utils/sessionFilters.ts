import type { AppointmentDto } from '@/api/types';
import { parsePlainDate, parsePlainTime } from './sessionDate';

const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Parses a backend appointment date (YYYY-MM-DD, ISO, DD.MM.YYYY, LocalDate array)
 * and time (HH:mm:ss, HH:mm, LocalTime array/object) into a local Date object
 * without UTC off-by-one-day drift.
 */
export const parseSessionDateTime = (dateVal?: unknown, timeVal?: unknown): Date | null => {
  const dateParts = parsePlainDate(dateVal);
  if (!dateParts) return null;

  const timeParts = parsePlainTime(timeVal, dateVal);
  const hours = timeParts?.hour ?? 0;
  const minutes = timeParts?.minute ?? 0;
  const seconds = timeParts?.second ?? 0;

  const date = new Date(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
    hours,
    minutes,
    seconds
  );
  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * Determines whether a session should be rendered on the Sessions page.
 * Conditions:
 * 1. Status must NOT be CANCELLED or COMPLETED (and optionally excludes PENDING_PAYMENT).
 * 2. Session must be in the future, OR if it has already started, no more than 1 hour (60 mins) has elapsed.
 */
export const isSessionUpcomingOrActive = (
  session: AppointmentDto,
  now: Date = new Date(),
  options?: { excludePendingPayment?: boolean }
): boolean => {
  if (session.status === 'COMPLETED' || session.status === 'CANCELLED') {
    return false;
  }
  if (options?.excludePendingPayment && session.status === 'PENDING_PAYMENT') {
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
  if (
    session.status === 'COMPLETED' ||
    session.status === 'CANCELLED' ||
    session.status === 'PENDING_PAYMENT'
  ) {
    return false;
  }
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
 * Filters sessions by search query across doctor name, specialities, or appointment notes.
 */
export const filterSessionsBySearch = (
  sessions: AppointmentDto[],
  searchQuery: string
): AppointmentDto[] => {
  const trimmed = searchQuery.trim().toLowerCase();
  if (!trimmed) return sessions;

  return sessions.filter((session) => {
    const doctorName = session.doctorName?.toLowerCase() || '';
    const patientName = session.patientName?.toLowerCase() || '';

    return (
      doctorName.includes(trimmed) ||
      patientName.includes(trimmed)
    );
  });
};
