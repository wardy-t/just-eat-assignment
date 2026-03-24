export function mapRestaurant(restaurant) {
  const cuisines =
    restaurant.cuisines?.map((cuisine) => cuisine.name).join(', ') ||
    'Not available'

  const addressParts = [
    restaurant.address?.firstLine?.replace(/\n/g, ', '),
    restaurant.address?.city,
    restaurant.address?.postalCode,
  ].filter(Boolean)

  return {
    id: restaurant.id,
    name: restaurant.name || 'Not available',
    cuisines,
    rating: restaurant.rating?.starRating ?? 'Not available',
    address: addressParts.join(', ') || 'Not available',
  }
}

export function mapTopTenRestaurants(restaurants) {
  return restaurants.slice(0, 10).map(mapRestaurant)
}