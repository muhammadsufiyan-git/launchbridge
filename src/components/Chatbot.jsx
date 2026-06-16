import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react'
import './Chatbot.css'

const RESPONSES = [
  {
    match: ['uk', 'united kingdom', 'britain', 'england'],
    reply: 'To start a business in the UK, you can register a Private Limited Company (Ltd) via Companies House. You may also need Corporation Tax registration, VAT registration if thresholds apply, licences for regulated activities, and a business bank account.',
  },
  {
    match: ['uae', 'dubai', 'abu dhabi', 'emirates'],
    reply: 'The UAE commonly has two setup routes: Free Zone and Mainland. Free Zone is often simpler for international services, while Mainland can be better for selling directly in the local market. Licence cost and office requirements vary by activity.',
  },
  {
    match: ['usa', 'united states', 'america', 'us'],
    reply: 'In the USA, many founders compare LLC registration in states like Delaware and Wyoming. You usually need a registered agent, state filing, an EIN where applicable, and a banking/payment plan.',
  },
  {
    match: ['canada', 'toronto', 'ontario', 'bc'],
    reply: 'In Canada, compare federal incorporation with provincial registration. You may need GST/HST registration after revenue thresholds and should check banking, director, and local licence requirements.',
  },
  {
    match: ['australia', 'sydney', 'melbourne'],
    reply: 'Australia offers simple starting points such as ABN registration for sole traders and ASIC company registration for companies. GST registration is required after the relevant turnover threshold.',
  },
  {
    match: ['visa', 'travel', 'immigration', 'permit'],
    reply: 'Visa requirements depend on your target country, passport, business activity, and whether you plan to operate remotely or relocate. Use the Roadmap Generator for country-specific prompts, then verify with official sources.',
  },
  {
    match: ['cost', 'price', 'fee', 'budget', 'money'],
    reply: 'Registration costs vary widely by country and business activity. Use the Cost Estimator to compare company registration, licence, banking, workspace, accounting, and visa-related costs.',
  },
  {
    match: ['restaurant', 'food', 'cafe', 'catering'],
    reply: 'For a restaurant or food business, expect company registration, food safety requirements, premises approval, local authority registration, insurance, and staff/payroll setup.',
  },
  {
    match: ['help', 'how', 'start', 'begin', 'where'],
    reply: "Start with three steps: explore countries, choose your target market, then use the Roadmap Generator with your business type and current base. You will get a structured launch plan instantly.",
  },
]

const FALLBACK = 'I am not sure about that exact question yet. Try the Roadmap Generator for personalized guidance, or browse the Explore page for country-specific information.'

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
    text: "Hi! I'm your LaunchBridge assistant.\n\nAsk me anything about starting a business abroad: visas, registration, costs, documents, or a specific country.",
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
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [msgId, setMsgId] = useState(1)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && !minimised) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, minimised])

  useEffect(() => {
    if (open && !minimised) setTimeout(() => inputRef.current?.focus(), 100)
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
      {!open && (
        <button className="chatbot-fab" onClick={() => setOpen(true)} aria-label="Open launch assistant">
          <MessageSquare size={22} />
          <span className="chatbot-fab__badge" aria-hidden="true">Help</span>
        </button>
      )}

      {open && (
        <div className={`chatbot-window${minimised ? ' chatbot-window--mini' : ''}`} role="dialog" aria-label="LaunchBridge assistant" aria-modal="false">
          <div className="chatbot-header">
            <div className="chatbot-header__info">
              <div className="chatbot-header__avatar" aria-hidden="true">
                <Bot size={16} />
              </div>
              <div>
                <p className="chatbot-header__name">Launch Assistant</p>
                <p className="chatbot-header__status">
                  <span className="chatbot-header__dot" aria-hidden="true" />
                  Online
                </p>
              </div>
            </div>
            <div className="chatbot-header__actions">
              <button className="chatbot-header__btn" onClick={() => setMinimised(v => !v)} aria-label={minimised ? 'Expand chat' : 'Minimise chat'}>
                {minimised ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>
              <button className="chatbot-header__btn" onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={15} />
              </button>
            </div>
          </div>

          {!minimised && (
            <>
              <div className="chatbot-messages" aria-live="polite" aria-atomic="false">
                {messages.map(msg => <Message key={msg.id} msg={msg} />)}
                {typing && (
                  <div className="chat-msg chat-msg--bot">
                    <div className="chat-msg__avatar chat-msg__avatar--bot" aria-hidden="true">
                      <Bot size={16} />
                    </div>
                    <div className="chat-typing" aria-label="Assistant is typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="chatbot-suggestions" aria-label="Quick questions">
                {['UK business setup', 'UAE visa info', 'Cost estimator', 'How to start'].map(s => (
                  <button key={s} className="chatbot-suggestion" onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50) }}>
                    {s}
                  </button>
                ))}
              </div>

              <div className="chatbot-input-row">
                <label htmlFor="chat-input" className="sr-only">Type your message</label>
                <input id="chat-input" ref={inputRef} type="text" className="chatbot-input" placeholder="Ask me anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} maxLength={500} disabled={typing} autoComplete="off" spellCheck="true" />
                <button className="chatbot-send" onClick={sendMessage} disabled={!input.trim() || typing} aria-label="Send message">
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
