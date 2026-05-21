import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react'
import './Chatbot.css'

/* Canned responses keyed on keywords — no external API needed for UI demo */
const RESPONSES = [
  {
    match: ['uk', 'united kingdom', 'britain', 'england'],
    reply: 'To start a business in the UK, you can register a Private Limited Company (Ltd) via Companies House for just £12–£15 online. The process takes 1–3 days. You will also need to register for Corporation Tax with HMRC within 3 months of trading.',
  },
  {
    match: ['uae', 'dubai', 'abu dhabi', 'emirates'],
    reply: 'The UAE offers two main options: Free Zone (100% foreign ownership, no local sponsor needed) or Mainland (requires a local UAE national as partner/sponsor historically, but recent reforms allow 100% ownership in many sectors). A Free Zone trade licence starts from around AED 10,000–15,000.',
  },
  {
    match: ['usa', 'united states', 'america', 'us'],
    reply: 'In the USA, most foreign entrepreneurs register an LLC in Delaware or Wyoming for the best tax and privacy advantages — even without visiting the US. You will need an EIN (free from IRS), a registered agent (~$50–300/year), and a state filing fee (~$90–300 depending on state).',
  },
  {
    match: ['canada', 'toronto', 'ontario', 'bc'],
    reply: 'In Canada, you can incorporate federally via Corporations Canada for CA$200, or provincially (e.g., Ontario for CA$300). You will need to register for GST/HST if your revenue exceeds CA$30,000. Banking requires physical presence or a trusted director in Canada.',
  },
  {
    match: ['australia', 'sydney', 'melbourne'],
    reply: 'Australia has one of the simplest business registration processes. An ABN (Australian Business Number) is free and takes minutes online. Registering a company costs AUD $497 via ASIC. If your annual turnover exceeds AUD $75,000, you must register for GST.',
  },
  {
    match: ['visa', 'travel', 'immigration', 'permit'],
    reply: 'Visa requirements depend heavily on your target country and your purpose. For business travel, many countries allow short-stay visas. For residency and working abroad, you typically need an investor visa, entrepreneur visa, or a business visa tied to your company. Use our Roadmap Generator to get country-specific visa guidance.',
  },
  {
    match: ['cost', 'price', 'fee', 'budget', 'money'],
    reply: 'Registration costs vary widely: UK Ltd company is as low as £12. US LLC ranges from $50–$500 depending on state. UAE Free Zone starts from AED 10,000+. Visit our Cost Estimator page for a full breakdown by country and business type.',
  },
  {
    match: ['restaurant', 'food', 'cafe', 'catering'],
    reply: 'For a restaurant or food business, you will typically need: (1) Company registration, (2) Food hygiene/safety certification, (3) Local council or health department approval, (4) Premises licence (if serving alcohol), (5) Business bank account. The Roadmap Generator gives you the full list for your specific country.',
  },
  {
    match: ['pakistan', 'pk', 'karachi', 'lahore', 'islamabad'],
    reply: 'LaunchBridge is built specifically for Pakistani entrepreneurs. Whether you are starting locally in Pakistan or going global — we cover the full process. Use the Roadmap Generator, select Pakistan or your target country, and get your complete guide.',
  },
  {
    match: ['help', 'how', 'start', 'begin', 'where'],
    reply: "Great question! Here's how to use LaunchBridge: (1) Go to the Explore page and pick your target country, (2) Use the Roadmap Generator — select country + business type + your location, (3) You'll get a full step-by-step guide instantly. It's 100% free, no sign-up needed!",
  },
]

const FALLBACK = "I'm not sure about that specific question. Try the Roadmap Generator for personalized guidance, or browse the Explore page for country-specific information. You can also ask in the Community Forum where other Pakistani entrepreneurs can help!"

function matchResponse(input) {
  const lower = input.toLowerCase()
  for (const { match, reply } of RESPONSES) {
    if (match.some(kw => lower.includes(kw))) return reply
  }
  return FALLBACK
}

