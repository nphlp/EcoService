import { LocationResponse } from "@app/api/location/route";

export const getOs = (userAgent: string) => {
    if (/Macintosh|Mac OS X/i.test(userAgent)) return "Mac";
    else if (/Windows/i.test(userAgent)) return "Windows";
    else if (/Linux/i.test(userAgent)) return "Linux";
    else if (/Android/i.test(userAgent)) return "Android";
    else if (/iPhone|iPad|iPod/i.test(userAgent)) return "iOS";
    else return "Inconnu";
};

export const getBrowser = (userAgent: string) => {
    if (/Chrome\/\d+/i.test(userAgent) && !/Edge|Edg|OPR|Opera/i.test(userAgent)) return "Chrome";
    else if (/Safari\/\d+/i.test(userAgent) && !/Chrome/i.test(userAgent)) return "Safari";
    else if (/Firefox\/\d+/i.test(userAgent)) return "Firefox";
    else if (/Edg\/\d+/i.test(userAgent)) return "Edge";
    else if (/OPR\/\d+/i.test(userAgent) || /Opera/i.test(userAgent)) return "Opera";
    else return "Inconnu";
};

export const locationString = (location: LocationResponse | null) => {
    if (!location) return null;
    const { city, region, postal, country_name, longitude, latitude } = location;
    if (!city || !region || !postal || !country_name || !longitude || !latitude) return null;
    return `${city} (${postal}), ${region}, ${country_name} (${longitude}, ${latitude})`;
};
