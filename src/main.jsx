import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/base.css'

// Lazy-load pages so each route ships only its own CSS/JS (keeps it fast
// and avoids the two pages' global styles clashing).
const Home = lazy(() => import('./pages/Home.jsx'))
const SocialMedia = lazy(() => import('./pages/SocialMedia.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/social-media" element={<SocialMedia />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
