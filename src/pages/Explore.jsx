import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Globe, ArrowRight, Clock, DollarSign } from 'lucide-react'
import './Explore.css'

const COUNTRIES = [
  { code: 'US', name: 'United States', region: 'North America', ease: 'Very Easy', time: '1-2 weeks', cost: '$500-$2,000', hot: true },
  { code: 'UK', name: 'United Kingdom', region: 'Europe', ease: 'Very Easy', time: '1-3 days', cost: 'GBP 15-500', hot: true },
  { code: 'CA', name: 'Canada', region: 'North America', ease: 'Easy', time: '1-2 weeks', cost: 'CAD 300-1,000', hot: true },
  { code: 'AE', name: 'UAE', region: 'Middle East', ease: 'Easy', time: '2-4 weeks', cost: 'AED 10K-50K', hot: true },
  { code: 'AU', name: 'Australia', region: 'Oceania', ease: 'Easy', time: '1-3 days', cost: 'AUD 500-2K', hot: false },
  { code: 'DE', name: 'Germany', region: 'Europe', ease: 'Moderate', time: '2-4 weeks', cost: 'EUR 500-2,000', hot: false },
  { code: 'SG', name: 'Singapore', region: 'Asia', ease: 'Very Easy', time: '1-3 days', cost: 'SGD 315', hot: false },
  { code: 'NL', name: 'Netherlands', region: 'Europe', ease: 'Easy', time: '1-2 weeks', cost: 'EUR 50-800', hot: false },
  { code: 'SE', name: 'Sweden', region: 'Europe', ease: 'Easy', time: '1-2 weeks', cost: 'SEK 500-5K', hot: false },
  { code: 'FR', name: 'France', region: 'Europe', ease: 'Moderate', time: '2-3 weeks', cost: 'EUR 0-1,500', hot: false },
  { code: 'JP', name: 'Japan', region: 'Asia', ease: 'Moderate', time: '4-8 weeks', cost: 'JPY 100K-500K', hot: false },
  { code: 'KR', name: 'South Korea', region: 'Asia', ease: 'Moderate', time: '2-4 weeks', cost: 'KRW 1M-5M', hot: false },
  { code: 'BR', name: 'Brazil', region: 'South America', ease: 'Complex', time: '4-12 weeks', cost: 'BRL 2K-10K', hot: false },
  { code: 'MY', name: 'Malaysia', region: 'Asia', ease: 'Easy', time: '1-2 weeks', cost: 'MYR 1K-5K', hot: false },
  { code: 'TR', name: 'Turkey', region: 'Europe/Asia', ease: 'Easy', time: '1-2 weeks', cost: 'TRY 2K-10K', hot: false },
  { code: 'ZA', name: 'South Africa', region: 'Africa', ease: 'Easy', time: '1-4 weeks', cost: 'ZAR 175-2K', hot: false },
  { code: 'NZ', name: 'New Zealand', region: 'Oceania', ease: 'Very Easy', time: '1 day', cost: 'NZD 10-450', hot: false },
  { code: 'CH', name: 'Switzerland', region: 'Europe', ease: 'Easy', time: '2-4 weeks', cost: 'CHF 500-3K', hot: false },
  { code: 'ES', name: 'Spain', region: 'Europe', ease: 'Moderate', time: '2-4 weeks', cost: 'EUR 300-3K', hot: false },
  { code: 'NO', name: 'Norway', region: 'Europe', ease: 'Easy', time: '1-2 weeks', cost: 'NOK 1K-5K', hot: false },
  { code: 'SA', name: 'Saudi Arabia', region: 'Middle East', ease: 'Moderate', time: '2-6 weeks', cost: 'SAR 5K-50K', hot: false },
  { code: 'QA', name: 'Qatar', region: 'Middle East', ease: 'Moderate', time: '2-4 weeks', cost: 'QAR 10K-50K', hot: false },
  { code: 'IN', name: 'India', region: 'Asia', ease: 'Moderate', time: '2-4 weeks', cost: 'INR 5K-50K', hot: false },
  { code: 'PK', name: 'Pakistan', region: 'Asia', ease: 'Moderate', time: '2-6 weeks', cost: 'PKR 50K-200K', hot: false },
]

