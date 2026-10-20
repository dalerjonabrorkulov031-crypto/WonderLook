import { Check, Crown, Headphones, Map, Video } from 'lucide-react'

const copy = {
  uz: {
    eyebrow: 'WONDERLOOK PREMIUM', title: 'Sayohatni yanada chuqurroq his eting.',
    intro: 'Premium hozir demo rejimida: obunani tugma orqali faollashtirasiz, haqiqiy to‘lov olinmaydi.',
    benefits: [
      ['4K sayohat videolari', 'Dron tasvirlari va obidalar ichidan virtual sayrlar.', Video],
      ['Audio gid', 'Joylar tarixini yo‘lda tinglang.', Headphones],
      ['Offline qo‘llanma', 'Sayohat ma’lumotlarini internet bo‘lmaganda ham oching.', Map],
    ],
    price: 'Narxlar (demo)', monthly: 'Oylik · $4.99', annual: 'Yillik · $29.99', period: 'To‘lov provayderi ulanmagan · hozir pul yechilmaydi', subscribe: 'Demo Premiumni yoqish',
    active: 'Premium ushbu qurilmada yoqilgan', faq: 'Ko‘p so‘raladigan savollar',
    q1: 'Hozir pul yechiladimi?', a1: 'Yo‘q. Bu sinov rejimi: tugmani bosish obunani faqat shu qurilmada yoqadi.',
    q2: 'Payme qachon ulanadi?', a2: 'Payme server API kalitlari, merchant identifikatori va webhook sozlangach ulanishi kerak.',
    q3: 'Bepul kontent nima?', a3: 'Joylar, faktlar va bepul videolar hamma uchun ochiq bo‘lib qoladi.',
  },
  ru: {
    eyebrow: 'WONDERLOOK PREMIUM', title: 'Почувствуйте путешествие глубже.',
    intro: 'Премиум пока работает в демо-режиме: кнопка включает доступ, реальная оплата не производится.',
    benefits: [
      ['Путешествия в 4K', 'Съёмка с дрона и виртуальные прогулки внутри памятников.', Video],
      ['Аудиогид', 'Слушайте истории мест в дороге.', Headphones],
      ['Офлайн-гид', 'Открывайте материалы о поездке без интернета.', Map],
    ],
    price: 'Тарифы (демо)', monthly: 'Месяц · $4.99', annual: 'Год · $29.99', period: 'Провайдер не подключён · оплаты нет', subscribe: 'Включить демо-премиум',
    active: 'Премиум включён на этом устройстве', faq: 'Частые вопросы',
    q1: 'Сейчас спишутся деньги?', a1: 'Нет. Это тестовый режим: доступ включается только на этом устройстве.',
    q2: 'Когда подключат Payme?', a2: 'После настройки серверных API-ключей Payme, merchant ID и webhook.',
    q3: 'Что доступно бесплатно?', a3: 'Справочники, факты и бесплатные видео остаются открытыми всем.',
  },
  en: {
    eyebrow: 'WONDERLOOK PREMIUM', title: 'Experience more of every journey.',
    intro: 'Premium is in demo mode: the button enables access locally; no real payment is taken.',
    benefits: [
      ['4K travel films', 'Aerial footage and virtual walks inside landmarks.', Video],
      ['Audio guide', 'Listen to local stories as you explore.', Headphones],
      ['Offline guide', 'Keep trip information available without a connection.', Map],
    ],
    price: 'Plans (demo)', monthly: 'Monthly · $4.99', annual: 'Annual · $29.99', period: 'Payment provider not connected · no charge', subscribe: 'Enable demo Premium',
    active: 'Premium is enabled on this device', faq: 'Frequently asked questions',
    q1: 'Will I be charged?', a1: 'No. This is a demo; access is enabled on this device only.',
    q2: 'When will Payme be connected?', a2: 'After the server API credentials, merchant ID and webhook are configured.',
    q3: 'What stays free?', a3: 'Place guides, facts and free videos remain available to everyone.',
  },
}

export default function PremiumPage({ lang, isPremium, onActivate }) {
  const t = copy[lang]
  return (
    <div className="premium-page page-width">
      <header className="premium-page-heading">
        <span><Crown size={15} /> {t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>
      <section className="premium-benefits">
        {t.benefits.map(([title, description, Icon]) => (
          <article className="premium-benefit" key={title}>
            <Icon size={22} />
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
      <section className="premium-plan">
        <div className="premium-prices">
          <span>{t.price}</span>
          <strong>{isPremium ? <><Check size={20} /> {t.active}</> : t.monthly}</strong>
          {!isPremium && <strong>{t.annual}</strong>}
          <small>{t.period}</small>
        </div>
        {!isPremium && <button type="button" onClick={onActivate}><Crown size={16} /> {t.subscribe}</button>}
      </section>
      <section className="premium-faq">
        <h2>{t.faq}</h2>
        {['1', '2', '3'].map((n) => <details key={n}>
          <summary>{t[`q${n}`]}</summary>
          <p>{t[`a${n}`]}</p>
        </details>)}
      </section>
    </div>
  )
}
