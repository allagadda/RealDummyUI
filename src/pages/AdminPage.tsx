import { useState } from 'react'
import { properties, formatPrice } from '../data/properties'
import { BarChart2, Home, TrendingUp, Users, Eye, Bed, Bath } from 'lucide-react'

const statusColors: Record<string, string> = {
  'For Sale': 'bg-brand-light text-brand',
  'Open House': 'bg-amber-50 text-amber-700',
  'Price Drop': 'bg-slate-100 text-slate-700',
  'Pending': 'bg-red-50 text-red-600',
}

export default function AdminPage() {
  const [search, setSearch] = useState('')

  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  )

  const totalValue = properties.reduce((s, p) => s + p.price, 0)
  const avgPrice = Math.round(totalValue / properties.length)
  const forSale = properties.filter(p => p.status === 'For Sale').length

  const stats = [
    { icon: <Home size={20} className="text-brand" />, label: 'Total Listings', value: properties.length },
    { icon: <TrendingUp size={20} className="text-brand" />, label: 'Avg. Price', value: formatPrice(avgPrice) },
    { icon: <BarChart2 size={20} className="text-brand" />, label: 'Portfolio Value', value: formatPrice(totalValue) },
    { icon: <Users size={20} className="text-brand" />, label: 'Active For Sale', value: forSale },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all listings and performance</p>
        </div>
        <span className="bg-brand-light text-brand text-xs font-semibold px-3 py-1 rounded-full">Admin</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ icon, label, value }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="w-9 h-9 bg-brand-light rounded-lg flex items-center justify-center mb-3">{icon}</div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">Listings by Status</h2>
        <div className="flex flex-wrap gap-3">
          {['For Sale', 'Open House', 'Price Drop', 'Pending'].map(s => {
            const count = properties.filter(p => p.status === s).length
            const pct = Math.round((count / properties.length) * 100)
            return (
              <div key={s} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusColors[s]}`}>
                {s} <span className="font-bold">{count}</span>
                <span className="opacity-60 text-xs">({pct}%)</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">All Properties</h2>
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 w-48"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-5 py-3 text-left">Property</th>
                <th className="px-5 py-3 text-left">Location</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left">Details</th>
                <th className="px-5 py-3 text-left">Price</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-gray-800 line-clamp-1 max-w-[180px]">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{p.city}, {p.state}</td>
                  <td className="px-5 py-4 text-gray-600">{p.type}</td>
                  <td className="px-5 py-4 text-gray-500">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Bed size={13} /> {p.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={13} /> {p.baths}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-900">{formatPrice(p.price)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="flex items-center gap-1 text-brand hover:text-brand-dark text-xs font-medium">
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">No listings match your search.</div>
          )}
        </div>
      </div>
    </div>
  )
}
