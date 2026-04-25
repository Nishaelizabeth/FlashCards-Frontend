import Decorations from './Decorations'
import FloatingImage from './FloatingImage'
import leftImg from '../assets/left.jpeg'
import rightImg from '../assets/right.jpeg'
import rainbowImg from '../assets/rainbow.png'

function HeroSection({ theme, onToggleTheme }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDF0E6] px-4 py-12 sm:px-6 md:px-8 lg:px-10 dark:bg-[#2d2523]">
      <Decorations />


      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center lg:pb-48">
        <div className="mb-7 lg:hidden">
          <img
            src={leftImg}
            alt="Student holding books"
            className="mx-auto h-[15rem] w-[10.5rem] rounded-full border-4 border-yellow-300 object-cover shadow-lg"
          />
        </div>

        <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          <span className="block text-black dark:text-white">Exploring Minds</span>
          <span className="mt-1 block text-black dark:text-white">
            <strong className="font-extrabold">Elementary</strong>{' '}
            <span className="font-extrabold text-[#ff4d6d]">School</span>
          </span>
        </h1>

        <p className="mt-4 max-w-lg text-xs leading-6 text-gray-500 sm:text-sm dark:text-gray-300">
          Building curious learners through joyful lessons, colorful activities, and confident growth in every subject.
        </p>

        <button
          type="button"
          className="mt-6 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-600"
        >
          Learn More
        </button>

        <div className="mt-8 lg:hidden">
          <img
            src={rightImg}
            alt="Smiling student"
            className="mx-auto h-[15rem] w-[10.5rem] rounded-full border-4 border-cyan-300 object-cover shadow-lg"
          />
        </div>
      </div>

      <FloatingImage
        src={leftImg}
        alt="Student holding books"
        wrapperClassName="absolute left-20 top-20 z-10 hidden lg:block xl:left-24 xl:top-20 animate-float-wide [animation-delay:0.2s]"
        imageClassName="h-[16rem] w-[11rem] rounded-full border-4 border-yellow-300 object-cover shadow-lg xl:h-[18rem] xl:w-[12rem]"
      />

      <FloatingImage
        src={rightImg}
        alt="Smiling student"
        wrapperClassName="absolute right-12 top-52 z-10 hidden lg:block xl:right-16 xl:top-56 animate-float-soft [animation-delay:0.7s]"
        imageClassName="h-[16rem] w-[11rem] rounded-full border-4 border-cyan-300 object-cover shadow-lg xl:h-[18rem] xl:w-[12rem]"
      />

      <img
        src={rainbowImg}
        alt="Colorful rainbow with school characters"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[64%] -translate-x-1/2 select-none sm:w-[55%] lg:w-[44%] xl:w-[40%]"
      />
    </div>
  )
}

export default HeroSection
