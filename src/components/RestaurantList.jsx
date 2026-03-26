import RestaurantCard from './RestaurantCard'

function RestaurantList({ restaurants }) {
  return (
    <div className="restaurant-list">
        {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
        ))}
    </div>
  )
}

export default RestaurantList