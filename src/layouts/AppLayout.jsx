import { Outlet } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

function AppLayout({ theme, onToggleTheme }) {
  return (
    <main className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:mb-8 sm:px-5 md:px-6 dark:border-slate-800 dark:bg-slate-900/90">
          <p className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-slate-100">
            Ba0Ba0 FlashCards
          </p>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </header>

        <section className="flex-1 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:p-10 dark:border-slate-800 dark:bg-slate-900">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default AppLayout
