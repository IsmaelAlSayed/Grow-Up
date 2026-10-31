import { useEffect, useRef } from 'react'
import rawHtml from './Home.frag.html?raw'
import logo from '../assets/logo.png'
import './Home.css'

const html = rawHtml.replaceAll('__LOGO__', logo)

export default function Home() {
  const ref = useRef(null)

  useEffect(() => {
    document.title = 'Grow Up — وكالة تسويق'
    document.documentElement.setAttribute('dir', 'rtl')
    const root = ref.current
    if (!root) return

    // smooth scroll for in-page anchors
    const anchors = root.querySelectorAll('a[href^="#"]')
    const onAnchor = (e) => {
      const id = e.currentTarget.getAttribute('href')
      if (id.length > 1) {
        const t = document.querySelector(id)
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
      }
    }
    anchors.forEach((a) => a.addEventListener('click', onAnchor))

    // copy buttons
    const copyBtns = root.querySelectorAll('.copy')
    const onCopy = (e) => {
      const btn = e.currentTarget
      const txt = btn.getAttribute('data-copy')
      const done = () => {
        const o = btn.textContent
        btn.textContent = 'تم النسخ ✓'
        setTimeout(() => { btn.textContent = o }, 1600)
      }
      const fallback = () => {
        try {
          const ta = document.createElement('textarea')
          ta.value = txt
          document.body.appendChild(ta); ta.select()
          document.execCommand('copy'); document.body.removeChild(ta)
        } catch (_) { /* ignore */ }
      }
      try {
        navigator.clipboard.writeText(txt).then(done, () => { fallback(); done() })
      } catch (_) { fallback(); done() }
    }
    copyBtns.forEach((b) => b.addEventListener('click', onCopy))

    return () => {
      anchors.forEach((a) => a.removeEventListener('click', onAnchor))
      copyBtns.forEach((b) => b.removeEventListener('click', onCopy))
    }
  }, [])

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
}
