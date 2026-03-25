const NON_DISPLAY_TAGS = [
  'Collect stamps',
  'Deals',
  'Cheeky Tuesday',
  'Freebies',
]

export function mapRestaurant(restaurant) {
  const tags =
    restaurant.cuisines
      ?.map((cuisine) => cuisine.name)
      .filter(Boolean) || []

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
  }
}

export function mapTopTenRestaurants(restaurants) {
  return restaurants.slice(0, 10).map(mapRestaurant)
}