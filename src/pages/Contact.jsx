import { useEffect, useRef } from 'react'
import rawHtml from './Contact.frag.html?raw'
import logo from '../assets/logo.png'
import './Contact.css'

const html = rawHtml.replaceAll('__LOGO__', logo)

// Update the page's description + canonical tags for this route (helps SEO/sharing).
function setMeta(desc, canonical) {
  let d = document.querySelector('meta[name="description"]')
  if (d) d.setAttribute('content', desc)
  let c = document.querySelector('link[rel="canonical"]')
  if (c) c.setAttribute('href', canonical)
}

// Encode a plain object as application/x-www-form-urlencoded for Netlify Forms.
function encode(data) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')
}

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    document.title = 'Grow Up — تواصل معنا'
    document.documentElement.setAttribute('dir', 'rtl')
    setMeta('تواصل مع Grow Up — احكيلنا عن مشروعك واحجز استشارتك المجانية. اتصال، واتساب، أو عبر النموذج.', 'https://growup-ps.com/contact')
    const root = ref.current
    if (!root) return

    // mobile menu toggle
    const toggle = root.querySelector('#navToggle')
    const navLinks = root.querySelector('#navLinks')
    const onToggle = () => {
      const open = navLinks.classList.toggle('open')
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    }
    const onOutside = (e) => {
      if (navLinks && navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open')
        toggle.setAttribute('aria-expanded', 'false')
      }
    }
    if (toggle && navLinks) {
      toggle.addEventListener('click', onToggle)
      document.addEventListener('click', onOutside)
    }

    const form = root.querySelector('#contactForm')
    const status = root.querySelector('#ctStatus')
    const success = root.querySelector('#ctSuccess')
    const submitBtn = root.querySelector('.ct-submit')
    if (!form) {
      return () => {
        if (toggle) toggle.removeEventListener('click', onToggle)
        document.removeEventListener('click', onOutside)
      }
    }

    const onSubmit = (e) => {
      e.preventDefault()
      status.classList.remove('err')
      status.textContent = 'جارِ الإرسال…'
      submitBtn.setAttribute('disabled', 'true')

      const data = Object.fromEntries(new FormData(form).entries())

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...data }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('bad status')
          form.hidden = true
          success.hidden = false
          success.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
        .catch(() => {
          status.classList.add('err')
          status.textContent = 'صار خطأ بالإرسال — جرّب تاني أو تواصل معنا واتساب.'
          submitBtn.removeAttribute('disabled')
        })
    }

    form.addEventListener('submit', onSubmit)
    return () => {
      form.removeEventListener('submit', onSubmit)
      if (toggle) toggle.removeEventListener('click', onToggle)
      document.removeEventListener('click', onOutside)
    }
  }, [])

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
}
