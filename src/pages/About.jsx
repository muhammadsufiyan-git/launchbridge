import { Globe, Users, Shield, Zap, Mail, MapPin, GraduationCap, Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './About.css'

const VALUES = [
  { Icon: Shield,  color: 'blue',   title: 'Accuracy First',       desc: 'Every guide is researched from official government sources. We flag what requires professional advice.' },
  { Icon: Users,   color: 'green',  title: 'Pakistani Community',  desc: 'Built specifically for Pakistani entrepreneurs. We understand your specific challenges and legal situation.' },
  { Icon: Globe,   color: 'gold',   title: 'Truly Global',         desc: 'From the USA to Singapore to Germany — we cover 180+ countries with up-to-date business setup information.' },
  { Icon: Zap,     color: 'purple', title: 'Simple & Fast',        desc: 'No jargon. No walls of text. Just clear, actionable steps you can actually follow without a law degree.' },
]

const FAQS = [
  {
    q: 'Is LaunchBridge completely free?',
    a: 'The core features — roadmap generator, cost estimator, country explorer, and forum — are completely free with no sign-up required. Premium features like detailed AI roadmaps, progress tracking, and consultant connections will be available via a subscription in future.',
  },
  {
    q: 'How accurate is the information?',
    a: 'All information is researched from official government websites, embassy resources, and verified local business consultants. However, laws change frequently. Always verify the latest requirements with official sources and consult a licensed professional before making decisions.',
  },
  {
    q: 'Can I use this to start a business from Pakistan without moving abroad?',
    a: 'Yes. Many users register businesses in countries like the USA, UK, or UAE while remaining in Pakistan — particularly for e-commerce and consulting companies. The platform covers this scenario and explains the relevant rules.',
  },
  {
    q: 'What is the difference between a Free Zone and Mainland company in the UAE?',
    a: 'A Free Zone company gives you 100% ownership but limits you to dealing with international clients or selling within the free zone. A Mainland company allows you to trade directly with UAE-based customers but historically required a local sponsor. The Roadmap page explains this in detail for your specific business type.',
  },
  {
    q: 'Do you offer legal or immigration advice?',
    a: 'No. LaunchBridge provides educational information only. Nothing on this platform constitutes legal, immigration, or financial advice. We strongly recommend consulting a licensed lawyer or immigration consultant for your specific situation.',
  },
  {
    q: 'Will you add more countries?',
    a: 'Yes. We are continuously expanding our coverage. If you need a country that is not yet listed, please contact us and we will prioritise it.',
  },
]

export default function About() {
  return (
    <main className="about-page page-content">
      {/* Hero */}
      <div className="about-hero">
        <div className="container">
          <p className="section-label">About LaunchBridge</p>
          <h1 className="about-hero__title">
            Built to Bridge the Gap Between{' '}
            <span className="gradient-text">Dreams and Reality</span>
          </h1>
          <p className="about-hero__subtitle">
            Millions of Pakistanis have the drive, the savings, and the skills to start a successful business abroad. The only thing standing in their way is information — scattered, complicated, and inaccessible.
            <br /><br />
            LaunchBridge was built to solve exactly this problem.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="about-mission section">
        <div className="container about-mission__inner">
          <div className="about-mission__text">
            <p className="section-label">Our Mission</p>
            <h2 className="section-title">Pakistan se Duniya Tak</h2>
            <p className="about-mission__body">
              Pakistan is home to one of the world's most entrepreneurial communities. From Karachi to the UK, from Lahore to Canada, Pakistanis have built successful businesses across every continent.
            </p>
            <p className="about-mission__body">
              But too many dreams are abandoned at the starting line — not because people lack the ability or the resources, but because they cannot find a clear, simple, trustworthy answer to the question: <em>"How do I actually do this?"</em>
            </p>
            <p className="about-mission__body">
              LaunchBridge answers that question. One platform. Every country. Step by step.
            </p>
          </div>
          <div className="about-mission__visual" aria-hidden="true">
            <div className="about-mission__globe-wrap">
              <Globe size={180} strokeWidth={0.5} className="about-mission__globe" />
              <div className="about-mission__badge-1 badge badge-blue">🇵🇰 Pakistan</div>
              <div className="about-mission__badge-2 badge badge-green">🌍 180+ Countries</div>
              <div className="about-mission__badge-3 badge badge-gold">🚀 Launch Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
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

      {/* Creator */}
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
                This platform was born from a real observation: the people around me — young students, experienced professionals, and driven businessmen — all had the same dream and the same problem. They knew <em>what</em> they wanted to build. They just didn't know <em>how</em> to get started in a foreign country.
              </p>
              <p className="about-creator__bio">
                LaunchBridge is my answer to that gap. It is not just an Aptech project — it is a genuine solution to a problem that affects millions of Pakistanis every day. With the right development and support, I believe it can become the number one business launch platform for South Asian entrepreneurs worldwide.
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

      {/* FAQ */}
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

      {/* Contact */}
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
                  <span>hello@launchbridge.pk</span>
                </div>
                <div className="about-contact__detail">
                  <MapPin size={16} />
                  <span>Aptech Computer Education, Pakistan</span>
                </div>
              </div>
            </div>

            <form
              className="about-contact__form"
              onSubmit={e => e.preventDefault()}
              aria-label="Contact form"
              noValidate
            >
              <div className="about-contact__form-row">
                <div>
                  <label htmlFor="contact-name" className="about-contact__form-label">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="input"
                    placeholder="Muhammad Ali"
                    maxLength={100}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="about-contact__form-label">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="input"
                    placeholder="ali@example.com"
                    maxLength={254}
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="about-contact__form-label">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  className="input"
                  placeholder="Country request, feedback, partnership…"
                  maxLength={200}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="about-contact__form-label">Message</label>
                <textarea
                  id="contact-message"
                  className="input about-contact__textarea"
                  placeholder="Tell us about your question or idea…"
                  rows={5}
                  maxLength={2000}
                />
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
