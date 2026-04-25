import englishWritingSvg from '../assets/english-writing.svg'
import chineseWritingSvg from '../assets/chinese-writing.svg'
import flashcardsSvg from '../assets/flashcards-ai.svg'

import englishWritingImg from '../assets/english-writing.jpg'
import chineseWritingImg from '../assets/chinese-writing.jpg'
import flashcardsImg from '../assets/flashcards-ai.jpg'

import { Link } from 'react-router-dom'

function FeatureSection() {
  return (
    <section id="tools-section" className="relative overflow-hidden bg-[#FFF8F5] py-20 dark:bg-[#2d2523]">
      {/* Decorative Elements */}
      <div className="absolute left-10 top-24 h-16 w-16 rounded-full border-[3px] border-pink-400/40"></div>
      <div className="absolute left-24 top-40 h-5 w-5 rounded-full border-2 border-pink-400/40"></div>
      
      <div className="absolute left-[30%] top-12 text-cyan-500/60">
        <div className="flex -rotate-45 gap-2">
          <div className="h-2 w-4 rounded-full bg-current"></div>
          <div className="h-2 w-8 rounded-full bg-current"></div>
        </div>
      </div>
      
      <div className="absolute right-32 top-16 text-yellow-400/70">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute right-20 top-28 text-yellow-400/60">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full border-[3px] border-dashed border-pink-300/50"></div>
      <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full border-[3px] border-dashed border-purple-300/50"></div>
      <div className="absolute bottom-10 right-[25%] text-yellow-400/70">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Smart <span className="text-rose-500">Learning</span> Tools
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-slate-300">
          AI-powered tools to help students write better, <br className="hidden sm:block" />
          study smarter, and express their ideas with confidence.
        </p>
      </div>

      {/* Grid Content */}
      <div className="relative z-10 mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-6 px-6 lg:grid-cols-[1fr_1fr]">
        
        {/* Left Column (2 Cards) */}
        <div className="flex flex-col gap-6">
          
          {/* English Card */}
          <article className="flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-gray-800 sm:flex-row">
            <div className="h-48 w-full shrink-0 sm:h-auto sm:w-[42%]">
              <img src={englishWritingImg} alt="English Composition" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                  <img src={englishWritingSvg} alt="" className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-[1.15rem] font-bold leading-tight text-gray-900 dark:text-white">
                  English Composition<br className="hidden sm:block" /> Assistant
                </h3>
              </div>
              <p className="mb-6 text-[0.9rem] leading-relaxed text-gray-500 dark:text-slate-400">
                Generate structured writing ideas, vocabulary, and paragraph guidance for better essays.
              </p>
              <div>
                <Link to="/english" className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Explore &rarr;
                </Link>
              </div>
            </div>
          </article>

          {/* Chinese Card */}
          <article className="flex h-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-gray-800 sm:flex-row">
            <div className="h-48 w-full shrink-0 sm:h-auto sm:w-[42%]">
              <img src={chineseWritingImg} alt="Chinese Composition" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-900/30">
                  <img src={chineseWritingSvg} alt="" className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-[1.15rem] font-bold leading-tight text-gray-900 dark:text-white">
                  Chinese Composition<br className="hidden sm:block" /> Helper
                </h3>
              </div>
              <p className="mb-6 text-[0.9rem] leading-relaxed text-gray-500 dark:text-slate-400">
                Build strong作文 structure with guided phrases and clear writing flow.
              </p>
              <div>
                <Link to="/chinese" className="inline-flex items-center rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
                  Explore &rarr;
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Right Column (1 Large Card) */}
        <div className="flex h-full">
          <article className="flex w-full flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-gray-800">
            <div className="h-64 w-full sm:h-[55%]">
              <img src={flashcardsImg} alt="Smart Flashcards Generator" className="h-full w-full object-cover object-top" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 sm:p-10">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e6fbf5] dark:bg-teal-900/30">
                  <img src={flashcardsSvg} alt="" className="h-8 w-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  Smart Flashcards Generator
                </h3>
              </div>
              <p className="mb-8 text-[0.95rem] leading-relaxed text-gray-500 dark:text-slate-400">
                Upload notes and turn them into colorful Q&amp;A flashcards instantly using AI.
              </p>
              <div>
                <Link to="/flashcards" className="inline-flex items-center rounded-full bg-[#14B8A6] px-8 py-3 text-sm font-semibold text-white transition hover:bg-teal-600">
                  Explore &rarr;
                </Link>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>
  )
}

export default FeatureSection

