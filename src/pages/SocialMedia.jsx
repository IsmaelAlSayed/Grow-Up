import { useEffect, useRef } from 'react'
import rawHtml from './SocialMedia.frag.html?raw'
import logo from '../assets/logo.png'
import './SocialMedia.css'

const html = rawHtml
  .replaceAll('__LOGO__', logo)
  .replaceAll('https://claude.ai/artifact/MTP1qysmrc1jv6SjHM9f1C', '/')

export default function SocialMedia() {
  const ref = useRef(null)

  useEffect(() => {
    document.title = 'Grow Up — روابطنا'
    const root = ref.current
    if (!root) return

    const btn = root.querySelector('#menuBtn')
    const menu = root.querySelector('#menu')
    if (!btn || !menu) return

    const toggle = () => {
      const open = menu.classList.toggle('open')
      btn.setAttribute('aria-expanded', open ? 'true' : 'false')
    }
    const onDocClick = (e) => {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open')
        btn.setAttribute('aria-expanded', 'false')
      }
    }
    btn.addEventListener('click', toggle)
    document.addEventListener('click', onDocClick)
    return () => {
      btn.removeEventListener('click', toggle)
      document.removeEventListener('click', onDocClick)
    }
  }, [])

  return <div dir="ltr" ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
}
