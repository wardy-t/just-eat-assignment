function PostcodeForm({ postcode, onPostcodeChange, onSearch, loading }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <form className="postcode-form" onSubmit={handleSubmit}>
      <label className="postcode-label" htmlFor="postcode">
        Enter postcode
      </label>

      <div className="postcode-controls">
        <input
          id="postcode"
          className="postcode-input"
          type="text"
          value={postcode}
          onChange={(event) => onPostcodeChange(event.target.value)}
        />

        <button
          className="postcode-button"
          type="submit"
          disabled={!postcode.trim() || loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default PostcodeForm