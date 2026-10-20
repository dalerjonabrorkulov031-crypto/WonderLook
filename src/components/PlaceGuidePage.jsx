import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Bookmark, CalendarDays, MapPin, Share2, Star } from 'lucide-react'
import { samarkand } from '../data/samarkand.data'
import { useLocalStorage } from '../hooks'
import { FactsList } from './FactsList'
import { PremiumVideo } from './PremiumVideo'

const copy = {
  uz: {
    back: 'Bosh sahifaga', save: 'Sevimlilarga', remove: 'Saqlanganlardan olish',
    share: 'Ulashish', facts: 'Samarqand haqida 20 ta fakt', history: 'Tarixiy vaqt chizig‘i',
    landmarks: 'Ko‘rishga arziydigan obidalar', videos: 'Videolar', free: 'Bepul', premium: 'Premium',
    practical: 'Safar uchun amaliy ma’lumot', season: 'Qachon borish', gettingThere: 'Qanday borish',
    weather: 'Ob-havo', nearby: 'Yaqin joylar', costs: 'Xarajat', reviews: 'Sayohatchilar fikri',
    reviewPlaceholder: 'Taassurotingizni yozing', send: 'Fikr qoldirish', upload: 'Rasm qo‘shish',
    newsletter: 'Sayohat ilhomini oling', email: 'Email manzilingiz', subscribe: 'Obuna bo‘lish',
    subscribed: 'Rahmat! Obunangiz saqlandi.',     source: 'Ma’lumotlar: Uzbek Wikipedia; matnlar qayta bayon qilindi (CC BY-SA 3.0).',
    map: 'Xaritada ochish', readFacts: '20 ta faktni ko‘rish', today: 'Kunning joyi',
    imageError: 'Rasm 200 KB dan kichik bo‘lishi kerak.', audioError: 'Brauzer audio ijrosini qo‘llab-quvvatlamaydi.',
    reviewSaved: 'Fikringiz saqlandi.', seasonText: 'Bahor va kuz', weatherText: 'Safar sanasiga yaqin mahalliy prognozni tekshiring.',
    priceText: 'Chipta va transport narxlari o‘zgarishi mumkin — rasmiy manbalarda tekshiring.',
  },
  ru: {
    back: 'На главную', save: 'В избранное', remove: 'Убрать из избранного',
    share: 'Поделиться', facts: '20 фактов о Самарканде', history: 'Историческая хронология',
    landmarks: 'Главные памятники', videos: 'Видео', free: 'Бесплатно', premium: 'Премиум',
    practical: 'Практическая информация', season: 'Когда ехать', gettingThere: 'Как добраться',
    weather: 'Погода', nearby: 'Рядом', costs: 'Расходы', reviews: 'Отзывы путешественников',
    reviewPlaceholder: 'Поделитесь впечатлениями', send: 'Оставить отзыв', upload: 'Добавить фото',
    newsletter: 'Вдохновение для поездок', email: 'Ваш email', subscribe: 'Подписаться',
    subscribed: 'Спасибо! Подписка сохранена.',     source: 'Источник: Uzbek Wikipedia; текст пересказан (CC BY-SA 3.0).',
    map: 'Открыть карту', readFacts: 'Смотреть 20 фактов', today: 'Место дня',
    imageError: 'Размер изображения должен быть меньше 200 КБ.', audioError: 'Браузер не поддерживает воспроизведение аудио.',
    reviewSaved: 'Отзыв сохранён.', seasonText: 'Весна и осень', weatherText: 'Проверьте местный прогноз перед поездкой.',
    priceText: 'Цены на билеты и транспорт могут меняться — проверьте официальные источники.',
  },
  en: {
    back: 'Back to home', save: 'Save place', remove: 'Remove from saved',
    share: 'Share', facts: '20 facts about Samarkand', history: 'A timeline through history',
    landmarks: 'Landmarks to explore', videos: 'Videos', free: 'Free', premium: 'Premium',
    practical: 'Plan your visit', season: 'When to go', gettingThere: 'Getting there',
    weather: 'Weather', nearby: 'Nearby', costs: 'Costs', reviews: 'Traveller reviews',
    reviewPlaceholder: 'Share your experience', send: 'Post a review', upload: 'Add a photo',
    newsletter: 'Get travel inspiration', email: 'Your email address', subscribe: 'Subscribe',
    subscribed: 'Thank you! Your subscription is saved.',     source: 'Source: Uzbek Wikipedia; content paraphrased (CC BY-SA 3.0).',
    map: 'Open map', readFacts: 'Explore all 20 facts', today: 'Place of the day',
    imageError: 'Image must be under 200 KB.', audioError: 'Audio playback is not supported by this browser.',
    reviewSaved: 'Your review was saved.', seasonText: 'Spring and autumn', weatherText: 'Check the local forecast close to your travel dates.',
    priceText: 'Ticket and transport prices can change; confirm them with official sources.',
  },
}

