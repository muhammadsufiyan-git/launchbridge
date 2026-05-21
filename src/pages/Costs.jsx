import { useState } from 'react'
import { DollarSign, TrendingUp, AlertCircle, ArrowRight, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Costs.css'

const COST_DATA = {
  'United States': {
    currency: 'USD',
    symbol: '$',
    items: [
      { category: 'LLC Registration',       min: 50,   max: 500,  note: 'Varies by state. Delaware ~$90, California ~$70.' },
      { category: 'Registered Agent',        min: 50,   max: 300,  note: 'Annual fee. Required in most states.' },
      { category: 'Business Licence',        min: 0,    max: 500,  note: 'Varies by city, county, and industry.' },
      { category: 'EIN (Tax ID)',             min: 0,    max: 0,    note: 'Free from IRS. Apply online instantly.' },
      { category: 'Bank Account Opening',     min: 0,    max: 100,  note: 'Most banks free; some require deposit.' },
      { category: 'Accountant / CPA',         min: 500,  max: 2500, note: 'Annual cost; varies by business size.' },
      { category: 'Office / Co-working',      min: 200,  max: 3000, note: 'Monthly. Major cities higher.' },
    ],
  },
  'United Kingdom': {
    currency: 'GBP',
    symbol: '£',
    items: [
      { category: 'Ltd Company Registration', min: 12,   max: 50,   note: 'Online via Companies House. Same-day available.' },
      { category: 'Business Bank Account',    min: 0,    max: 10,   note: 'Monthly fee. Several free options available.' },
      { category: 'VAT Registration',         min: 0,    max: 0,    note: 'Free. Required if turnover >£90,000.' },
      { category: 'Accountant',               min: 600,  max: 3000, note: 'Annual cost; varies by complexity.' },
      { category: 'Business Insurance',        min: 200,  max: 1500, note: 'Public liability + employer liability.' },
      { category: 'Office Space',              min: 300,  max: 5000, note: 'Monthly. London significantly higher.' },
    ],
  },
  'UAE': {
    currency: 'AED',
    symbol: 'AED',
    items: [
      { category: 'Trade Licence',            min: 10000, max: 50000, note: 'Mainland or Free Zone. Varies by activity.' },
      { category: 'Visa + Residency',         min: 4000,  max: 15000, note: 'Investor or Partner Visa.' },
      { category: 'Local Sponsor (Mainland)', min: 5000,  max: 20000, note: 'Annual fee if opting for LLC mainland setup.' },
      { category: 'Office / Flexi-desk',      min: 2000,  max: 10000, note: 'Flexi-desk in free zone cheapest option.' },
      { category: 'Bank Account Opening',     min: 0,    max: 1000,  note: 'Minimum balance may apply.' },
    ],
  },
  'Canada': {
    currency: 'CAD',
    symbol: 'CA$',
    items: [
      { category: 'Federal Incorporation',    min: 200,  max: 500,  note: 'Online via Corporations Canada.' },
      { category: 'Provincial Registration',  min: 80,   max: 350,  note: 'Varies by province.' },
      { category: 'Business Licence',         min: 100,  max: 500,  note: 'Municipal licence required.' },
      { category: 'HST/GST Registration',     min: 0,    max: 0,    note: 'Free. Required if revenue >CA$30,000.' },
      { category: 'Accountant',               min: 800,  max: 3500, note: 'Annual; varies by province and complexity.' },
      { category: 'Office Space',             min: 500,  max: 4000, note: 'Monthly. Toronto/Vancouver highest.' },
    ],
  },
  'Australia': {
    currency: 'AUD',
    symbol: 'A$',
    items: [
      { category: 'ABN Registration',         min: 0,    max: 0,    note: 'Free via the Australian Business Register.' },
      { category: 'Company Registration',     min: 497,  max: 497,  note: 'Fixed fee via ASIC.' },
      { category: 'Business Name',            min: 37,   max: 88,   note: 'ASIC fee for 1 or 3 years.' },
      { category: 'GST Registration',         min: 0,    max: 0,    note: 'Free. Required if revenue >A$75,000.' },
      { category: 'Accountant',               min: 1000, max: 4000, note: 'Annual; depends on business structure.' },
      { category: 'Office Space',             min: 500,  max: 5000, note: 'Monthly. Sydney/Melbourne premium.' },
    ],
  },
}

const DEFAULT_COUNTRY = 'United Kingdom'
const COUNTRIES = Object.keys(COST_DATA)

export default function Costs() {
  const [country,  setCountry]  = useState(DEFAULT_COUNTRY)
  const [business, setBusiness] = useState('Restaurant / Food Business')

  const data = COST_DATA[country]
  if (!data) return null

  const total = data.items.reduce((acc, i) => ({ min: acc.min + i.min, max: acc.max + i.max }), { min: 0, max: 0 })

  return (
    <main className="costs-page page-content">
      <div className="costs-hero">
        <div className="container">
          <p className="section-label">Cost Estimator</p>
          <h1 className="costs-hero__title">
            Know Your Budget <span className="gradient-text">Before You Start</span>
          </h1>
          <p className="costs-hero__subtitle">
            Approximate costs for registering and running your business in any country — broken down by category.
          </p>
        </div>
      </div>

      <div className="container costs-body">
        {/* Selectors */}
        <div className="costs-selectors">
          <div className="costs-selector-group">
            <label htmlFor="cost-country" className="costs-label">Target Country</label>
            <select
              id="cost-country"
              className="input"
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="costs-selector-group">
            <label htmlFor="cost-business" className="costs-label">Business Type</label>
            <select
              id="cost-business"
              className="input"
              value={business}
              onChange={e => setBusiness(e.target.value)}
            >
              {['Restaurant / Food Business', 'IT Company / Tech Startup', 'Supermarket / Grocery Store', 'Salon / Beauty Business', 'Consulting Firm', 'E-commerce Store'].map(b =>
                <option key={b} value={b}>{b}</option>
              )}
            </select>
          </div>
        </div>

        {/* Summary card */}
        <div className="costs-summary">
          <div className="costs-summary__card costs-summary__card--min">
            <DollarSign size={22} />
            <div>
              <p className="costs-summary__value">{data.symbol} {total.min.toLocaleString()}</p>
              <p className="costs-summary__label">Estimated Minimum</p>
            </div>
          </div>
          <div className="costs-summary__divider" aria-hidden="true">to</div>
          <div className="costs-summary__card costs-summary__card--max">
            <TrendingUp size={22} />
            <div>
              <p className="costs-summary__value">{data.symbol} {total.max.toLocaleString()}</p>
              <p className="costs-summary__label">Estimated Maximum</p>
            </div>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="costs-table-wrap card">
          <h2 className="costs-table__title">Cost Breakdown — {country}</h2>
          <div className="costs-table" role="table" aria-label={`Cost breakdown for ${country}`}>
            <div className="costs-table__head" role="row">
              <span role="columnheader">Category</span>
              <span role="columnheader">Min ({data.currency})</span>
              <span role="columnheader">Max ({data.currency})</span>
              <span role="columnheader">Notes</span>
            </div>
            {data.items.map((item, i) => (
              <div key={i} className="costs-table__row" role="row">
                <span className="costs-table__category" role="cell">{item.category}</span>
                <span className="costs-table__amount costs-table__amount--min" role="cell">
                  {item.min === 0 ? 'Free' : `${data.symbol}${item.min.toLocaleString()}`}
                </span>
                <span className="costs-table__amount costs-table__amount--max" role="cell">
                  {item.max === 0 ? 'Free' : `${data.symbol}${item.max.toLocaleString()}`}
                </span>
                <span className="costs-table__note" role="cell">
                  <Info size={13} aria-hidden="true" />
                  {item.note}
                </span>
              </div>
            ))}
            <div className="costs-table__total" role="row">
              <span role="cell"><strong>Total Estimate</strong></span>
              <span className="costs-table__amount--min" role="cell">
                <strong>{data.symbol} {total.min.toLocaleString()}</strong>
              </span>
              <span className="costs-table__amount--max" role="cell">
                <strong>{data.symbol} {total.max.toLocaleString()}</strong>
              </span>
              <span role="cell" />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="costs-disclaimer">
          <AlertCircle size={15} />
          <p>
            Figures are approximate estimates for reference only. Actual costs vary depending on your business type, location, and professional fees.
            Always consult official government sources and a licensed accountant before committing to any financial decisions.
          </p>
        </div>

        {/* CTA */}
        <div className="costs-cta">
          <p>Ready to take the next step?</p>
          <Link to={`/roadmap?country=${encodeURIComponent(country)}`} className="btn btn-primary">
            Get Full Roadmap for {country}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  )
}
