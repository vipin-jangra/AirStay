import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

// Fix Leaflet default icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FitBounds: React.FC<{ listings: any[] }> = ({ listings }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      listings
        .filter((l) => l.location?.lat && l.location?.lng)
        .map((l) => [l.location!.lat, l.location!.lng] as [number, number])
    );
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [listings, map]);

  return null;
};

const ListingsMap: React.FC = () => {
  const navigate = useNavigate();
  const listings = useSelector((state: RootState) => state.listings.items);
  const highlightedId = useSelector(
    (state: RootState) => state.listings.highlightedId
  );

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      scrollWheelZoom
      className="w-full h-screen rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <FitBounds listings={listings} />

      {listings.map(
        (l) =>
          l.location?.lat &&
          l.location?.lng && (
            <Marker
              key={l._id}
              position={[l.location.lat, l.location.lng] as [number, number]}
              icon={L.divIcon({
                html: `
                  <div
                    style="
                      background: ${highlightedId === l._id ? "#000" : "#fff"};
                      color: ${highlightedId === l._id ? "#fff" : "#000"};
                      font-weight: 600;
                      padding: 4px 8px;
                      border-radius: 20px;
                      font-size: 13px;
                      white-space: nowrap;
                      text-align: center;
                      min-width: 50px;
                      border: 1px solid #ddd;
                      transition: all 0.2s ease;
                      transform: scale(${highlightedId === l._id ? 1.15 : 1});
                      box-shadow: ${
                        highlightedId === l._id
                          ? "0 2px 8px rgba(0,0,0,0.25)"
                          : "0 1px 4px rgba(0,0,0,0.1)"
                      };
                      cursor: pointer;
                    "
                  >
                    ₹${l.pricePerNight}
                  </div>
                `,
                className: "custom-marker",
              })}
              zIndexOffset={highlightedId === l._id ? 1000 : 0}
              eventHandlers={{
                click: () => navigate(`/listing/${l._id}`),
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup>
                <div className="text-sm cursor-pointer">
                  <strong>{l.title}</strong>
                  <br />
                  {l.address || "No address"}
                  <br />₹{l.pricePerNight}
                </div>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default React.memo(ListingsMap);