const timeline = [
  { date: 'IV asr mil.avv. – VI asr', uz: 'Samarqand So‘g‘d davlatining poytaxti bo‘lgan.', ru: 'Самарканд был столицей Согда.', en: 'Samarkand was the capital of Sogdiana.' },
  { date: 'XIII asr', uz: 'Mo‘g‘ullar yurishlari eski shaharning ko‘plab inshootlariga zarar yetkazgan.', ru: 'Монгольские походы повредили многие постройки старого города.', en: 'Mongol campaigns damaged many buildings in the old city.' },
  { date: '1370–1405', uz: 'Amir Temur davrida shahar yirik siyosiy va me’moriy markazga aylangan.', ru: 'При Амире Тимуре город стал крупным политическим и архитектурным центром.', en: 'Under Amir Timur, the city became a major political and architectural centre.' },
  { date: 'XV asr', uz: 'Ulug‘bek davrida ta’lim va astronomiya rivojlangan.', ru: 'При Улугбеке развивались образование и астрономия.', en: 'Education and astronomy advanced under Ulugh Beg.' },
  { date: '2001', uz: 'Registon ansambli UNESCO Jahon merosi ro‘yxatiga kiritilgan.', ru: 'Ансамбль Регистан включён в список Всемирного наследия UNESCO.', en: 'The Registan ensemble was inscribed on the UNESCO World Heritage List.' },
]

const nearby = [
  ['registan', { uz: 'Registon', ru: 'Регистан', en: 'Registan' }],
  ['gur-emir', { uz: 'Go‘ri Amir', ru: 'Гури-Эмир', en: 'Gur-e-Amir' }],
  ['shah-i-zinda', { uz: 'Shohizinda', ru: 'Шахи-Зинда', en: 'Shah-i-Zinda' }],
]

