import { Link } from 'react-router-dom'
import { Globe, Mail } from 'lucide-react'
import './Footer.css'

const LINKS = {
  Platform: [
    { label: 'Explore Countries', to: '/explore' },
    { label: 'Roadmap Generator', to: '/roadmap' },
    { label: 'Cost Estimator', to: '/costs' },
    { label: 'Success Stories', to: '/stories' },
  ],
  Community: [
    { label: 'Forum', to: '/forum' },
    { label: 'About LaunchBridge', to: '/about' },
    { label: 'Contact Us', to: '/about#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Disclaimer', to: '#' },
  ],
}

const SOCIALS = [
  { label: 'Twitter / X', href: '#', text: 'X' },
  { label: 'LinkedIn', href: '#', text: 'in' },
  { label: 'Facebook', href: '#', text: 'f' },
  { label: 'Instagram', href: '#', text: 'IG' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="LaunchBridge home">
            <span className="footer__logo-icon" aria-hidden="true">
              <Globe size={20} strokeWidth={2.5} />
            </span>
            <span className="footer__logo-text">
              Launch<span>Bridge</span>
            </span>
          </Link>
          <p className="footer__tagline">
            Build beyond borders with practical launch roadmaps, cost estimates, and country guidance.
          </p>
          <div className="footer__socials">
            {SOCIALS.map(({ label, href, text }) => (
              <a key={label} href={href} className="footer__social-link" aria-label={label} rel="noopener noreferrer">
                <span aria-hidden="true" style={{ fontSize: '0.78rem', fontWeight: 800 }}>{text}</span>
              </a>
            ))}
          </div>
        </div>

        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading} className="footer__col">
            <h3 className="footer__col-title">{heading}</h3>
            <ul className="footer__col-links" role="list">
              {items.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="footer__col-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__newsletter">
          <h3 className="footer__col-title">Stay Updated</h3>
          <p className="footer__newsletter-text">
            Get new country guides and business setup tips delivered to your inbox.
          </p>
          <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()} aria-label="Newsletter signup">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input id="footer-email" type="email" placeholder="your@email.com" className="footer__newsletter-input" autoComplete="email" required maxLength={254} />
            <button type="submit" className="btn btn-primary btn-sm">
              <Mail size={15} />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__copy">
          Copyright {new Date().getFullYear()} LaunchBridge. All rights reserved.
          Built by <strong>Muhammad Sufiyan</strong> - Aptech Computer Education, 2026.
        </p>
        <p className="footer__disclaimer">
          Information provided is for educational purposes only. Always consult a licensed professional for legal and financial advice.
        </p>
      </div>
    </footer>
  )
}
