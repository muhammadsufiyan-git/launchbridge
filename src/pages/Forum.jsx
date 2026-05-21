import { useState } from 'react'
import { MessageSquare, ThumbsUp, Eye, Pin, Search, Plus, Clock } from 'lucide-react'
import './Forum.css'

const CATEGORIES = ['All', 'UK', 'USA', 'Canada', 'UAE', 'Australia', 'Visa & Travel', 'Legal', 'Finance', 'General']

const THREADS = [
  {
    id: 1, pinned: true,
    category: 'UK',
    title: 'Complete guide: Starting a restaurant in London as a Pakistani national (2024)',
    author: 'Bilal_LDN', authorInit: 'BL',
    time: '2 days ago', replies: 47, views: 1240, likes: 89,
    preview: "I went through this entire process last year so I'm sharing everything. UK visa, Companies House, food hygiene certificate, council registration — all of it in one thread.",
    tags: ['Restaurant', 'UK', 'Guide'],
  },
  {
    id: 2, pinned: true,
    category: 'UAE',
    title: 'FREE ZONE vs MAINLAND in UAE — which is better for a Pakistani entrepreneur?',
    author: 'DubaiEntrepreneur', authorInit: 'DE',
    time: '5 days ago', replies: 62, views: 2100, likes: 134,
    preview: "This is the most common question I see. Let me break it down clearly. Free Zone = 100% ownership but can only deal with clients outside UAE. Mainland = local sponsor required (historically) but can sell to UAE residents directly.",
    tags: ['UAE', 'Legal', 'Free Zone'],
  },
  {
    id: 3, pinned: false,
    category: 'Canada',
    title: 'Which province is easiest for Pakistani nationals to start a tech company?',
    author: 'SanaMalik_Dev', authorInit: 'SD',
    time: '1 week ago', replies: 28, views: 890, likes: 45,
    preview: "I've been researching Ontario vs BC vs Alberta for starting my consulting firm. Each province has different rules, tax rates, and immigration pathways.",
    tags: ['Canada', 'Tech', 'Province'],
  },
  {
    id: 4, pinned: false,
    category: 'Visa & Travel',
    title: 'UK Innovator Founder Visa — realistic for a Pakistani entrepreneur in 2024?',
    author: 'PakUKVisa', authorInit: 'PV',
    time: '2 weeks ago', replies: 33, views: 1560, likes: 72,
    preview: "The UK Innovator Founder Visa looks great on paper. You get 3 years, can extend, path to settlement. But the endorsing body requirement is tricky. Here's what I found out.",
    tags: ['Visa', 'UK', 'Immigration'],
  },
  {
    id: 5, pinned: false,
    category: 'USA',
    title: 'Best US states to register an LLC as a Pakistani non-resident — Delaware vs Wyoming',
    author: 'USABizPak', authorInit: 'UP',
    time: '3 weeks ago', replies: 41, views: 2300, likes: 98,
    preview: "Short answer: Delaware for investor-funded companies. Wyoming for privacy and low fees. Long answer below. I registered a Wyoming LLC from Pakistan without ever visiting the US.",
    tags: ['USA', 'LLC', 'Tax'],
  },
  {
    id: 6, pinned: false,
    category: 'Finance',
    title: 'How do you receive international payments in Pakistan for your foreign company?',
    author: 'FinancePK', authorInit: 'FP',
    time: '1 month ago', replies: 55, views: 3100, likes: 167,
    preview: "This is the most practical question nobody talks about. If you have a UK/US/UAE company but live in Pakistan, how do you actually receive money? Payoneer, Wise, local bank — I've tested all of them.",
    tags: ['Finance', 'Banking', 'General'],
  },
  {
    id: 7, pinned: false,
    category: 'Australia',
    title: 'Starting a business in Australia on a Partner Visa — everything you need to know',
    author: 'AyeKhan_MEL', authorInit: 'AK',
    time: '1 month ago', replies: 19, views: 760, likes: 43,
    preview: "Partner visa holders absolutely can run their own business in Australia. I did it. Here's the exact process for getting your ABN, registering as a sole trader or company, and the council permits you need.",
    tags: ['Australia', 'Visa', 'Setup'],
  },
  {
    id: 8, pinned: false,
    category: 'Legal',
    title: 'Warning: Common legal mistakes Pakistanis make when starting abroad',
    author: 'LegalAdvice_PK', authorInit: 'LA',
    time: '6 weeks ago', replies: 71, views: 4200, likes: 213,
    preview: "I've seen the same mistakes over and over. Registering in a free zone when you needed mainland. Not renewing your trade licence on time. Not having a proper operating agreement. This post covers the top 10.",
    tags: ['Legal', 'Warning', 'General'],
  },
]

function ThreadCard({ thread, onClick }) {
  return (
    <article
      className={`thread-card${thread.pinned ? ' thread-card--pinned' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`Thread: ${thread.title}`}
    >
      <div className="thread-card__left">
        {thread.pinned && (
          <span className="thread-card__pin" aria-label="Pinned thread">
            <Pin size={13} />
          </span>
        )}
        <div className="thread-card__avatar" aria-hidden="true">{thread.authorInit}</div>
      </div>

      <div className="thread-card__body">
        <div className="thread-card__meta-top">
          <span className="badge badge-blue thread-card__category">{thread.category}</span>
          {thread.tags.slice(0, 2).map(t => (
            <span key={t} className="thread-card__tag">{t}</span>
          ))}
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
        <span className="thread-card__stat" title="Replies">
          <MessageSquare size={14} aria-hidden="true" />
          <span>{thread.replies}</span>
        </span>
        <span className="thread-card__stat" title="Views">
          <Eye size={14} aria-hidden="true" />
          <span>{thread.views.toLocaleString()}</span>
        </span>
        <span className="thread-card__stat" title="Likes">
          <ThumbsUp size={14} aria-hidden="true" />
          <span>{thread.likes}</span>
        </span>
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
    const matchQ   = !q || t.title.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  return (
    <main className="forum-page page-content">
      <div className="forum-hero">
        <div className="container">
          <p className="section-label">Community Forum</p>
          <h1 className="forum-hero__title">
            Learn from <span className="gradient-text">Pakistani Entrepreneurs</span>
          </h1>
          <p className="forum-hero__subtitle">
            Ask questions, share experiences, and get peer support from others on the same journey.
          </p>

          {/* Search */}
          <div className="forum-search-wrap">
            <div className="forum-search">
              <Search size={18} className="forum-search__icon" aria-hidden="true" />
              <input
                type="search"
                className="forum-search__input"
                placeholder="Search discussions…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                maxLength={100}
                aria-label="Search forum discussions"
              />
            </div>
            <button className="btn btn-primary" disabled aria-label="New post (coming soon)">
              <Plus size={16} />
              New Post
            </button>
          </div>
        </div>
      </div>

      <div className="container forum-body">
        {/* Category tabs */}
        <nav className="forum-categories" aria-label="Forum categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`forum-category-btn${activeCategory === cat ? ' forum-category-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Thread count */}
        <p className="forum-count" aria-live="polite">
          <MessageSquare size={14} aria-hidden="true" />
          <strong>{filtered.length}</strong> discussions
        </p>

        {/* Threads */}
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
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => { setQuery(''); setActiveCategory('All') }}
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="forum-cta-note">
          <p>
            <strong>Note:</strong> This is a preview of the community forum. Full posting functionality, accounts, and moderation coming soon.
          </p>
        </div>
      </div>
    </main>
  )
}
