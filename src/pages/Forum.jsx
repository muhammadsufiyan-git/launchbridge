import { useState } from 'react'
import { MessageSquare, ThumbsUp, Eye, Pin, Search, Plus, Clock } from 'lucide-react'
import './Forum.css'

const CATEGORIES = ['All', 'UK', 'USA', 'Canada', 'UAE', 'Australia', 'Visa & Travel', 'Legal', 'Finance', 'General']

const THREADS = [
  {
    id: 1, pinned: true,
    category: 'UK',
    title: 'Complete guide: Starting a restaurant in London as a non-resident founder',
    author: 'Bilal_LDN', authorInit: 'BL',
    time: '2 days ago', replies: 47, views: 1240, likes: 89,
    preview: 'I went through this process last year, so I am sharing the exact order: visa questions, Companies House, food hygiene certificate, council registration, insurance, and opening.',
    tags: ['Restaurant', 'UK', 'Guide'],
  },
  {
    id: 2, pinned: true,
    category: 'UAE',
    title: 'Free Zone vs Mainland in UAE - which is better for a first company?',
    author: 'DubaiBuilder', authorInit: 'DB',
    time: '5 days ago', replies: 62, views: 2100, likes: 134,
    preview: 'Free Zone can be cleaner for international services. Mainland can be better when you need to sell directly in the local market. Here is the practical breakdown.',
    tags: ['UAE', 'Legal', 'Free Zone'],
  },
  {
    id: 3, pinned: false,
    category: 'Canada',
    title: 'Which province is easiest for a small tech consulting company?',
    author: 'SanaMalik_Dev', authorInit: 'SD',
    time: '1 week ago', replies: 28, views: 890, likes: 45,
    preview: 'I have been comparing Ontario, BC, and Alberta for incorporation, tax, grants, and banking. Each province has a slightly different path.',
    tags: ['Canada', 'Tech', 'Province'],
  },
  {
    id: 4, pinned: false,
    category: 'Visa & Travel',
    title: 'UK Innovator Founder Visa - realistic for an early-stage founder?',
    author: 'FounderVisa', authorInit: 'FV',
    time: '2 weeks ago', replies: 33, views: 1560, likes: 72,
    preview: 'The route looks great on paper, but endorsement is the hard part. Here is what I learned after reviewing the requirements.',
    tags: ['Visa', 'UK', 'Immigration'],
  },
  {
    id: 5, pinned: false,
    category: 'USA',
    title: 'Best US states to register an LLC as a non-resident - Delaware vs Wyoming',
    author: 'USSetupLab', authorInit: 'UL',
    time: '3 weeks ago', replies: 41, views: 2300, likes: 98,
    preview: 'Short answer: Delaware for investor-funded companies. Wyoming for privacy and low annual costs. Long answer below.',
    tags: ['USA', 'LLC', 'Tax'],
  },
  {
    id: 6, pinned: false,
    category: 'Finance',
    title: 'How do you receive international payments for a foreign company?',
    author: 'GlobalFinance', authorInit: 'GF',
    time: '1 month ago', replies: 55, views: 3100, likes: 167,
    preview: 'Banking and payment rails are where many founders get stuck. I compared local banks, fintech accounts, Wise-style services, Payoneer, and merchant accounts.',
    tags: ['Finance', 'Banking', 'General'],
  },
  {
    id: 7, pinned: false,
    category: 'Australia',
    title: 'Starting a business in Australia on a Partner Visa - everything to check',
    author: 'AyeKhan_MEL', authorInit: 'AK',
    time: '1 month ago', replies: 19, views: 760, likes: 43,
    preview: 'Partner visa holders can often run a business, but you still need to understand ABN, sole trader versus company, council permits, and insurance.',
    tags: ['Australia', 'Visa', 'Setup'],
  },
  {
    id: 8, pinned: false,
    category: 'Legal',
    title: 'Warning: Common legal mistakes founders make when starting abroad',
    author: 'LegalLaunch', authorInit: 'LL',
    time: '6 weeks ago', replies: 71, views: 4200, likes: 213,
    preview: 'Wrong licence category, missed renewals, weak operating agreements, tax registration delays, and banking assumptions. This post covers the top 10.',
    tags: ['Legal', 'Warning', 'General'],
  },
]

