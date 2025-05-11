"use client";

import { LocationResponse } from "@app/api/external/location/route";
import dynamic from "next/dynamic";

// Prevent undefined window error due to Leaflet import
const LocationMap = dynamic(() => import("../../app/(auth)/profile/components/locationMap"), { ssr: false });

type LocationWrapperProps = {
    location: LocationResponse | null;
};

export default function LocationWrapper(props: LocationWrapperProps) {
    const { location } = props;

    return <LocationMap location={location} />;
}
