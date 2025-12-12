/**
 * Hours formats (database)
 */
type HourString =
    | ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9")
    | ("00" | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09")
    | ("10" | "11" | "12");

/**
 * Minutes formats (database)
 */
type MinuteString = `${0 | 1 | 2 | 3 | 4 | 5}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

/**
 * Time string format (database)
 * -> "H:MM" or "HH:MM"
 */
export type TimeString = `${HourString}:${MinuteString}`;

/**
 * Time number format (application)
 */
export type Hour =
    | (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)
    | (10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19)
    | (20 | 21 | 22 | 23);

/**
 * Minute number format (application)
 */
export type Minute =
    | (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)
    | (10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19)
    | (20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)
    | (30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39)
    | (40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49)
    | (50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59);

/**
 * Time format (application)
 */
export type Time = {
    hours: Hour;
    minutes: Minute;
};
