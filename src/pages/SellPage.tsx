import { useState } from 'react'
import { CheckCircle, Home, DollarSign, TrendingUp } from 'lucide-react'

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    address: '', city: '', state: '', zip: '', type: 'House',
    beds: '', baths: '', sqft: '', yearBuilt: '', price: '', name: '', email: '', phone: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-brand" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">You're all set!</h2>
          <p className="text-gray-500 mb-8">
            A Piedmont agent will reach out to <strong>{form.email}</strong> within 24 hours to discuss your listing at <strong>{form.address}</strong>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setForm({ address: '', city: '', state: '', zip: '', type: 'House', beds: '', baths: '', sqft: '', yearBuilt: '', price: '', name: '', email: '', phone: '' }) }}
            className="bg-brand text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors"
          >
            List Another Property
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Sell Your Home</h1>
        <p className="text-gray-500 text-lg">Get top dollar for your home with Piedmont's expert agents</p>
      </div>

      {/* Why sell with us */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {[
          { icon: <Home size={24} className="text-brand" />, title: 'Free Home Valuation', desc: 'Get an accurate market value estimate from our AI pricing engine at no cost.' },
          { icon: <TrendingUp size={24} className="text-brand" />, title: 'Sell 2× Faster', desc: 'Our network of pre-qualified buyers means your home sells in days, not months.' },
          { icon: <DollarSign size={24} className="text-brand" />, title: 'Keep More Equity', desc: 'Our 1.5% listing fee is a fraction of the traditional 3% — you save thousands.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-gray-50 rounded-2xl p-6">
            <div className="w-10 h-10 bg-brand-light rounded-lg flex items-center justify-center mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Step form */}
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${s <= step ? 'bg-brand text-white' : 'bg-gray-200 text-gray-400'}`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-1 mx-2 rounded transition-colors ${s < step ? 'bg-brand' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Step {step} of 3 — {['Property Info', 'Details & Price', 'Your Contact'][step - 1]}
        </p>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Where is your property?</h2>
              <input required placeholder="Street Address" value={form.address} onChange={e => set('address', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
              <div className="grid grid-cols-3 gap-3">
                <input required placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                <input required placeholder="State" value={form.state} onChange={e => set('state', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                <input required placeholder="ZIP" value={form.zip} onChange={e => set('zip', e.target.value)} className="border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Property Type</label>
                <select value={form.type} onChange={e => set('type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30">
                  {['House', 'Condo', 'Townhouse', 'Land'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <button type="button" onClick={() => setStep(2)} className="w-full bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-colors mt-2">
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Property details</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Bedrooms</label>
                  <input required type="number" min="0" placeholder="3" value={form.beds} onChange={e => set('beds', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Bathrooms</label>
                  <input required type="number" min="0" step="0.5" placeholder="2" value={form.baths} onChange={e => set('baths', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Sq. Footage</label>
                  <input required type="number" min="0" placeholder="1800" value={form.sqft} onChange={e => set('sqft', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Year Built</label>
                  <input required type="number" min="1800" max="2025" placeholder="2005" value={form.yearBuilt} onChange={e => set('yearBuilt', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Asking Price ($)</label>
                <input required type="number" min="0" placeholder="750000" value={form.price} onChange={e => set('price', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">← Back</button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-colors">Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">How can we reach you?</h2>
              <input required placeholder="Full Name" value={form.name} onChange={e => set('name', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
              <input required type="email" placeholder="Email Address" value={form.email} onChange={e => set('email', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
              <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => set('phone', e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">← Back</button>
                <button type="submit" className="flex-1 bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-colors">Submit Listing</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
