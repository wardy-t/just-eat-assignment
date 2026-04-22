import { useState } from 'react'
import { fetchRestaurantsByPostcode } from './services/restaurantsApi'
import { mapTopTenRestaurants } from './utils/restaurantMapper'
import RestaurantList from './components/RestaurantList'
import LandingView from './components/LandingView'
import RestaurantMap from './components/RestaurantMap'
import Banner from './components/Banner'
import ResultsControls from './components/ResultsControls'

function App() {

  /* =========================
     STATE (Single Source of Truth)
     =========================
     All core app state is managed here so that
     filtering, sorting, and view logic stay consistent
     across both list and map views.
  ========================= */

  const [postcode, setPostcode] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Filtering & UI state
  const [tagQuery, setTagQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // Sorting & view state
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState('list')

  // Map-related state (center point for Leaflet)
  const [searchCoordinates, setSearchCoordinates] = useState(null)


  /* =========================
     HELPERS / NORMALISATION
     =========================
     Ensures consistent comparison across user input
     and API data (case-insensitive, trimmed spacing)
  ========================= */

  function normalizeTag(value) {
    return value.toLowerCase().trim().replace(/\s+/g, ' ')
  }

  const normalizedTagQuery = normalizeTag(tagQuery)
  const normalizedSelectedTag = normalizeTag(selectedTag)


  /* =========================
     FILTERING LOGIC
     =========================
     Centralised filtering so BOTH list and map views
     always receive the same dataset.
  ========================= */

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // No filters applied → return all
    if (!normalizedTagQuery && !normalizedSelectedTag) return true

    // Exact match for quick-select tag buttons
    const matchesTag = restaurant.tags.some(
      (tag) => normalizeTag(tag) === normalizedSelectedTag
    )

    // Flexible search across tags, name, and cuisines
    const matchesSearch =
      restaurant.tags.some((tag) =>
        normalizeTag(tag).includes(normalizedTagQuery)
      ) ||
      normalizeTag(restaurant.name).includes(normalizedTagQuery) ||
      normalizeTag(restaurant.cuisines || '').includes(normalizedTagQuery)

    // If a quick tag is selected → prioritise exact match
    if (normalizedSelectedTag) {
      return matchesTag
    }

    return matchesSearch
  })


  /* =========================
     SORTING LOGIC
     =========================
     Applied AFTER filtering so sorting only affects
     the currently relevant dataset.
  ========================= */

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'closest') {
      return (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity)
    }

    if (sortBy === 'highest-rated') {
      return (b.rating ?? 0) - (a.rating ?? 0)
    }

    return 0
  })


  /* =========================
     API HANDLER (SEARCH FLOW)
     =========================
     - Fetches restaurant data from API
     - Maps raw data into UI-friendly format
     - Resets UI state for a new search
  ========================= */

  async function handleSearch() {
    const cleanedPostcode = postcode.trim()

    if (!cleanedPostcode) return

    setHasSearched(true)
    setLoading(true)
    setError(null)

    try {
      const data = await fetchRestaurantsByPostcode(cleanedPostcode)

      // Transform API response → clean UI structure
      const mappedRestaurants = mapTopTenRestaurants(data.restaurants)

      setRestaurants(mappedRestaurants)
      setSearchCoordinates(data.searchCoordinates)

      // Reset UI state for new results
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


  /* =========================
     LANDING VIEW (INITIAL STATE)
     ========================= */

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


  /* =========================
     RESULTS VIEW
     =========================
     - Shared dataset flows into both list + map
     - UI controls update state → re-render derived data
  ========================= */

  return (
    <main className="results-page">

      {/* Branding */}
      <Banner variant="logo" />

      {/* Search + filtering controls */}
      <ResultsControls
        postcode={postcode}
        onPostcodeChange={setPostcode}
        onSearch={handleSearch}
        loading={loading}
        tagQuery={tagQuery}
        onTagQueryChange={(value) => {
          setTagQuery(value)
          setSelectedTag('') // Prevent conflicting filters
        }}
        selectedTag={selectedTag}
        onTagSelect={(tag) => {
          setSelectedTag(normalizeTag(tag))
          setTagQuery('')
        }}
        normalizeTag={normalizeTag}
      />

      <section className="results-content">
        <div className="results-layout">

          {/* SIDEBAR CONTROLS */}
          <aside className="filters-sidebar">

            {/* Sorting */}
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

            {/* View toggle */}
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

            {/* Error state */}
            {error && <p className="status-message">{error}</p>}

            {/* No results */}
            {!error && hasSearched && restaurants.length === 0 && (
              <p className="status-message">No restaurants found</p>
            )}

            {/* No filter matches */}
            {!error && restaurants.length > 0 && filteredRestaurants.length === 0 && (
              <p className="status-message">No matching restaurants</p>
            )}

            {/* Results */}
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