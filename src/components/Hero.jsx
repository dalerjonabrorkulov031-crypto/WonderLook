import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Search, Sparkles } from 'lucide-react'
import HeroCardSlider from './HeroCardSlider'

export default function Hero({ t, lang, query, setQuery, suggestions, places, onSelectSuggestion, onPickPlace }) {
  const sectionRef = useRef(null)
  const [suggestionsDismissed, setSuggestionsDismissed] = useState(false)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const reveal = useTransform(scrollYProgress, [0, 0.62], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])

  return (
    <section id="top" ref={sectionRef} className="hero-section page-width">
      <div className="hero-copy">
        <motion.div
          key={`${lang}-eyebrow`}
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={14} /> {t.eyebrow}
        </motion.div>
        <motion.h1
          key={`${lang}-title`}
          className="hero-slogan"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {t.slogan.map((line, index) => (
            <span className={`slogan-line${index === 1 ? ' hero-serif' : ''}`} key={line}>
              <span>{line}</span>
              <motion.span
                className="slogan-reveal"
                aria-hidden="true"
                style={reduceMotion ? undefined : { clipPath: reveal }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {t.sub}
        </motion.p>
        <motion.div
          className="hero-search-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <label className="hero-search">
            <Search size={19} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setSuggestionsDismissed(false)
                setQuery(event.target.value)
              }}
              onFocus={() => setSuggestionsDismissed(false)}
              placeholder={t.search}
              aria-label={t.search}
              aria-controls="place-suggestions"
              aria-expanded={Boolean(query && suggestions.length && !suggestionsDismissed)}
            />
            <span className="search-shortcut">⌕</span>
          </label>
          {query && suggestions.length > 0 && !suggestionsDismissed && (
            <div className="search-suggestions" id="place-suggestions" role="listbox" aria-label={t.suggestionHint}>
              {suggestions.slice(0, 5).map((place) => (
                <button
                  key={place.id}
                  type="button"
                  role="option"
                  aria-selected="false"
                  className="suggestion-item"
                  onClick={() => {
                    setSuggestionsDismissed(true)
                    onSelectSuggestion(place)
                  }}
                >
                  <span className="suggestion-flag">{place.flag}</span>
                  <span className="suggestion-copy"><strong>{place.name[lang]}</strong><small>{place.city[lang]}, {place.country[lang]}</small></span>
                  <ArrowUpRight size={15} />
                </button>
              ))}
            </div>
          )}
        </motion.div>
        <motion.a
          href="#discover"
          className="hero-link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t.result} <ArrowDown size={15} />
        </motion.a>
      </div>

      <motion.div
        className="hero-art"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <HeroCardSlider places={places} lang={lang} t={t} onPick={onPickPlace} />
      </motion.div>
      <div className="hero-side-note"><span /> 35° 41' 22.2" N &nbsp;·&nbsp; 139° 41' 30.1" E</div>
    </section>
  )
}
