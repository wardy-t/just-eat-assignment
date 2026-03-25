import { useEffect, useState } from 'react'
import { fetchRestaurantsByPostcode } from './services/restaurantsApi'
import { mapTopTenRestaurants } from './utils/restaurantMapper'
import RestaurantList from './components/RestaurantList'

function App() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const data = await fetchRestaurantsByPostcode('N103UG')
        const mappedRestaurants = mapTopTenRestaurants(data)
        setRestaurants(mappedRestaurants)
      } catch (error) {
        console.error(error)
      }
    }

    loadRestaurants()
  }, [])

  return (
    <main>
      <h1>Just Eat Restaurant Search</h1>
      <RestaurantList restaurants={restaurants} />
    </main>
  )
}

export default App
