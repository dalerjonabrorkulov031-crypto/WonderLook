import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BedDouble, Bus, Coins, Utensils, Ticket } from 'lucide-react'

const EXCHANGE = { USD: 1, EUR: 0.92, UZS: 12800, RUB: 92 }
const STYLE_KEYS = ['budget', 'standard', 'luxury']
const COST_SHARES = [
  { key: 'stay', share: 0.4, icon: BedDouble },
  { key: 'food', share: 0.3, icon: Utensils },
  { key: 'transport', share: 0.15, icon: Bus },
  { key: 'tickets', share: 0.15, icon: Ticket },
]

export default function Calculator({ places, lang, t, selectedId, onDestinationChange }) {
  const [days, setDays] = useState(5)
  const [style, setStyle] = useState('standard')
  const [currency, setCurrency] = useState('USD')
  const place = places.find((item) => item.id === selectedId) ?? places[0]
  const locale = lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US'

  const formatMoney = (amount) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'UZS' ? 0 : 0,
  }).format(amount)

  const estimate = useMemo(() => {
    if (!place) return null
    const daily = place.dailyCosts[style] * EXCHANGE[currency]
    return {
      daily,
      total: daily * days,
      categories: COST_SHARES.map((item) => ({
        ...item,
        value: daily * item.share,
      })),
    }
  }, [currency, days, place, style])

  return (
    <motion.div
      className="planner-card calculator-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
    >
      <div className="planner-card-heading">
        <span className="planner-icon"><Coins size={18} /></span>
        <span><span className="planner-kicker">{t.plannerEyebrow}</span><h3>{t.calculator}</h3></span>
        <ArrowUpRight className="planner-heading-arrow" size={17} />
      </div>

      <label className="planner-field">
        <span>{t.destination}</span>
        <select value={place?.id ?? ''} onChange={(event) => onDestinationChange(event.target.value)}>
          {places.map((item) => (
            <option key={item.id} value={item.id}>{item.flag} {item.name[lang]} · {item.country[lang]}</option>
          ))}
        </select>
      </label>

      <div className="planner-input-row">
        <label className="planner-field">
          <span>{t.days}</span>
          <div className="number-input-wrap">
            <input type="number" min="1" max="30" value={days} onChange={(event) => {
              const next = Number(event.target.value)
              if (Number.isFinite(next)) setDays(Math.max(1, Math.min(30, next)))
            }} />
            <span>{lang === 'ru' ? 'дн.' : lang === 'uz' ? 'kun' : 'days'}</span>
          </div>
        </label>
        <label className="planner-field">
          <span>{t.currency}</span>
          <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
            {Object.entries(t.currencyNames).map(([code, name]) => <option key={code} value={code}>{code} · {name}</option>)}
          </select>
        </label>
      </div>

      <div className="style-picker" role="group" aria-label={t.travelStyle}>
        <span className="style-label">{t.travelStyle}</span>
        <div>
          {STYLE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className={style === key ? 'style-option is-active' : 'style-option'}
              onClick={() => setStyle(key)}
              aria-pressed={style === key}
            >
              {t[`${key}Style`]}
            </button>
          ))}
        </div>
      </div>

      {estimate && (
        <div className="estimate-panel" aria-live="polite">
          <div className="estimate-headline">
            <span>{t.perDay}</span><strong>{formatMoney(estimate.daily)}</strong>
          </div>
          <div className="estimate-breakdown">
            {estimate.categories.map(({ key, share, value, icon: Icon }) => (
              <div className="estimate-row" key={key}>
                <span className="estimate-label"><Icon size={14} />{t[key]}</span>
                <span className="estimate-meter"><i style={{ width: `${share * 100}%` }} /></span>
                <strong>{formatMoney(value)}</strong>
              </div>
            ))}
          </div>
          <div className="estimate-total">
            <span>{t.totalTrip}<small>{days} × {formatMoney(estimate.daily)}</small></span>
            <strong>{formatMoney(estimate.total)}</strong>
          </div>
        </div>
      )}
      <p className="estimate-note">{t.estimateNote}</p>
    </motion.div>
  )
}
