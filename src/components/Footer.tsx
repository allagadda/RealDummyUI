import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-white text-lg mb-3">
              <div className="w-7 h-7 bg-brand rounded-md flex items-center justify-center">
                <Home size={14} className="text-white" />
              </div>
              Piedmont
            </Link>
            <p className="text-sm leading-relaxed">
              The modern way to buy, sell, and discover homes across America.
            </p>
          </div>
          {[
            { title: 'Company', links: ['About', 'Careers', 'Press', 'Blog'] },
            { title: 'Buyers', links: ['Browse Homes', 'Mortgage Calculator', "Buyer's Guide", 'Open Houses'] },
            { title: 'Sellers', links: ['List Your Home', 'Home Valuation', "Seller's Guide", 'Agent Finder'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-white text-sm font-semibold mb-3">{title}</p>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© 2026 Piedmont Realty, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
