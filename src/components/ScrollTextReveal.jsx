import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './ScrollTextReveal.css'

const TEXT_SELECTOR = [
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'blockquote',
  'label',
  'summary',
  '.btn',
  '.badge',
  '.navbar__link',
  '.navbar__mobile-link',
  '.country-card__stat',
  '.thread-card__tag',
  '.footer__col-link',
  '.footer__copy',
  '.footer__disclaimer',
].join(',')

function getRevealDirection(node, index) {
  if (node.closest('.hero__content') || node.matches('.explore-header h1, .roadmap-hero h1, .costs-hero h1, .stories-hero h1, .forum-hero h1, .about-hero h1')) {
    return 'left'
  }

  if (node.closest('.mission-console') || node.closest('.hero__visual')) {
    return 'right'
  }

  if (node.matches('h1, h2, .section-title')) {
    return index % 2 === 0 ? 'left' : 'right'
  }

  if (node.closest('.roadmap-phase') || node.closest('.thread-card') || node.closest('.story-card')) {
    return index % 2 === 0 ? 'left' : 'right'
  }

  if (node.matches('.btn, .badge')) return 'pop'
  return 'up'
}

export default function ScrollTextReveal() {
  const location = useLocation()

  useEffect(() => {
    const root = document.querySelector('.page')
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prepare = () => {
      const nodes = Array.from(root.querySelectorAll(TEXT_SELECTOR))
        .filter(node => !node.closest('.chatbot-window') && !node.classList.contains('sr-only'))

      nodes.forEach((node, index) => {
        node.classList.add('text-reveal')
        node.dataset.revealDirection = getRevealDirection(node, index)
        node.style.setProperty('--reveal-delay', `${Math.min(index % 8, 7) * 42}ms`)
        if (reduceMotion) node.classList.add('text-reveal--visible')
      })

      return nodes
    }

    const nodes = prepare()
    if (reduceMotion) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('text-reveal--resetting')
          entry.target.classList.add('text-reveal--visible')
        } else {
          entry.target.classList.add('text-reveal--resetting')
          entry.target.classList.remove('text-reveal--visible')
        }
      })
    }, { rootMargin: '-4% 0px -4% 0px', threshold: 0.12 })

    nodes.forEach(node => observer.observe(node))

    const mutationObserver = new MutationObserver(() => {
      prepare()
      Array.from(root.querySelectorAll('.text-reveal')).forEach(node => observer.observe(node))
    })
    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [location.pathname])

  return null
}
