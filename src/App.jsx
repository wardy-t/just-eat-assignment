import { useEffect } from 'react'
import { fetchRestaurantsByPostcode } from './services/restaurantsApi'
import { mapTopTenRestaurants } from './utils/restaurantMapper'

function App() {
  useEffect(() => {
    async function loadRestaurants() {
      try {
        const restaurants = await fetchRestaurantsByPostcode('N103UG')
        const mappedRestaurants = mapTopTenRestaurants(restaurants)
        console.log(mappedRestaurants)
      } catch (error) {
        console.error(error)
      }
    }

    loadRestaurants()
  }, [])

  return (
    <main>
      <h1>Just Eat Restaurant Search</h1>
    </main>
  )
}

export default App
