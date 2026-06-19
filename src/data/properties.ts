export interface Property {
  id: string
  title: string
  address: string
  city: string
  state: string
  price: number
  beds: number
  baths: number
  sqft: number
  type: 'House' | 'Condo' | 'Townhouse' | 'Land'
  status: 'For Sale' | 'Open House' | 'Price Drop' | 'Pending'
  image: string
  description: string
  yearBuilt: number
  parking: number
  featured?: boolean
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Craftsman Bungalow with Garden',
    address: '2847 Maple Ridge Drive',
    city: 'Portland',
    state: 'OR',
    price: 785000,
    beds: 3,
    baths: 2,
    sqft: 1820,
    type: 'House',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    description: 'A beautifully maintained craftsman bungalow nestled in Portland\'s most sought-after neighborhood. Features original hardwood floors, an updated chef\'s kitchen, and a lush private garden perfect for entertaining.',
    yearBuilt: 1924,
    parking: 1,
    featured: true,
  },
  {
    id: '2',
    title: 'Modern Penthouse with Skyline Views',
    address: '1400 Pearl Street, Unit 1802',
    city: 'Denver',
    state: 'CO',
    price: 1240000,
    beds: 2,
    baths: 2,
    sqft: 1480,
    type: 'Condo',
    status: 'Open House',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    description: 'Stunning 18th-floor penthouse with floor-to-ceiling windows offering breathtaking city and mountain views. Luxury finishes throughout including Italian marble counters, motorized shades, and a private rooftop terrace.',
    yearBuilt: 2019,
    parking: 2,
    featured: true,
  },
  {
    id: '3',
    title: 'Victorian Row House — Noe Valley',
    address: '388 Sanchez Street',
    city: 'San Francisco',
    state: 'CA',
    price: 2190000,
    beds: 4,
    baths: 3,
    sqft: 2340,
    type: 'House',
    status: 'Price Drop',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'An impeccably restored 1890s Victorian in coveted Noe Valley. Original architectural details paired with a fully modernized interior. Chef\'s kitchen, spa bathrooms, and a sunny south-facing garden.',
    yearBuilt: 1892,
    parking: 1,
    featured: true,
  },
  {
    id: '4',
    title: 'Contemporary Glass Pavilion',
    address: '910 Ocean Breeze Lane',
    city: 'Santa Monica',
    state: 'CA',
    price: 3450000,
    beds: 5,
    baths: 4,
    sqft: 3800,
    type: 'House',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Ultra-modern architectural masterpiece just blocks from the beach. Walls of glass blur the line between indoor and outdoor living. Infinity pool, home theater, and smart home automation throughout.',
    yearBuilt: 2022,
    parking: 3,
  },
  {
    id: '5',
    title: 'Warm Loft in Historic District',
    address: '201 W Congress St, Unit 4B',
    city: 'Tucson',
    state: 'AZ',
    price: 389000,
    beds: 1,
    baths: 1,
    sqft: 920,
    type: 'Condo',
    status: 'For Sale',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    description: 'Chic industrial loft in a converted 1920s warehouse in Tucson\'s arts district. Exposed brick, 14-foot ceilings, and polished concrete floors. Steps from galleries, restaurants, and nightlife.',
    yearBuilt: 1928,
    parking: 1,
  },
  {
    id: '6',
    title: 'Suburban Family Home with Pool',
    address: '5519 Willow Creek Ct',
    city: 'Austin',
    state: 'TX',
    price: 670000,
    beds: 4,
    baths: 3,
    sqft: 2650,
    type: 'House',
    status: 'Open House',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    description: 'Spacious family home in one of Austin\'s top school districts. Open-concept living areas, a gourmet kitchen, and a backyard oasis with heated pool and covered patio. Recently renovated throughout.',
    yearBuilt: 2005,
    parking: 2,
  },
]

export const formatPrice = (price: number): string => {
  if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(2)}M`
  if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`
  return `$${price}`
}
