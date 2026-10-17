import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const FEATURED_IDS = [
  'registan',
  'santorini',
  'mount-fuji',
  'machu-picchu',
  'taj-mahal',
  'colosseum',
  'swiss-alps',
  'eiffel-tower',
  'grand-canyon',
  'maldives',
]

const ADDITIONAL_FEATURES = [
  {
    id: 'petra',
    name: { uz: 'Petra', en: 'Petra', ru: 'Петра' },
    city: { uz: 'Maon', en: 'Ma’an', ru: 'Маан' },
    country: { uz: 'Iordaniya', en: 'Jordan', ru: 'Иордания' },
    description: {
      uz: 'Atirgul rang qoyalar bag‘riga o‘yilgan qadimiy Nabatiy shahri.',
      en: 'An ancient Nabataean city carved into rose-colored cliffs.',
      ru: 'Древний набатейский город, высеченный в скалах розового цвета.',
    },
    image: 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1800&q=90',
  },
  {
    id: 'banff',
    name: { uz: 'Banff milliy bog‘i', en: 'Banff National Park', ru: 'Национальный парк Банф' },
    city: { uz: 'Alberta', en: 'Alberta', ru: 'Альберта' },
    country: { uz: 'Kanada', en: 'Canada', ru: 'Канада' },
    description: {
      uz: 'Turkuaz ko‘llar, ignabargli o‘rmonlar va Qoyali tog‘lar manzarasi.',
      en: 'Turquoise lakes, evergreen forests and the dramatic Canadian Rockies.',
      ru: 'Бирюзовые озёра, хвойные леса и величественные Канадские Скалистые горы.',
    },
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=90',
  },
]

function getFeaturedPlaces(places) {
  const placeById = new Map(places.map((place) => [place.id, place]))
  const destinations = FEATURED_IDS
    .map((id) => placeById.get(id))
    .filter(Boolean)
    .map((place) => ({ ...place, image: place.images[0] }))

  return [...destinations, ...ADDITIONAL_FEATURES]
}

export default function HeroCardSlider({ places, lang, t, onPick }) {
  const slides = getFeaturedPlaces(places)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const sliderRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const slide = slides[activeIndex]
  const indexLabel = String(activeIndex + 1).padStart(2, '0')
  const cityCountry = `${slide.city[lang]}, ${slide.country[lang]}`

  const showSlide = (nextIndex) => {
    setDirection(nextIndex > activeIndex || (activeIndex === slides.length - 1 && nextIndex === 0) ? 1 : -1)
    setActiveIndex((nextIndex + slides.length) % slides.length)
  }

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return undefined
    const timer = window.setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion, slides.length])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!sliderRef.current?.contains(document.activeElement)) return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      showSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, slides.length])

  return (
    <div
      ref={sliderRef}
      className="hero-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.heroSliderLabel}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <motion.div
          key={slide.id}
          className="hero-slide"
          custom={direction}
          initial={{ opacity: 0, x: reduceMotion ? 0 : direction * 24, scale: reduceMotion ? 1 : 1.025 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: reduceMotion ? 0 : direction * -18, scale: reduceMotion ? 1 : 0.99 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.22, 0.7, 0.2, 1] }}
          aria-hidden="true"
        >
          <img className="hero-image" src={slide.image} alt="" />
          <div className="hero-image-shade" />
        </motion.div>
      </AnimatePresence>

      <div className="hero-slide-topline">
        <span className="image-index"><span>{indexLabel}</span> / {slides.length}</span>
        <span className="hero-slide-count">{slides.length} <small>{t.heroPlaces}</small></span>
      </div>

      <div className="hero-slide-caption" aria-live="polite" aria-atomic="true">
        <span className="caption-kicker">{indexLabel} / {slides.length} {t.region}</span>
        <span className="hero-slide-slogan">{t.heroCaption}</span>
        <h2 className="caption-place">{slide.name[lang]}</h2>
        <span className="hero-slide-location">{cityCountry}</span>
        <p className="hero-slide-description">{slide.description[lang]}</p>
        {slide.images && (
          <button
            type="button"
            className="hero-slide-open"
            aria-label={`${t.result}: ${slide.name[lang]}`}
            onClick={() => onPick(slide)}
          >
            <ArrowUpRight size={19} />
          </button>
        )}
        {!slide.images && (
          <a className="hero-slide-open" href="#discover" aria-label={`${t.result}: ${slide.name[lang]}`}>
            <ArrowUpRight size={19} />
          </a>
        )}
      </div>

      <div className="hero-slider-controls">
        <button
          type="button"
          className="hero-slider-arrow"
          aria-label={`${t.previousImage}: ${slide.name[lang]}`}
          onClick={() => showSlide(activeIndex - 1)}
        >
          <ChevronLeft size={19} />
        </button>
        <button
          type="button"
          className="hero-slider-arrow"
          aria-label={`${t.nextImage}: ${slide.name[lang]}`}
          onClick={() => showSlide(activeIndex + 1)}
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  )
}
