import { Star, MapPin, Briefcase, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Stories.css'

const STORIES = [
  {
    id: 1,
    name: 'Bilal Ahmed',
    initials: 'BA',
    city: 'Lahore to London, UK',
    business: 'Restaurant',
    year: '2022',
    market: 'UK',
    tags: ['Food & Beverage', 'UK', 'Visa'],
    summary: 'How I Opened a Restaurant in London Starting with Zero Local Connections',
    body: 'I had experience running a food business, but the UK setup process looked overwhelming. LaunchBridge gave me the order of actions: company registration, food hygiene licensing, council approval, banking, and realistic startup costs.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sana Malik',
    initials: 'SM',
    city: 'Remote to Toronto, Canada',
    business: 'IT Software Company',
    year: '2023',
    market: 'CA',
    tags: ['Tech', 'Canada', 'Company Setup'],
    summary: 'From Software Engineer to Company Director in Canada',
    body: 'I used LaunchBridge to understand Canadian incorporation options, Ontario-specific rules, HST registration, banking, and the right sequence for setting up a consulting company.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Omar Farooq',
    initials: 'OF',
    city: 'Karachi to Dubai, UAE',
    business: 'Supermarket',
    year: '2022',
    market: 'AE',
    tags: ['Retail', 'UAE', 'Free Zone'],
    summary: 'Opening a Supermarket in Dubai with a Clear Cost Plan',
    body: 'The tricky part was understanding Free Zone versus Mainland. LaunchBridge broke down ownership, licence cost, banking, and the reasons a mainland route made more sense for retail.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ayesha Khan',
    initials: 'AK',
    city: 'Peshawar to Melbourne, Australia',
    business: 'Salon & Beauty',
    year: '2023',
    market: 'AU',
    tags: ['Beauty', 'Australia', 'Sole Trader'],
    summary: 'How I Set Up My Beauty Salon in Melbourne',
    body: 'LaunchBridge walked me through registering as a sole trader, getting an ABN, understanding council permits, and checking insurance requirements I had not considered.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Hassan Riaz',
    initials: 'HR',
    city: 'Faisalabad to Frankfurt, Germany',
    business: 'Import / Export',
    year: '2023',
    market: 'DE',
    tags: ['Trade', 'Germany', 'EU'],
    summary: 'Building a Textile Import Business in Germany',
    body: 'Germany had the demand, but the registration and VAT process was new to me. LaunchBridge made trade licence, VAT number, banking, and local compliance feel manageable.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Zainab Hussain',
    initials: 'ZH',
    city: 'Multan to Singapore',
    business: 'E-commerce Store',
    year: '2024',
    market: 'SG',
    tags: ['E-commerce', 'Singapore', 'Tech'],
    summary: 'Singapore: A Fast Registration Path for an E-commerce Brand',
    body: 'I wanted to launch into Southeast Asian markets. LaunchBridge showed the private limited company path, estimated fees, director requirements, and the questions to ask before committing.',
    rating: 5,
  },
]

function StoryCard({ story }) {
  return (
    <article className="story-card" aria-labelledby={`story-title-${story.id}`}>
      <div className="story-card__header">
        <div className="story-card__avatar" aria-hidden="true">{story.initials}</div>
        <div className="story-card__author-info">
          <p className="story-card__name">{story.name} <span className="story-card__flag">{story.market}</span></p>
          <p className="story-card__meta">
            <MapPin size={12} aria-hidden="true" /> {story.city}
          </p>
        </div>
      </div>

      <div className="story-card__tags">
        {story.tags.map(t => <span key={t} className="badge badge-blue">{t}</span>)}
      </div>

      <h3 className="story-card__summary" id={`story-title-${story.id}`}>{story.summary}</h3>

      <div className="story-card__details">
        <span className="story-card__detail">
          <Briefcase size={13} aria-hidden="true" /> {story.business}
        </span>
        <span className="story-card__detail">
          <Calendar size={13} aria-hidden="true" /> {story.year}
        </span>
      </div>

      <blockquote className="story-card__excerpt">"{story.body}"</blockquote>

      <div className="story-card__stars" aria-label={`${story.rating} out of 5 stars`}>
        {Array.from({ length: story.rating }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
    </article>
  )
}

export default function Stories() {
  return (
    <main className="stories-page page-content">
      <div className="stories-hero">
        <div className="container">
          <p className="section-label">Success Stories</p>
          <h1 className="stories-hero__title">
            Real People. <span className="gradient-text">Real Businesses.</span>
          </h1>
          <p className="stories-hero__subtitle">
            Stories from founders who used LaunchBridge to turn international business setup into a clear, practical plan.
          </p>
        </div>
      </div>

      <div className="container stories-body">
        <div className="stories-grid">
          {STORIES.map(story => <StoryCard key={story.id} story={story} />)}
        </div>

        <div className="stories-cta">
          <div className="stories-cta__card">
            <h2 className="stories-cta__title">Have your own story to share?</h2>
            <p className="stories-cta__subtitle">
              If you have used LaunchBridge to plan or start a business abroad, we would love to feature your story.
            </p>
            <Link to="/about#contact" className="btn btn-primary">
              Share Your Story
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
