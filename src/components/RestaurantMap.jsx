import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'


/* =========================
   LEAFLET CONFIG FIX
   =========================
   Ensures default marker icons load correctly in Vite
   by manually providing asset paths.
========================= */

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})


/* =========================
   RESTAURANT MAP
   =========================
   Displays restaurant locations using Leaflet.
   - Centers map on searched postcode
   - Renders markers for each restaurant
   - Gracefully handles missing coordinate data
========================= */

function RestaurantMap({ restaurants, searchCoordinates }) {

  // Fallback if postcode location is unavailable
  if (!searchCoordinates) {
    return <p className="status-message">Map location unavailable</p>
  }

  // Convert API [lng, lat] → Leaflet [lat, lng]
  const mapCenter = [searchCoordinates[1], searchCoordinates[0]]

  return (
    <div className="restaurant-map-wrapper">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="restaurant-map"
      >
        {/* Base map tiles */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker for searched postcode */}
        <Marker position={mapCenter}>
          <Popup>Searched postcode location</Popup>
        </Marker>

        {/* Restaurant markers */}
        {restaurants.map((restaurant) => {

          // Skip invalid or missing coordinates
          if (!restaurant.coordinates || restaurant.coordinates.length !== 2) {
            return null
          }

          const [lng, lat] = restaurant.coordinates
          const position = [lat, lng]

          return (
            <Marker key={restaurant.id} position={position}>
              <Popup>
                <strong>{restaurant.name}</strong>
                <br />
                {restaurant.cuisines}
                <br />
                Rating: {restaurant.rating}
                <br />
                {restaurant.address}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default RestaurantMap