import { Link } from 'react-router-dom'
import {
  Globe, Map, FileText, DollarSign, Clock, Plane,
  Lightbulb, TrendingUp, CheckCircle, Users, MessageSquare,
  UserCheck, ArrowRight, Star, Zap, Shield, ChevronRight
} from 'lucide-react'
import './Home.css'

const FEATURES = [
  { Icon: Map, color: 'blue', title: 'Interactive World Map', desc: 'Compare markets, setup rules, registration time, and founder-friendly advantages across global destinations.' },
  { Icon: FileText, color: 'green', title: 'Personalized Roadmap', desc: 'Choose your target country and business type to receive a clear step-by-step launch plan.' },
  { Icon: DollarSign, color: 'gold', title: 'Cost Estimator', desc: 'Estimate registration fees, licences, banking, workspace, and professional costs before you commit.' },
  { Icon: Clock, color: 'purple', title: 'Timeline View', desc: 'See how long each stage can take so you can plan capital, travel, hiring, and launch dates confidently.' },
  { Icon: Plane, color: 'blue', title: 'Visa & Mobility Guide', desc: 'Understand common business travel, founder, investor, and right-to-work routes for your destination.' },
  { Icon: Lightbulb, color: 'green', title: 'Business Idea Validator', desc: 'Check market fit, demand signals, and common risks before spending serious time or money.' },
  { Icon: TrendingUp, color: 'gold', title: 'Funding & Investment', desc: 'Discover grants, loans, accelerators, and investor networks relevant to your target country.' },
  { Icon: CheckCircle, color: 'purple', title: 'Progress Tracker', desc: 'Save milestones, tick off completed steps, and return to your plan from any device.' },
  { Icon: MessageSquare, color: 'blue', title: 'Launch Assistant', desc: 'Ask questions about setup, documents, timelines, and costs with context-aware guidance.' },
  { Icon: Users, color: 'green', title: 'Founder Community', desc: 'Learn from other builders, share practical experiences, and get peer support during launch.' },
  { Icon: UserCheck, color: 'gold', title: 'Consultant Connect', desc: 'Get matched with verified local consultants, accountants, and setup specialists when needed.' },
  { Icon: Globe, color: 'purple', title: 'Global-First Support', desc: 'Designed for founders operating across borders, currencies, languages, and legal systems.' },
]

const STEPS = [
  { num: '01', title: 'Select Target Country', desc: 'Open the country explorer and pick where you want to launch.' },
  { num: '02', title: 'Choose Business Type', desc: 'Select your industry, from tech and e-commerce to restaurants, salons, trading, and services.' },
  { num: '03', title: 'Add Your Current Base', desc: 'Tell us where you are starting from so travel, visa, and remote setup notes are more useful.' },
  { num: '04', title: 'Receive Your Roadmap', desc: 'Get an instant guide covering registration, documents, costs, timeline, banking, and next actions.' },
]

const STATS = [
  { value: '180+', label: 'Countries Covered' },
  { value: '500+', label: 'Business Types' },
  { value: '50K+', label: 'Founders Guided' },
  { value: '4.9/5', label: 'Average Rating' },
]

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AE', name: 'UAE' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
]

const TESTIMONIALS = [
  {
    name: 'Bilal Ahmed',
    role: 'Restaurant Owner, UK',
    text: 'LaunchBridge gave me a complete roadmap for opening my restaurant in London. In minutes I had the steps, costs, and documents I needed.',
    avatar: 'BA',
    market: 'UK',
  },
  {
    name: 'Sana Malik',
    role: 'IT Company, Canada',
    text: 'I used LaunchBridge to understand Canadian incorporation, tax registration, banking, and the order to do everything in.',
    avatar: 'SM',
    market: 'CA',
  },
  {
    name: 'Omar Farooq',
    role: 'Supermarket, UAE',
    text: 'The cost estimator saved me from under-budgeting. I could compare free zone and mainland paths before speaking with a consultant.',
    avatar: 'OF',
    market: 'AE',
  },
]

const LAUNCH_TOOLS = [
  { Icon: Globe, label: 'Explore markets', value: '24 live filters', to: '/explore' },
  { Icon: FileText, label: 'Build roadmap', value: '5-phase plan', to: '/roadmap' },
  { Icon: DollarSign, label: 'Estimate budget', value: 'Min-max costs', to: '/costs' },
]

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

