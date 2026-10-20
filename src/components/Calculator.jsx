import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Coins } from 'lucide-react'

export default function Calculator({ places, lang, t, selectedId, onDestinationChange }) {
  const [days, setDays] = useState(5)
  const place = places.find((item) => item.id === selectedId) ?? places[0]
  const locale = lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US'

  const formatMoney = (amount) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)

  const estimate = useMemo(() => {
    const daily = place?.dailyCostEstimate?.amount
    if (typeof daily !== 'number') return null
    return {
      daily,
      total: daily * days,
    }
  }, [days, place])

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
      </div>

      {estimate && (
        <div className="estimate-panel" aria-live="polite">
          <div className="estimate-headline">
            <span>{t.perDay}</span><strong>{formatMoney(estimate.daily)}</strong>
          </div>
          <div className="estimate-total">
            <span>{t.totalTrip}<small>{days} × {formatMoney(estimate.daily)}</small></span>
            <strong>{formatMoney(estimate.total)}</strong>
          </div>
          <p className="estimate-basis">{place.dailyCostEstimate.basis[lang]}</p>
        </div>
      )}
      {!estimate && (
        <div className="estimate-panel estimate-unavailable" aria-live="polite">
          <p>{t.costUnavailable}</p>
          <p className="estimate-basis">{place.dailyCostEstimate.basis[lang]}</p>
        </div>
      )}
      {place?.dailyCostEstimate?.source && (
        <a className="estimate-source" href={place.dailyCostEstimate.source} target="_blank" rel="noreferrer">
          {t.costSource}
        </a>
      )}
      {place?.dailyCostEstimate?.verifiedAt && (
        <p className="estimate-source-date">{t.checkedOn}: {place.dailyCostEstimate.verifiedAt}</p>
      )}
      <p className="estimate-note">{t.estimateNote}</p>
    </motion.div>
  )
}
