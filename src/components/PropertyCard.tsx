import { useState } from 'react'
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react'
import { type Property, formatPrice } from '../data/properties'
import { useNavigate } from 'react-router-dom'

const statusColors: Record<string, string> = {
  'For Sale': 'bg-brand text-white',
  'Open House': 'bg-amber-500 text-white',
  'Price Drop': 'bg-slate-700 text-white',
  'Pending': 'bg-red-500 text-white',
}

interface Props {
  property: Property
}

export default function PropertyCard({ property }: Props) {
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Status badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[property.status]}`}>
          {property.status}
        </span>
        {/* Heart */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
        >
          <Heart size={15} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-lg font-bold drop-shadow-lg">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin size={11} />
          <span>{property.address}, {property.city}, {property.state}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1"><Bed size={13} /> {property.beds} bd</span>
          <span className="flex items-center gap-1"><Bath size={13} /> {property.baths} ba</span>
          <span className="flex items-center gap-1"><Square size={13} /> {property.sqft.toLocaleString()} ft²</span>
          <span className="font-medium text-gray-500">{property.type}</span>
        </div>
      </div>
    </div>
  )
}