const INITIAL_MESSAGES = [
  {
    id: 0,
    role: 'assistant',
    text: "Hi! I'm the LaunchBridge AI Assistant 👋\n\nAsk me anything about starting a business abroad — visas, registration, costs, documents, or any specific country. I'm here to help!",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
]

function Message({ msg }) {
  const isBot = msg.role === 'assistant'
  return (
    <div className={`chat-msg${isBot ? ' chat-msg--bot' : ' chat-msg--user'}`}>
      <div className={`chat-msg__avatar${isBot ? ' chat-msg__avatar--bot' : ' chat-msg__avatar--user'}`} aria-hidden="true">
        {isBot ? <Bot size={16} /> : <User size={14} />}
      </div>
      <div className="chat-msg__bubble-wrap">
        <p className="chat-msg__bubble">{msg.text}</p>
        <span className="chat-msg__time">{msg.time}</span>
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [open,      setOpen]      = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [messages,  setMessages]  = useState(INITIAL_MESSAGES)
  const [input,     setInput]     = useState('')
  const [typing,    setTyping]    = useState(false)
  const [msgId,     setMsgId]     = useState(1)
  const endRef  = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && !minimised) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open, minimised])

  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, minimised])

  const sendMessage = useCallback(() => {
    const text = input.trim().replace(/[<>"]/g, '').slice(0, 500)
    if (!text || typing) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg = { id: msgId, role: 'user', text, time: now }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setMsgId(prev => prev + 2)

    /* Simulate typing delay */
    const delay = 600 + Math.random() * 700
    setTimeout(() => {
      const reply = matchResponse(text)
      const botMsg = {
        id: msgId + 1,
        role: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, botMsg])
      setTyping(false)
    }, delay)
  }, [input, typing, msgId])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          className="chatbot-fab"
          onClick={() => setOpen(true)}
          aria-label="Open AI assistant"
        >
          <MessageSquare size={22} />
          <span className="chatbot-fab__badge" aria-hidden="true">AI</span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className={`chatbot-window${minimised ? ' chatbot-window--mini' : ''}`}
          role="dialog"
          aria-label="LaunchBridge AI Assistant"
          aria-modal="false"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__info">
              <div className="chatbot-header__avatar" aria-hidden="true">
                <Bot size={16} />
              </div>
              <div>
                <p className="chatbot-header__name">AI Assistant</p>
                <p className="chatbot-header__status">
                  <span className="chatbot-header__dot" aria-hidden="true" />
                  Online
                </p>
              </div>
            </div>
            <div className="chatbot-header__actions">
              <button
                className="chatbot-header__btn"
                onClick={() => setMinimised(v => !v)}
                aria-label={minimised ? 'Expand chat' : 'Minimise chat'}
              >
                {minimised ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>
              <button
                className="chatbot-header__btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div className="chatbot-messages" aria-live="polite" aria-atomic="false">
                {messages.map(msg => <Message key={msg.id} msg={msg} />)}
                {typing && (
                  <div className="chat-msg chat-msg--bot">
                    <div className="chat-msg__avatar chat-msg__avatar--bot" aria-hidden="true">
                      <Bot size={16} />
                    </div>
                    <div className="chat-typing" aria-label="AI is typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Suggestions */}
              <div className="chatbot-suggestions" aria-label="Quick questions">
                {['UK business setup', 'UAE visa info', 'Cost estimator', 'How to start'].map(s => (
                  <button
                    key={s}
                    className="chatbot-suggestion"
                    onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50) }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="chatbot-input-row">
                <label htmlFor="chat-input" className="sr-only">Type your message</label>
                <input
                  id="chat-input"
                  ref={inputRef}
                  type="text"
                  className="chatbot-input"
                  placeholder="Ask me anything…"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={500}
                  disabled={typing}
                  autoComplete="off"
                  spellCheck="true"
                />
                <button
                  className="chatbot-send"
                  onClick={sendMessage}
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
