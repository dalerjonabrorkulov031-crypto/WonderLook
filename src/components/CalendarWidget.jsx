import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Check, ChevronRight, Compass } from 'lucide-react'
import { MONTHS, MONTHS_SHORT } from '../i18n'

const toDateInput = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}
const shiftDays = (value, days) => {
  const date = new Date(`${value}T12:00:00`)
  date.setDate(date.getDate() + days)
  return toDateInput(date)
}
const inSeason = (month, range) => {
  const [start, end] = range
  return start <= end ? month >= start && month <= end : month >= start || month <= end
}

export default function CalendarWidget({ places, lang, t, selectedId, savedDates, onDestinationChange, onSave }) {
  const place = places.find((item) => item.id === selectedId) ?? places[0]
  const [start, setStart] = useState(() => savedDates?.start ?? toDateInput(new Date()))
  const [end, setEnd] = useState(() => savedDates?.end ?? shiftDays(toDateInput(new Date()), 7))
  const months = useMemo(() => MONTHS[lang], [lang])
  const shortMonths = MONTHS_SHORT[lang]
  const saved = Boolean(savedDates && savedDates.id === place?.id && savedDates.start === start && savedDates.end === end)
  const dateRange = place ? place.bestMonths.map((month) => months[month - 1]).join(' — ') : ''
  const selectedMonth = start ? Number(start.slice(5, 7)) : 0

  useEffect(() => {
    if (savedDates?.id === place?.id) {
      setStart(savedDates.start)
      setEnd(savedDates.end)
    } else {
      const nextStart = toDateInput(new Date())
      setStart(nextStart)
      setEnd(shiftDays(nextStart, 7))
    }
  }, [place?.id, savedDates?.id])

  const chooseMonth = (index) => {
    const today = new Date()
    let year = today.getFullYear()
    let date = new Date(year, index, 1)
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      year += 1
      date = new Date(year, index, 1)
    }
    const nextStart = index === today.getMonth() ? toDateInput(today) : toDateInput(date)
    setStart(nextStart)
    setEnd(shiftDays(nextStart, 7))
  }

  const updateStart = (value) => {
    setStart(value)
    if (value && end < value) setEnd(shiftDays(value, 7))
  }

  return (
    <motion.div
      className="planner-card calendar-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <div className="planner-card-heading">
        <span className="planner-icon"><CalendarDays size={18} /></span>
        <span><span className="planner-kicker">{t.plannerEyebrow}</span><h3>{t.calendar}</h3></span>
        <CalendarDays className="planner-heading-arrow" size={17} />
      </div>
      <label className="planner-field">
        <span>{t.destination}</span>
        <select value={place?.id ?? ''} onChange={(event) => onDestinationChange(event.target.value)}>
          {places.map((item) => (
            <option key={item.id} value={item.id}>{item.flag} {item.name[lang]} · {item.country[lang]}</option>
          ))}
        </select>
      </label>

      <div className="date-fields">
        <label className="planner-field">
          <span>{t.startDate}</span>
          <input type="date" value={start} max={end || undefined} onChange={(event) => updateStart(event.target.value)} />
        </label>
        <label className="planner-field">
          <span>{t.endDate}</span>
          <input type="date" value={end} min={start || undefined} onChange={(event) => setEnd(event.target.value)} />
        </label>
      </div>

      <div className="season-header">
        <span><Compass size={14} />{t.bestSeason}</span>
        <strong>{dateRange}</strong>
      </div>
      <div className="month-grid" aria-label={t.bestSeason}>
        {months.map((month, index) => {
          const monthNumber = index + 1
          const recommended = place ? inSeason(monthNumber, place.bestMonths) : false
          return (
            <button
              type="button"
              key={`${month}-${index}`}
              className={`month-cell${recommended ? ' is-recommended' : ''}${monthNumber === selectedMonth ? ' is-selected' : ''}`}
              onClick={() => chooseMonth(index)}
              aria-pressed={monthNumber === selectedMonth}
              title={recommended ? `${month} · ${t.bestSeason}` : month}
            >
              {shortMonths[index]}
            </button>
          )
        })}
      </div>
      <div className="season-key"><span /><span>{t.bestSeason}</span></div>
      <button
        type="button"
        className={`save-dates-button${saved ? ' is-saved' : ''}`}
        onClick={() => onSave({ id: place.id, start, end })}
        disabled={!start || !end || end < start}
        aria-pressed={saved}
      >
        {saved ? <Check size={16} /> : <CalendarDays size={16} />}
        {saved ? t.datesSaved : t.saveDates}
        <ChevronRight size={15} />
      </button>
      {saved && <p className="date-saved-note" role="status">{t.dateSaved}</p>}
    </motion.div>
  )
}
