import { useState } from 'react'
import { fetchRestaurantsByPostcode } from './services/restaurantsApi'
import { mapTopTenRestaurants } from './utils/restaurantMapper'
import RestaurantList from './components/RestaurantList'
import PostcodeForm from './components/PostcodeForm'
import LandingView from './components/LandingView'

function App() {
  const [postcode, setPostcode] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [showResults, setShowResults] = useState(false)

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
      setShowResults(true)
    } catch (err) {
      console.error(err)
      setError('Ooops...something went wrong. please try again')
      setRestaurants([])
      setShowResults(true)
    } finally {
      setLoading(false)
    }
  }

  if (!showResults) {
    return (
      <LandingView
        postcode={postcode}
        setPostcode={setPostcode}
        handleSearch={handleSearch}
        loading={loading}
      />
    )
  }

  return (
    <main className="results-page">
      <header className="results-header">
        <div className="results-header-inner">
          <h1 className="results-title">Just Eat Restaurant Search</h1>

          <PostcodeForm
            postcode={postcode}
            onPostcodeChange={setPostcode}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>
      </header>

      <section className="results-content">
        {error && <p className="status-message">{error}</p>}

        {!error && hasSearched && restaurants.length === 0 && (
          <p className="status-message">No restaurants found</p>
        )}

        {!error && restaurants.length > 0 && (
          <RestaurantList restaurants={restaurants} />
        )}
      </section>
    </main>
  )
}

export default App
