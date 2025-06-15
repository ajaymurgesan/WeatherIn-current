import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GfGWeatherApp from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GfGWeatherApp />
  </StrictMode>,
)
