function PostcodeForm({ postcode, onPostcodeChange, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="postcode">Enter postcode</label>
      <input
        id="postcode"
        type="text"
        value={postcode}
        onChange={(event) => onPostcodeChange(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default PostcodeForm