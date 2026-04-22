import RestaurantCard from './RestaurantCard'

/* =========================
   RESTAURANT LIST
   =========================
   Responsible for rendering a list of restaurants.
   Receives already filtered and sorted data from App.jsx
   and maps each item to a RestaurantCard component.
========================= */

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