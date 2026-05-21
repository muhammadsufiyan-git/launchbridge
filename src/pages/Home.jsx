import { Link } from 'react-router-dom'
import {
  Globe, Map, FileText, DollarSign, Clock, Plane,
  Lightbulb, TrendingUp, CheckCircle, Users, MessageSquare,
  UserCheck, ArrowRight, Star, Zap, Shield, ChevronRight
} from 'lucide-react'
import './Home.css'

/* ── Data ── */
const FEATURES = [
  { Icon: Map,          color: 'blue',   title: 'Interactive World Map',     desc: 'Click any country on our live map to instantly explore its business climate, legal requirements, and startup ecosystem.' },
  { Icon: FileText,     color: 'green',  title: 'Personalized Roadmap',      desc: 'Tell us your target country and business type — receive a fully customized, step-by-step launch guide in seconds.' },
  { Icon: DollarSign,   color: 'gold',   title: 'Cost Estimator',            desc: 'Know exactly what to budget. Registration fees, licensing, office rent — all broken down in your local currency.' },
  { Icon: Clock,        color: 'purple', title: 'Timeline View',             desc: 'A visual timeline shows how long every step will take, so you can plan your launch with confidence.' },
  { Icon: Plane,        color: 'blue',   title: 'Visa & Embassy Guide',      desc: 'Complete visa guidance for Pakistani citizens — type, fees, embassy contacts, processing times, and application tips.' },
  { Icon: Lightbulb,    color: 'green',  title: 'Business Idea Validator',   desc: 'Check if your business idea has real market demand in the target country before you commit.' },
  { Icon: TrendingUp,   color: 'gold',   title: 'Funding & Investment',      desc: 'Discover grants, loans, and investor networks available in your target country for your specific business.' },
  { Icon: CheckCircle,  color: 'purple', title: 'Progress Tracker',          desc: 'Save your progress, tick off completed steps, and continue from any device at any time.' },
  { Icon: MessageSquare,color: 'blue',   title: 'AI Chatbot Assistant',      desc: 'Ask anything about business setup — our AI gives instant, accurate answers tailored to your situation.' },
  { Icon: Users,        color: 'green',  title: 'Community Forum',           desc: 'Connect with other Pakistani entrepreneurs, share experiences, and get peer support throughout your journey.' },
  { Icon: UserCheck,    color: 'gold',   title: 'Consultant Connect',        desc: 'Get matched with verified local business consultants in your target country for professional guidance.' },
  { Icon: Globe,        color: 'purple', title: 'Urdu & English Support',    desc: 'Fully available in both Urdu and English so every Pakistani entrepreneur can benefit regardless of language preference.' },
]

const STEPS = [
  { num: '01', title: 'Select Target Country',    desc: 'Open the interactive world map and click the country where you want to start your business.' },
  { num: '02', title: 'Enter Your Business Type', desc: 'Type or select your business — restaurant, IT company, salon, supermarket, and hundreds more.' },
  { num: '03', title: 'Enter Your Location',      desc: 'Tell us where you currently live so we can personalize visa and travel guidance for you.' },
  { num: '04', title: 'Receive Your Full Roadmap', desc: 'Get an instant, personalized guide covering registration, documents, costs, timeline, and more.' },
]

const STATS = [
  { value: '180+',  label: 'Countries Covered' },
  { value: '500+',  label: 'Business Types' },
  { value: '50K+',  label: 'Entrepreneurs Helped' },
  { value: '4.9★',  label: 'Average Rating' },
]

const COUNTRIES = [
  { code: '🇺🇸', name: 'United States' },
  { code: '🇬🇧', name: 'United Kingdom' },
  { code: '🇨🇦', name: 'Canada' },
  { code: '🇦🇪', name: 'UAE' },
  { code: '🇦🇺', name: 'Australia' },
  { code: '🇩🇪', name: 'Germany' },
]

const TESTIMONIALS = [
  {
    name: 'Bilal Ahmed',
    role: 'Restaurant Owner, UK',
    text: 'LaunchBridge gave me a complete roadmap for opening my restaurant in London. In just 10 minutes I had every step, cost, and document I needed. What would have taken weeks of research was done instantly.',
    avatar: 'BA',
    flag: '🇬🇧',
  },
  {
    name: 'Sana Malik',
    role: 'IT Company, Canada',
    text: 'I had no idea how to register a tech company in Canada as a Pakistani national. This platform walked me through everything — visa, company formation, tax ID — all in simple Urdu and English.',
    avatar: 'SM',
    flag: '🇨🇦',
  },
  {
    name: 'Omar Farooq',
    role: 'Supermarket, UAE',
    text: "The cost estimator alone saved me from under-budgeting by 30%. I now know exactly what I need and when. The consultant connect feature helped me find a Dubai-based lawyer who specialised in my business type.",
    avatar: 'OF',
    flag: '🇦🇪',
  },
]

/* ── Components ── */
function FeatureCard({ Icon, color, title, desc }) {
  return (
    <article className={`feature-card feature-card--${color}`}>
      <div className={`feature-card__icon feature-card__icon--${color}`}>
        <Icon size={22} strokeWidth={2} />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{desc}</p>
    </article>
  )
}

function StepCard({ num, title, desc, isLast }) {
  return (
    <div className="step-card">
      <div className="step-card__num-wrap">
        <div className="step-card__num">{num}</div>
        {!isLast && <div className="step-card__line" aria-hidden="true" />}
      </div>
      <div className="step-card__content">
        <h3 className="step-card__title">{title}</h3>
        <p className="step-card__desc">{desc}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ name, role, text, avatar, flag }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-card__stars" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
      <blockquote className="testimonial-card__text">"{text}"</blockquote>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar" aria-hidden="true">{avatar}</div>
        <div>
          <p className="testimonial-card__name">{name} <span>{flag}</span></p>
          <p className="testimonial-card__role">{role}</p>
        </div>
      </div>
    </article>
  )
}

