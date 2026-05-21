import { Star, MapPin, Briefcase, Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Stories.css'

const STORIES = [
  {
    id: 1,
    name: 'Bilal Ahmed',
    initials: 'BA',
    city: 'Lahore → London, UK',
    business: 'Pakistani Restaurant',
    year: '2022',
    flag: '🇬🇧',
    tags: ['Food & Beverage', 'UK', 'Visa'],
    summary: 'How I Opened a Pakistani Restaurant in London Starting with Zero Connections',
    body: `I had been running a dhaba in Lahore for five years. I always dreamed of bringing authentic Pakistani food to the UK. The problem was I had no idea where to start — the process looked overwhelmingly complicated.

LaunchBridge gave me a clear roadmap. It told me exactly what kind of visa I needed, how to register a limited company in the UK, what food hygiene licences I needed for a restaurant, and a rough budget of what everything would cost. Within 3 months I had my visa, within 6 months I had the restaurant keys.

The most valuable part was the cost estimator. I went in knowing exactly what to expect. No nasty surprises.`,
    rating: 5,
  },
  {
    id: 2,
    name: 'Sana Malik',
    initials: 'SM',
    city: 'Islamabad → Toronto, Canada',
    business: 'IT Software Company',
    year: '2023',
    flag: '🇨🇦',
    tags: ['Tech', 'Canada', 'Company Setup'],
    summary: 'From Pakistani Software Engineer to Company Director in Canada',
    body: `I had been working as a software engineer in Islamabad for 8 years. Getting a Canadian work permit opened the door, but I wanted to start my own consulting company — not just work for someone else.

I used LaunchBridge to understand the difference between incorporation options in Canada, what the Ontario-specific rules were, how to register for HST, and how to open a business bank account. The platform also pointed me toward a startup loan programme in Ontario that I wouldn't have found on my own.

Today I run a team of 6, doing software projects for Canadian clients. LaunchBridge was my starting point.`,
    rating: 5,
  },
  {
    id: 3,
    name: 'Omar Farooq',
    initials: 'OF',
    city: 'Karachi → Dubai, UAE',
    business: 'Supermarket',
    year: '2022',
    flag: '🇦🇪',
    tags: ['Retail', 'UAE', 'Free Zone'],
    summary: 'Opening a Supermarket in Dubai as a Pakistani National — My Journey',
    body: `Dubai had always been on my radar. I had some savings and wanted to open a supermarket targeting the South Asian expat community. The tricky part: understanding the difference between Free Zone and Mainland setups in the UAE.

LaunchBridge broke it down perfectly. Free Zone means I can own 100% of the business, but mainland gives me more freedom to sell directly to the public. For a supermarket, mainland made more sense. The platform showed me the cost breakdown, the trade licence process, and connected me with a local business consultant who helped with the actual paperwork.

I under-budgeted on my first estimate. The cost estimator on LaunchBridge actually caught this — the real figure was 35% higher than my personal guess. That saved me from a serious cash crisis.`,
    rating: 5,
  },
  {
    id: 4,
    name: 'Ayesha Khan',
    initials: 'AK',
    city: 'Peshawar → Melbourne, Australia',
    business: 'Salon & Beauty',
    year: '2023',
    flag: '🇦🇺',
    tags: ['Beauty', 'Australia', 'Sole Trader'],
    summary: 'How I Set Up My Beauty Salon in Melbourne — A Pakistani Woman\'s Story',
    body: `I arrived in Melbourne on a partner visa and wanted to start my own salon. I was worried about all the rules around running a business on a partner visa. LaunchBridge clarified this completely — partner visa holders can absolutely run their own business in Australia.

The platform walked me through registering as a sole trader, getting my ABN, and understanding which local council permits I needed for a salon. It also flagged insurance requirements I hadn't considered. Within 4 months of arriving, I had my business registered and my first clients booked.`,
    rating: 5,
  },
  {
    id: 5,
    name: 'Hassan Riaz',
    initials: 'HR',
    city: 'Faisalabad → Frankfurt, Germany',
    business: 'Import / Export',
    year: '2023',
    flag: '🇩🇪',
    tags: ['Trade', 'Germany', 'EU'],
    summary: 'Building a Pakistani Textile Import Business in Germany',
    body: `Germany has millions of people who appreciate quality textile products, and Pakistan is one of the world's top textile producers. I saw the gap. Setting up an import business in Germany as a non-EU national was daunting — there are strict requirements.

LaunchBridge broke the process into manageable steps. Getting my German trade licence (Gewerbeanmeldung), understanding the UStID (VAT number) process, and opening a German bank account — all of it was laid out step by step. The forum community was also extremely helpful. I found other Pakistanis doing similar business who shared their real experiences.`,
    rating: 5,
  },
  {
    id: 6,
    name: 'Zainab Hussain',
    initials: 'ZH',
    city: 'Multan → Singapore',
    business: 'E-commerce Store',
    year: '2024',
    flag: '🇸🇬',
    tags: ['E-commerce', 'Singapore', 'Tech'],
    summary: 'Singapore: The Easiest Country in Asia to Register a Business — My E-commerce Story',
    body: `Singapore topped every "ease of doing business" list I found, so I chose it deliberately. I wanted to launch an e-commerce platform targeting Southeast Asian markets. LaunchBridge showed me that incorporating a private limited company in Singapore can take just 1–3 days and costs only SGD 315.

The platform also warned me about the EntrePass requirements for Pakistani nationals who want to work in Singapore — you need to meet specific criteria. This saved me from a very expensive mistake. I ended up partnering with a Singapore PR as director, which was the cleanest structure for my situation.`,
    rating: 5,
  },
]

function StoryCard({ story }) {
  return (
    <article className="story-card" aria-labelledby={`story-title-${story.id}`}>
      <div className="story-card__header">
        <div className="story-card__avatar" aria-hidden="true">{story.initials}</div>
        <div className="story-card__author-info">
          <p className="story-card__name">{story.name} <span className="story-card__flag">{story.flag}</span></p>
          <p className="story-card__meta">
            <MapPin size={12} aria-hidden="true" /> {story.city}
          </p>
        </div>
      </div>

      <div className="story-card__tags">
        {story.tags.map(t => (
          <span key={t} className="badge badge-blue">{t}</span>
        ))}
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

      <blockquote className="story-card__excerpt">
        "{story.body.split('\n\n')[0]}"
      </blockquote>

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
            Inspiring stories from Pakistani entrepreneurs who used LaunchBridge to turn their dream into a running business abroad.
          </p>
        </div>
      </div>

      <div className="container stories-body">
        <div className="stories-grid">
          {STORIES.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        <div className="stories-cta">
          <div className="stories-cta__card">
            <h2 className="stories-cta__title">Have your own story to share?</h2>
            <p className="stories-cta__subtitle">
              If you've used LaunchBridge to start a business abroad, we'd love to feature you and inspire others.
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
