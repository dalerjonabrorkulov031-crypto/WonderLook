import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Crown, MapPin, Star } from 'lucide-react'
import { MONTHS_SHORT } from '../i18n'

const PlaceCard = forwardRef(function PlaceCard({ place, index, lang, t, saved, onToggle, onOpen }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.055 }}
      className="place-card"
    >
      <button
        type="button"
        className="place-card-open"
        onClick={() => onOpen(place)}
        aria-label={`${place.name[lang]}, ${place.country[lang]}`}
      >
        <span className="card-photo-wrap">
          <img
            src={place.images[0]}
            alt={place.name[lang]}
            loading="lazy"
            className="card-photo"
          />
          <span className="card-photo-shade" />
          {place.isPro && <span className="card-pro-badge"><Crown size={11} /> {t.proBadge}</span>}
          <span className="card-categories">
            {place.categories.slice(0, 2).map((category) => (
              <span key={category} className="category-tag">{t[category]}</span>
            ))}
          </span>
          <span className="card-location">
            <span className="card-place-name">{place.name[lang]}</span>
            <span className="card-place-country"><MapPin size={12} /> {place.city[lang]}, {place.country[lang]}</span>
          </span>
          <span className="card-rating"><Star size={13} fill="currentColor" /> {place.rating.toFixed(1)}</span>
        </span>
        <span className="card-description">{place.description[lang]}</span>
        <span className="card-footer"><span>{t.best}</span><span>{place.bestMonths.map((month) => MONTHS_SHORT[lang][month - 1]).join(' — ')}</span></span>
      </button>
      <button
        type="button"
        className={`favorite-button ${saved ? 'is-saved' : ''}`}
        onClick={() => onToggle(place.id)}
        aria-label={saved ? t.unsave : t.save}
        aria-pressed={saved}
      >
        <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </motion.article>
  )
})

export default PlaceCard