function ThreadCard({ thread, onClick }) {
  return (
    <article className={`thread-card${thread.pinned ? ' thread-card--pinned' : ''}`} role="button" tabIndex={0} onClick={onClick} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()} aria-label={`Thread: ${thread.title}`}>
      <div className="thread-card__left">
        {thread.pinned && <span className="thread-card__pin" aria-label="Pinned thread"><Pin size={13} /></span>}
        <div className="thread-card__avatar" aria-hidden="true">{thread.authorInit}</div>
      </div>

      <div className="thread-card__body">
        <div className="thread-card__meta-top">
          <span className="badge badge-blue thread-card__category">{thread.category}</span>
          {thread.tags.slice(0, 2).map(t => <span key={t} className="thread-card__tag">{t}</span>)}
        </div>
        <h3 className="thread-card__title">{thread.title}</h3>
        <p className="thread-card__preview">{thread.preview}</p>
        <div className="thread-card__footer">
          <span className="thread-card__author">@{thread.author}</span>
          <span className="thread-card__time">
            <Clock size={12} aria-hidden="true" /> {thread.time}
          </span>
        </div>
      </div>

      <div className="thread-card__stats">
        <span className="thread-card__stat" title="Replies"><MessageSquare size={14} aria-hidden="true" /><span>{thread.replies}</span></span>
        <span className="thread-card__stat" title="Views"><Eye size={14} aria-hidden="true" /><span>{thread.views.toLocaleString()}</span></span>
        <span className="thread-card__stat" title="Likes"><ThumbsUp size={14} aria-hidden="true" /><span>{thread.likes}</span></span>
      </div>
    </article>
  )
}

export default function Forum() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const sanitize = s => s.replace(/[<>"'&]/g, '')

  const filtered = THREADS.filter(t => {
    const q = sanitize(query).toLowerCase().trim()
    const matchCat = activeCategory === 'All' || t.category === activeCategory
    const matchQ = !q || t.title.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  return (
    <main className="forum-page page-content">
      <div className="forum-hero">
        <div className="container">
          <p className="section-label">Community Forum</p>
          <h1 className="forum-hero__title">
            Learn from <span className="gradient-text">Global Founders</span>
          </h1>
          <p className="forum-hero__subtitle">
            Ask questions, compare setup paths, and learn from founders working through similar cross-border decisions.
          </p>

          <div className="forum-search-wrap">
            <div className="forum-search">
              <Search size={18} className="forum-search__icon" aria-hidden="true" />
              <input type="search" className="forum-search__input" placeholder="Search discussions..." value={query} onChange={e => setQuery(e.target.value)} maxLength={100} aria-label="Search forum discussions" />
            </div>
            <button className="btn btn-primary" disabled aria-label="New post (coming soon)">
              <Plus size={16} />
              New Post
            </button>
          </div>
        </div>
      </div>

      <div className="container forum-body">
        <nav className="forum-categories" aria-label="Forum categories">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`forum-category-btn${activeCategory === cat ? ' forum-category-btn--active' : ''}`} onClick={() => setActiveCategory(cat)} aria-pressed={activeCategory === cat}>
              {cat}
            </button>
          ))}
        </nav>

        <p className="forum-count" aria-live="polite">
          <MessageSquare size={14} aria-hidden="true" />
          <strong>{filtered.length}</strong> discussions
        </p>

        {filtered.length > 0 ? (
          <div className="forum-threads" role="list">
            {filtered.map(thread => (
              <div key={thread.id} role="listitem">
                <ThreadCard thread={thread} onClick={() => {}} />
              </div>
            ))}
          </div>
        ) : (
          <div className="forum-empty">
            <MessageSquare size={48} strokeWidth={1} />
            <p>No discussions match your search.</p>
            <button className="btn btn-secondary btn-sm" onClick={() => { setQuery(''); setActiveCategory('All') }}>
              Clear Search
            </button>
          </div>
        )}

        <div className="forum-cta-note">
          <p>
            <strong>Note:</strong> This is a preview of the community forum. Full posting functionality, accounts, and moderation are coming soon.
          </p>
        </div>
      </div>
    </main>
  )
}
