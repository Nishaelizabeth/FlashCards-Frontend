import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chinese from './pages/Chinese'
import English from './pages/English'
import Flashcards from './pages/Flashcards'
import Home from './pages/Home'

const THEME_STORAGE_KEY = 'flashcards-theme'

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home theme={theme} onToggleTheme={toggleTheme} />}
        />
        <Route
          path="/english"
          element={<English theme={theme} onToggleTheme={toggleTheme} />}
        />
        <Route
          path="/chinese"
          element={<Chinese theme={theme} onToggleTheme={toggleTheme} />}
        />
        <Route
          path="/flashcards"
          element={<Flashcards theme={theme} onToggleTheme={toggleTheme} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
