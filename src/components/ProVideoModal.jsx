import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Crown, LockKeyhole, Play, X } from 'lucide-react'

function resolveVideo(url) {
  if (!url) return { kind: 'missing', src: '' }
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname === '/results') return { kind: 'external', src: url }
      const id = parsed.searchParams.get('v')
      const embedId = parsed.pathname.startsWith('/embed/') ? parsed.pathname.split('/')[2] : id
      return embedId
        ? { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(embedId)}?autoplay=1&rel=0` }
        : { kind: 'external', src: url }
    }
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id
        ? { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0` }
        : { kind: 'external', src: url }
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean).pop()
      return id
        ? { kind: 'embed', src: `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1` }
        : { kind: 'external', src: url }
    }
    if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) return { kind: 'video', src: url }
    return { kind: 'external', src: url }
  } catch {
    return { kind: 'missing', src: '' }
  }
}

export default function ProVideoModal({ place, lang, t, isProMember, onClose, onUpgrade }) {
  const source = resolveVideo(place?.videoUrl)

  useEffect(() => {
    if (!place) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose, place])

  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="video-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.section
            className="video-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${t.videoTitle}: ${place.name[lang]}`}
            initial={{ opacity: 0, y: 20, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: .98 }}
          >
            <div className="video-frame">
              {isProMember && source.kind === 'embed' && (
                <iframe
                  src={source.src}
                  title={`${t.videoTitle}: ${place.name[lang]}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
              {isProMember && source.kind === 'video' && (
                <video src={source.src} controls autoPlay playsInline poster={place.images[0]} />
              )}
              {isProMember && source.kind === 'external' && (
                <div className="video-unavailable" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,11,18,.42),rgba(8,11,18,.92)),url("${place.images[0]}")` }}>
                  <span className="video-play-icon"><Play size={24} fill="currentColor" /></span>
                  <span className="video-source-note">{t.videoTitle}</span>
                  <a className="video-source-link" href={source.src} target="_blank" rel="noreferrer">
                    {t.openVideoSource} <ArrowUpRight size={15} />
                  </a>
                </div>
              )}
              {isProMember && source.kind === 'missing' && (
                <div className="video-unavailable" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,11,18,.42),rgba(8,11,18,.92)),url("${place.images[0]}")` }}>
                  <span className="video-play-icon"><Play size={24} fill="currentColor" /></span>
                  <span className="video-source-note">{t.videoUnavailable}</span>
                </div>
              )}
              {!isProMember && (
                <div className="video-unavailable video-locked" style={{ backgroundImage: `linear-gradient(180deg,rgba(8,11,18,.5),rgba(8,11,18,.94)),url("${place.images[0]}")` }}>
                  <span className="video-play-icon"><LockKeyhole size={23} /></span>
                  <strong>{t.lockedTitle}</strong>
                  <span className="video-source-note">{t.lockedDescription}</span>
                  <button type="button" className="video-source-link" onClick={onUpgrade}>
                    {t.unlock} <ArrowUpRight size={15} />
                  </button>
                </div>
              )}
              <button type="button" className="video-close" onClick={onClose} aria-label={t.closeVideo}><X size={19} /></button>
              <span className="video-pro-label"><Crown size={13} /> {t.proBadge} · 4K</span>
            </div>
            <div className="video-caption">
              <div><span>{place.city[lang]}, {place.country[lang]}</span><h2>{place.name[lang]}</h2></div>
              <button type="button" onClick={onUpgrade}><LockKeyhole size={14} /> {t.proActive}</button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
