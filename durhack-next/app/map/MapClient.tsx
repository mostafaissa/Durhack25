"use client";
import { useEffect, useState } from "react";

// Allow the gmp web components in JSX/TSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmp-map": any;
      "gmp-advanced-marker": any;
    }
  }
  interface Window {
    __gmpInit?: () => void;
  }
}

export default function MapClient({
  center = "40.12150192260742,-100.45039367675781",
  zoom = 4,
  mapId = "DEMO_MAP_ID",
}: {
  center?: string;
  zoom?: number;
  mapId?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // If API already present, mark loaded
    if ((window as any).google && (window as any).google.maps) {
      setLoaded(true);
      return;
    }

    const callbackName = "__gmpInit";
    // If callback already set, don't re-add script
    if ((window as any)[callbackName]) {
      // Wait a tick for it to set loaded
      const t = setTimeout(() => setLoaded(true), 50);
      return () => clearTimeout(t);
    }

    (window as any)[callbackName] = () => setLoaded(true);

    const key =
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyB2K_QgO2Ux9m-cv1AJWRVRKEth7ZwiCKk"; // fallback to provided key; prefer env var

    const src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${callbackName}&libraries=maps,marker&v=beta`;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);

    return () => {
      try {
        delete (window as any)[callbackName];
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  // Use string-tagged elements via variables to avoid TSX IntrinsicElements type errors
  const GmpMap: any = "gmp-map";
  const GmpAdvancedMarker: any = "gmp-advanced-marker";

  return (
    <div style={{ height: 600, width: "100%" }}>
      <GmpMap
        center={center}
        zoom={String(zoom)}
        map-id={mapId}
        style={{ height: "100%" }}
      >
        <GmpAdvancedMarker
          position={center}
          title="My location"
        ></GmpAdvancedMarker>
      </GmpMap>
      {!loaded && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.9)",
            padding: "6px 10px",
            borderRadius: 6,
          }}
        >
          Loading map...
        </div>
      )}
    </div>
  );
}
