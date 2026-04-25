import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { generateFlashcards } from '../services/api'

const CARD_COLORS = [
  'bg-rose-100 border-rose-300 dark:bg-rose-900/40 dark:border-rose-700',
  'bg-amber-100 border-amber-300 dark:bg-amber-900/40 dark:border-amber-700',
  'bg-lime-100 border-lime-300 dark:bg-lime-900/40 dark:border-lime-700',
  'bg-cyan-100 border-cyan-300 dark:bg-cyan-900/40 dark:border-cyan-700',
  'bg-violet-100 border-violet-300 dark:bg-violet-900/40 dark:border-violet-700',
  'bg-pink-100 border-pink-300 dark:bg-pink-900/40 dark:border-pink-700',
  'bg-teal-100 border-teal-300 dark:bg-teal-900/40 dark:border-teal-700',
  'bg-orange-100 border-orange-300 dark:bg-orange-900/40 dark:border-orange-700',
]

function FlashCard({ card, index }) {
  const [flipped, setFlipped] = useState(false)
  const colorClass = CARD_COLORS[index % CARD_COLORS.length]

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative h-56 transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front – Question */}
        <div
          className={`absolute inset-0 flex flex-col justify-between rounded-2xl border-2 p-5 shadow-md ${colorClass}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="inline-block self-start rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:bg-black/20 dark:text-slate-300">
            Question
          </span>
          <p className="text-center text-base font-bold leading-snug text-slate-800 dark:text-white">
            {card.question}
          </p>
          <span className="self-end text-[11px] text-slate-400 dark:text-slate-500">
            Tap to reveal answer
          </span>
        </div>

        {/* Back – Answer */}
        <div
          className={`absolute inset-0 flex flex-col justify-between rounded-2xl border-2 p-5 shadow-md ${colorClass}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className="inline-block self-start rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:bg-black/20 dark:text-slate-300">
            Answer
          </span>
          <div className="space-y-2 text-center">
            <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">
              {card.answer}
            </p>
            {card.highlight ? (
              <p className="rounded-lg bg-white/50 px-3 py-1.5 text-xs font-semibold italic text-slate-600 dark:bg-black/20 dark:text-slate-300">
                ✨ {card.highlight}
              </p>
            ) : null}
          </div>
          {card.image_hint ? (
            <span className="self-end text-[11px] italic text-slate-400 dark:text-slate-500">
              Visual: {card.image_hint}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function UploadZone({ onFileSelect, preview }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault()
      setDragging(false)
      const file = event.dataTransfer.files?.[0]
      if (file && file.type.startsWith('image/')) {
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleInputChange = (event) => {
    const file = event.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-colors ${
        dragging
          ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
          : 'border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-violet-50/50 dark:border-gray-600 dark:bg-gray-900/30 dark:hover:border-violet-500 dark:hover:bg-violet-900/10'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {preview ? (
        <img
          src={preview}
          alt="Selected"
          className="max-h-52 rounded-xl object-contain shadow-md"
        />
      ) : (
        <>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-3xl dark:bg-violet-900/40">
            🖼️
          </div>
          <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-300">
            Drag & drop an image here, or{' '}
            <span className="font-semibold text-violet-600 dark:text-violet-400">
              click to browse
            </span>
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            PNG, JPG, WEBP supported
          </p>
        </>
      )}

      {preview ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click to change image
        </p>
      ) : null}
    </div>
  )
}

function Flashcards({ theme, onToggleTheme }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [flashcards, setFlashcards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setFlashcards([])
    setError('')
  }

  const handleGenerate = async () => {
    if (!file) {
      setError('Please select an image first.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await generateFlashcards(file)
      const cards = response?.data?.flashcards ?? []
      if (cards.length === 0) {
        setError('No flashcards were returned. Try a different image.')
      } else {
        setFlashcards(cards)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#FDF0E6] px-6 py-14 dark:bg-[#2d2523]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Title card */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-slate-950/40 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Smart Flashcards Generator ✨
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Upload a photo of your notes and we'll turn them into colourful, flippable flashcards instantly.
          </p>

          {/* Upload zone */}
          <div className="mt-6">
            <UploadZone onFileSelect={handleFileSelect} preview={preview} />
          </div>

          {/* Error message */}
          {error ? (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          ) : null}

          {/* Generate button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || !file}
            className="mt-5 inline-flex min-w-44 items-center justify-center rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </span>
            ) : (
              '⚡ Generate Flashcards'
            )}
          </button>
        </div>

        {/* Flashcards grid */}
        {flashcards.length > 0 ? (
          <div className="mt-10">
            <h2 className="mb-5 text-lg font-bold text-slate-800 dark:text-white">
              {flashcards.length} Flashcard{flashcards.length !== 1 ? 's' : ''} — tap any card to flip it!
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {flashcards.map((card, index) => (
                <FlashCard key={index} card={card} index={index} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Flashcards
