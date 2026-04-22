import PostcodeForm from './PostcodeForm'

/* =========================
   CONFIG: QUICK TAGS
   =========================
   Predefined filters for common cuisines and deals.
   Extracted for readability and easy maintenance.
========================= */

const QUICK_TAGS = [
  'Deals',
  'Cheeky Tuesday',
  'Collect stamps',
  'Freebies',
  'Pizza',
  'Chinese',
  'Burgers',
  'Sushi',
  'Breakfast',
  'Coffee',
  'Halal',
]


/* =========================
   RESULTS CONTROLS
   =========================
   Handles user input for:
   - postcode search
   - free text search
   - quick tag filtering

   Stateless component — all logic is managed in App.jsx
========================= */

function ResultsControls({
  postcode,
  onPostcodeChange,
  onSearch,
  loading,
  tagQuery,
  onTagQueryChange,
  selectedTag,
  onTagSelect,
  normalizeTag,
}) {
  return (
    <header className="results-header">
      <div className="results-header-inner">

        {/* Title / context */}
        <div className="results-topbar">
          <h1 className="results-title">LOOKING FOR RESTAURANTS?</h1>
          <p className="results-subtitle">
            Find local restaurant options by postcode.
          </p>
        </div>

        <div className="results-search-panel">

          {/* Postcode search */}
          <PostcodeForm
            postcode={postcode}
            onPostcodeChange={onPostcodeChange}
            onSearch={onSearch}
            loading={loading}
            compact={true}
          />

          {/* Free text search */}
          <div className="tag-search">
            <input
              className="tag-search-input"
              type="text"
              placeholder="Search by name, deal or cuisine"
              value={tagQuery}
              onChange={(event) => onTagQueryChange(event.target.value)}
            />
          </div>

          {/* Quick filter buttons */}
          <p className="filter-label">Popular deals and cuisines</p>

          <div className="tag-buttons">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={
                  normalizeTag(selectedTag) === normalizeTag(tag)
                    ? 'active'
                    : ''
                }
                onClick={() => onTagSelect(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </div>
    </header>
  )
}

export default ResultsControls