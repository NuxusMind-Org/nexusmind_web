export type SessionLang = 'az' | 'en' | 'ru';

export type SessionDateStyle = 'medium' | 'short' | 'full' | 'shortWeekday' | 'numeric';

export interface PlainDateParts {
  year: number;
  month: number; // 1..12
  day: number; // 1..31
}

export interface PlainTimeParts {
  hour: number; // 0..23
  minute: number; // 0..59
  second: number; // 0..59
}

interface TemporalPlainDateLike {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number; // 1 (Mon) .. 7 (Sun)
}

interface TemporalPlainTimeLike {
  hour: number;
  minute: number;
  second: number;
}

interface TemporalGlobalLike {
  PlainDate?: {
    from(
      item: string | PlainDateParts,
      options?: { overflow?: 'constrain' | 'reject' }
    ): TemporalPlainDateLike;
  };
  PlainTime?: {
    from(
      item: string | PlainTimeParts,
      options?: { overflow?: 'constrain' | 'reject' }
    ): TemporalPlainTimeLike;
  };
}

const getTemporal = (): TemporalGlobalLike | undefined =>
  (globalThis as unknown as { Temporal?: TemporalGlobalLike }).Temporal;

const MONTHS_FULL: Record<SessionLang, readonly string[]> = {
  az: [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'İyun',
    'İyul',
    'Avqust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  // Genitive forms for natural Russian calendar dates ("15 мая 2026")
  ru: [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ],
};

const MONTHS_SHORT: Record<SessionLang, readonly string[]> = {
  az: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
};

// Sunday (0) .. Saturday (6)
const WEEKDAYS_FULL: Record<SessionLang, readonly string[]> = {
  az: [
    'Bazar',
    'Bazar ertəsi',
    'Çərşənbə axşamı',
    'Çərşənbə',
    'Cümə axşamı',
    'Cümə',
    'Şənbə',
  ],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
};

const WEEKDAYS_SHORT: Record<SessionLang, readonly string[]> = {
  az: ['Baz', 'B.e', 'Ç.a', 'Çər', 'C.a', 'Cüm', 'Şən'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};

/**
 * Normalizes any BCP-47 language tag (e.g. 'az-AZ', 'az-Latn', 'ru-RU', 'en-GB')
 * to one of our 3 supported language codes.
 */
export function resolveSessionLang(language?: string | null): SessionLang {
  const short = (language || 'az').slice(0, 2).toLowerCase();
  if (short === 'en' || short === 'ru') return short;
  return 'az';
}

const validatePlainDate = (year: number, month: number, day: number): PlainDateParts | null => {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 1900 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const TemporalApi = getTemporal();
  if (TemporalApi?.PlainDate) {
    try {
      const pd = TemporalApi.PlainDate.from({ year, month, day }, { overflow: 'reject' });
      return { year: pd.year, month: pd.month, day: pd.day };
    } catch {
      return null;
    }
  }

  const probe = new Date(year, month - 1, day);
  if (
    Number.isNaN(probe.getTime()) ||
    probe.getFullYear() !== year ||
    probe.getMonth() !== month - 1 ||
    probe.getDate() !== day
  ) {
    return null;
  }

  return { year, month, day };
};

const validatePlainTime = (
  hour: number,
  minute: number,
  second = 0
): PlainTimeParts | null => {
  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    !Number.isInteger(second) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    return null;
  }

  const TemporalApi = getTemporal();
  if (TemporalApi?.PlainTime) {
    try {
      const pt = TemporalApi.PlainTime.from({ hour, minute, second }, { overflow: 'reject' });
      return { hour: pt.hour, minute: pt.minute, second: pt.second };
    } catch {
      return null;
    }
  }

  return { hour, minute, second };
};

/**
 * Parses backend/UI calendar date inputs into a location-agnostic PlainDateParts
 * without UTC timezone drift.
 *
 * Supports:
 * - ISO date strings: "2026-05-15", "2026-05-15T14:30:00", "2026-05-15T00:00:00Z"
 * - Slash/dot strings: "2026/05/15", "15.05.2026", "15/05/2026"
 * - Jackson LocalDate arrays: [2026, 5, 15]
 * - Plain date objects: { year: 2026, month: 5, day: 15 }
 * - Date instances
 */
export function parsePlainDate(value: unknown): PlainDateParts | null {
  if (value === null || value === undefined || value === '') return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate(),
    };
  }

  if (Array.isArray(value) && value.length >= 3) {
    return validatePlainDate(Number(value[0]), Number(value[1]), Number(value[2]));
  }

  if (typeof value === 'object') {
    const obj = value as { year?: unknown; month?: unknown; day?: unknown };
    if (obj.year !== undefined && obj.month !== undefined && obj.day !== undefined) {
      return validatePlainDate(Number(obj.year), Number(obj.month), Number(obj.day));
    }
    return null;
  }

  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  // Match leading YYYY-MM-DD or YYYY/MM/DD (including ISO timestamps like 2026-05-15T14:30:00Z)
  const ymdMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:$|T|\s)/);
  if (ymdMatch) {
    return validatePlainDate(Number(ymdMatch[1]), Number(ymdMatch[2]), Number(ymdMatch[3]));
  }

  // Match DD.MM.YYYY or DD/MM/YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (dmyMatch) {
    return validatePlainDate(Number(dmyMatch[3]), Number(dmyMatch[2]), Number(dmyMatch[1]));
  }

  return null;
}

