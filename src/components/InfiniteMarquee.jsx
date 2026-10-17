import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'

export default function InfiniteMarquee({ places, lang, t, onPick }) {
  const [hovered, setHovered] = useState(false)
  const reducedMotion = useReducedMotion()
  const items = [...places, ...places]

  return (
    <section className="marquee-section" aria-label={t.marquee}>
      <div className="marquee-heading page-width">
        <span className="section-eyebrow"><span />{t.marquee}</span>
        <span className="marquee-count">0{places.length} / {t.region}</span>
      </div>
      <div
        className="marquee-viewport"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false)
        }}
      >
        <motion.div
          className="marquee-track"
          animate={{ x: reducedMotion ? 0 : ['0%', '-50%'] }}
          transition={reducedMotion ? { duration: 0 } : {
            x: { duration: hovered ? 100 : 58, repeat: Infinity, ease: 'linear' },
          }}
        >
          {items.map((place, index) => (
            <button
              type="button"
              className="marquee-card"
              key={`${place.id}-${index}`}
              onClick={() => onPick(place)}
              aria-label={`${place.name[lang]}, ${place.city[lang]}`}
              tabIndex={index < places.length ? 0 : -1}
            >
              <img src={place.images[0]} alt="" loading="lazy" />
              <span className="marquee-card-shade" />
              <span className="marquee-card-top">
                <span className="marquee-flag">{place.flag}</span>
                <span className="marquee-top-right">
                  {place.isPro && <span className="marquee-pro-badge">{t.proBadge}</span>}
                  <span className="marquee-rating"><Star size={11} fill="currentColor" />{place.rating.toFixed(1)}</span>
                </span>
              </span>
              <span className="marquee-card-caption">
                <span className="marquee-card-location">{place.city[lang]}, {place.country[lang]}</span>
                <strong>{place.name[lang]}</strong>
                <span className="marquee-tags">
                  {place.categories.slice(0, 2).map((category) => <span key={category}>{t[category]}</span>)}
                </span>
              </span>
              <span className="marquee-open"><ArrowUpRight size={15} /></span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
