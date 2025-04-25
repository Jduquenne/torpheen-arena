import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SoundProvider } from './context/SoundContext.tsx'
import App from './App.tsx'

import './index.css'
import './App.css'
import './global.css'

import "./i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </StrictMode>,
)