/**
 * Parses backend/UI wall-clock time inputs into PlainTimeParts.
 *
 * Supports:
 * - Time strings: "14:30:00", "14:30", "9:5:0"
 * - ISO timestamps: "2026-05-15T14:30:00"
 * - Jackson LocalTime arrays: [14, 30], [14, 30, 0]
 * - Jackson LocalTime objects: { hour: 14, minute: 30, second?: 0 }
 * - Date instances
 * - Optional fallback ISO appointmentDate string if timeVal is missing
 */
export function parsePlainTime(
  value: unknown,
  fallbackDateVal?: unknown
): PlainTimeParts | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return {
      hour: value.getHours(),
      minute: value.getMinutes(),
      second: value.getSeconds(),
    };
  }

  if (Array.isArray(value) && value.length >= 2) {
    return validatePlainTime(
      Number(value[0]),
      Number(value[1]),
      value.length >= 3 ? Number(value[2]) : 0
    );
  }

  if (typeof value === 'object' && value !== null) {
    const obj = value as { hour?: unknown; minute?: unknown; second?: unknown };
    if (obj.hour !== undefined && obj.minute !== undefined) {
      return validatePlainTime(
        Number(obj.hour),
        Number(obj.minute),
        obj.second !== undefined ? Number(obj.second) : 0
      );
    }
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) {
      const timeMatch = trimmed.match(/(?:^|T|\s)(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/);
      if (timeMatch) {
        return validatePlainTime(
          Number(timeMatch[1]),
          Number(timeMatch[2]),
          timeMatch[3] !== undefined ? Number(timeMatch[3]) : 0
        );
      }
    }
  }

  // Fallback: extract embedded time from an ISO date string (e.g. "2026-05-15T14:30:00")
  if (typeof fallbackDateVal === 'string' && fallbackDateVal.includes('T')) {
    const isoTimePart = fallbackDateVal.split('T')[1];
    if (isoTimePart) {
      return parsePlainTime(isoTimePart);
    }
  }

  return null;
}

/**
 * Returns Sunday (0) .. Saturday (6) for a location-agnostic calendar date.
 */
export function getWeekdayIndex(parts: PlainDateParts): number {
  const TemporalApi = getTemporal();
  if (TemporalApi?.PlainDate) {
    try {
      const pd = TemporalApi.PlainDate.from(parts, { overflow: 'reject' });
      return pd.dayOfWeek % 7;
    } catch {
      // Fall through to local Date weekday lookup
    }
  }
  return new Date(parts.year, parts.month - 1, parts.day).getDay();
}

export interface FormatSessionDateOptions {
  style?: SessionDateStyle;
}