const REGIONS = ['All Regions', 'North America', 'Europe', 'Middle East', 'Asia', 'Oceania', 'South America', 'Africa']
const EASE_LEVELS = ['All Levels', 'Very Easy', 'Easy', 'Moderate', 'Complex']

const EASE_COLOR = {
  'Very Easy': 'green',
  'Easy': 'blue',
  'Moderate': 'gold',
  'Complex': 'purple',
}

function CountryCard({ code, name, region, ease, time, cost, hot }) {
  return (
    <article className={`country-card${hot ? ' country-card--hot' : ''}`}>
      {hot && <span className="country-card__hot-badge badge badge-gold">Popular</span>}
      <div className="country-card__flag">{code}</div>
      <h3 className="country-card__name">{name}</h3>
      <p className="country-card__region">{region}</p>
      <div className="country-card__meta">
        <span className={`badge badge-${EASE_COLOR[ease]}`}>{ease}</span>
      </div>
      <ul className="country-card__stats" aria-label="Quick stats">
        <li className="country-card__stat">
          <Clock size={13} aria-hidden="true" />
          <span>{time}</span>
        </li>
        <li className="country-card__stat">
          <DollarSign size={13} aria-hidden="true" />
          <span>{cost}</span>
        </li>
      </ul>
      <Link to={`/roadmap?country=${encodeURIComponent(name)}`} className="btn btn-primary btn-sm country-card__cta">
        Get Roadmap
        <ArrowRight size={14} />
      </Link>
    </article>
  )
}

export default function Explore() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All Regions')
  const [ease, setEase] = useState('All Levels')

  const sanitize = (s) => s.replace(/[<>"'&]/g, '')

  const filtered = useMemo(() => {
    const q = sanitize(query).toLowerCase().trim()
    return COUNTRIES.filter(c => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)
      const matchR = region === 'All Regions' || c.region.includes(region)
      const matchE = ease === 'All Levels' || c.ease === ease
      return matchQ && matchR && matchE
    })
  }, [query, region, ease])

  return (
    <main className="explore-page page-content">
      <div className="explore-header">
        <div className="container">
          <p className="section-label">Explore</p>
          <h1 className="explore-header__title">
            Find Your Perfect <span className="gradient-text">Business Destination</span>
          </h1>
          <p className="explore-header__subtitle">
            Browse {COUNTRIES.length}+ countries. Click any country to get a personalized business roadmap.
          </p>

          <div className="explore-filters" role="search" aria-label="Country search and filters">
            <div className="explore-filters__search">
              <Search size={18} className="explore-filters__search-icon" aria-hidden="true" />
              <input type="search" className="explore-filters__input" placeholder="Search countries..." value={query} onChange={e => setQuery(e.target.value)} maxLength={80} aria-label="Search countries" />
            </div>
            <div className="explore-filters__selects">
              <label className="sr-only" htmlFor="region-filter">Filter by region</label>
              <select id="region-filter" className="input explore-filters__select" value={region} onChange={e => setRegion(e.target.value)}>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <label className="sr-only" htmlFor="ease-filter">Filter by ease of registration</label>
              <select id="ease-filter" className="input explore-filters__select" value={ease} onChange={e => setEase(e.target.value)}>
                {EASE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container explore-content">
        <p className="explore-results-count" aria-live="polite">
          <Globe size={15} aria-hidden="true" />
          Showing <strong>{filtered.length}</strong> countries
        </p>

        {filtered.length > 0 ? (
          <div className="explore-grid" role="list">
            {filtered.map(c => (
              <div key={c.name} role="listitem">
                <CountryCard {...c} />
              </div>
            ))}
          </div>
        ) : (
          <div className="explore-empty">
            <Globe size={48} strokeWidth={1} />
            <p>No countries match your search. Try different filters.</p>
            <button className="btn btn-secondary btn-sm" onClick={() => { setQuery(''); setRegion('All Regions'); setEase('All Levels') }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