function TestimonialCard({ name, role, text, avatar, market }) {
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
          <p className="testimonial-card__name">{name} <span>{market}</span></p>
          <p className="testimonial-card__role">{role}</p>
        </div>
      </div>
    </article>
  )
}

function HeroVisual() {
  return (
    <div className="hero__visual anim-fade-up delay-3">
      <div className="mission-console" aria-label="LaunchBridge command center preview">
        <div className="mission-console__topline">
          <span>Global launch engine</span>
          <strong>Online</strong>
        </div>
        <div className="mission-console__orbit" aria-hidden="true">
          <div className="mission-console__core">
            <Globe size={78} strokeWidth={0.85} />
            <span>LB</span>
          </div>
          <span className="mission-console__node mission-console__node--uk">UK</span>
          <span className="mission-console__node mission-console__node--us">US</span>
          <span className="mission-console__node mission-console__node--ae">AE</span>
          <span className="mission-console__node mission-console__node--sg">SG</span>
        </div>
        <div className="mission-console__route">
          <span>Idea</span>
          <i />
          <span>Country</span>
          <i />
          <span>Roadmap</span>
          <i />
          <span>Launch</span>
        </div>
        <div className="mission-console__metrics">
          <div>
            <span>Markets</span>
            <strong>180+</strong>
          </div>
          <div>
            <span>Business types</span>
            <strong>500+</strong>
          </div>
          <div>
            <span>Plan speed</span>
            <strong>Instant</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="home">
      <section className="hero" aria-label="Hero">
        <div className="container hero__inner">
          <div className="hero__content anim-fade-up">
            <div className="hero__badges">
              <span className="badge badge-blue"><Zap size={11} /> Free to Start</span>
              <span className="badge badge-green">180+ Countries</span>
            </div>
            <h1 className="hero__title">
              LaunchBridge is your <span className="gradient-text">global business cockpit</span>
            </h1>
            <p className="hero__subtitle">
              Pick a market, compare setup friction, estimate costs, and generate a step-by-step
              launch route from one interactive command center.
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
              <span>Move your mouse over the scene, choose a tool, and start building your launch path.</span>
            </div>
          </div>

          <HeroVisual />
        </div>

        <div className="container tool-dock" aria-label="Primary launch tools">
          {LAUNCH_TOOLS.map(({ Icon, label, value, to }) => (
            <Link to={to} className="tool-dock__item" key={label}>
              <span className="tool-dock__icon"><Icon size={19} /></span>
              <span>
                <strong>{label}</strong>
                <small>{value}</small>
              </span>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>

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

      <section className="section features-section" id="features" aria-labelledby="features-heading">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Everything You Need</p>
            <h2 className="section-title" id="features-heading">
              One Platform. <span className="gradient-text">Zero Confusion.</span>
            </h2>
            <p className="section-subtitle">
              From country comparison to costs and launch steps, every major tool for cross-border business setup lives in one place.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works" aria-labelledby="how-heading">
        <div className="container how-section__inner">
          <div className="how-section__text">
            <p className="section-label">How It Works</p>
            <h2 className="section-title" id="how-heading">
              From Idea to Launch in <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="section-subtitle">
              No legal jargon. No confusing government rabbit holes. Just a clear path from where you are to where you want to build.
            </p>
            <Link to="/roadmap" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Try It Now - Free
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

      <section className="section testimonials-section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Success Stories</p>
            <h2 className="section-title" id="testimonials-heading">
              Real People. <span className="gradient-text">Real Businesses.</span>
            </h2>
            <p className="section-subtitle">
              See how founders used LaunchBridge to turn complex international setup into a clear plan.
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

      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-banner__inner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">Your global business journey starts with one click.</h2>
            <p className="cta-banner__subtitle">
              Join founders using LaunchBridge to compare destinations, budget smarter, and launch across borders.
            </p>
            <div className="cta-banner__actions">
              <Link to="/roadmap" className="btn btn-white btn-lg">
                Get My Free Roadmap
                <ArrowRight size={18} />
              </Link>
              <Link to="/explore" className="btn btn-lg" style={{ color: '#fff', border: '2px solid rgba(255,255,255,0.45)' }}>
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
