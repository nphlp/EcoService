import dayjs from "dayjs";
import "dayjs/locale/fr";

/**
 * Format a date for chart X axis
 * @example "15 jan"
 */
export function formatShortDate(date: Date | string): string {
    return dayjs(date).locale("fr").format("D MMM");
}

/**
 * Format a date for tables
 * @example "15 jan. 2024"
 */
export function formatMediumDate(date: Date | string): string {
    return dayjs(date).locale("fr").format("D MMM YYYY");
}

/**
 * Format a date with full month name for tooltips
 * @example "lundi 15 janvier 2024"
 */
export function formatLongDate(date: Date | string): string {
    return dayjs(date).locale("fr").format("dddd D MMMM YYYY");
}

/**
 * Format a date with short weekday for tables
 * @example "lun., 15 janv. 2024"
 */
export function formatDateWithWeekday(date: Date | string): string {
    return dayjs(date).locale("fr").format("ddd, D MMM YYYY");
}

/**
 * Format time (HH:mm)
 * @example "14:30"
 */
export function formatTime(date: Date | string): string {
    return dayjs(date).locale("fr").format("HH:mm");
}

/**
 * Format decimal time (hours + minutes/60) to "Hhmm" format
 * @param decimal - Time in decimal hours (e.g., 14.5 = 14h30)
 * @example 14.5 → "14h30"
 */
export function formatDecimalTime(decimal: number): string {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 60);
    return `${hours}h${minutes.toString().padStart(2, "0")}`;
}

/**
 * Format a date or return "-" if null
 * @example "15 jan. 2024" or "-"
 */
export function formatDateOrNull(date: Date | string | null): string {
    return date ? formatMediumDate(date) : "-";
}

/**
 * Format a delay in minutes (compact format)
 * @param delayMinutes - Number of minutes (positive = late, negative = early)
 * @example 6 → "+6min", -2 → "-2min", 0 → "0min"
 */
export function formatDelayMinutes(delayMinutes: number): string {
    if (delayMinutes === 0) return "0min";
    const sign = delayMinutes > 0 ? "+" : "";
    return `${sign}${delayMinutes}min`;
}

/**
 * Format a delay in minutes to "H:MM" format
 * @param delayMinutes - Number of minutes (positive = late, negative = early)
 * @example 65 → "+1h05", -30 → "-0h30", 5 → "+5min"
 */
export function formatDelayAsTime(delayMinutes: number): string {
    if (delayMinutes === 0) return "0min";

    const sign = delayMinutes > 0 ? "+" : "-";
    const absMinutes = Math.abs(delayMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;

    if (hours === 0) {
        return `${sign}${minutes}min`;
    }

    return `${sign}${hours}h${minutes.toString().padStart(2, "0")}`;
}

/**
 * Format hours and minutes to "HH:MM" format
 * @param hours - Hour value (0-23)
 * @param minutes - Minute value (0-59)
 * @example formatTimeString(9, 5) → "09:05"
 */
export function formatTimeString(hours: number, minutes: number): string {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
