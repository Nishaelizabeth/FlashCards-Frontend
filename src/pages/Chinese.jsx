import { useState } from 'react'
import { Link } from 'react-router-dom'
import { generateChinese, translateChinese } from '../services/api'
import chineseHeroImg from '../assets/chinese-hero.png'

const EXAMPLES = [
  { label: '我的学校', icon: '🏫' },
  { label: '一次难忘的经历', icon: '🌟' },
  { label: '我最喜欢的季节', icon: '🍂' },
  { label: '如果我有一双翅膀', icon: '🕊️' },
]

function Chinese() {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [translation, setTranslation] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translateError, setTranslateError] = useState('')

  const handleGenerate = async () => {
    const trimmedTopic = topic.trim()
    if (!trimmedTopic) {
      setError('请输入一个作文题目。')
      return
    }

    setIsLoading(true)
    setError('')
    setTranslation('')
    setTranslateError('')

    try {
      const data = await generateChinese(trimmedTopic)
      setResult({
        开头: data?.开头 || '',
        内容: Array.isArray(data?.内容) ? data.内容 : [],
        结尾: data?.结尾 || '',
        好词好句: Array.isArray(data?.好词好句) ? data.好词好句 : [],
        写作提纲: Array.isArray(data?.写作提纲) ? data.写作提纲 : [],
        写作建议: Array.isArray(data?.写作建议) ? data.写作建议 : [],
      })
    } catch {
      setError('出了点问题，请再试一次。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTranslate = async () => {
    if (!result) return

    const textToTranslate = `
写作提纲: ${result.写作提纲.join(' ')}
开头: ${result.开头}
内容: ${result.内容.join(' ')}
结尾: ${result.结尾}
好词好句: ${result.好词好句.join(' ')}
写作建议: ${result.写作建议.join(' ')}
    `.trim()

    setIsTranslating(true)
    setTranslateError('')

    try {
      const data = await translateChinese(textToTranslate)
      setTranslation(data.translated || '')
    } catch {
      setTranslateError('Translation failed. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] px-4 py-8 sm:px-6 lg:px-8 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl">

        {/* ── Hero Banner ── */}
        <div className="relative mb-8 min-h-[220px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#fef8f1] via-[#fef2e6] to-[#fdebd5] dark:from-slate-800 dark:via-slate-800 dark:to-slate-700">

          {/* ── Soft warm glow behind image ── */}
          <div className="pointer-events-none absolute right-[10%] top-1/2 hidden h-[300px] w-[350px] -translate-y-1/2 rounded-full bg-orange-100/25 blur-3xl lg:block dark:bg-orange-900/10" />

          {/* ── Floating illustration ── */}
          <img
            src={chineseHeroImg}
            alt="Student writing Chinese"
            className="relative z-[5] mx-auto block w-full max-w-[600px] object-contain object-bottom lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:h-[140%] lg:w-auto lg:max-w-none"
          />

          {/* ── Text content ── */}
          <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-14 lg:max-w-[40%]">
            <Link to="/" className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Back to Home
            </Link>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Chinese Composition
            </h1>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-orange-500 sm:text-4xl lg:text-5xl">
              Helper
            </h1>

            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-slate-500 dark:text-slate-400">
              写得更好，表达更清晰，<br />让每一篇作文都出彩。
            </p>
          </div>
        </div>

        {/* ── Main Grid Content ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr]">

          {/* ── Left Column (Input & Output) ── */}
          <div className="space-y-6">

            {/* Input Section */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">选择写作主题</h2>
              </div>
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">你想写什么呢？</p>

              <div className="relative">
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value.slice(0, 500))}
                  placeholder="例如：我的妈妈、一次难忘的旅行、我学会了骑自行车..."
                  className="min-h-[160px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-orange-500 dark:focus:bg-slate-900 dark:focus:ring-orange-900/30"
                />
                <div className="absolute bottom-3 right-4 text-xs font-medium text-slate-400">
                  {topic.length}/500
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
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-md shadow-orange-200/50 transition hover:from-orange-600 hover:to-red-600 disabled:opacity-70 sm:w-auto dark:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                      生成中...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      生成写作提纲
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Try an Example */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <svg className="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                试试这些主题
              </h3>
              <div className="flex flex-wrap gap-3">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => setTopic(ex.label)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-orange-50 hover:border-orange-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <span>{ex.icon}</span> {ex.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Generated Output */}
            {result && (
              <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
                <h3 className="mb-6 text-xl font-bold text-slate-800 dark:text-white">写作指导</h3>

                <div className="space-y-8">
                  {/* 写作提纲 */}
                  {result.写作提纲.length > 0 && (
                    <section className="rounded-xl border border-orange-100 bg-orange-50/50 p-5 dark:border-orange-900/30 dark:bg-orange-900/10">
                      <h4 className="mb-3 flex items-center gap-2 font-bold text-orange-800 dark:text-orange-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                        写作提纲
                      </h4>
                      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
                        {result.写作提纲.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </section>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <section>
                      <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">开头</h4>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{result.开头}</p>
                    </section>
                    <section>
                      <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">结尾</h4>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{result.结尾}</p>
                    </section>
                  </div>

                  <section>
                    <h4 className="mb-2 font-semibold text-slate-800 dark:text-slate-200">内容要点</h4>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-400">
                      {result.内容.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </section>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* 好词好句 */}
                    {result.好词好句.length > 0 && (
                      <section>
                        <h4 className="mb-3 font-semibold text-slate-800 dark:text-slate-200">好词好句</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.好词好句.map((word, idx) => (
                            <span key={idx} className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              {word}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* 写作建议 */}
                    {result.写作建议.length > 0 && (
                      <section>
                        <h4 className="mb-3 font-semibold text-slate-800 dark:text-slate-200">写作建议</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          {result.写作建议.map((tip, idx) => <li key={idx}>{tip}</li>)}
                        </ul>
                      </section>
                    )}
                  </div>

                  {/* ── Translation Section ── */}
                  <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-700/50">
                    {!translation && !isTranslating && (
                      <button
                        onClick={handleTranslate}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
                        Translate to English
                      </button>
                    )}

                    {isTranslating && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></span>
                        Translating...
                      </div>
                    )}

                    {translateError && (
                      <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {translateError}
                      </div>
                    )}

                    {translation && (
                      <div className="mt-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/50">
                        <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
                          English Translation
                        </h4>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {translation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right Column (How it works & Features) ── */}
          <div className="space-y-6">

            {/* 使用步骤 */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <h3 className="mb-6 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                使用步骤
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">1</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">选择主题</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">输入你想写的主题或选择一个示例。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600 dark:bg-green-900/50 dark:text-green-400">2</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">获取写作提纲</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">AI 将为你生成结构清晰的写作提纲和要点。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">3</div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">开始写作</h4>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">根据提纲写作，让你的作文更出彩！</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 功能亮点 */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgb(0,0,0,0.04)] dark:bg-slate-800">
              <h3 className="mb-6 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                功能亮点
              </h3>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">优秀范文参考</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">提供高质量范文，学习写作思路。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">词语和句子建议</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">提供丰富词语和优美句子，提升表达。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">结构指导</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">清晰的结构建议，让作文条理分明。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">语法与修辞建议</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">提供语法检查和修辞技巧建议。</p>
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

export default Chinese
