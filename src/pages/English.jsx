import { useState } from 'react'
import { Link } from 'react-router-dom'
import { generateEnglish } from '../services/api'
import englishHeroImg from '../assets/eng-hero.png'

const EXAMPLES = [
  { label: 'My School', icon: '🏫' },
  { label: 'A Day at the Park', icon: '🌳' },
  { label: 'My Favorite Hobby', icon: '🎨' },
  { label: 'A Helping Hand', icon: '🤝' },
]

function English() {
  const [topic, setTopic] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [essayType, setEssayType] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    const trimmedTopic = topic.trim()
    if (!trimmedTopic) {
      setError('Please enter a composition topic.')
      return
    }
    if (!essayType) {
      setError('Please select an essay type.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const data = await generateEnglish(trimmedTopic, essayType)
      setResult({
        intro: data?.intro || '',
        body: Array.isArray(data?.body) ? data.body : [],
        conclusion: data?.conclusion || '',
        vocabulary: Array.isArray(data?.vocabulary) ? data.vocabulary : [],
        outline: Array.isArray(data?.outline) ? data.outline : [],
        tips: Array.isArray(data?.tips) ? data.tips : [],
      })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:px-6 lg:px-8 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">
        {/* ── Hero Banner ── */}
        <div className="relative mb-8 min-h-[100px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#f5f0ea] via-[#eef1f8] to-[#e8edf6] dark:from-slate-800 dark:via-slate-800 dark:to-slate-700">

          {/* ── Soft blurred glow behind image area ── */}
          <div className="pointer-events-none absolute right-[5%] top-1/2 hidden h-[350px] w-[400px] -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl lg:block dark:bg-blue-900/15" />
          <div className="pointer-events-none absolute right-[15%] bottom-0 hidden h-[250px] w-[300px] rounded-full bg-[#f0dcc8]/30 blur-2xl lg:block dark:bg-amber-900/10" />

          {/* ── Decorative sparkle dots ── */}
          <div className="pointer-events-none absolute left-[42%] top-6 hidden text-blue-300/50 sm:block dark:text-blue-500/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41Z" />
            </svg>
          </div>
          <div className="pointer-events-none absolute left-[46%] top-14 hidden text-blue-200/40 sm:block dark:text-blue-600/20">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41Z" />
            </svg>
          </div>

          {/* ── Pencil icon ── */}
          <div className="pointer-events-none absolute left-[38%] top-10 hidden sm:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c8cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>

          {/* ── Lightbulb badge (top-right) ── */}
          <div className="pointer-events-none absolute right-8 top-6 hidden h-12 w-12 items-center justify-center rounded-full bg-white/60 shadow-sm backdrop-blur-sm sm:flex dark:bg-slate-700/50">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5b7cf7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6" /><path d="M10 22h4" />
              <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
            </svg>
          </div>

          {/* ── Floating illustration — pinned to bottom, large ── */}
          <img
            src={englishHeroImg}
            alt="Student writing"
            className="relative z-[5] mx-auto block w-full max-w-[800px] object-contain lg:absolute lg:-bottom-16 lg:-right-12 lg:mx-0 lg:w-[75%] lg:max-w-[900px] xl:-bottom-20 xl:-right-24 xl:w-[70%] xl:max-w-[1100px]"
          />

          {/* ── Text content ── */}
          <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-14 lg:max-w-[50%]">
            <Link to="/" className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Back to Home
            </Link>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              English Composition
            </h1>
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold leading-tight tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              Assistant
            </h1>

            {/* Blue accent underline */}
            <div className="mt-3 h-1 w-10 rounded-full bg-blue-600" />

            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-slate-500 dark:text-slate-400">
              Write better, express clearly, and build confidence in every composition.
            </p>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          
          {/* Left Column (Input & Output) */}
          <div className="space-y-6">
            
            {/* Input Section */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Describe your topic</h2>
              </div>
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">What would you like to write about?</p>
              
              <div className="relative">
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value.slice(0, 500))}
                  placeholder="E.g., My Best Friend, A Memorable Trip, The Importance of Reading..."
                  className="min-h-[160px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-600 dark:focus:bg-slate-900 dark:focus:ring-blue-900/30"
                />
                <div className="absolute bottom-3 right-4 text-xs font-medium text-slate-400">
                  {topic.length}/500
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-400">Grade Level</label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="">Select grade</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-400">Essay Type</label>
                  <select
                    value={essayType}
                    onChange={(e) => setEssayType(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <option value="">Select type</option>
                    <option value="narrative">Narrative</option>
                    <option value="descriptive">Descriptive</option>
                    <option value="expository">Expository</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70 sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Generate Outline
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Try an Example */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try an Example
              </h3>
              <div className="flex flex-wrap gap-3">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setTopic(ex.label)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <span>{ex.icon}</span> {ex.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Generated Output */}
            {result && (
              <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
                <h3 className="mb-6 text-xl font-bold text-slate-800 dark:text-white">Generated Guide</h3>
                
                <div className="space-y-8">
                  {/* Outline Section */}
                  {result.outline.length > 0 && (
                    <section className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 dark:border-blue-900/30 dark:bg-blue-900/10">
                      <h4 className="mb-3 flex items-center gap-2 font-bold text-blue-800 dark:text-blue-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                        Structured Outline
                      </h4>
                      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
                        {result.outline.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </section>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <section>
                      <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">Introduction</h4>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{result.intro}</p>
                    </section>
                    <section>
                      <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">Conclusion</h4>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{result.conclusion}</p>
                    </section>
                  </div>

                  <section>
                    <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">Body Points</h4>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-400">
                      {result.body.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </section>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Vocabulary */}
                    {result.vocabulary.length > 0 && (
                      <section>
                        <h4 className="mb-3 font-semibold text-slate-800 dark:text-slate-200">Vocabulary Suggestions</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.vocabulary.map((word, idx) => (
                            <span key={idx} className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {word}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Tips */}
                    {result.tips.length > 0 && (
                      <section>
                        <h4 className="mb-3 font-semibold text-slate-800 dark:text-slate-200">Writing Tips</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          {result.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                        </ul>
                      </section>
                    )}
                  </div>

                </div>
              </div>
            )}
            
          </div>

          {/* Right Column (How it works & Features) */}
          <div className="space-y-6">
            
            {/* How it works */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <h3 className="mb-6 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                How it works
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">1</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Describe Your Topic</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter a topic or prompt for your composition.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600 dark:bg-green-900/50 dark:text-green-400">2</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Get AI Suggestions</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Receive an outline and writing ideas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">3</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">Write with Confidence</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Use the suggestions to write your best composition.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Panel */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <h3 className="mb-6 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Features
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Structured Outlines</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Well-organized outlines to guide your writing.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Vocabulary Suggestions</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Enrich your essay with smart word choices.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Grammar & Style Tips</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Improve your writing with helpful tips.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default English
