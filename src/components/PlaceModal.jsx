import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight, Bookmark, BookOpen, CalendarDays, ChevronLeft, ChevronRight,
  ExternalLink, LockKeyhole, MapPin, Play, Star, Volume2, VolumeX, X,
} from 'lucide-react'
import { LOCALES, MONTHS } from '../i18n'

export default function PlaceModal({
  place, lang, t, saved, isProMember, onToggle, onUpgrade, onPlayVideo, onClose, onOpenGuide,
}) {
  const [slide, setSlide] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const locale = LOCALES[lang] ?? LOCALES.en

  useEffect(() => {
    if (!place) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') setSlide((current) => (current + place.images.length - 1) % place.images.length)
      if (event.key === 'ArrowRight') setSlide((current) => (current + 1) % place.images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.speechSynthesis?.cancel()
    }
  }, [place, onClose])

  useEffect(() => setSlide(0), [place?.id])
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
  }
  const speak = () => {
    if (!place || !('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return
    if (speaking) {
      stopSpeaking()
      return
    }
    const utterance = new SpeechSynthesisUtterance(
      `${place.name[lang]}. ${place.city[lang]}, ${place.country[lang]}. ${place.description[lang]}`,
    )
    utterance.lang = locale
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  const previousSlide = () => setSlide((current) => (current + place.images.length - 1) % place.images.length)
  const nextSlide = () => setSlide((current) => (current + 1) % place.images.length)
  const monthRange = place?.bestMonths.map((month) => MONTHS[lang][month - 1]).join(' – ')
  const mapUrl = place && `https://www.openstreetmap.org/?mlat=${place.latitude}&mlon=${place.longitude}#map=11/${place.latitude}/${place.longitude}`
  const guideId = place?.city?.uz === 'Samarqand'
    ? 'samarkand'
    : place?.id === 'eiffel-tower'
      ? 'eiffel'
      : place?.id === 'swiss-alps'
        ? 'alps'
        : place?.id
  const hasPremiumGuide = Boolean(place?.travelTips)
  const dailyCostEstimate = place?.dailyCostEstimate
  const formattedDailyCost = typeof dailyCostEstimate?.amount === 'number'
    ? new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(dailyCostEstimate.amount)
    : null

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={place.name[lang]}
            className="place-modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="modal-gallery">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${place.id}-${slide}`}
                  src={place.images[slide]}
                  alt={`${place.name[lang]} — ${slide + 1}`}
                  initial={{ opacity: 0, scale: 1.025 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32 }}
                />
              </AnimatePresence>
              <div className="modal-image-shade" />
              <button type="button" className="modal-close icon-button" onClick={onClose} aria-label={t.close}><X size={19} /></button>
              {place.imageCredits?.[slide] && (
                <a
                  className="image-credit"
                  href={place.imageCredits[slide].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.imageCredit}: {place.imageCredits[slide].name} · {place.imageCredits[slide].license}
                </a>
              )}
              <button type="button" className="gallery-arrow gallery-previous" onClick={previousSlide} aria-label={t.previousImage}><ChevronLeft size={21} /></button>
              <button type="button" className="gallery-arrow gallery-next" onClick={nextSlide} aria-label={t.nextImage}><ChevronRight size={21} /></button>
              <div className="gallery-pagination" aria-label={`${slide + 1} ${t.imageOf} ${place.images.length}`}>
                {place.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSlide(index)}
                    className={index === slide ? 'gallery-dot is-active' : 'gallery-dot'}
                    aria-label={`${t.showImage} ${index + 1}`}
                    aria-pressed={index === slide}
                  />
                ))}
              </div>
              <div className="modal-place-heading">
                <span><MapPin size={14} /> {place.city[lang]}, {place.country[lang]}</span>
                <h2>{place.name[lang]}</h2>
                <div className="modal-tags">
                  {place.categories.map((category) => <span key={category}>{t[category]}</span>)}
                  <span className="modal-rating"><Star size={13} fill="currentColor" /> {place.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="modal-content">
              <div className="modal-story">
                <p className="modal-description">{place.description[lang]}</p>
                <h3>{t.highlights}</h3>
                <ul className="highlight-list">
                  {place.highlights[lang].map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <button type="button" className={`audio-button ${speaking ? 'is-playing' : ''}`} onClick={speak}>
                  {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {speaking ? t.stop : t.listen}
                </button>
                {guideId && (
                  <a className="guide-open-link" href={`/place/${guideId}`} onClick={(event) => { event.preventDefault(); onOpenGuide(place) }}>
                    <BookOpen size={21} aria-hidden="true" />
                    <span className="guide-open-copy">
                      <strong>{lang === 'uz' ? 'To‘liq sayohat qo‘llanmasi' : lang === 'ru' ? 'Полный путеводитель' : 'Full travel guide'}</strong>
                      <small>{lang === 'uz' ? 'Faktlar, chipta va safar bo‘yicha maslahatlar' : lang === 'ru' ? 'Факты, билеты и советы для поездки' : 'Facts, tickets and practical travel tips'}</small>
                    </span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </a>
                )}
              </div>
                <section className="pro-content-section">
                  <div className="pro-content-heading">
                    <span className="pro-content-badge"><span>✦</span> {t.proOnly}</span>
                    <h3>{t.proTeaser}</h3>
                  </div>
                  {isProMember ? (
                    <>
                      <div className="premium-cost-panel">
                        <div className="premium-cost-heading">
                          <span>{t.costReference}</span>
                          <strong>{formattedDailyCost ? <b>{formattedDailyCost}</b> : t.costUnavailable}</strong>
                        </div>
                        {dailyCostEstimate?.source && (
                          <a className="estimate-source" href={dailyCostEstimate.source} target="_blank" rel="noreferrer">
                            {t.costSource}
                          </a>
                        )}
                        {dailyCostEstimate?.verifiedAt && (
                          <p className="estimate-source-date">{t.checkedOn}: {dailyCostEstimate.verifiedAt}</p>
                        )}
                        {dailyCostEstimate?.basis?.[lang] && (
                          <p className="estimate-basis">{dailyCostEstimate.basis[lang]}</p>
                        )}
                        <p className="estimate-note">{t.estimateNote}</p>
                      </div>
                      {hasPremiumGuide ? (
                        <div className="premium-guides-grid">
                          {['visa', 'safety'].map((key) => (
                            <div className="premium-guide" key={key}>
                              <h4>{t[key]}</h4><p>{place.travelTips[key][lang]}</p>
                            </div>
                          ))}
                          <div className="premium-guide">
                            <h4>{t.localFood}</h4>
                            <div className="premium-pills">{place.travelTips.food[lang].map((item) => <span key={item}>{item}</span>)}</div>
                          </div>
                          <div className="premium-guide">
                            <h4>{t.hiddenGems}</h4>
                            <div className="premium-pills">{place.travelTips.hiddenGems[lang].map((item) => <span key={item}>{item}</span>)}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="pro-guide-pending">
                          {lang === 'uz'
                            ? 'Bu joy uchun Pro maslahatlar tayyorlanmoqda. Hozircha ochiq faktlar va safar ma’lumotlaridan foydalaning.'
                            : lang === 'ru'
                              ? 'Советы Pro для этого места готовятся. Пока воспользуйтесь открытыми фактами и информацией о поездке.'
                              : 'The Pro guide for this destination is being prepared. In the meantime, explore the public facts and travel information.'}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="locked-content">
                      <div className="locked-preview" aria-hidden="true">
                        <span>{t.costReference} · · ·</span><span>{t.safety} · · ·</span><span>{t.hiddenGems} · · ·</span>
                      </div>
                      <div className="locked-overlay">
                        <LockKeyhole size={21} />
                        <strong>{t.lockedTitle}</strong>
                        <p>{t.lockedDescription}</p>
                        <button type="button" onClick={onUpgrade}>{t.unlock}</button>
                      </div>
                    </div>
                  )}
                  <button type="button" className="pro-video-button" onClick={() => onPlayVideo(place)}>
                    <Play size={15} fill="currentColor" /> {t.watchTour}<span>4K</span><ArrowUpRight size={15} />
                  </button>
                </section>
              <aside className="modal-facts">
                <div className="fact-card">
                  <span className="fact-icon"><CalendarDays size={17} /></span>
                  <span className="fact-label">{t.best}</span>
                  <strong className="fact-value">{monthRange}</strong>
                </div>
                <div className="fact-card">
                  <span className="fact-icon"><MapPin size={17} /></span>
                  <span className="fact-label">{t.price}</span>
                  <a
                    className="fact-value"
                    href={`/place/${guideId}`}
                    onClick={(event) => { event.preventDefault(); onOpenGuide(place) }}
                  >
                    {t.priceCheck}
                  </a>
                </div>
                <a href={mapUrl} target="_blank" rel="noreferrer" className="map-link">
                  <span>{place.latitude.toFixed(4)}°, {place.longitude.toFixed(4)}°</span>
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  className={`save-place-button ${saved ? 'is-saved' : ''}`}
                  onClick={() => onToggle(place.id)}
                  aria-pressed={saved}
                >
                  <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
                  {saved ? t.unsave : t.save}
                  <ArrowUpRight size={15} />
                </button>
              </aside>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
