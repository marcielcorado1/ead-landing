import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SVAPage from './pages/SVAPage.tsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx'

// Path-based routing sem React Router
const path = window.location.pathname
const Root = path.startsWith('/sva')
  ? SVAPage
  : path.startsWith('/privacidade') || path.startsWith('/privacy')
  ? PrivacyPolicyPage
  : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

