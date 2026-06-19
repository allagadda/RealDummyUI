import { useState } from 'react'
import { Search, SlidersHorizontal, ArrowRight, Shield, TrendingUp, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { properties } from '../data/properties'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/buy?q=${encodeURIComponent(query)}`)
  }

  const featured = properties.filter(p => p.featured)

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[520px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80"
          alt="Beautiful modern home"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-4 w-full max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Find your perfect home.
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Browse thousands of listings and make an offer entirely online.
          </p>
          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-xl shadow-xl overflow-hidden mx-auto max-w-2xl"
          >
            <div className="flex items-center gap-2 flex-1 px-4">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by city, address, or state..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 py-4 text-gray-800 text-sm outline-none placeholder:text-gray-400"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-4 text-gray-600 border-l border-gray-200 hover:bg-gray-50 text-sm font-medium"
              onClick={() => navigate('/buy')}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <button
              type="submit"
              className="bg-brand text-white font-semibold px-6 py-4 hover:bg-brand-dark transition-colors text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-brand mb-1">Featured Listings</p>
            <h2 className="text-3xl font-bold text-gray-900">{properties.length} properties found</h2>
          </div>
          <button
            onClick={() => navigate('/buy')}
            className="flex items-center gap-2 text-brand font-semibold text-sm hover:gap-3 transition-all"
          >
            View all <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Why Piedmont */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-brand mb-2">Why Piedmont</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">The smarter way to buy & sell</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield size={28} className="text-brand" />,
                title: 'Verified Listings',
                desc: 'Every listing is verified by our team of experts before it goes live on the platform.',
              },
              {
                icon: <TrendingUp size={28} className="text-brand" />,
                title: 'Market Insights',
                desc: 'Access real-time market data and AI-powered price predictions to make informed decisions.',
              },
              {
                icon: <Clock size={28} className="text-brand" />,
                title: 'Close in Days',
                desc: 'Our streamlined process lets you go from offer to keys in as few as 7 business days.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm text-left">
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand py-20">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to find your dream home?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Join over 50,000 buyers and sellers who trust Piedmont every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/buy')}
              className="bg-white text-brand font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Browse Homes
            </button>
            <button
              onClick={() => navigate('/sell')}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              List Your Home
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
