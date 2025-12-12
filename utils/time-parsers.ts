import { Hour, Minute, Time, TimeString } from "./time-types";

export const getTimeFromDate = (date: Date): Time => {
    const hours = date.getHours() as Hour;
    const minutes = date.getMinutes() as Minute;
    return { hours, minutes };
};

export const getTimeFromTimeString = (timeString: TimeString | string): Time => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return { hours: hours as Hour, minutes: minutes as Minute };
};

export const convertTimeToMinutes = (time: Time): number => {
    return time.hours * 60 + time.minutes;
};

export const convertMinutesToTime = (totalMinutes: number): Time => {
    const hours = Math.floor(totalMinutes / 60) as Hour;
    const minutes = (totalMinutes % 60) as Minute;
    return { hours, minutes };
};

export const convertHoursMinutesToTime = (hours: number, minutes: number): Time => {
    return { hours: hours as Hour, minutes: minutes as Minute };
};

export const resetSecondsAndMilliseconds = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setSeconds(0, 0);
    return newDate;
};

export const resetTime = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

export const setTime = (date: Date, hour: number, minute: number): Date => {
    const newDate = new Date(date);
    newDate.setHours(hour, minute, 0, 0);
    return newDate;
};

export const getDateInInterval = (startDate: Date, endDate: Date): Date[] => {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const daysList: Date[] = [];

    let currentDay = startDate;
    while (currentDay <= endDate) {
        daysList.push(new Date(currentDay));
        currentDay = new Date(currentDay.getTime() + oneDayInMs);
    }

    return daysList;
};

export const getDayBounds = (date: Date): { start: Date; end: Date } => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return { start, end };
};
