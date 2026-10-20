import { useEffect } from 'react'
import { ArrowLeft, ArrowUpRight, MapPin, Star } from 'lucide-react'
import { PLACES } from '../data/places'
import { getPlaceGuide } from '../data/places.index'
import { FactsList } from './FactsList'
import { PremiumVideo } from './PremiumVideo'

const labels = {
  uz: {
    back: 'Bosh sahifaga', facts: 'Joy haqida faktlar', videos: 'Videolar',
    ticket: 'Chipta va kirish to‘lovlari', daily: 'Bir kunlik xarajat',
    dailyAverage: 'Manbadagi bir kishilik kunlik o‘rtacha',
    unverified: 'Ma’lumot tekshirilmoqda', currentPrices: 'Narxlar o‘zgarishi mumkin. To‘lashdan oldin rasmiy saytda tekshiring.',
    verified: 'Tekshirilgan sana', buy: 'Rasmiy saytni ochish', sources: 'Manbalar',
    costSource: 'Xarajat manbasini ochish',
    costDisclaimer: 'Manbadagi o‘rtacha ko‘rsatkich aniq taklif emas; mavsum, tanlov va alohida chipta xarajatlari farq qiladi.',
    sourceUnavailable: 'Ushbu sahifaning mazmuni ochilmadi. Faktlar taxmin qilinmadi.',
    noPrice: 'Joriy rasmiy narx tasdiqlanmadi.',
  },
  ru: {
    back: 'На главную', facts: 'Факты о месте', videos: 'Видео',
    ticket: 'Билеты и входные сборы', daily: 'Расходы за день',
    dailyAverage: 'Средние дневные расходы на человека по источнику',
    unverified: 'Информация проверяется', currentPrices: 'Цены могут меняться. Проверьте их на официальном сайте перед оплатой.',
    verified: 'Дата проверки', buy: 'Открыть официальный сайт', sources: 'Источники',
    costSource: 'Открыть источник расходов',
    costDisclaimer: 'Среднее значение из источника не является точной сметой; сезон, выбор и отдельные билеты меняют расходы.',
    sourceUnavailable: 'Содержимое этой страницы не удалось открыть. Факты не добавлялись.',
    noPrice: 'Текущая официальная цена не подтверждена.',
  },
  en: {
    back: 'Back to home', facts: 'Facts about this place', videos: 'Videos',
    ticket: 'Tickets and admission', daily: 'One-day cost',
    dailyAverage: 'Source-reported average per person / day',
    unverified: 'Information being verified', currentPrices: 'Prices may change. Check the official site before paying.',
    verified: 'Verified on', buy: 'Open official site', sources: 'Sources',
    costSource: 'Open the cost source',
    costDisclaimer: 'A source-reported average is not a quote; season, choices and separate attraction tickets affect the total.',
    sourceUnavailable: 'The requested page could not be read. No facts have been inferred.',
    noPrice: 'No current official price has been confirmed.',
  },
}

const profileIdFor = (id) => ({
  eiffel: 'eiffel-tower',
  alps: 'swiss-alps',
}[id] ?? id)

