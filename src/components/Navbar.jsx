import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Explore', to: '/explore' },
  { label: 'Roadmap', to: '/roadmap' },
  { label: 'Costs', to: '/costs' },
  { label: 'Stories', to: '/stories' },
  { label: 'Forum', to: '/forum' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 12)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="LaunchBridge home" onClick={() => setOpen(false)}>
          <span className="navbar__logo-icon" aria-hidden="true">
            <Globe size={22} strokeWidth={2.5} />
          </span>
          <span className="navbar__logo-text">
            Launch<span>Bridge</span>
          </span>
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <Link to="/roadmap" className="btn btn-primary btn-sm">
            Start Free
          </Link>
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="mobile-menu" className={`navbar__mobile${open ? ' navbar__mobile--open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <ul className="navbar__mobile-links" role="list">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-cta">
            <Link to="/roadmap" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              Start Free - No Sign-up Needed
            </Link>
          </div>
        </nav>
      </div>

      {open && <div className="navbar__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  )
}
