/* =========================
   API SERVICE
   =========================
   Handles fetching restaurant data from the Just Eat API.
   - Normalises postcode input
   - Makes the request via Vite proxy
   - Returns only the data needed by the app
========================= */

const BASE_URL = '/api/discovery/uk/restaurants/enriched/bypostcode'

export async function fetchRestaurantsByPostcode(postcode) {
  // Clean postcode for API format
  const cleanedPostcode = postcode.replace(/\s+/g, '').toUpperCase()

  const response = await fetch(`${BASE_URL}/${cleanedPostcode}`)

  // Surface errors to UI layer
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants')
  }

  const data = await response.json()

  // Return only relevant data for the app
  return {
    restaurants: data.restaurants || [],
    searchCoordinates: data.metaData?.location?.coordinates || null,
  }
}
