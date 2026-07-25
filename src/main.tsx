import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PasswordGate from './components/PasswordGate.tsx'
import ProvedorPage from './pages/ProvedorPage.tsx'
import SVAPage from './pages/SVAPage.tsx'
import SistemasPage from './pages/SistemasPage.tsx'
import FinControlPage from './pages/FinControlPage.tsx'
import HomePage from './pages/HomePage.tsx'
import PrivacidadePage from './pages/PrivacidadePage.tsx'
import HubPage from './pages/HubPage.tsx'

// Path-based routing sem React Router
const path = window.location.pathname
const Root = path.startsWith('/sva')
  ? SVAPage
  : path.startsWith('/privacidade') || path.startsWith('/privacy')
  ? PrivacidadePage
  : path.startsWith('/provedor')
  ? ProvedorPage
  : path.startsWith('/sistemas')
  ? SistemasPage
  : path.startsWith('/fincontrol')
  ? FinControlPage
  : path.startsWith('/hub') && !path.startsWith('/hubia')
  ? HubPage
  : path.startsWith('/hubia')
  ? HomePage
  : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordGate>
      <Root />
    </PasswordGate>
  </StrictMode>,
)

