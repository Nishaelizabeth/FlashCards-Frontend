import { useState } from 'react'
import { Link } from 'react-router-dom'
import { generateEnglish } from '../services/api'

function English({ theme, onToggleTheme }) {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    const trimmedTopic = topic.trim()
    if (!trimmedTopic) {
      setError('Please enter a composition topic.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const data = await generateEnglish(trimmedTopic)
      setResult({
        intro: data?.intro || '',
        body: Array.isArray(data?.body) ? data.body : [],
        conclusion: data?.conclusion || '',
        vocabulary: Array.isArray(data?.vocabulary) ? data.vocabulary : [],
      })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#FDF0E6] px-6 py-14 dark:bg-[#2d2523]">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700"
          >
            Back to Home
          </Link>

        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-slate-950/40 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            English Composition Assistant
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Enter a topic to generate a structured composition framework.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Enter composition topic..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-gray-600 dark:bg-gray-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-900"
            />

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="inline-flex min-w-36 items-center justify-center rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Generating...
                </span>
              ) : (
                'Generate'
              )}
            </button>
          </div>

          {error ? (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          ) : null}

          {result ? (
            <div className="mt-8 space-y-6 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-900/50 sm:p-6">
              <section>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Intro</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">{result.intro || '-'}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Body</h2>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {result.body.length ? result.body.map((item, index) => <li key={index}>{item}</li>) : <li>-</li>}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Conclusion</h2>
                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">{result.conclusion || '-'}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Vocabulary</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {result.vocabulary.length ? (
                    result.vocabulary.map((word, index) => (
                      <li
                        key={index}
                        className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200"
                      >
                        {word}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-slate-600 dark:text-slate-300">-</li>
                  )}
                </ul>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default English
