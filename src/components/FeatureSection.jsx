import englishWritingImage from '../assets/english-writing.svg'
import chineseWritingImage from '../assets/chinese-writing.svg'
import flashcardsImage from '../assets/flashcards-ai.svg'
import { Link } from 'react-router-dom'
function FeatureSection() {
  return (
    <section className="bg-[#FDF0E6] py-16 dark:bg-[#2d2523]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <article className="group overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800 dark:shadow-slate-950/40">
            <div className="flex flex-col sm:flex-row">
              <img
                src={englishWritingImage}
                alt="English writing support"
                className="h-44 w-full object-cover sm:h-auto sm:w-44"
              />
              <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  English Composition Assistant
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Generate structured writing ideas, vocabulary, and paragraph guidance for better essays.
                </p>
                <Link
                  to="/english"
                  className="mt-4 inline-flex w-fit items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Explore -&gt;
                </Link>
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800 dark:shadow-slate-950/40">
            <div className="flex flex-col sm:flex-row">
              <img
                src={chineseWritingImage}
                alt="Chinese composition support"
                className="h-44 w-full object-cover sm:h-auto sm:w-44"
              />
              <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Chinese Composition Helper
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Build strong作文 structure with guided phrases and clear writing flow.
                </p>
                <Link
                  to="/chinese"
                  className="mt-4 inline-flex w-fit items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Explore -&gt;
                </Link>
              </div>
            </div>
          </article>
        </div>

        <article className="group overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800 dark:shadow-slate-950/40">
          <div className="flex h-full flex-col">
            <img
              src={flashcardsImage}
              alt="AI flashcards generation"
              className="h-64 w-full object-cover"
            />
            <div className="flex flex-1 flex-col justify-center p-6 md:p-7">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Smart Flashcards Generator
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Upload notes and turn them into colorful Q&amp;A flashcards instantly using AI.
              </p>
              <Link
                to="/flashcards"
                className="mt-5 inline-flex w-fit items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Explore -&gt;
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default FeatureSection