export default function PlaceTravelGuidePage({ id, lang, isPremium, saved, onToggleFavorite, onUpgrade, onHome }) {
  const guide = getPlaceGuide(id)
  const place = PLACES.find((item) => item.id === profileIdFor(id))
  const t = labels[lang]

  useEffect(() => {
    if (!guide || !place) return undefined
    const title = `${place.name[lang]} — WonderLook`
    const description = place.description[lang]
    const oldTitle = document.title
    const meta = (name, content) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name'
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.append(element)
      }
      const previous = element.content
      element.content = content
      return () => { element.content = previous }
    }
    document.title = title
    const restoreDescription = meta('description', description)
    const restoreOgTitle = meta('og:title', title)
    const restoreOgDescription = meta('og:description', description)
    const restoreOgImage = meta('og:image', place.images[0])
    const canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.href = `${window.location.origin}/place/${id}`
    document.head.append(canonical)
    const structuredData = document.createElement('script')
    structuredData.type = 'application/ld+json'
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: place.name[lang],
      description,
      image: place.images[0],
      url: canonical.href,
      geo: { '@type': 'GeoCoordinates', latitude: place.latitude, longitude: place.longitude },
      address: { '@type': 'PostalAddress', addressLocality: place.city[lang], addressCountry: place.country.en },
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
  }, [guide, id, lang, place])

  if (!guide || !place) {
    return (
      <section className="not-found page-width">
        <span>404</span>
        <h1>{lang === 'uz' ? 'Sahifa topilmadi' : lang === 'ru' ? 'Страница не найдена' : 'Page not found'}</h1>
        <button type="button" onClick={onHome}>{t.back}</button>
      </section>
    )
  }

  const { tickets, dailyCost } = guide
  const formattedDailyAverage = dailyCost.averagePerPersonPerDay == null
    ? t.unverified
    : new Intl.NumberFormat(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US', {
      style: 'currency',
      currency: dailyCost.currency,
      maximumFractionDigits: 0,
    }).format(dailyCost.averagePerPersonPerDay)

  return (
    <div className="guide-page">
      <section className="guide-hero">
        <img src={place.images[0]} alt={place.name[lang]} fetchpriority="high" />
        <div className="guide-hero-shade" />
        <div className="guide-hero-copy">
          <p className="guide-eyebrow"><MapPin size={15} /> {place.city[lang]}, {place.country[lang]}</p>
          <h1>{place.name[lang]}</h1>
          <p>{place.description[lang]}</p>
          <div className="guide-hero-actions">
            <span className="guide-rating"><Star size={16} fill="currentColor" /> {place.rating.toFixed(1)}</span>
            <button type="button" onClick={() => onToggleFavorite(place.id)} aria-pressed={saved}>
              {saved
                ? (lang === 'uz' ? 'Sevimlilardan olish' : lang === 'ru' ? 'Убрать из избранного' : 'Remove from saved')
                : (lang === 'uz' ? 'Sevimlilarga' : lang === 'ru' ? 'В избранное' : 'Save place')}
            </button>
            <a href="#videos">{t.videos}</a>
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading"><span>01 / DISCOVER</span><h2>{t.facts}</h2></div>
        {guide.facts.length
          ? <FactsList facts={guide.facts} lang={lang} />
          : <p className="guide-data-notice">{t.sourceUnavailable}</p>}
        <p className="source-note">
          {t.sources}: <a href={guide.wiki} target="_blank" rel="noreferrer">{guide.wiki}</a>
          {' · '}<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA</a>
        </p>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading"><span>02 / PLAN</span><h2>{t.ticket}</h2></div>
        <div className="travel-ticket-card">
          {tickets.officialUrl && (
            <a className="guide-primary" href={tickets.officialUrl} target="_blank" rel="noreferrer">
              {t.buy} <ArrowUpRight size={15} />
            </a>
          )}
          {tickets.prices.length ? (
            <div className="travel-price-list">
              {tickets.prices.map(({ label, price }) => (
                <div key={`${label}-${price.currency}`}><span>{label}</span><strong>{price.amount} {price.currency}</strong>{price.note && <small>{price.note}</small>}</div>
              ))}
            </div>
          ) : <p>{t.noPrice}</p>}
          {tickets.verifiedAt && <p className="travel-verified">{t.verified}: {tickets.verifiedAt}</p>}
          <p className="source-note">{t.currentPrices}</p>
          {tickets.warnings.map((warning) => <p className="travel-warning" key={warning}>{warning}</p>)}
          {tickets.conflictingReports?.map((report) => <p className="travel-warning" key={report}>{report}</p>)}
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading"><span>03 / BUDGET</span><h2>{t.daily}</h2></div>
        <div className="travel-cost-grid">
          <article className="practical-card">
            <h3>{t.dailyAverage}</h3>
            <p>{formattedDailyAverage}</p>
            <p>{dailyCost.basis[lang]}</p>
            {dailyCost.source && (
              <a href={dailyCost.source} target="_blank" rel="noreferrer">{t.costSource}</a>
            )}
            {dailyCost.verifiedAt && <small>{t.verified}: {dailyCost.verifiedAt}</small>}
          </article>
        </div>
        <p className="source-note">{t.costDisclaimer}</p>
      </section>

      <section className="guide-section" id="videos">
        <div className="guide-section-heading"><span>04 / WATCH</span><h2>{t.videos}</h2></div>
        <div className="guide-video-grid">
          {guide.videos.map((video) => <PremiumVideo key={video.id} video={video} lang={lang} isPremium={isPremium} onUpgrade={onUpgrade} />)}
        </div>
        <p className="source-note">{lang === 'uz' ? 'Video URL va muqovalar keyin haqiqiy media bilan almashtiriladi.' : lang === 'ru' ? 'Ссылки и обложки видео необходимо заменить реальными материалами.' : 'Replace placeholder video URLs and posters with licensed media before launch.'}</p>
      </section>

      <a className="guide-back" href="/" onClick={(event) => { event.preventDefault(); onHome() }}><ArrowLeft size={16} /> {t.back}</a>
    </div>
  )
}