function sourceUrl(lat, lng) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`
}

export default function PlaceGuidePage({ lang, isPremium, saved, onToggleFavorite, onUpgrade, onHome }) {
  const t = copy[lang]
  const [review, setReview] = useState('')
  const [photo, setPhoto] = useState('')
  const [reviewNotice, setReviewNotice] = useState('')
  const [email, setEmail] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [reviews, setReviews] = useLocalStorage('wl-reviews-samarkand', [])
  const [subscribers, setSubscribers] = useLocalStorage('wl-newsletter', [])
  const fileInput = useRef(null)

  useEffect(() => {
    const title = `${samarkand.name[lang]} — WonderLook`
    const description = samarkand.history[lang]
    const oldTitle = document.title
    const meta = (name, content) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name'
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.append(element)
      }
      const old = element.content
      element.content = content
      return () => { element.content = old }
    }
    document.title = title
    const restoreDescription = meta('description', description)
    const restoreOgTitle = meta('og:title', title)
    const restoreOgDescription = meta('og:description', description)
    const restoreOgImage = meta('og:image', samarkand.heroImage)
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = `${window.location.origin}/place/samarkand`
    document.head.append(canonical)
    const structuredData = document.createElement('script')
    structuredData.type = 'application/ld+json'
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: samarkand.name[lang],
      description,
      image: samarkand.heroImage,
      url: canonical.href,
      geo: { '@type': 'GeoCoordinates', latitude: samarkand.lat, longitude: samarkand.lng },
      touristType: samarkand.category,
      address: { '@type': 'PostalAddress', addressLocality: samarkand.name.en, addressCountry: 'UZ' },
    })
    document.head.append(structuredData)
    return () => {
      document.title = oldTitle
      restoreDescription()
      restoreOgTitle()
      restoreOgDescription()
      restoreOgImage()
      canonical.remove()
      structuredData.remove()
    }
  }, [lang])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  const share = async () => {
    const payload = { title: samarkand.name[lang], text: samarkand.history[lang], url: window.location.href }
    if (navigator.share) await navigator.share(payload)
    else if (navigator.clipboard) await navigator.clipboard.writeText(payload.url)
  }

  const submitReview = (event) => {
    event.preventDefault()
    if (!review.trim()) return
    setReviews((current) => [{ text: review.trim(), photo, date: new Date().toISOString() }, ...current].slice(0, 5))
    setReview('')
    setPhoto('')
    setReviewNotice(t.reviewSaved)
  }

  const addPhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/') || file.size > 200_000) {
      setReviewNotice(t.imageError)
      return
    }
    const reader = new FileReader()
    reader.onload = () => setPhoto(String(reader.result))
    reader.readAsDataURL(file)
  }

  const subscribe = (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setSubscribers((current) => [...new Set([...current, email])])
    setNewsletterDone(true)
  }

  const playAudioGuide = () => {
    if (!isPremium) {
      onUpgrade()
      return
    }
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setReviewNotice(t.audioError)
      return
    }
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(`${samarkand.name[lang]}. ${samarkand.history[lang]}`)
    utterance.lang = lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US'
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="guide-page">
      <section className="guide-hero">
        <img src={samarkand.heroImage} alt="Registan Square in Samarkand" fetchpriority="high" />
        <div className="guide-hero-shade" />
        <a className="guide-image-credit" href="https://commons.wikimedia.org/wiki/File:RegistanSquare_Samarkand.jpg" target="_blank" rel="noreferrer">
          Photo: Gustavo Jeronimo · CC BY 2.0
        </a>
        <div className="guide-hero-copy">
          <p className="guide-eyebrow"><MapPin size={15} /> {samarkand.country[lang]}</p>
          <h1>{samarkand.name[lang]}</h1>
          <p>{samarkand.history[lang]}</p>
          <div className="guide-hero-actions">
            <span className="guide-rating"><Star size={16} fill="currentColor" /> {samarkand.rating.toFixed(1)}</span>
            <button type="button" onClick={() => onToggleFavorite(samarkand.id)} aria-pressed={saved}>
              <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /> {saved ? t.remove : t.save}
            </button>
            <a href="#videos"><PlayIcon /> {t.videos}</a>
            <button type="button" onClick={share}><Share2 size={16} /> {t.share}</button>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading"><span>01 / DISCOVER</span><h2>{t.facts}</h2></div>
        <FactsList facts={samarkand.facts} lang={lang} />
        <p className="source-note">{t.source} <a href={samarkand.sources[0]} target="_blank" rel="noreferrer">Samarqand ↗</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a></p>
      </section>

      <section className="guide-section guide-history">
        <div className="guide-section-heading"><span>02 / HISTORY</span><h2>{t.history}</h2></div>
        <ol className="guide-timeline">
          {timeline.map((item) => <li key={item.date}><time>{item.date}</time><p>{item[lang]}</p></li>)}
        </ol>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading"><span>03 / PLACES</span><h2>{t.landmarks}</h2></div>
        <div className="landmark-grid">
          {samarkand.landmarks.map((landmark) => (
            <details className="landmark-card" key={landmark.id} id={`landmark-${landmark.id}`}>
              <summary>
                <span className="landmark-year">{landmark.built}</span>
                <h3>{landmark.name[lang]}</h3>
                <p>{landmark.summary[lang]}</p>
                <span className="landmark-expand">{t.readFacts} ↗</span>
              </summary>
              <a className="landmark-map-link" href={sourceUrl(landmark.lat, landmark.lng)} target="_blank" rel="noreferrer">
                <MapPin size={15} /> {t.map} · {landmark.lat.toFixed(4)}, {landmark.lng.toFixed(4)}
              </a>
              <FactsList facts={landmark.facts} lang={lang} />
            </details>
          ))}
        </div>
      </section>

      <section className="guide-section" id="videos">
        <div className="guide-section-heading"><span>04 / WATCH</span><h2>{t.videos}</h2></div>
        <div className="guide-video-grid">
          {samarkand.videos.map((video) => <PremiumVideo key={video.id} video={video} lang={lang} isPremium={isPremium} onUpgrade={onUpgrade} />)}
        </div>
        <p className="source-note">Replace demo media URLs with licensed video assets before launch.</p>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading"><span>05 / PLAN</span><h2>{t.practical}</h2></div>
        <div className="practical-grid">
          <InfoCard icon={<CalendarDays />} title={t.season} body={samarkand.bestSeason[lang]} />
          <InfoCard icon={<MapPin />} title={t.gettingThere} body={samarkand.howToGetThere[lang]} />
          <InfoCard icon={<Star />} title={t.weather} body={t.weatherText} />
          <InfoCard icon={<MapPin />} title={t.costs} body={t.priceText} />
          <div className="practical-card practical-nearby"><h3>{t.nearby}</h3>{nearby.map(([id, name]) => <a key={id} href={`#landmark-${id}`}>{name[lang]} <ArrowUpRight size={14} /></a>)}</div>
          <div className="practical-card practical-nearby">
            <span className="guide-fact-kicker">{t.today}</span>
            {(() => {
              const landmark = samarkand.landmarks[new Date().getDate() % samarkand.landmarks.length]
              return <a href={`#landmark-${landmark.id}`}>{landmark.name[lang]} <ArrowUpRight size={14} /></a>
            })()}
          </div>
        </div>
        <div className="guide-premium-tools">
          <h3>{lang === 'uz' ? 'Premium sayohat vositalari' : lang === 'ru' ? 'Премиум-инструменты поездки' : 'Premium trip tools'}</h3>
          <button type="button" onClick={playAudioGuide}>{speaking ? 'Stop audio guide' : 'Audio guide'} {isPremium ? '' : '· Premium'}</button>
          <button type="button" onClick={() => isPremium ? window.print() : onUpgrade()}>
            {lang === 'uz' ? 'Offline PDF-gid' : lang === 'ru' ? 'Офлайн PDF-гид' : 'Offline PDF guide'} · {isPremium ? (lang === 'uz' ? 'Chop etish / PDF saqlash' : lang === 'ru' ? 'Печать / сохранить PDF' : 'Print / save as PDF') : 'Premium'}
          </button>
        </div>
      </section>

      <section className="guide-section guide-community">
        <div className="guide-section-heading"><span>06 / COMMUNITY</span><h2>{t.reviews}</h2></div>
        <form className="guide-review-form" onSubmit={submitReview}>
          <label className="sr-only" htmlFor="guide-review">{t.reviewPlaceholder}</label>
          <textarea id="guide-review" value={review} onChange={(event) => setReview(event.target.value)} placeholder={t.reviewPlaceholder} required maxLength={800} />
          <input ref={fileInput} type="file" accept="image/*" onChange={addPhoto} hidden />
          <button type="button" className="guide-secondary" onClick={() => fileInput.current?.click()}>{t.upload}</button>
          {photo && <img className="review-preview" src={photo} alt="Review upload preview" />}
          <button type="submit" className="guide-primary">{t.send}</button>
          {reviewNotice && <span role="status">{reviewNotice}</span>}
        </form>
        <div className="guide-reviews">
          {reviews.map((item, index) => <article className="guide-review" key={`${item.date}-${index}`}>
            <p>{item.text}</p><time>{new Date(item.date).toLocaleDateString(lang)}</time>
            {item.photo && <img src={item.photo} alt="Photo shared with this review" loading="lazy" />}
          </article>)}
        </div>
        <form className="guide-newsletter" onSubmit={subscribe}>
          <h3>{newsletterDone ? t.subscribed : t.newsletter}</h3>
          {!newsletterDone && <><label className="sr-only" htmlFor="newsletter-email">{t.email}</label><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t.email} /><button type="submit">{t.subscribe} <ArrowUpRight size={15} /></button></>}
        </form>
      </section>
      <a className="guide-back" href="/" onClick={(event) => { event.preventDefault(); onHome() }}><ArrowLeft size={16} /> {t.back}</a>
    </div>
  )
}

function InfoCard({ icon, title, body }) {
  return <article className="practical-card"><span>{icon}</span><h3>{title}</h3><p>{body}</p></article>
}

function PlayIcon() {
  return <span aria-hidden="true">▶</span>
}
