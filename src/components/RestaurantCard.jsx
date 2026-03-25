function RestaurantCard({ restaurant }) {
  return (
    <article>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.cuisines}</p>
      <p>Rating: {restaurant.rating}</p>
      <p>{restaurant.address}</p>
    </article>
  )
}

export default RestaurantCard