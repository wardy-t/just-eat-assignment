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

function isRestaurant(tags) {
  return !tags.some((tag) => NON_RESTAURANT_TAGS.includes(tag))
}

export function mapRestaurant(restaurant) {
  const tags =
    restaurant.cuisines?.map((cuisine) => cuisine.name).filter(Boolean) || []

  const displayCuisines = tags.filter(
    (tag) => !NON_DISPLAY_TAGS.includes(tag)
  )

  const addressParts = [
    restaurant.address?.firstLine?.replace(/\n/g, ', '),
    restaurant.address?.city,
    restaurant.address?.postalCode,
  ].filter(Boolean)

  return {
    id: restaurant.id,
    name: restaurant.name || 'Not available',
    cuisines: displayCuisines.join(', ') || 'Not available',
    tags,
    rating: restaurant.rating?.starRating ?? 'Not available',
    address: addressParts.join(', ') || 'Not available',
    distanceMeters: restaurant.driveDistanceMeters ?? null,
  }
}

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