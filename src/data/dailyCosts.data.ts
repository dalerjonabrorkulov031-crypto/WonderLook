import type { DailyCostReference } from '../travel.types';

export const DAILY_COST_REFERENCES: Record<string, DailyCostReference> = {
  santorini: {
    amount: 285,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/greece/santorini',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Santorini bo‘yicha manbada keltirilgan bir kishilik kunlik o‘rtacha; mavsum va tanlovga qarab o‘zgaradi.',
      ru: 'Средние дневные расходы на человека по Санторини из источника; меняются в зависимости от сезона и выбора.',
      en: 'The source-reported daily average per person for Santorini; varies by season and personal choices.',
    },
  },
  registan: {
    amount: null,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/uzbekistan',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Samarqand yoki Registon uchun alohida jami topilmadi. O‘zbekiston sahifasidagi $8.66 kunlik ko‘rsatkich uning turar joy, ovqat va transport misollariga mos kelmagani uchun ishlatilmadi.',
      ru: 'Отдельный итог для Самарканда или Регистана не найден. Показатель $8.66 в день на странице Узбекистана не использован: он не согласуется с примерами жилья, еды и транспорта.',
      en: 'No Samarkand- or Registan-specific total was found. The Uzbekistan page’s $8.66 daily figure was excluded because it conflicts with its lodging, food and transport examples.',
    },
  },
  samarkand: {
    amount: null,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/uzbekistan',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Shahar bo‘yicha ishonchli jami tasdiqlanmadi. O‘zbekiston sahifasidagi $8.66 kunlik ko‘rsatkich uning xarajat toifalari bilan zid bo‘lgani uchun ko‘rsatilmaydi.',
      ru: 'Надёжный итог по городу не подтверждён. Показатель $8.66 в день на странице Узбекистана противоречит данным по категориям расходов и не показывается.',
      en: 'A reliable city total could not be confirmed. The Uzbekistan page’s $8.66 daily figure conflicts with its category data and is not shown.',
    },
  },
  'machu-picchu': {
    amount: 64,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/peru/cusco',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Kusko shahri uchun manbadagi kunlik o‘rtacha — Machu-Pikchuning o‘z narxi emas. Machu-Pikchu chiptasi, poyezd va maxsus transport qo‘shimcha bo‘lishi mumkin.',
      ru: 'Средний дневной расход по Куско, а не цена поездки в Мачу-Пикчу. Билет, поезд и специальный транспорт могут оплачиваться отдельно.',
      en: 'The source-reported Cusco daily average, not a Machu Picchu trip price. The site ticket, train and dedicated transport may cost extra.',
    },
  },
  'taj-mahal': {
    amount: 48,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/india/agra',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Agra shahri bo‘yicha manbadagi bir kishilik kunlik o‘rtacha; aniq sayohat narxi emas.',
      ru: 'Средние дневные расходы на человека по Агре из источника; это не точная цена поездки.',
      en: 'The source-reported daily average per person for Agra; this is not a fixed trip quote.',
    },
  },
  colosseum: {
    amount: 236,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/italy/rome',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Rim bo‘yicha manbadagi bir kishilik kunlik o‘rtacha; Kolizey chiptasi uchun alohida tarif emas.',
      ru: 'Средние дневные расходы на человека по Риму из источника; это не отдельный тариф на Колизей.',
      en: 'The source-reported daily average per person for Rome; not a separate Colosseum ticket price.',
    },
  },
  'mount-fuji': {
    amount: null,
    currency: 'USD',
    source: 'https://www.fujisan-climb.jp/en/',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Rasmiy sayt chiqish va mavsum qoidalarini beradi, ammo turar joy, ovqat va yo‘lni qamrab olgan kunlik jami yo‘q.',
      ru: 'Официальный сайт описывает правила восхождения и сезона, но не публикует дневной итог с жильём, питанием и дорогой.',
      en: 'The official site covers climbing and seasonal rules, but does not provide an all-in daily total for lodging, food and transport.',
    },
  },
  'eiffel-tower': {
    amount: 298,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/france/paris',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Parij bo‘yicha manbadagi bir kishilik kunlik o‘rtacha; Eyfel minorasi chiptasining narxi emas.',
      ru: 'Средние дневные расходы на человека по Парижу из источника; это не цена билета на Эйфелеву башню.',
      en: 'The source-reported daily average per person for Paris; not the Eiffel Tower ticket price.',
    },
  },
  bali: {
    amount: null,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/indonesia/bali',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Ochiq sahifada ayrim diqqatga sazovor joylar narxi bor, lekin Bali uchun jami kunlik xarajat tasdiqlanmadi.',
      ru: 'На открытой странице указаны цены отдельных достопримечательностей, но общий дневной бюджет для Бали не подтверждён.',
      en: 'The accessible page lists some attraction prices, but does not verify an all-in daily cost for Bali.',
    },
  },
  'grand-canyon': {
    amount: 203,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/united-states-of-america/grand-canyon-national-park',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Grand Canyon National Park uchun manbadagi bir kishilik kunlik o‘rtacha; rasmiy park kirish to‘lovi alohida bo‘lishi mumkin.',
      ru: 'Средние дневные расходы на человека для Grand Canyon National Park по источнику; официальный входной сбор может учитываться отдельно.',
      en: 'The source-reported daily average per person for Grand Canyon National Park; the official park entrance fee may be separate.',
    },
  },
  kyoto: {
    amount: 110,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/japan/kyoto',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Kioto bo‘yicha manbadagi bir kishilik kunlik o‘rtacha; mavsum va shaxsiy tanlovga qarab o‘zgaradi.',
      ru: 'Средние дневные расходы на человека по Киото из источника; меняются в зависимости от сезона и выбора.',
      en: 'The source-reported daily average per person for Kyoto; varies by season and personal choices.',
    },
  },
  maldives: {
    amount: 350,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/maldives',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Maldiv orollari bo‘yicha manbadagi mamlakat miqyosidagi kunlik o‘rtacha; orol, resort va dengiz transporti narxni keskin o‘zgartiradi.',
      ru: 'Средний дневной расход по стране из источника; остров, курорт и морской трансфер сильно меняют стоимость.',
      en: 'The source-reported country-level daily average; island, resort and boat transfers can change costs substantially.',
    },
  },
  'great-wall': {
    amount: 97,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/china/beijing',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Pekin shahri bo‘yicha manbadagi kunlik o‘rtacha — Buyuk devorga borish uchun transport va kirish to‘lovi alohida bo‘lishi mumkin.',
      ru: 'Средний дневной расход по Пекину из источника; транспорт к Великой стене и входной билет могут оплачиваться отдельно.',
      en: 'The source-reported Beijing daily average; transport to the Great Wall and its admission may cost extra.',
    },
  },
  tokyo: {
    amount: null,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/japan/tokyo',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Manbada ayrim diqqatga sazovor joylar narxi bor, ammo Tokio uchun jami kunlik xarajatni tekshirib bo‘lmadi.',
      ru: 'Источник приводит цены отдельных достопримечательностей, но общий дневной бюджет Токио проверить не удалось.',
      en: 'The source lists prices for individual attractions, but a Tokyo-wide daily total could not be verified.',
    },
  },
  'swiss-alps': {
    amount: 307,
    currency: 'USD',
    source: 'https://www.budgetyourtrip.com/switzerland/interlaken',
    verifiedAt: '2026-10-20',
    basis: {
      uz: 'Interlaken bo‘yicha kunlik o‘rtacha — Lauterbrunnen va Shveysariya Alplari uchun yaqin hudud proksisi. Tog‘ poyezdi va lift chiptalari qo‘shimcha bo‘lishi mumkin.',
      ru: 'Средний дневной расход по Интерлакену — региональный ориентир для Лаутербруннена и Швейцарских Альп. Билеты на горные поезда и подъёмники могут быть дополнительными.',
      en: 'The Interlaken daily average is a nearby regional proxy for Lauterbrunnen and the Swiss Alps. Mountain rail and lift tickets may cost extra.',
    },
  },
};
