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