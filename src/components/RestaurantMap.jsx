import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function RestaurantMap({ restaurants, searchCoordinates }) {
  if (!searchCoordinates) {
    return <p className="status-message">Map location unavailable</p>
  }

  const mapCenter = [searchCoordinates[1], searchCoordinates[0]]

  return (
    <div className="restaurant-map-wrapper">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="restaurant-map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={mapCenter}>
          <Popup>Searched postcode location</Popup>
        </Marker>

        {restaurants.map((restaurant) => {
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