import { Globe, Users, Shield, Zap, Mail, MapPin, GraduationCap } from 'lucide-react'
import './About.css'

const VALUES = [
  { Icon: Shield, color: 'blue', title: 'Accuracy First', desc: 'Guides are structured around official requirements and clearly flag where professional advice is needed.' },
  { Icon: Users, color: 'green', title: 'Founder-Centered', desc: 'Built for people who need practical steps, plain language, and confidence before they spend money.' },
  { Icon: Globe, color: 'gold', title: 'Truly Global', desc: 'From the USA to Singapore to Germany, LaunchBridge is designed for entrepreneurs building across borders.' },
  { Icon: Zap, color: 'purple', title: 'Simple & Fast', desc: 'No jargon. No endless tabs. Just clear actions you can follow without needing a law degree.' },
]

const FAQS = [
  {
    q: 'Is LaunchBridge completely free?',
    a: 'The core tools - roadmap generator, cost estimator, country explorer, and forum preview - are free with no sign-up required. Premium features may be added later.',
  },
  {
    q: 'How accurate is the information?',
    a: 'LaunchBridge is designed around official government information, embassy resources, and common local setup workflows. Requirements change often, so always verify the latest rules with official sources before making decisions.',
  },
  {
    q: 'Can I use this if I am not living in the target country?',
    a: 'Yes. Many founders register or plan companies while based elsewhere, especially for e-commerce, consulting, software, and holding-company structures. The roadmap helps you think through remote setup, travel, banking, and local representation.',
  },
  {
    q: 'What is the difference between a Free Zone and Mainland company in the UAE?',
    a: 'A Free Zone company often offers easier setup and foreign ownership, while Mainland setup can be better for trading directly in the local market. The best route depends on business activity, customers, office needs, and licensing.',
  },
  {
    q: 'Do you offer legal or immigration advice?',
    a: 'No. LaunchBridge provides educational information only. Nothing here is legal, immigration, tax, or financial advice. Consult licensed professionals for your exact situation.',
  },
  {
    q: 'Will you add more countries?',
    a: 'Yes. Coverage is meant to expand continuously as more country workflows and business types are added.',
  },
]

export default function About() {
  return (
    <main className="about-page page-content">
      <div className="about-hero">
        <div className="container">
          <p className="section-label">About LaunchBridge</p>
          <h1 className="about-hero__title">
            Built to Bridge the Gap Between <span className="gradient-text">Dreams and Reality</span>
          </h1>
          <p className="about-hero__subtitle">
            Entrepreneurs everywhere have ideas, skills, and ambition. The hard part is often the same: finding a clear, trustworthy path through registration, licences, costs, visas, banking, and local rules.
            <br /><br />
            LaunchBridge turns that messy research into a practical launch plan.
          </p>
        </div>
      </div>

      <section className="about-mission section">
        <div className="container about-mission__inner">
          <div className="about-mission__text">
            <p className="section-label">Our Mission</p>
            <h2 className="section-title">Build Beyond Borders</h2>
            <p className="about-mission__body">
              Starting a business in another country should not feel impossible before you even begin. The information exists, but it is scattered across government portals, consultant pages, old forum posts, and local rules.
            </p>
            <p className="about-mission__body">
              Too many good ideas stop at the planning stage because founders cannot answer one simple question: <em>"What should I do first?"</em>
            </p>
            <p className="about-mission__body">
              LaunchBridge answers that question. One platform. Every country. Step by step.
            </p>
          </div>
          <div className="about-mission__visual" aria-hidden="true">
            <div className="about-mission__globe-wrap">
              <Globe size={180} strokeWidth={0.5} className="about-mission__globe" />
              <div className="about-mission__badge-1 badge badge-blue">Global Founders</div>
              <div className="about-mission__badge-2 badge badge-green">180+ Countries</div>
              <div className="about-mission__badge-3 badge badge-gold">Launch Ready</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values section" aria-labelledby="values-heading">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Our Values</p>
            <h2 className="section-title" id="values-heading">What We Stand For</h2>
          </div>
          <div className="about-values__grid">
            {VALUES.map(({ Icon, color, title, desc }) => (
              <article key={title} className={`about-value-card about-value-card--${color}`}>
                <div className={`about-value-card__icon about-value-card__icon--${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="about-value-card__title">{title}</h3>
                <p className="about-value-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-creator section">
        <div className="container about-creator__inner">
          <div className="about-creator__card">
            <div className="about-creator__avatar" aria-hidden="true">
              <span>MS</span>
            </div>
            <div className="about-creator__info">
              <p className="section-label">Created By</p>
              <h2 className="about-creator__name">Muhammad Sufiyan</h2>
              <p className="about-creator__role">
                <GraduationCap size={16} aria-hidden="true" />
                Aptech Computer Education, 2026
              </p>
              <p className="about-creator__bio">
                LaunchBridge began as a practical answer to a real problem: people know what they want to build, but cross-border setup feels confusing before the first form is even opened.
              </p>
              <p className="about-creator__bio">
                The goal is to make the platform useful for founders worldwide, regardless of where they are based or where they want to launch.
              </p>
              <div className="about-creator__tags">
                <span className="badge badge-blue">React.js</span>
                <span className="badge badge-green">Node.js</span>
                <span className="badge badge-gold">MongoDB</span>
                <span className="badge badge-purple">Full Stack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-faq section" id="faq" aria-labelledby="faq-heading">
        <div className="container about-faq__inner">
          <div>
            <p className="section-label">FAQ</p>
            <h2 className="section-title" id="faq-heading">Frequently Asked Questions</h2>
          </div>
          <div className="about-faq__list">
            {FAQS.map(({ q, a }, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-item__question">
                  {q}
                  <span className="faq-item__icon" aria-hidden="true">+</span>
                </summary>
                <p className="faq-item__answer">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact section" id="contact" aria-labelledby="contact-heading">
        <div className="container">
          <div className="about-contact__card">
            <div className="about-contact__info">
              <p className="section-label">Get in Touch</p>
              <h2 className="about-contact__title" id="contact-heading">We'd Love to Hear from You</h2>
              <p className="about-contact__subtitle">
                Have a suggestion, a country to request, a story to share, or just want to say hello? Reach out.
              </p>
              <div className="about-contact__details">
                <div className="about-contact__detail">
                  <Mail size={16} />
                  <span>hello@launchbridge.com</span>
                </div>
                <div className="about-contact__detail">
                  <MapPin size={16} />
                  <span>Remote-first global project</span>
                </div>
              </div>
            </div>

            <form className="about-contact__form" onSubmit={e => e.preventDefault()} aria-label="Contact form" noValidate>
              <div className="about-contact__form-row">
                <div>
                  <label htmlFor="contact-name" className="about-contact__form-label">Your Name</label>
                  <input id="contact-name" type="text" className="input" placeholder="Alex Morgan" maxLength={100} autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="about-contact__form-label">Email Address</label>
                  <input id="contact-email" type="email" className="input" placeholder="alex@example.com" maxLength={254} autoComplete="email" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="about-contact__form-label">Subject</label>
                <input id="contact-subject" type="text" className="input" placeholder="Country request, feedback, partnership..." maxLength={200} />
              </div>
              <div>
                <label htmlFor="contact-message" className="about-contact__form-label">Message</label>
                <textarea id="contact-message" className="input about-contact__textarea" placeholder="Tell us about your question or idea..." rows={5} maxLength={2000} />
              </div>
              <button type="submit" className="btn btn-primary">
                <Mail size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
