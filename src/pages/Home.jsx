import HeroSection from '../components/HeroSection'
import FeatureSection from '../components/FeatureSection'

function Home({ theme, onToggleTheme }) {
  return (
    <main className="min-h-screen">
      <HeroSection theme={theme} onToggleTheme={onToggleTheme} />
      <FeatureSection />
    </main>
  )
}

export default Home
