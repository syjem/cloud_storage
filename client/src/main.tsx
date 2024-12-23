import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from './components/mode-toggle.tsx';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)