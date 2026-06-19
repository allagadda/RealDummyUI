import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Bed, Bath, Square, Calendar, Heart, Share2, MapPin, Phone, Mail } from 'lucide-react'
import { properties, formatPrice } from '../data/properties'

const statusColors: Record<string, string> = {
  'For Sale': 'bg-brand text-white',
  'Open House': 'bg-amber-500 text-white',
  'Price Drop': 'bg-slate-700 text-white',
  'Pending': 'bg-red-500 text-white',
}

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const property = properties.find(p => p.id === id)

  if (!property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property not found</h2>
          <button onClick={() => navigate('/buy')} className="text-brand font-medium">← Back to listings</button>
        </div>
      </div>
    )
  }

  const similar = properties.filter(p => p.id !== id && p.type === property.type).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left col */}
        <div className="lg:col-span-2">
          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96 mb-4">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
            <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[property.status]}`}>
              {property.status}
            </span>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
              </button>
              <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <Share2 size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Title & price */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <MapPin size={13} />
                <span>{property.address}, {property.city}, {property.state}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-brand whitespace-nowrap">
              {formatPrice(property.price)}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <Bed size={20} />, label: 'Bedrooms', value: property.beds },
              { icon: <Bath size={20} />, label: 'Bathrooms', value: property.baths },
              { icon: <Square size={20} />, label: 'Square Feet', value: `${property.sqft.toLocaleString()} ft²` },
              { icon: <Calendar size={20} />, label: 'Year Built', value: property.yearBuilt },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4 flex flex-col items-center text-center">
                <div className="text-brand mb-1">{icon}</div>
                <div className="text-lg font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About this property</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h2>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              {[
                ['Type', property.type],
                ['Status', property.status],
                ['Parking', `${property.parking} space${property.parking > 1 ? 's' : ''}`],
                ['Year Built', property.yearBuilt],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex gap-2">
                  <span className="text-gray-400 w-24 flex-shrink-0">{k}</span>
                  <span className="text-gray-800 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Similar */}
          {similar.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similar.map(p => (
                  <div
                    key={p.id}
                    className="rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/property/${p.id}`)}
                  >
                    <img src={p.image} alt={p.title} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-1">{p.title}</p>
                      <p className="text-brand text-sm font-bold mt-1">{formatPrice(p.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right col — Contact card */}
        <div>
          <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-brand mb-1">{formatPrice(property.price)}</div>
            <p className="text-xs text-gray-400 mb-6">Est. payment: ${Math.round(property.price * 0.005).toLocaleString()}/mo</p>

            <button
              className="w-full bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-colors mb-3"
              onClick={() => setShowContact(true)}
            >
              Request a Tour
            </button>
            <button className="w-full border border-brand text-brand font-semibold py-3 rounded-xl hover:bg-brand-light transition-colors mb-6">
              Make an Offer
            </button>

            {showContact && (
              <div className="border-t border-gray-100 pt-5 space-y-3">
                <p className="text-sm font-semibold text-gray-700">Contact Agent</p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center font-bold text-brand">JM</div>
                  <div>
                    <p className="font-medium text-gray-800">Jessica Martinez</p>
                    <p className="text-xs text-gray-400">Licensed Agent · Piedmont</p>
                  </div>
                </div>
                <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand">
                  <Phone size={14} /> (555) 123-4567
                </a>
                <a href="mailto:jessica@piedmont.com" className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand">
                  <Mail size={14} /> jessica@piedmont.com
                </a>
              </div>
            )}

            <p className="text-xs text-center text-gray-400 mt-4">
              Listed by Piedmont Realty · MLS #{property.id.padStart(8, '0')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
