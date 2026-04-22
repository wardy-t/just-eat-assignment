/* =========================
   RESTAURANT CARD
   =========================
   Displays key information for a single restaurant.
   Purely presentational — receives data via props
   and renders it without additional logic.
========================= */

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>

      <p className="cuisine">{restaurant.cuisines}</p>

      <p className="rating">⭐ {restaurant.rating}</p>

      <p className="address">{restaurant.address}</p>
    </div>
  )
}

export default RestaurantCard