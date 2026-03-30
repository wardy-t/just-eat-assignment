import { useState } from 'react'
import { fetchRestaurantsByPostcode } from './services/restaurantsApi'
import { mapTopTenRestaurants } from './utils/restaurantMapper'
import RestaurantList from './components/RestaurantList'
import PostcodeForm from './components/PostcodeForm'
import LandingView from './components/LandingView'
import RestaurantMap from './components/RestaurantMap'
import Banner from './components/Banner'

function App() {
  const [postcode, setPostcode] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [tagQuery, setTagQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [searchCoordinates, setSearchCoordinates] = useState(null)
  const [viewMode, setViewMode] = useState('list')

  function normalizeTag(value) {
    return value.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  const normalizedTagQuery = normalizeTag(tagQuery)
  const normalizedSelectedTag = normalizeTag(selectedTag)

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (!normalizedTagQuery && !normalizedSelectedTag) return true

    if (normalizedSelectedTag) {
      return restaurant.tags.some(
        (tag) => normalizeTag(tag) === normalizedSelectedTag
      )
    }

    return restaurant.tags.some((tag) =>
      normalizeTag(tag).includes(normalizedTagQuery)
    )
  })

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
  if (sortBy === 'closest') {
    return (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity)
  }

  if (sortBy === 'highest-rated') {
    return (b.rating ?? 0) - (a.rating ?? 0)
  }

    return 0
  })

  async function handleSearch() {
    const cleanedPostcode = postcode.trim()

    if (!cleanedPostcode) return

    setHasSearched(true)
    setLoading(true)
    setError(null)

    try {
      const data = await fetchRestaurantsByPostcode(cleanedPostcode)
      const mappedRestaurants = mapTopTenRestaurants(data.restaurants)

      setRestaurants(mappedRestaurants)
      setSearchCoordinates(data.searchCoordinates)
      setShowResults(true)
      setViewMode('list')
      setTagQuery('')
      setSelectedTag('')
    } catch (err) {
      console.error(err)
      setError('Oops... something went wrong. Please try again.')
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
      <Banner variant="logo" />

      <header className="results-header">
        <div className="results-header-inner">
          <div className="results-topbar">
            <h1 className="results-title">LOOKING FOR RESTAURANTS?</h1>
            <p className="results-subtitle">
              Find local restaurant options by postcode.
            </p>
          </div>

        <div className="results-search-panel">
          <PostcodeForm
            postcode={postcode}
            onPostcodeChange={setPostcode}
            onSearch={handleSearch}
            loading={loading}
            compact={true}
          />

          <div className="tag-search">
            <input
              className="tag-search-input"
              type="text"
              placeholder="Search by deal or cuisine"
              value={tagQuery}
              onChange={(event) => {
                setTagQuery(event.target.value)
                setSelectedTag('')
              }}
            />
          </div>

          <p className="filter-label">Popular deals and cuisines</p>

          <div className="tag-buttons">
            {['Deals',
              'Cheeky Tuesday',
              'Collect stamps',
              'Freebies',
              'Pizza',
              'Chinese',
              'Burgers',
              'Sushi',
            ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={normalizeTag(selectedTag) === normalizeTag(tag) ? 'active' : ''}
                  onClick={() => {
                    setSelectedTag(normalizeTag(tag))
                    setTagQuery('')
                  }}
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </header>

    <section className="results-content">
      <div className="results-layout">

        <aside className="filters-sidebar">
          
          <div className="filter-group">
            <label className="sort-label" htmlFor="sortBy">
              Sort by
            </label>

            <select
              id="sortBy"
              className="sort-select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="default">Recommended</option>
              <option value="closest">Closest</option>
              <option value="highest-rated">Highest rating</option>
            </select>
          </div>

          <div className="view-group">
            <p className="view-label">View</p>

            <div className="view-toggle">
              <button
                type="button"
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                List
              </button>

              <button
                type="button"
                className={viewMode === 'map' ? 'active' : ''}
                onClick={() => setViewMode('map')}
              >
                Map
              </button>
            </div>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <div className="results-main">
          {error && <p className="status-message">{error}</p>}

          {!error && hasSearched && restaurants.length === 0 && (
            <p className="status-message">No restaurants found</p>
          )}

          {!error && restaurants.length > 0 && filteredRestaurants.length === 0 && (
            <p className="status-message">No matching restaurants</p>
          )}

          {!error && filteredRestaurants.length > 0 && (
            viewMode === 'list' ? (
              <RestaurantList restaurants={sortedRestaurants} />
            ) : (
              <RestaurantMap
                restaurants={sortedRestaurants}
                searchCoordinates={searchCoordinates}
              />
            )
          )}
        </div>

      </div>
    </section>
  </main>
  )
}

export default App