/**
 * Formats a session calendar date consistently across all browsers and locales
 * without relying on inconsistent browser ICU data for 'az-AZ'.
 *
 * Examples (for 2026-05-15):
 * - style: 'medium'       -> AZ: "15 May 2026"       | EN: "15 May 2026"       | RU: "15 мая 2026"
 * - style: 'short'        -> AZ: "15 May 2026"       | EN: "15 May 2026"       | RU: "15 мая 2026"
 * - style: 'full'         -> AZ: "Cümə, 15 May 2026" | EN: "Friday, 15 May 2026" | RU: "Пятница, 15 мая 2026"
 * - style: 'shortWeekday' -> AZ: "Cüm, 15 May"       | EN: "Fri, 15 May"       | RU: "Пт, 15 мая"
 * - style: 'numeric'      -> "15.05.2026"
 */
export function formatSessionDate(
  dateVal: unknown,
  lang: SessionLang = 'az',
  options?: FormatSessionDateOptions
): string {
  const parts = parsePlainDate(dateVal);
  if (!parts) {
    return typeof dateVal === 'string' ? dateVal.trim() : '';
  }

  const style = options?.style ?? 'medium';
  const monthIdx = parts.month - 1;
  const fullMonth = MONTHS_FULL[lang][monthIdx] ?? MONTHS_FULL.az[monthIdx];
  const shortMonth = MONTHS_SHORT[lang][monthIdx] ?? MONTHS_SHORT.az[monthIdx];

  switch (style) {
    case 'numeric': {
      const dd = String(parts.day).padStart(2, '0');
      const mm = String(parts.month).padStart(2, '0');
      return `${dd}.${mm}.${parts.year}`;
    }
    case 'short':
      return `${parts.day} ${shortMonth} ${parts.year}`;
    case 'shortWeekday': {
      const weekday = WEEKDAYS_SHORT[lang][getWeekdayIndex(parts)];
      return `${weekday}, ${parts.day} ${shortMonth}`;
    }
    case 'full': {
      const weekday = WEEKDAYS_FULL[lang][getWeekdayIndex(parts)];
      return `${weekday}, ${parts.day} ${fullMonth} ${parts.year}`;
    }
    case 'medium':
    default:
      return `${parts.day} ${fullMonth} ${parts.year}`;
  }
}

/**
 * Formats a session wall-clock time as zero-padded 24-hour HH:mm (e.g. "09:05", "14:30").
 */
export function formatSessionTime(timeVal: unknown, fallbackDateVal?: unknown): string {
  const parts = parsePlainTime(timeVal, fallbackDateVal);
  if (!parts) {
    return typeof timeVal === 'string' ? timeVal.trim() : '';
  }
  const hh = String(parts.hour).padStart(2, '0');
  const mm = String(parts.minute).padStart(2, '0');
  return `${hh}:${mm}`;
}

/**
 * Returns the clean short weekday label for a Date or PlainDateParts (e.g. "B.e", "Mon", "Пн").
 */
export function formatWeekdayShort(dateVal: unknown, lang: SessionLang = 'az'): string {
  const parts = parsePlainDate(dateVal);
  if (!parts) return '';
  return WEEKDAYS_SHORT[lang][getWeekdayIndex(parts)];
}

/**
 * Formats a 7-day calendar week header range cleanly across AZ, EN, and RU.
 * Examples: "11 – 17 May 2026", "27 Apr – 3 May 2026", "28 Dek 2026 – 3 Yan 2027".
 */
export function formatSessionWeekRange(
  startVal: unknown,
  endVal: unknown,
  lang: SessionLang = 'az'
): string {
  const start = parsePlainDate(startVal);
  const end = parsePlainDate(endVal);
  if (!start || !end) return '';

  const sameYear = start.year === end.year;
  const sameMonth = sameYear && start.month === end.month;

  if (sameMonth) {
    const monthName = MONTHS_FULL[lang][end.month - 1];
    return `${start.day} – ${end.day} ${monthName} ${end.year}`;
  }

  if (sameYear) {
    const startMonth = MONTHS_SHORT[lang][start.month - 1];
    const endMonth = MONTHS_SHORT[lang][end.month - 1];
    return `${start.day} ${startMonth} – ${end.day} ${endMonth} ${end.year}`;
  }

  const startMonth = MONTHS_SHORT[lang][start.month - 1];
  const endMonth = MONTHS_SHORT[lang][end.month - 1];
  return `${start.day} ${startMonth} ${start.year} – ${end.day} ${endMonth} ${end.year}`;
}
