"use client";

import { LocationResponse } from "@app/api/external/location/route";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

type LocationMapProps = {
    location: LocationResponse | null;
};

export default function LocationMap(props: LocationMapProps) {
    const { location } = props;

    if (!location || !location.latitude || !location.longitude) {
        return <></>;
    }

    const position: [number, number] = [location.latitude, location.longitude];

    const iconSize = 40;
    const iconMarkup = renderToStaticMarkup(
        <MapPin style={{ height: iconSize, width: iconSize }} className="fill-white stroke-gray-600 stroke-[1.2px]" />,
    );
    const customIcon = L.divIcon({
        html: iconMarkup,
        className: "custom-pin-icon",
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize], // Make the pin point to the center of the icon
    });

    return (
        <div className="mt-3 mb-2 h-56 w-full overflow-hidden rounded-md">
            <MapContainer
                style={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                }}
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon} />
            </MapContainer>
        </div>
    );
}
