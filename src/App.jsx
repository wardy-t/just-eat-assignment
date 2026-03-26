import { useState } from 'react'
import { fetchRestaurantsByPostcode } from './services/restaurantsApi'
import { mapTopTenRestaurants } from './utils/restaurantMapper'
import RestaurantList from './components/RestaurantList'
import PostcodeForm from './components/PostcodeForm'

function App() {
  const [postcode, setPostcode] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch() {
    const cleanedPostcode = postcode.trim()

    if (!cleanedPostcode) return

    setHasSearched(true)
    setLoading(true)
    setError(null)

    try {
      const data = await fetchRestaurantsByPostcode(cleanedPostcode)
      const mappedRestaurants = mapTopTenRestaurants(data)
      setRestaurants(mappedRestaurants)
    } catch (err) {
      console.error(err)
      setError('Ooops...something went wrong. Please try again.')
      setRestaurants([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Just Eat Restaurant Search</h1>

      <PostcodeForm
        postcode={postcode}
        onPostcodeChange={setPostcode}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && <p>{error}</p>}

      {!error && hasSearched && restaurants.length === 0 && (
        <p>No restaurants found</p>
      )}

      {!error && restaurants.length > 0 && (
        <RestaurantList restaurants={restaurants} />
      )}
    </main>
  )
}

export default App