/* ── Page ── */
export default function Home() {
  return (
    <main className="home">

      {/* ── Hero ── */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg-shapes" aria-hidden="true">
          <div className="hero__shape hero__shape--1" />
          <div className="hero__shape hero__shape--2" />
          <div className="hero__shape hero__shape--3" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content anim-fade-up">
            <div className="hero__badges">
              <span className="badge badge-blue">
                <Zap size={11} />
                Free to Start
              </span>
              <span className="badge badge-green">
                180+ Countries
              </span>
            </div>
            <h1 className="hero__title">
              Pakistan se{' '}
              <span className="gradient-text">Duniya Tak</span>
            </h1>
            <p className="hero__urdu" lang="ur" dir="rtl">
              پاکستان سے دنیا تک — ہر ملک میں کاروبار شروع کریں
            </p>
            <p className="hero__subtitle">
              Stop spending weeks researching scattered websites in complicated English.
              Get your <strong>complete, personalized business launch roadmap</strong> for any
              country in the world — in minutes, not months.
            </p>
            <div className="hero__actions">
              <Link to="/roadmap" className="btn btn-primary btn-lg">
                Get My Free Roadmap
                <ArrowRight size={18} />
              </Link>
              <Link to="/explore" className="btn btn-secondary btn-lg">
                <Globe size={18} />
                Explore Countries
              </Link>
            </div>
            <div className="hero__trust">
              <Shield size={14} />
              <span>No sign-up required &nbsp;·&nbsp; 100% free &nbsp;·&nbsp; Available in Urdu &amp; English</span>
            </div>
          </div>

          {/* Hero visual card */}
          <div className="hero__visual anim-fade-up delay-3" aria-hidden="true">
            <div className="hero-card">
              <div className="hero-card__header">
                <Globe size={18} className="hero-card__globe" />
                <span>Your Roadmap</span>
                <span className="badge badge-green" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>Live</span>
              </div>
              <div className="hero-card__country-row">
                <span>🇬🇧</span>
                <span className="hero-card__country-name">United Kingdom</span>
                <span className="hero-card__arrow">→</span>
                <span>Restaurant</span>
              </div>
              <ul className="hero-card__steps">
                {['Choose business structure', 'Register with Companies House', 'Apply for Food Standards licence', 'Set up business bank account', 'Hire & onboard staff'].map((step, i) => (
                  <li key={i} className="hero-card__step">
                    <span className="hero-card__step-check">✓</span>
                    <span className={i < 3 ? 'hero-card__step-done' : ''}>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="hero-card__progress">
                <div className="hero-card__progress-label">
                  <span>Progress</span><span>60%</span>
                </div>
                <div className="hero-card__progress-bar">
                  <div className="hero-card__progress-fill" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Country quick-links */}
        <div className="hero__countries container">
          <span className="hero__countries-label">Popular destinations:</span>
          <div className="hero__countries-list" role="list">
            {COUNTRIES.map(({ code, name }) => (
              <Link
                key={name}
                to={`/explore?country=${encodeURIComponent(name)}`}
                className="hero__country-chip"
                role="listitem"
              >
                <span>{code}</span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-bar" aria-label="Platform statistics">
        <div className="container stats-bar__inner">
          {STATS.map(({ value, label }) => (
            <div key={label} className="stats-bar__item">
              <span className="stats-bar__value">{value}</span>
              <span className="stats-bar__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section features-section" id="features" aria-labelledby="features-heading">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Everything You Need</p>
            <h2 className="section-title" id="features-heading">
              One Platform. <span className="gradient-text">Zero Confusion.</span>
            </h2>
            <p className="section-subtitle">
              From visa guidance to cost estimation — every tool a Pakistani entrepreneur needs to launch a business abroad, in one place.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section how-section" id="how-it-works" aria-labelledby="how-heading">
        <div className="container how-section__inner">
          <div className="how-section__text">
            <p className="section-label">How It Works</p>
            <h2 className="section-title" id="how-heading">
              From Idea to Launch in <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="section-subtitle">
              No legal jargon. No confusing government websites. Just a clear path from where you are to where you want to be.
            </p>
            <Link to="/roadmap" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Try It Now — Free
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="how-section__steps">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} {...step} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section testimonials-section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Success Stories</p>
            <h2 className="section-title" id="testimonials-heading">
              Real People. <span className="gradient-text">Real Businesses.</span>
            </h2>
            <p className="section-subtitle">
              Hear from Pakistanis who used LaunchBridge to turn their dream into a running business abroad.
            </p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/stories" className="btn btn-secondary">
              Read More Stories
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-banner__inner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">
              Your business journey starts with one click.
            </h2>
            <p className="cta-banner__subtitle">
              Join thousands of Pakistani entrepreneurs who have already used LaunchBridge to plan their dream business abroad.
            </p>
            <div className="cta-banner__actions">
              <Link to="/roadmap" className="btn btn-white btn-lg">
                Get My Free Roadmap
                <ArrowRight size={18} />
              </Link>
              <Link to="/explore" className="btn btn-lg" style={{ color: '#fff', border: '2px solid rgba(255,255,255,0.4)' }}>
                <Globe size={18} />
                Explore Countries
              </Link>
            </div>
          </div>
          <div className="cta-banner__globe anim-float" aria-hidden="true">
            <Globe size={160} strokeWidth={0.6} />
          </div>
        </div>
      </section>

    </main>
  )
}
