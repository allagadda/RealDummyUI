import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'

const TYPES = ['All', 'House', 'Condo', 'Townhouse', 'Land']
const STATUSES = ['All', 'For Sale', 'Open House', 'Price Drop']

export default function BuyPage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [type, setType] = useState('All')
  const [status, setStatus] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [beds, setBeds] = useState('Any')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return properties.filter(p => {
      const q = query.toLowerCase()
      if (q && !p.title.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q) && !p.state.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false
      if (type !== 'All' && p.type !== type) return false
      if (status !== 'All' && p.status !== status) return false
      if (minPrice && p.price < Number(minPrice)) return false
      if (maxPrice && p.price > Number(maxPrice)) return false
      if (beds !== 'Any' && p.beds < Number(beds)) return false
      return true
    })
  }, [query, type, status, minPrice, maxPrice, beds])

  const clearFilters = () => {
    setQuery('')
    setType('All')
    setStatus('All')
    setMinPrice('')
    setMaxPrice('')
    setBeds('Any')
  }

  const hasFilters = query || type !== 'All' || status !== 'All' || minPrice || maxPrice || beds !== 'Any'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy a Home</h1>
      <p className="text-gray-500 mb-8">Explore available properties across the country</p>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by city, address, or state..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${showFilters ? 'bg-brand text-white border-brand' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
        >
          <SlidersHorizontal size={15} />
          Filters
          {hasFilters && <span className="w-2 h-2 bg-red-400 rounded-full" />}
        </button>
        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 px-2">
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Property Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30">
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30">
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Min Price ($)</label>
            <input type="number" placeholder="e.g. 500000" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Max Price ($)</label>
            <input type="number" placeholder="e.g. 2000000" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Min Beds</label>
            <select value={beds} onChange={e => setBeds(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30">
              {['Any', '1', '2', '3', '4', '5'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500 mb-6">
        <strong className="text-gray-900">{filtered.length}</strong> {filtered.length === 1 ? 'property' : 'properties'} found
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <Search size={40} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">No properties found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
