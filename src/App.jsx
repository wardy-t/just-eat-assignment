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
  const [tagQuery, setTagQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const normalizedTagQuery = tagQuery.trim().toLowerCase()
  const normalizedSelectedTag = selectedTag.trim().toLowerCase()

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (!normalizedTagQuery && !normalizedSelectedTag) return true

    if (normalizedSelectedTag) {
      return restaurant.tags.some(
        (tag) => tag.toLowerCase().trim() === normalizedSelectedTag
      )
    }

    return restaurant.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedTagQuery)
    )
  })

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
      setTagQuery('')
      setSelectedTag('')
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

          <div className="tag-search">
            <input
              className="tag-search-input"
              type="text"
              placeholder="Search by cuisine or tag (e.g. pizza, cheeky tuesday)"
              value={tagQuery}
              onChange={(event) => {
                setTagQuery(event.target.value)
                setSelectedTag('')
              }}
            />
          </div>

          <div className="tag-buttons">
            {['Pizza', 'Chinese', 'Burgers', 'Sushi', 'Cheeky Tuesday'].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  className={selectedTag === tag.toLowerCase() ? 'active' : ''}
                  onClick={() => {
                    setSelectedTag(tag.toLowerCase())
                    setTagQuery('')
                  }}
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </header>

      <section className="results-content">
        {error && <p className="status-message">{error}</p>}

        {!error && hasSearched && restaurants.length === 0 && (
          <p className="status-message">No restaurants found</p>
        )}

        {!error && restaurants.length > 0 && filteredRestaurants.length === 0 && (
          <p className="status-message">No matching restaurants</p>
        )}

        {!error && filteredRestaurants.length > 0 && (
          <RestaurantList restaurants={filteredRestaurants} />
        )}
      </section>
    </main>
  )
}

export default App