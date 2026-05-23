import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ChevronDown, CheckCircle, Circle, Clock,
  FileText, Building, Banknote, Users, Globe, ArrowRight,
  Download, AlertCircle
} from 'lucide-react'
import './Roadmap.css'

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'UAE', 'Australia',
  'Germany', 'Singapore', 'Netherlands', 'Sweden', 'France',
  'Japan', 'South Korea', 'Malaysia', 'Turkey', 'New Zealand',
  'Saudi Arabia', 'Qatar', 'Pakistan', 'India',
]

const BUSINESS_TYPES = [
  'Restaurant / Food Business', 'IT Company / Tech Startup', 'Supermarket / Grocery Store',
  'Salon / Beauty Business', 'Consulting Firm', 'Import / Export Business',
  'E-commerce Store', 'Real Estate Agency', 'Education / Tutoring',
  'Healthcare / Clinic', 'Construction / Contracting', 'Other',
]

const LOCATIONS = [
  'North America', 'Europe', 'Middle East', 'South Asia', 'East Asia',
  'Africa', 'Oceania', 'Latin America', 'Already in target country',
]

function buildRoadmap(country, business) {
  const isUK = country === 'United Kingdom'
  const isUS = country === 'United States'
  const isUAE = country === 'UAE'

  return [
    {
      phase: 'Phase 1 - Research & Planning',
      color: 'blue',
      Icon: Globe,
      duration: '1-2 weeks',
      steps: [
        { title: 'Market Research', desc: `Study demand for ${business} in ${country}. Analyse competitors, pricing, customer segments, and local buying behaviour.`, done: false },
        { title: 'Business Plan', desc: 'Write a focused business plan: objectives, revenue model, startup costs, break-even projection, and operating assumptions.', done: false },
        { title: 'Visa / Right to Work', desc: isUAE ? 'Check the UAE investor, partner, or entrepreneur visa route that matches your company setup.' : `Check ${country} visa, founder, investor, and right-to-work requirements for your situation.`, done: false },
      ],
    },
    {
      phase: 'Phase 2 - Legal Setup',
      color: 'green',
      Icon: FileText,
      duration: isUK ? '1-3 days' : isUS ? '1-2 weeks' : '2-4 weeks',
      steps: [
        { title: 'Choose Business Structure', desc: isUK ? 'Register as a Sole Trader or Private Limited Company (Ltd) via Companies House.' : isUS ? 'Decide between LLC, Corporation, or Sole Proprietorship based on your state and tax plan.' : `Select the most appropriate legal entity type for ${country}.`, done: false },
        { title: 'Register Business Name', desc: `Check name availability and register your ${business} name with the relevant authority.`, done: false },
        { title: 'Obtain Business Number', desc: isUK ? 'Receive your Unique Taxpayer Reference (UTR) and Company Registration Number (CRN).' : isUS ? 'Apply for an Employer Identification Number (EIN) from the IRS where applicable.' : `Register for the national business identification number in ${country}.`, done: false },
      ],
    },
    {
      phase: 'Phase 3 - Licences & Permits',
      color: 'gold',
      Icon: Building,
      duration: '2-4 weeks',
      steps: [
        { title: 'Industry-Specific Licence', desc: `Apply for the specific licence required for a ${business} in ${country}.`, done: false },
        { title: 'Health & Safety Certification', desc: 'Complete any mandatory safety inspections or certifications for your premises and business activity.', done: false },
        { title: 'Local Authority Approval', desc: 'Register with the local municipality, council, or regulator and obtain premises-specific permits where needed.', done: false },
      ],
    },
    {
      phase: 'Phase 4 - Finance & Banking',
      color: 'purple',
      Icon: Banknote,
      duration: '1-2 weeks',
      steps: [
        { title: 'Open Business Bank Account', desc: `Open a dedicated business account with a local or international bank. Prepare registration documents, identity documents, and proof of address.`, done: false },
        { title: 'Set Up Accounting', desc: 'Choose accounting software and register for VAT, GST, sales tax, or local taxes if thresholds apply.', done: false },
        { title: 'Secure Initial Funding', desc: 'Explore local grants, startup loans, accelerators, or investor networks available in your region.', done: false },
      ],
    },
    {
      phase: 'Phase 5 - Operations',
      color: 'blue',
      Icon: Users,
      duration: '2-6 weeks',
      steps: [
        { title: 'Find & Lease Premises', desc: `Search for a suitable location for your ${business}. Review lease terms carefully before signing.`, done: false },
        { title: 'Hire Staff', desc: `Understand employment laws in ${country} before hiring. Complete payroll, benefits, and worker registration where required.`, done: false },
        { title: 'Launch Marketing', desc: 'Set up your website, search profile, social channels, local listings, and launch campaign.', done: false },
      ],
    },
  ]
}

