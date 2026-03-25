import { useState } from 'react'
import { fetchRestaurantsByPostcode } from './services/restaurantsApi'
import { mapTopTenRestaurants } from './utils/restaurantMapper'
import RestaurantList from './components/RestaurantList'
import PostcodeForm from './components/PostcodeForm'

function App() {
  const [postcode, setPostcode] = useState('')
  const [restaurants, setRestaurants] = useState([])

  async function handleSearch() {
    const cleanedPostcode = postcode.trim()

    if (!cleanedPostcode) {
      return
    }

    try {
      const data = await fetchRestaurantsByPostcode(cleanedPostcode)
      const mappedRestaurants = mapTopTenRestaurants(data)
      setRestaurants(mappedRestaurants)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <h1>Just Eat Restaurant Search</h1>
      <PostcodeForm
        postcode={postcode}
        onPostcodeChange={setPostcode}
        onSearch={handleSearch}
      />
      <RestaurantList restaurants={restaurants} />
    </main>
  )
}

export default App
