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

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M17.6 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.3L5.1 21H2l7.3-8.4L1.6 3h6.4l4.4 5.8L17.6 3Zm-1.1 16.2h1.7L7.1 4.7H5.2l11.3 14.5Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M5.1 8.7H2V22h3.1V8.7ZM3.6 2C2.6 2 1.8 2.8 1.8 3.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8S4.6 2 3.6 2Zm8 6.7h-3V22h3v-6.6c0-1.8.8-3.2 2.5-3.2 1.5 0 2.1 1.1 2.1 3V22h3.1v-7.2c0-3.8-2-6.3-5.1-6.3-1.8 0-2.9 1-3.6 2V8.7Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M14.2 8.4V6.9c0-.7.5-.9 1-.9h2.5V2.2L14.3 2c-3.4 0-5.2 2-5.2 5.5v.9H6v4.1h3.1V22h4.3v-9.5h3.3l.6-4.1h-3.1Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5-2.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  )
}

const SOCIALS = [
  { label: 'X / Twitter', href: '#', Icon: XIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedinIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
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
            {SOCIALS.map(({ label, href, Icon }) => (
              <a key={label} href={href} className="footer__social-link" aria-label={label} rel="noopener noreferrer">
                <Icon />
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
