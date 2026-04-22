/* =========================
   CONFIGURATION
   =========================
   Defines which tags should:
   - be hidden from display (UI only)
   - be excluded entirely (non-restaurant partners)
========================= */

const NON_DISPLAY_TAGS = [
  'Collect stamps',
  'Deals',
  'Cheeky Tuesday',
  'Freebies',
]

const NON_RESTAURANT_TAGS = [
  'Groceries',
  'Convenience',
  'Pharmacy',
  'Shops',
  'Health and Beauty',
  'Electronics',
  'Flowers',
  'Beauty',
  'Gifts',
]


/* =========================
   HELPER: FILTER NON-RESTAURANTS
   =========================
   Ensures we only include actual restaurants
   by excluding partners like groceries or retail.
========================= */

function isRestaurant(tags) {
  return !tags.some((tag) => NON_RESTAURANT_TAGS.includes(tag))
}


/* =========================
   CORE MAPPER: SINGLE RESTAURANT
   =========================
   Transforms raw API data into a clean, UI-friendly
   structure so components don't deal with nested or
   inconsistent API fields.
========================= */

export function mapRestaurant(restaurant) {

  // Extract all cuisine/tag names from API response
  const tags =
    restaurant.cuisines?.map((cuisine) => cuisine.name).filter(Boolean) || []

  /* =========================
     DISPLAY CUISINES
     =========================
     Removes non-UI tags (e.g. Deals, Collect stamps)
     so only meaningful cuisines appear in the UI.
     NOTE: full tag list is still preserved for filtering.
  ========================= */

  const displayCuisines = tags.filter(
    (tag) => !NON_DISPLAY_TAGS.includes(tag)
  )

  /* =========================
     ADDRESS NORMALISATION
     =========================
     Combines address fields into a readable string
     and removes empty/null values safely.
  ========================= */

  const addressParts = [
    restaurant.address?.firstLine?.replace(/\n/g, ', '),
    restaurant.address?.city,
    restaurant.address?.postalCode,
  ].filter(Boolean)

  /* =========================
     RETURN CLEAN OBJECT
     =========================
     - Provides fallback values for missing data
     - Keeps structure consistent for UI components
     - Adds useful derived fields (distance, coordinates)
  ========================= */

  return {
    id: restaurant.id,
    name: restaurant.name || 'Not available',
    cuisines: displayCuisines.join(', ') || 'Not available',
    tags, // full tag list retained for filtering logic
    rating: restaurant.rating?.starRating ?? 'Not available',
    address: addressParts.join(', ') || 'Not available',
    distanceMeters: restaurant.driveDistanceMeters ?? null,
    coordinates: restaurant.address?.location?.coordinates ?? null,
  }
}


/* =========================
   PIPELINE: TOP 10 RESTAURANTS
   =========================
   Applies a clear transformation pipeline:
   1. Filter out non-restaurant partners
   2. Limit results to first 10 (brief requirement)
   3. Map raw API data into UI-friendly structure
========================= */

export function mapTopTenRestaurants(restaurants) {
  return restaurants
    .filter((restaurant) => {
      const tags =
        restaurant.cuisines?.map((cuisine) => cuisine.name).filter(Boolean) || []

      return isRestaurant(tags)
    })
    .slice(0, 10)
    .map(mapRestaurant)
}