export default function Roadmap() {
  const [searchParams] = useSearchParams()

  const paramCountry = searchParams.get('country')
  const [country, setCountry] = useState(paramCountry && COUNTRIES.includes(paramCountry) ? paramCountry : '')
  const [business, setBusiness] = useState('')
  const [location, setLocation] = useState('')
  const [generated, setGenerated] = useState(false)
  const [phases, setPhases] = useState([])
  const [openPhase, setOpenPhase] = useState(0)
  const [completed, setCompleted] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = (e) => {
    e.preventDefault()
    setError('')
    if (!country) { setError('Please select a target country.'); return }
    if (!business) { setError('Please select your business type.'); return }
    if (!location) { setError('Please select your current base.'); return }

    setLoading(true)
    setTimeout(() => {
      setPhases(buildRoadmap(country, business))
      setCompleted({})
      setOpenPhase(0)
      setGenerated(true)
      setLoading(false)
    }, 900)
  }

  const toggleStep = (phaseIdx, stepIdx) => {
    const key = `${phaseIdx}-${stepIdx}`
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const totalSteps = phases.reduce((n, p) => n + p.steps.length, 0)
  const completedCount = Object.values(completed).filter(Boolean).length
  const progress = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0

  return (
    <main className="roadmap-page page-content">
      <div className="roadmap-hero">
        <div className="container">
          <p className="section-label">Roadmap Generator</p>
          <h1 className="roadmap-hero__title">
            Get Your <span className="gradient-text">Free Business Roadmap</span>
          </h1>
          <p className="roadmap-hero__subtitle">
            Tell us where you want to start and what kind of business you are building. We will generate a complete step-by-step launch guide instantly.
          </p>
        </div>
      </div>

      <div className="container roadmap-body">
        {!generated && (
          <div className="roadmap-form-wrap">
            <form className="roadmap-form card" onSubmit={handleGenerate} noValidate aria-label="Roadmap generator form">
              <h2 className="roadmap-form__title">Tell Us About Your Plan</h2>

              {error && (
                <div className="roadmap-form__error" role="alert" aria-live="assertive">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="roadmap-form__fields">
                <div className="roadmap-form__field">
                  <label htmlFor="target-country" className="roadmap-form__label">
                    Target Country <span aria-hidden="true">*</span>
                  </label>
                  <select id="target-country" className="input" value={country} onChange={e => setCountry(e.target.value)} required aria-required="true">
                    <option value="">Select a country...</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="roadmap-form__field">
                  <label htmlFor="business-type" className="roadmap-form__label">
                    Business Type <span aria-hidden="true">*</span>
                  </label>
                  <select id="business-type" className="input" value={business} onChange={e => setBusiness(e.target.value)} required aria-required="true">
                    <option value="">Select your business...</option>
                    {BUSINESS_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="roadmap-form__field">
                  <label htmlFor="current-location" className="roadmap-form__label">
                    Your Current Base <span aria-hidden="true">*</span>
                  </label>
                  <select id="current-location" className="input" value={location} onChange={e => setLocation(e.target.value)} required aria-required="true">
                    <option value="">Where are you starting from?</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg roadmap-form__submit" disabled={loading} aria-busy={loading}>
                {loading ? (
                  <>
                    <span className="roadmap-form__spinner" aria-hidden="true" />
                    Generating Roadmap...
                  </>
                ) : (
                  <>
                    Generate My Roadmap
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="roadmap-form__note">
                100% free. No account needed. Results are for informational purposes only.
              </p>
            </form>
          </div>
        )}

        {generated && (
          <div className="roadmap-result anim-fade-up">
            <div className="roadmap-result__header">
              <div className="roadmap-result__meta">
                <h2 className="roadmap-result__title">
                  {business} in {country}
                </h2>
                <p className="roadmap-result__subtitle">
                  Your personalized step-by-step business launch roadmap from {location}.
                </p>
              </div>
              <div className="roadmap-result__actions">
                <button className="btn btn-secondary btn-sm" onClick={() => setGenerated(false)}>
                  Start Over
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => window.print()} aria-label="Download roadmap">
                  <Download size={15} />
                  Save
                </button>
              </div>
            </div>

            <div className="roadmap-progress card">
              <div className="roadmap-progress__top">
                <span className="roadmap-progress__label">Overall Progress</span>
                <span className="roadmap-progress__pct">{progress}%</span>
              </div>
              <div className="roadmap-progress__bar">
                <div
                  className="roadmap-progress__fill"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${progress}% complete`}
                />
              </div>
              <p className="roadmap-progress__count">
                {completedCount} of {totalSteps} steps completed
              </p>
            </div>

            <div className="roadmap-phases">
              {phases.map((phase, pi) => (
                <div key={pi} className={`roadmap-phase roadmap-phase--${phase.color}${openPhase === pi ? ' roadmap-phase--open' : ''}`}>
                  <button className="roadmap-phase__header" onClick={() => setOpenPhase(openPhase === pi ? -1 : pi)} aria-expanded={openPhase === pi} aria-controls={`phase-content-${pi}`}>
                    <div className={`roadmap-phase__icon roadmap-phase__icon--${phase.color}`}>
                      <phase.Icon size={18} />
                    </div>
                    <div className="roadmap-phase__info">
                      <span className="roadmap-phase__name">{phase.phase}</span>
                      <span className="roadmap-phase__duration">
                        <Clock size={12} aria-hidden="true" /> {phase.duration}
                      </span>
                    </div>
                    <div className="roadmap-phase__progress-mini">
                      <span>{phase.steps.filter((_, si) => completed[`${pi}-${si}`]).length}/{phase.steps.length}</span>
                    </div>
                    <ChevronDown size={18} className={`roadmap-phase__chevron${openPhase === pi ? ' roadmap-phase__chevron--open' : ''}`} aria-hidden="true" />
                  </button>

                  <div id={`phase-content-${pi}`} className="roadmap-phase__body" hidden={openPhase !== pi}>
                    <ul className="roadmap-steps" role="list">
                      {phase.steps.map((step, si) => {
                        const key = `${pi}-${si}`
                        const done = !!completed[key]
                        return (
                          <li key={si} className={`roadmap-step${done ? ' roadmap-step--done' : ''}`}>
                            <button className="roadmap-step__check" onClick={() => toggleStep(pi, si)} aria-label={done ? `Mark "${step.title}" as incomplete` : `Mark "${step.title}" as complete`} aria-pressed={done}>
                              {done ? <CheckCircle size={22} /> : <Circle size={22} />}
                            </button>
                            <div className="roadmap-step__content">
                              <h4 className="roadmap-step__title">{step.title}</h4>
                              <p className="roadmap-step__desc">{step.desc}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="roadmap-result__footer">
              <p className="roadmap-result__disclaimer">
                <AlertCircle size={14} />
                This roadmap is for informational purposes only. Always verify requirements with official government sources and consult a qualified legal professional.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
