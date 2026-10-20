import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Crown, LockKeyhole, Sparkles, X } from 'lucide-react'

const COMPARISON = ['freeAccess', 'publicSummary', 'proTours', 'proBudget', 'proGuides', 'proGems']

export default function PricingModal({ open, t, isPro, onClose, onActivate }) {
  const [billing, setBilling] = useState('annual')
  const [checkout, setCheckout] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  useEffect(() => {
    if (open) setCheckout(false)
  }, [open])

  const activate = () => {
    onActivate()
    setCheckout(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="vip-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.section
            className="vip-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vip-title"
            initial={{ opacity: 0, y: 24, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: .98 }}
            transition={{ duration: .25 }}
          >
            <button type="button" className="vip-close icon-button" onClick={onClose} aria-label={t.close}><X size={18} /></button>
            <div className="vip-hero">
              <div className="vip-orbit vip-orbit-one" />
              <div className="vip-orbit vip-orbit-two" />
              <span className="vip-crown"><Crown size={19} /></span>
              <span className="vip-kicker"><Sparkles size={12} /> {t.proOnly}</span>
              <h2 id="vip-title">{t.proTitle}</h2>
              <p>{t.proSubtitle}</p>
            </div>

            <div className="vip-body">
              {checkout ? (
                <motion.div className="checkout-state" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="checkout-check"><Check size={23} /></span>
                  <h3>{isPro ? t.checkoutSuccess : t.checkoutTitle}</h3>
                  <p>{isPro ? t.checkoutSuccess : t.checkoutNote}</p>
                  {!isPro && (
                    <button type="button" className="vip-primary" onClick={activate}>
                      <LockKeyhole size={16} /> {t.checkoutConfirm}
                    </button>
                  )}
                  {isPro && <button type="button" className="vip-primary" onClick={onClose}>{t.proActive}</button>}
                </motion.div>
              ) : (
                <>
                  <div className="billing-toggle" role="group" aria-label={t.comparisonTitle}>
                    <button type="button" className={billing === 'monthly' ? 'billing-option is-active' : 'billing-option'} onClick={() => setBilling('monthly')} aria-pressed={billing === 'monthly'}>
                      {t.monthly}
                    </button>
                    <button type="button" className={billing === 'annual' ? 'billing-option is-active' : 'billing-option'} onClick={() => setBilling('annual')} aria-pressed={billing === 'annual'}>
                      {t.annually}<span>{t.save50}</span>
                    </button>
                  </div>

                  <div className="plan-cards">
                    <div className="plan-card free-plan">
                      <span className="plan-name">{t.freePlan}</span>
                      <strong>$0<span> / {langShort(t)}</span></strong>
                      <span className="plan-caption">{t.currentPlan}</span>
                    </div>
                    <div className="plan-card pro-plan">
                      <span className="plan-name"><Crown size={13} /> {t.proPlan}</span>
                      <strong>{billing === 'annual' ? t.annualPrice : t.monthlyPrice}<span>{billing === 'annual' ? t.perYear : t.perMonth}</span></strong>
                      <span className="plan-caption">{billing === 'annual' ? t.save50 : t.monthly}</span>
                    </div>
                  </div>

                  <div className="comparison-table">
                    <h3>{t.comparisonTitle}</h3>
                    <div className="comparison-head"><span /><span>{t.freePlan}</span><span>{t.proPlan}</span></div>
                    {COMPARISON.map((feature) => {
                      const premium = feature.startsWith('pro')
                      return (
                        <div className="comparison-row" key={feature}>
                          <span>{t[feature]}</span>
                          <span>{premium ? <span className="comparison-dash">{t.unavailable}</span> : <Check size={14} />}</span>
                          <span><Check size={14} /></span>
                        </div>
                      )
                    })}
                  </div>

                  <button
                    type="button"
                    className="vip-primary"
                    onClick={() => isPro ? onClose() : activate()}
                  >
                    <Crown size={16} /> {isPro ? t.proActive : t.startPro}
                  </button>
                  <p className="vip-footnote">{t.checkoutNote}</p>
                </>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function langShort(t) {
  return t.monthly === 'Monthly' ? 'month' : t.monthly === 'Oylik' ? 'oy' : 'мес.'
}
