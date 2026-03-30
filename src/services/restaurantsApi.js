const BASE_URL = '/api/discovery/uk/restaurants/enriched/bypostcode'

export async function fetchRestaurantsByPostcode(postcode) {
  const cleanedPostcode = postcode.replace(/\s+/g, '').toUpperCase()

  const response = await fetch(`${BASE_URL}/${cleanedPostcode}`)

  if (!response.ok) {
    throw new Error('Failed to fetch restaurants')
  }

  const data = await response.json()

  return {
    restaurants: data.restaurants || [],
    searchCoordinates: data.metaData?.location?.coordinates || null,
  }
}
